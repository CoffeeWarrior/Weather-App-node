
 const request = require("request");

var geocodeAddress = (address) => {
    return new Promise((resolve, reject) => {
        const encodedAddress = encodeURIComponent(address);
        request({
                url: `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}&key=AIzaSyDLXoBe7JOIawsui0JZARwlpjKS69E9BgQ`,
                json: true
            }, (error, response, body) => {                
                if(error){
                    reject('unable to connect to Google servers.');
                    
                } else if(body.status === "ZERO_RESULTS"){
                    reject("Unable to find that address. (Maybe check entry)")
                
                } else if(body.status === "OK"){        
                    resolve({
                        address: body.results[0].formatted_address,
                        latitude: body.results[0].geometry.location.lat,
                        longitude: body.results[0].geometry.location.lng
                    });
                }
            })
    })
}

geocodeAddress('19136').then((location) => {
    console.log(JSON.stringify(location, undefined, 4));
}, (errorMessage) => {
    console.log(errorMessage);
})

