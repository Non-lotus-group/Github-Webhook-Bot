"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_fetch_1 = __importDefault(require("node-fetch"));
const crypto_1 = require("crypto");
const dotenv = require('dotenv').config();
const sigHashAlg = 'sha256';
const secret = (process.env.SECRET_TOKEN || Error(""));
let issueBody = require('./jsonBody.json');
let NewissueBody = JSON.stringify(issueBody);
const hmac = (0, crypto_1.createHmac)(sigHashAlg, secret);
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
(0, node_fetch_1.default)(process.env.MY_OWN_SERVER || "", options)
    .then(res => res.json())
    .then(res => console.log(res))
    .catch(err => console.log(err));
