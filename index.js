const http = require('http');
const Bot = require('feishu-webhook-bot');
const { title } = require('process');
const { text } = require('express');
const { debug, Console } = require('console');
const dotenv = require('dotenv');
const messege = require('./post_module');
dotenv.config();
console.log("this process is started")
const crypto = require('crypto');
const secret = process.env.SECRET_TOKEN;
const sigHashAlg = 'sha256';
if (process.env.FEISHU_WEBHOOK_URL == undefined) {
  throw "you don't have a URL of feishu-bot in your .env"
}

http.createServer((request, response) => {
  const { headers, method, url } = request;
  const myHeaders = headers;
  let body = new Array();
  request.on('error', (err) => {
    console.error(err);
  })
  request.on('data', (chunk) => {
    body.push(chunk);
  })
  request.on('end', () => {
    body = Buffer.concat(body).toString();
    let newBody = JSON.parse(body);
    let myEvent = myHeaders["x-github-event"];
    let sigHeaderName = myHeaders['x-hub-signature-256'];
    let org = newBody.repository.full_name;
    let eve = myEvent;
    let sender = newBody.sender.login;
    let tit;
    let act;
    let Murl
    let comment;
    let hmac = crypto.createHmac(sigHashAlg, secret)
    let digest = Buffer.from(sigHashAlg + '=' + hmac.update(body).digest('hex'), 'utf8').toString();
    console.log(digest);
    console.log(sigHeaderName);
    if (digest === sigHeaderName) {
      try {
        console.log("has in");
        if (myEvent === "issues") {
          tit = newBody.issue.title;
          act = newBody.action;
          Murl = newBody.issue.comments_url;
          messege.sendIssue(org, eve, act, tit, sender, Murl)
        }
        if (myEvent === "push") {
          Murl = newBody.head_commit.url;
          let commitsNum = newBody.commits.length;
          let listArray = [];
          if (commitsNum == 1) {
            act = newBody.commits.messege;
          }
          else {
            for (let i = 0; i < commitsNum; i++) {
              listArray.push(newBody.commits[i]["message"])
            }
            act = listArray.join("\n")
          }
          console.log(org,Murl,eve,act,sender)
          messege.sendPush(org, Murl, eve, act, sender)
        }
        if (myEvent === "create" || myEvent === "delete") {
          act = newBody.ref;
          messege.sendDEorCR(org, eve, act);
        }
        if (myEvent === "issue_comment") {
          tit = newBody.issue.title;
          comment = newBody.comment.body;
          act = newBody.action;
          Murl = newBody.issue.comments_url;
          messege.sendIssueComment(org, eve, act, tit, sender, comment, Murl)
        }
        if (myEvent === "fork") {
          act = newBody.action;
          messege.sendFork(org, eve, act, sender)
        }
        if (myEvent === "repository") {
          act = newBody.action;
          messege.sendRepository(org, eve, act);
        }
        response.on('error', (err) => {
          console.error(err);
        });

        response.statusCode = 200;
        response.setHeader('Content-Type', 'application/json');

        response.write("success: " + myEvent);
        response.end();

      } catch (error) {
        ((process.env.NODE_ENV).toLowerCase() == "production") ? "" : console.error(error);
      }
    }


  });
}).listen(8080);
