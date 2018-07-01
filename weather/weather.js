
    const request = require("request");
    
    const getWeather = (lat, lng, callback) => {
        request({
            url: `https://api.darksky.net/forecast/d9c81bd826ebde0b38d6874ab945cc0d/${lat},${lng}`,
            json: true
        }, (error, response, body) => {
            if(!error && response.statusCode === 200){
                callback(null, {
                    temperature: body.currently.temperature,
                    apparentTemperature: body.currently.apparentTemperature
                });
            
            } else {
                callback(error);
            }
        })
    }

    module.exports = {
        getWeather
    }