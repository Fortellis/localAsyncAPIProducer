const express = require('express');

const app = express();

const fs = require('fs');

const request = require('request');


fs.watchFile('./payload.json', function(event, filename){
    console.log('event is ' + event);
    if(filename){
        console.log('filename provided: ' + filename);
        fs.readFile('./payload.json', 'utf-8', function(err, data){
            const arrayOfObjects = JSON.parse(data);
            console.log(arrayOfObjects);
            const sendUpdatedData = () => {
                const serverOptions = {
                    uri: 'https://webhook.site/daf0b27e-8a41-45c5-a791-cdef0051895b',
                    body: JSON.stringify(arrayOfObjects),
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                };
                request(serverOptions, function (error, response){
                    console.log(error, response.body);
                    return;
                });
            }
            sendUpdatedData();
        });
    }else {
        console.log('filename not provided');
    }
});

app.listen(5000, '127.0.0.1');

console.log("Node server running on port 3000");
