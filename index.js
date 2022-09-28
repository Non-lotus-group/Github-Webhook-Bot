const http = require('http');
const Bot= require('feishu-webhook-bot');
const { title } = require('process');
const { text } = require('express');
const { debug } = require('console');
const dotenv = require('dotenv');

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
    // BEGINNING OF NEW STUFF
    /* 在这里执行一次post请求给机器人 */
    let newBody= JSON.parse(body);
    const bot = new Bot(
      process.env.feishu-webhookURL//url like:https://open.feishu.cn/open-apis/bot/v2/hook/XXXXXXX
  );
  

  let myEvent = myHeaders["x-github-event"];
  

  let myURL;
  let myMessage;
  if(myEvent==="push"){
    bot.sendRich({

      content: [
        [//第一行
        {
          tag:"text",
          text:"["
        },
          {//全名
            tag: "text",
            text:newBody.repository.full_name
          },
          {
            tag:"text",
            text:"]    "
  
          },
          {
            tag:"text",
            text:"    "
  
          },
          {//事件和信息
            tag:"text",
            text:myHeaders["x-github-event"],
          },
          {
            tag:"text",
            text:"    size"
          },
          {
            tag:"text",
            text:newBody.repository.size,
          },
        ],
  
        [//第二行
          {//事件的URL
            tag: "a",
            href: newBody.head_commit.url,
            text: newBody.head_commit.url,
          },
        ],
        [//第三行

        {
          tag:"text",
          text:newBody.head_commit.message,
        }, 
        {
          tag:"text",
          text:"by-"
        },
        {//事件发起人
          tag:"text",
          text:newBody.sender.login,
        }
      ],
  
      ],
    }); //发送富文本模板
  }
  if(myEvent==="issues" || myEvent==="issue_comment"){
    bot.sendRich({

      content: [
        [//第一行
        {
          tag:"text",
          text:"["
        },
          {//全名
            tag: "text",
            text:newBody.repository.full_name
          },
          {
            tag:"text",
            text:"]    "
  
          },
          {
            tag:"text",
            text:"    "
  
          },
          {//事件和信息
            tag:"text",
            text:myHeaders["x-github-event"],
          },
          {
            tag:"text",
            text:"."
          },
          {
            tag:"text",
            text:newBody.action,
          },
        ],
  
        [//第二行
          {//事件的URL
            tag: "a",
            href: newBody.issue.url,
            text: newBody.issue.url,
          },
        ],
        [//第三行
        {
          tag:"text",
          text:newBody.issue.title,
        }, 
        {//事件发起人的留言
          tag:"text",
          text:"    "
        },
        {
          tag:"text",
          text:ewBody.issue.body,
        }, 
        {
          tag:"text",
          text:"by-"
        },
        {//事件发起人
          tag:"text",
          text:newBody.sender.login,
        }
      ],
  
      ],
    }); //发送富文本模板
  }
  if(myEvent==="create" || myEvent==="delete"){
    bot.sendRich({

      content: [
        [//第一行
        {
          tag:"text",
          text:"["
        },
          {//全名
            tag: "text",
            text:newBody.repository.full_name
          },
          {
            tag:"text",
            text:"]    "
  
          },
          {
            tag:"text",
            text:"    "
  
          },
          {//事件和信息
            tag:"text",
            text:newBody.ref_type,
          },
          {
            tag:"text",
            text:":"
          },
          {
            tag:"text",
            text:newBody.ref,
          },
          {
            tag:"text",
            text:"."
          },
          {
            tag:"text",
            text:myEvent
          },
        ],
      ]
    });
  }
  if(myEvent==="organization"){
    bot.sendRich({
      content: [
        [//第一行
        {
          tag:"text",
          text:"["
        },
          {//全名
            tag: "text",
            text:newBody.repository.full_name
          },
          {
            tag:"text",
            text:"]    "
  
          },
          {//事件和信息
            tag:"text",
            text:myHeaders["x-github-event"],
          },
          {
              tag:"text",
              text:"."
            },
            {
              tag:"text",
              text:newBody.action,
            },
      ]
  ]
  
    }); 
  }
/*    if(myHeaders["x-github-event"]==="push"){
    console.log(newBody.head_commit.url);
    myURL=newBody.head_commit.url;
    myMessage=newBody.head_commit.message;

  }
  if(myHeaders["x-github-event"]==="issues"){
    console.log(newBody.issue.url);
    myURL=newBody.issue.url;
    myMessage=newBody.issue.body;
    console.log(myMessage);
  } 
   
  bot.sendRich({//此方法包含push与issue事件
    content: [
      [//第一行
      {
        tag:"text",
        text:"org:"

      },
        {//组织
          tag: "text",
          text:newBody.organization.login,
        },
        {//空格占位
          tag:"text",
          text:"    "

        },
        {//全名
          tag:"text",
          text:newBody.repository.full_name,
        },
        {
          tag:"text",
          text:"    "

        },
        {//事件和信息
          tag:"text",
          text:myEvent,
        },
      ],

      [//第二行
        {//事件的URL
          tag: "a",
          href: myURL,
          text: myURL,
        },
      ],
      [//第三行
      {
        tag:"text",
        text:myMessage,
      }, 
      {//事件发起人的留言
        tag:"text",
        text:"    "
      },

      {
        tag:"text",
        text:"by-"
      },
      {//事件发起人
        tag:"text",
        text:newBody.sender.login,
      }
    ],

    ],
  });   */
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
