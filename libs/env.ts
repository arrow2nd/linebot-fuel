import "dotenv";
import { ClientConfig, MiddlewareConfig } from "bot-sdk";

export const PORT = Deno.env.get("PORT") || 3000;

export const config: ClientConfig & MiddlewareConfig = {
  channelAccessToken: Deno.env.get("ACCESS_TOKEN") ?? "",
  channelSecret: Deno.env.get("SECRET_KEY") ?? "",
};
