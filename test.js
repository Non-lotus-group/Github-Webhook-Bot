const  fetch = require("node-fetch");


//POST request with body equal on data in JSON format
fetch('https://open.feishu.cn/open-apis/bot/v2/hook/43a6526a-7589-4f5f-ad6a-83f8c569d71c', {
  method: 'POST',
  headers: {
    'Content-Type': "application/json; charset=utf-8",
  },
  body:"cool" 
})
.then((response) => response.json())
//Then with the data from the response in JSON...
.then((data) => {
  console.log('Success:', data);
})
//Then with the error genereted...
.catch((error) => {
  console.error('Error:', error);
});