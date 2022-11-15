import fetch from 'node-fetch';
import { createHmac } from 'crypto';
const dotenv = require('dotenv').config();
const sigHashAlg = 'sha256';
const secret: string = (process.env.SECRET_TOKEN || Error("")) as string;
let issueBody = require('./jsonBody.json');
let NewissueBody = JSON.stringify(issueBody);
const hmac = createHmac(sigHashAlg, secret);
const sigHeadName = Buffer.from(sigHashAlg + '=' + hmac.update(NewissueBody).digest('hex'), 'utf8').toString();
console.log(sigHeadName);
const options = {
    method: 'POST',
    headers: {
        Accept: '*/*',
        'content-type': 'application/json',
        'X-GitHub-Event': 'push',
        'x-hub-signature-256': sigHeadName
    },
    "body": NewissueBody
};
fetch(process.env.MY_OWN_SERVER || "", options)
    .then(res => res.json())
    .then(res => console.log(res))
    .catch(err => console.log(err)); 