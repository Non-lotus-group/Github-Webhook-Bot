const { text } = require('express');
const Bot = require('feishu-webhook-bot');
const dotenv = require('dotenv').config();
const bot = new Bot(
  process.env.FEISHU_WEBHOOK_URL

);
/* eve=event  */

let org;
let eve;
let act;
let Murl;
let sender;
let tit;
let comment;
function sendDEorCR(org,eve,act){//delete and create event
  bot.sendRich({
    content: [
      [
        {
          tag: "text",
          text: org,
        },
        {
          tag: "text",
          text: "  branch:",
        },
        {
          tag: "text",
          text: act,
        },
        {
          tag: "text",
          text: ".",
        },
        {
          tag: "text",
          text: eve,
        },
      ],
    ],
  });
}
function sendPush(org,Murl,eve,act,sender){
  bot.sendRich({
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
          text: "  by:",
        },
        {
          tag: "text",
          text: sender,
        },
      ],
      [
        {
          "tag": "a",
          "text": Murl,
          "href": Murl,
        },
      ],
      [
        {
          tag: "text",
          text: act,
        },
      ],
    ],
  }); 
  

}
function sendIssue(org,eve,act,tit,sender){
  bot.sendRich({
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
          text: ".",
        },
        {
          tag: "text",
          text: act,
        },
        {
          tag: "text",
          text: "   :",
        },
        {
          tag: "text",
          text: tit,
        },
        {
          tag: "text",
          text: "-by",
        },
        {
          tag: "text",
          text: sender,
        },
      ],
    ],
  }); 
  
}

function sendIssueComment(org,tit,comment,eve,act){

}

function sendTest(testMess){
  bot.sendText(testMess);
}
module.exports = {sendDEorCR,sendPush,sendIssue,sendIssueComment,sendTest,org,eve,act,Murl,sender,tit,comment}; 