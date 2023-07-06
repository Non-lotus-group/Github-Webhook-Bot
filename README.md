# About
the **bot-github-2-feishu** listen github webhook event,analysis webhook payload and send a shorter missege to FEISGH bot.
# Install
1.Clone this repository `git clone git@github.com:Gensokyo-web3/bot-github-2-feishu.git`

2.Install all requirements `npm install`
# Config
1.add a `.env` file into project folder   
2.add 3 variable in `.env`:  
```
FEISHU_WEBHOOK_URL=https://open.feishu.cn/open-apis/bot/v2/hook/XXXXXXXXXXXX
MY_OWN_SERVER=http://XXXXXXXX
SECRET_TOKEN=XXXXXXXX
```
- `FEISHU_WEBHOOK_URL ` [can be checked from bot's information in your feishu group](https://www.feishu.cn/hc/zh-CN/articles/244506653275)  
- `MY_OWN_SERVER` is your server's URL like: `http://your-own-server:8080` 
- `SECRET_TOKEN` [is used for security settings to protect your bot from external attack](https://docs.github.com/cn/developers/webhooks-and-events/webhooks/securing-your-webhooks)
# Start
```shell
$ ts-node src/index.ts
```
# Test
```shell
$ ts-node src/test.ts
```
