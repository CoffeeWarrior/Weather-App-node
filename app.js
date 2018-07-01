    //api-key:
    //d9c81bd826ebde0b38d6874ab945cc0d


    const yargs = require("yargs");
    const geocode = require("./geocode/geocode");
    const weather = require("./weather/weather");


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

        geocode.geocodeAddress(argv.address, (errorMessage, results) => {
            if(errorMessage){
                console.log(errorMessage);
            } else {
                weather.getWeather(results.latitude, results.longitude, (errorMessage, weatherResults) => {
                    if(errorMessage){
                        console.log(errorMessage);
                    } else {
                        console.log(`It's currently ${weatherResults.temperature} degrees Fahrenheight, but feels like ${weatherResults.apparentTemperature}`);
                    }
                });
            
            }

        });

