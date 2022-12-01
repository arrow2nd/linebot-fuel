// @deno-types="npm:@types/express@latest"
import { Request, Response } from "express";
import { Client, MessageEvent } from "bot-sdk";

import { config } from "../libs/env.ts";
import { calcFuel } from "../libs/fuel.ts";
import { createHelpMessage } from "../libs/message.ts";

const client = new Client(config);

export async function reply(req: Request, res: Response): Promise<Response> {
  const events: MessageEvent[] = req.body.events;

  await Promise.all(events.map(async (e) => {
    await client.replyMessage(
      e.replyToken,
      e.message.type === "text"
        ? calcFuel(e.message.text)
        : createHelpMessage(),
    );
  }));

  return res.status(200);
}
