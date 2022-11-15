const Bot = require('feishu-webhook-bot');
const dotenv = require('dotenv').config();
const bot = new Bot(process.env.FEISHU_WEBHOOK_URL);
export function sendPush(organization: string, branch: string, sender: string, commit: string, commitUrl: string) {
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
    })
}
export function sendIssueComment(organization: string, action: string, sender: string, tittle: string, comment:string,pushUrl: string) {
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
    })
}
export function sendIssue(organization: string, action: string, sender: string, tittle: string,pushUrl: string) {
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
    })
}
export function sendDeleteAneCreate(organization:string, eventType: string, action: string) {
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
    })
}
