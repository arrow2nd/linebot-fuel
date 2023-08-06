import type { Config } from "./types/line.ts";

import "dotenv";

export const PORT = Deno.env.get("PORT") || 3000;

export const config: Config = {
  channelAccessToken: Deno.env.get("ACCESS_TOKEN") ?? "",
  channelSecret: Deno.env.get("SECRET_KEY") ?? "",
};
