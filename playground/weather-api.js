const request = require('request');
const fs = require('fs');
var key = JSON.parse(fs.readFileSync('Google-API.json'));

request({
    url: `https://api.darksky.net/forecast/${key.darkskykey}/39.9396284,-75.186639599999999`,
    json: true
}, (error, response, body) => {
    if(!error && response.statusCode === 200) {
        console.log(body.currently.temperature);
    } else {
        console.log('Unable to fetch weather');
    }
});