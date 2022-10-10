const fetch = require("node-fetch");
const dotenv = require('dotenv').config();
const options = {
    method: 'POST',
    headers: {
        Accept: '*/*',
        'content-type': 'application/json',
        'User-Agent': 'GitHub-Hookshot/abbd694',
        'X-GitHub-Delivery': 'a6a6f9f0-38aa-11ed-9e73-8818e4c5d9e6',
        'X-GitHub-Event': 'issues',
        'X-GitHub-Hook-ID': '380153562',
        'X-GitHub-Hook-Installation-Target-ID': '113896552',
        'X-GitHub-Hook-Installation-Target-Type': 'organization'
    },
    "body": "{\n  \"action\": \"opened\",\n  \"issue\": {\n    \"title\": \"yourself's issue\"\n  },\n  \"repository\": {\n    \"full_name\": \"repo's name\"\n  },\n  \"sender\": {\n    \"login\": \"yourself\"\n\n  }\n}"
};

fetch(process.env.MY_OWN_SERVER, options)
    .then(response => response.json())
    .then(response => console.log("") /**response */)
    .catch(err => console.error(err));


