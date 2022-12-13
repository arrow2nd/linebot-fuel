// @deno-types="npm:@types/express@latest"
import express from "express";
import { middleware } from "bot-sdk";

import { config } from "./env.ts";
import { reply } from "../controllers/reply.ts";

const router = express();

router.get("/", (_, res) => res.send("ok! (GET)"));
router.post("/hook", middleware(config), reply);

export { router };
