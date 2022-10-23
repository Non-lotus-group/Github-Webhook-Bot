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
  let body = [];
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
          messege.sendIssue(org, eve, act, tit, sender)
        }
        if (myEvent === "push") {
          Murl = newBody.head_commit.url;
          act = newBody.head_commit.message;
          messege.sendPush(org, Murl, eve, act, sender)
        }
        if (myEvent === "create" || myEvent === "delete") {
          act = newBody.ref;
          messege.sendDEorCR(org, eve, act);
        } 
        if(myEvent === "issue_comment"){
          tit = newBody.issue.title;
          comment=issue.body;
          act = newBody.action;
          messege.sendIssueComment(org, eve, act, tit, sender,comment)
        }
        response.on('error', (err) => {
          console.error(err);
        });

        response.statusCode = 200;
        response.setHeader('Content-Type', 'application/json');

        response.write(JSON.stringify({ ok: true }));
        response.end();

      } catch (error) {
        ((process.env.NODE_ENV).toLowerCase() == "production") ? "" : console.error(error); 
      }
    }


  });
}).listen(8080);
