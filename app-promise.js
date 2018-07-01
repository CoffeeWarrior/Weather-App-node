    //api-key:
    //d9c81bd826ebde0b38d6874ab945cc0d

    const axios = require('axios');
    const yargs = require("yargs");


    const argv = yargs
        .options({
            a: {
                demand: true,
                alias: "address",
                describe: "address to fetch weather for",
                string: true
            }
        })
        .help()
        .alias("help", "h")
        .argv;

        const encodedAddress = encodeURIComponent(argv.address);
        const geocodeURL = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}&key=AIzaSyDLXoBe7JOIawsui0JZARwlpjKS69E9BgQ`;

        axios.get(geocodeURL).then((response) => {
            if(response.data.status === "ZERO_RESULTS"){
                throw new Error('Unable to find that address.')
            }

            const lat = response.data.results[0].geometry.location.lat;
            const lng = response.data.results[0].geometry.location.lng;

            const weatherURL =  `https://api.darksky.net/forecast/d9c81bd826ebde0b38d6874ab945cc0d/${lat},${lng}`;
            console.log(response.data.results[0].formatted_address);
            return axios.get(weatherURL).then((response) => {
                const temperature = response.data.currently.temperature;
                const apparentTemperature = response.data.currently.apparentTemperature;

                console.log(`It's currently ${temperature}, but feels like ${apparentTemperature}`);
            })
        }).catch((e) => {
            if(e.code === 'ENOTFOUND'){
                console.log('unable to connect to API servers');
            } else {
                console.log(e.message)
            }
        })
