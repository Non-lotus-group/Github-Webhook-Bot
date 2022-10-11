const fetch = require("node-fetch");
const dotenv = require('dotenv').config();
const options = {
    method: 'POST',
    headers: {
        Accept: '*/*',
        'content-type': 'application/json',
        'X-GitHub-Event': 'issues',
    },
    "body": "{\n  \"action\": \"opened\",\n  \"issue\": {\n    \"title\": \"yourself's issue\"\n  },\n  \"repository\": {\n    \"full_name\": \"repo's name\"\n  },\n  \"sender\": {\n    \"login\": \"yourself\"\n\n  }\n}"
};

fetch(process.env.MY_OWN_SERVER, options)
    .then(response => response.json())
    .then(response => console.log("") /**response */)
    .catch(err => console.error(err));


