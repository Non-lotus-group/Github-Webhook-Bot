const { text } = require('express');
const Bot = require('feishu-webhook-bot');
const dotenv = require('dotenv').config();
const bot = new Bot(
  process.env.FEISHU_WEBHOOK_URL

);
/* eve=event  */

function sendDEorCR(org,eve,act){
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
          text: "   ",
        },
        {
          tag: "text",
          text: eve,
        },
        {
          tag: "text",
          text: "   ",
        },
        {
          tag: "text",
          text: act,
        },
      ],
    ],
  });
}
function sendPush(org,url,eve,act,sender){

}
function sendIssue(org,tit,sender){

}
function sendIssueComment(org,tit,comment,eve,act){

}

function sendTest(){
  bot.sendText("hello world!");
}

module.exports = {sendDEorCR,sendPush,sendIssue,sendIssueComment,sendTest}; 