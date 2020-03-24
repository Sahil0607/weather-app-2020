const request = require('request');

const geocode = (address, callback) => {
    const geocodeURL = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoiMDAxNXNhaGlsIiwiYSI6ImNrMWJrZmF2dzA0cWkzY21xNzhyMnB5bHgifQ.7dOlderUvnXHK6fNM81d0w&limit=1';

    request({url : geocodeURL, json:true}, (error, { body }) => {
        if (error) {
            callback('Could not found request', undefined);
        } 
        else if (body.features.length === 0) {
            callback('unable to find the location, Plaese find another search', undefined);
        }
        else {
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            });
        }
    }); 
}

module.exports = geocode;