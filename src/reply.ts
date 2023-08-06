import type { WebhookEvent } from "./types/line.ts";
import type { FlexMessage } from "./types/message.ts";

import { createHelpMessage, createReplyMessage } from "./message.ts";
import { config } from "./env.ts";

async function send(replyToken: string, flex: FlexMessage): Promise<Response> {
  return await fetch("https://api.line.me/v2/bot/message/reply", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${config.channelAccessToken}`,
    },
    body: JSON.stringify({
      replyToken: replyToken,
      messages: [flex],
    }),
  });
}

export function reply(event: WebhookEvent): Promise<Response> {
  return send(
    event.replyToken,
    event.type === "message" && event.message.type === "text"
      ? createReplyMessage(event.message.text)
      : createHelpMessage(),
  );
}
