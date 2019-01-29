const request = require('request');
const fs = require('fs');

var geocodeAddress = (address) => {
    var encodedAddress = encodeURIComponent(address);
    var key = JSON.parse(fs.readFileSync('Google-API.json'));
    return new Promise((resolve, reject) => {
        request({
            url :   `https://maps.googleapis.com/maps/api/geocode/json?key=${key.googlemapskey}&address=${encodedAddress}`,
            json    :   true
        }, (error, response, body) => {
            // console.log(JSON.stringify(body, undefined, 2));
            if(error){
                reject("Unable to connect to Google servers");
            } else if(body.status === 'ZERO_RESULTS') {
                reject('Unable to find that address');
            } else if(body.status === 'OK') {
                resolve({
                    address :   body.results[0].formatted_address,
                    latitude:   body.results[0].geometry.location.lat,
                    longitude:  body.results[0].geometry.location.lng
                });
            }
        });
    })
};

geocodeAddress('19146').then((location) => {
    console.log(JSON.stringify(location.address, undefined, 2));
}, (errorMessage) => {
    console.log(errorMessage);
});