const request = require('request')

const geocode = (address, callback) => {

    const geoCodingurl = `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?access_token=pk.eyJ1Ijoidml2ZWttYW5hdmFsYW4iLCJhIjoiY2ttZnVkMGhlMHVtODJ3cHBpdWR4dTBudiJ9.MQcDleAxIb8vidEJzhwjEg&limit=1`

    request({url: geoCodingurl, json:true}, (error,response) => {
            if(error){
                callback('unable to connect to weather service', undefined)
            }
            else if(response.body.message || response.body.features.length==0){
                
                callback('unable to find the location', undefined)
            }
            else {
            const lat = response.body.features[0].center[0]
            const longtitude = response.body.features[0].center[1]
            const location = response.body.features[0].place_name
            //console.log(`latitude: ${lat}, longitude: ${longtitude}`)
            callback(undefined, [lat,longtitude, location])
            }
        })
        

}

module.exports = geocode