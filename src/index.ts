import dotenv from 'dotenv';
dotenv.config();
import crypto from 'crypto';
import http from 'http';
import { GithubEventType, githubEventTypes } from './types';
import * as postFunction from './postModule';
import type { PushEvent, CreateEvent, DeleteEvent, IssuesEvent, IssueCommentEvent, } from '@octokit/webhooks-types/schema';



const sigHashAlg = 'sha256';
const secret: string = (process.env.SECRET_TOKEN || Error("environment variables SECRET_TOKEN failure")) as string;



http.createServer((request, response) => {
    const { headers } = request;
    const body: Uint8Array[] = [];
    request.on('error', (err) => {
        console.error(err);
    })
    request.on('data', (chunk: Uint8Array) => {
        body.push(chunk);
    })
    request.on('end', () => {
        let stringBody = "";
        stringBody = Buffer.concat(body).toString();
        const jsonBody: any = JSON.parse(stringBody);
        if (!githubEventTypes.includes((headers["x-github-event"] as GithubEventType))) {
            response.statusCode = 400;
            console.error("error: github event type not supported");
            response.end();
            return;
        }
        const eventType: GithubEventType = headers["x-github-event"] as GithubEventType;
        const githubSigName = headers['x-hub-signature-256'];
        const organization = jsonBody.repository.full_name;
        console.log(secret);
        const hmac = crypto.createHmac(sigHashAlg, secret)
        const digest = Buffer.from(sigHashAlg + '=' + hmac.update(stringBody).digest('hex'), 'utf8').toString();
        if (digest !== githubSigName) {
            response.statusCode = 401;
            response.end();
        }
        else (console.log('password is correct'));
        try {//main logic
            const issuesHandler = () => {
                console.log('issues event');
                const { action, issue, sender } = (jsonBody as IssuesEvent);
                postFunction.sendIssue(
                    organization,
                    action,
                    sender.login,
                    issue.title,
                    issue.comments_url,

                );
            }
            const issueCommentHandler = () => {
                console.log('issue comment event');
                const { action, issue, comment, sender } = (jsonBody as IssueCommentEvent);
                postFunction.sendIssueComment(
                    organization,
                    action,
                    sender.login,
                    issue.title,
                    comment.body,
                    issue.comments_url
                );
            }
            const createHandler = () => {
                console.log('create event or delete event');
                const { ref_type, } = (jsonBody as CreateEvent | DeleteEvent);
                postFunction.sendDeleteAneCreate(
                    organization,
                    ref_type,
                    eventType,
                );


            }
            const pushHandler = () => {
                console.log('push event');
                const { ref, head_commit, commits, sender } = (jsonBody as PushEvent);
                let commitsMsg = commits[0].message;
                if (commits.length > 1) {
                    commitsMsg = commits.map(function (element) {
                        return [element.message].join('\n');
                    }).join('\n');
                }
                postFunction.sendPush(
                    organization,
                    ref,
                    sender.login,
                    commitsMsg,
                    head_commit?.url?.toString() || "",
                );
            }
            type GithubMsgHandlerType = {
                [key in string]: () => void;
            }
            const handler: GithubMsgHandlerType = {
                'issues': issuesHandler,
                'issue_comment': issueCommentHandler,
                'create': createHandler,
                'delete': createHandler,
                'push': pushHandler,
            }
            handler[eventType]();
            response.on('error', (err) => {
                console.error(err);
            });
            response.statusCode = 200;
            response.setHeader('Content-Type', 'application/json');
            response.write(JSON.stringify({ 'status': 'ok' }));
            response.end();
        } catch (error) {
            console.error(error);
        }
    })
}).listen(8080);
