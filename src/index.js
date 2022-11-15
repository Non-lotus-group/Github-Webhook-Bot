"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const crypto_1 = __importDefault(require("crypto"));
const http_1 = __importDefault(require("http"));
const types_1 = require("./types");
const postFunction = __importStar(require("./postModule"));
const sigHashAlg = 'sha256';
const secret = (process.env.SECRET_TOKEN || Error(""));
console.log('you have access the server');
http_1.default.createServer((request, response) => {
    const { headers } = request;
    let body = new Array();
    request.on('error', (err) => {
        console.error(err);
    });
    request.on('data', (chunk) => {
        body.push(chunk);
    });
    request.on('end', () => {
        let stringBody = "";
        stringBody = Buffer.concat(body).toString();
        let jsonBody = JSON.parse(stringBody);
        if (!types_1.githubEventTypes.includes(headers["x-github-event"])) {
            response.statusCode = 400;
            console.error("error: github event type not supported");
            response.end();
            return;
        }
        let eventType = headers["x-github-event"];
        let githubSigName = headers['x-hub-signature-256'];
        let organization = jsonBody.repository.full_name;
        let sender = jsonBody.sender.login;
        let hmac = crypto_1.default.createHmac(sigHashAlg, secret);
        let digest = Buffer.from(sigHashAlg + '=' + hmac.update(stringBody).digest('hex'), 'utf8').toString();
        if (digest !== githubSigName) {
            response.statusCode = 401;
            response.end();
        }
        else
            (console.log('password is correct'));
        try { //main logic
            const issuesHandler = () => {
                console.log('issues event');
                const { action, issue, sender } = jsonBody;
                postFunction.sendIssue(organization, action, sender.login, issue.title, issue.comments_url);
            };
            const issueCommentHandler = () => {
                console.log('issue comment event');
                const { action, issue, comment, sender } = jsonBody;
                postFunction.sendIssueComment(organization, action, sender.login, issue.title, comment.body, issue.comments_url);
            };
            const createHandler = () => {
                console.log('create event or delete event');
                const { ref_type, } = jsonBody;
                postFunction.sendDeleteAneCreate(organization, ref_type, eventType);
            };
            const pushHandler = () => {
                console.log('push event');
                const { ref, head_commit, commits, sender } = jsonBody;
                let commitsMsg = commits[0].message;
                if (commits.length > 1) {
                    commitsMsg = commits.map(function (element) {
                        return [element.message].join('\n');
                    }).join('\n');
                }
                postFunction.sendPush(organization, ref, sender.login, commitsMsg, head_commit?.url?.toString() || "");
            };
            const handler = {
                'issues': issuesHandler,
                'issue_comment': issueCommentHandler,
                'create': createHandler,
                'delete': createHandler,
                'push': pushHandler,
            };
            handler[eventType]();
            response.on('error', (err) => {
                console.error(err);
            });
            response.statusCode = 200;
            response.setHeader('Content-Type', 'application/json');
            response.write(JSON.stringify({ 'status': 'ok' }));
            response.end();
        }
        catch (error) {
            console.error(error);
        }
    });
}).listen(8080);
