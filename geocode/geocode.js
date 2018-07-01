    const request = require("request");

    const geocodeAddress = (address, callback) => {
        const encodedAddress = encodeURIComponent(address);

        console.log(encodedAddress);
        request({
            url: `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}&key=AIzaSyDLXoBe7JOIawsui0JZARwlpjKS69E9BgQ`,
            json: true
        }, (error, response, body)=>{

            if(error){
                callback('unable to connect to Google servers.');
                
            } else if(body.status === "ZERO_RESULTS"){
                callback("Unable to find that address. (Maybe check entry)")
            
            } else if(body.status === "OK"){        
                callback(null, {
                    address: body.results[0].formatted_address,
                    latitude: body.results[0].geometry.location.lat,
                    longitude: body.results[0].geometry.location.lng
                });
            }
        });
    }

    module.exports = {
        geocodeAddress
    }