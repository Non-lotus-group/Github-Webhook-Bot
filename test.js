const fetch = require("node-fetch");
const crypto =require('crypto');
const dotenv = require('dotenv').config();
const sigHashAlg = 'sha256';
const secret = process.env.SECRET_TOKEN;
let  sigHeaderName;
const push_body="{\n  \"action\": \"opened\",\n  \"issue\": {\n    \"title\": \"yourself's issue\"\n  },\n  \"repository\": {\n    \"full_name\": \"repo's name\"\n  },\n  \"sender\": {\n    \"login\": \"yourself\"\n\n  }\n}"
let hmac = crypto.createHmac(sigHashAlg, secret);
sigHeaderName =Buffer.from(sigHashAlg + '=' + hmac.update(push_body).digest('hex'), 'utf8').toString();
const options = {
    method: 'POST',
    headers: {
        Accept: '*/*',
        'content-type': 'application/json',
        'X-GitHub-Event': 'issues',
        'x-hub-signature-256':sigHeaderName
    },
    "body": "{\n  \"action\": \"opened\",\n  \"issue\": {\n    \"title\": \"yourself's issue\"\n  },\n  \"repository\": {\n    \"full_name\": \"repo's name\"\n  },\n  \"sender\": {\n    \"login\": \"yourself\"\n\n  }\n}"
};

fetch(process.env.MY_OWN_SERVER, options)
    .then(response => response.json())
    .then(response => console.log("") /**response */)
    .catch(err => console.error(err));


