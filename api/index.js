'use strict'
const express = require('express')
const line = require('@line/bot-sdk')
const fuel = require('../src/fuel.js')
require('dotenv').config()

const PORT = process.env.PORT
const config = {
  channelAccessToken: process.env.ACCESS_TOKEN,
  channelSecret: process.env.SECRET_KEY
}
const client = new line.Client(config)

// ルーティング
const app = express()
app.get('/', (_req, res) => res.send('Success! (GET)'))
app.post('/hook/', line.middleware(config), async (req, res) => {
  await Promise.all(req.body.events.map((e) => bot(e)))
  res.status(200).end()
})

/**
 * botメイン
 *
 * @param {Object} ev イベント
 */
async function bot(ev) {
  // テキスト以外
  if (ev.message.type !== 'text') {
    await client.replyMessage(ev.replyToken, fuel.HelpMsg())
    return
  }

  // 返信
  const result = fuel.Calc(ev.message.text)
  await client.replyMessage(ev.replyToken, result)
}

// vercel
process.env.NOW_REGION
  ? (module.exports = app)
  : app.listen(PORT, () => console.log(`Listening on ${PORT}`))
