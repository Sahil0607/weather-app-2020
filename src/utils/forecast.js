const request = require('request');

const forecast = (longitude, latitude, callback) => {
    const url = 'https://api.darksky.net/forecast/d9c7461ed3f8f728f09906a03f241f5e/'+ latitude +',' + longitude + '?lang=en&units=si'; 

    request({url, json:true}, (error, { body }) => {
        if (error) {
            callback('Unable to connect with weather service', undefined);
        }
        else if (body.error) {
            callback('Unable to find the location', undefined);
        }
        else {
            callback(undefined, body.daily.data[0].summary + '. It is currently ' + body.currently.temperature + ' degrees out. There is ' + body.currently.precipProbability + '% chance of rain.')
        }
    });
}




module.exports = forecast;
