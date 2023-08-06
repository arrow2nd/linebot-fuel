import type { WebhookRequestBody } from "./types/line.ts";

import { Context, Hono } from "hono";

import { reply } from "./reply.ts";
import { config } from "./env.ts";

const hmacAlgorithm = { name: "HMAC", hash: "SHA-256" };

/**
 * HMAC-SHA256 でリクエストボディのダイジェスト値を取得
 * @param secretKey シークレットキー
 * @param body リクエストボディ
 * @returns Base64でエンコードされたダイジェスト値
 */
async function hmac(secretKey: string, body: string): Promise<string> {
  const enc = new TextEncoder();

  const key = await crypto.subtle.importKey(
    "raw",
    enc.encode(secretKey),
    hmacAlgorithm,
    false,
    ["sign", "verify"],
  );

  const sign = await crypto.subtle.sign(
    hmacAlgorithm.name,
    key,
    enc.encode(body),
  );

  return btoa(String.fromCharCode(...new Uint8Array(sign)));
}

const app = new Hono();

app.post("/hook", async (ctx: Context) => {
  // リクエストを検証する
  const signature = ctx.req.headers.get("x-line-signature");
  const json = await ctx.req.text();
  const hash = await hmac(config.channelSecret, json);

  if (signature !== hash) {
    return new Response("bad request", { status: 400 });
  }

  // リクエストを処理
  const req: WebhookRequestBody = await JSON.parse(json);
  await Promise.all(req.events.map((event) => {
    return reply(event);
  }));

  return new Response("ok");
});

Deno.serve({ port: 3000 }, app.fetch);
