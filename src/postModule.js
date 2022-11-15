"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendDeleteAneCreate = exports.sendIssue = exports.sendIssueComment = exports.sendPush = void 0;
const Bot = require('feishu-webhook-bot');
const dotenv = require('dotenv').config();
const bot = new Bot(process.env.FEISHU_WEBHOOK_URL);
function sendPush(organization, branch, sender, commit, commitUrl) {
    bot.sendRich({
        content: [
            [
                {
                    tag: 'text',
                    text: organization,
                },
                {
                    tag: 'text',
                    text: "   branch:"
                },
                {
                    tag: 'text',
                    text: branch,
                },
                {
                    tag: 'text',
                    text: " . ",
                },
                {
                    tag: 'text',
                    text: "push"
                },
            ],
            [
                {
                    tag: 'text',
                    text: "sender:"
                },
                {
                    tag: 'text',
                    text: sender,
                },
            ],
            [
                {
                    tag: 'text',
                    text: "Commit: \n"
                },
                {
                    tag: 'text',
                    text: commit,
                },
            ],
            [
                {
                    tag: 'text',
                    text: "URL:"
                },
                {
                    tag: 'a',
                    text: commitUrl,
                    href: commitUrl,
                },
            ]
        ]
    });
}
exports.sendPush = sendPush;
function sendIssueComment(organization, action, sender, tittle, comment, pushUrl) {
    bot.sendRich({
        content: [
            [
                {
                    tag: 'text',
                    text: organization,
                },
                {
                    tag: 'text',
                    text: "  issue_comment."
                },
                {
                    tag: 'text',
                    text: action,
                },
                {
                    tag: 'text',
                    text: "   Sender:"
                },
                {
                    tag: 'text',
                    text: sender,
                }
            ],
            [
                {
                    tag: 'text',
                    text: "Tittle:"
                },
                {
                    tag: 'text',
                    text: tittle,
                }
            ],
            [
                {
                    tag: 'text',
                    text: "comment: \n"
                },
                {
                    tag: 'text',
                    text: comment,
                }
            ],
            [
                {
                    tag: 'text',
                    text: "Url:"
                },
                {
                    tag: 'a',
                    text: pushUrl,
                    href: pushUrl,
                },
            ],
        ],
    });
}
exports.sendIssueComment = sendIssueComment;
function sendIssue(organization, action, sender, tittle, pushUrl) {
    bot.sendRich({
        content: [
            [
                {
                    tag: 'text',
                    text: organization,
                },
                {
                    tag: 'text',
                    text: "  issue."
                },
                {
                    tag: 'text',
                    text: action,
                },
                {
                    tag: 'text',
                    text: "   Sender:"
                },
                {
                    tag: 'text',
                    text: sender,
                }
            ],
            [
                {
                    tag: 'text',
                    text: "Tittle:"
                },
                {
                    tag: 'text',
                    text: tittle,
                }
            ],
            [
                {
                    tag: 'text',
                    text: "Url:"
                },
                {
                    tag: 'a',
                    text: pushUrl,
                    href: pushUrl,
                },
            ],
        ],
    });
}
exports.sendIssue = sendIssue;
function sendDeleteAneCreate(organization, eventType, action) {
    bot.sendRich({
        content: [
            [
                {
                    tag: 'text',
                    text: organization,
                },
                {
                    tag: 'text',
                    text: "   "
                },
                {
                    tag: 'text',
                    text: eventType,
                },
                {
                    tag: 'text',
                    text: "."
                },
                {
                    tag: 'text',
                    text: action,
                },
            ],
        ],
    });
}
exports.sendDeleteAneCreate = sendDeleteAneCreate;
