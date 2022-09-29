const { text } = require('express');
const Bot = require('feishu-webhook-bot');
const dotenv = require('dotenv').config();
const bot = new Bot(
  process.env.FEISHU_WEBHOOK_URL

);

/* function sendDEorCR(org,eve){
  bot.sendRich({
    title: "rich title",
    content: [
      [
        {
          tag: "text",
          text: org,
        },
        {
          tag: "text",
          text: "eve",
        },
      ],
    ],
  });
}
 */
function sendt(){
  bot.sendText("hello world!");
}

sendt();


module.exports = {sendt}; 