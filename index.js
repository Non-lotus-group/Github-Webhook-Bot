const http = require('http');
const Bot = require('feishu-webhook-bot');
const { title } = require('process');
const { text } = require('express');
const { debug, Console } = require('console');
const dotenv = require('dotenv');
const messege = require('./post_module');
dotenv.config();

http.createServer((request, response) => {
  const { headers, method, url } = request;
  const myHeaders = headers;
  let body = [];
  request.on('error', (err) => {
    console.error(err);
  })
  .on('data', (chunk) => {
      body.push(chunk);
    })
    .on('end', () => {
      body = Buffer.concat(body).toString(); 
      /* 在这里执行一次post请求给机器人 */

      let newBody = JSON.parse(body);
      let myEvent = myHeaders["x-github-event"];
      //console.log(newBody);
      let org=newBody.repository.full_name;
      let eve=myEvent;
      let sender=newBody.sender.login;
      let tit;
      let act;
      let Murl
      let comment;
      //消息体
      if(myEvent==="issues"){
        tit=newBody.issue.title;
        act=newBody.action;
        messege.sendIssue(org,eve,act,tit,sender)
      }
      if(myEvent==="push"){
        Murl=newBody.head_commit.url;
        act=newBody.head_commit.message;
        messege.sendPush(org,Murl,eve,act,sender)
        console.log(Murl);
        console.log(eve);
        console.log(act);
      } 
      if(myEvent==="create"||myEvent==="delete"){
        act=newBody.ref;
        messege.sendDEorCR(org,eve,act);
      }
/*       if(myEvent==="issue_comment"){
        messege.sendIssueComment(org,tit,comment,eve,act);
      } */
      /* 在这里结束 */
      response.on('error', (err) => {
        console.error(err);
      });

      response.statusCode = 200;
      response.setHeader('Content-Type', 'application/json');
      // Note: the 2 lines above could be replaced with this next one:
      // response.writeHead(200, {'Content-Type': 'application/json'})

      const responseBody = { headers, method, url, body };

      response.write(JSON.stringify(responseBody));
      response.end();
      // Note: the 2 lines above could be replaced with this next one:
      // response.end(JSON.stringify(responseBody))

      // END OF NEW STUFF
    });
}).listen(8080);
