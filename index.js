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
      messege.org=newBody.repository.full_name;
      messege.eve=myEvent;
      messege.sender=newBody.sender.login;
      //消息体
      if(myEvent=="issues"){
        messege.tit="11";
        messege.act="11";
        messege.sendIssue();
      }
      if(myEvent==="push"){
        
      } 
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
