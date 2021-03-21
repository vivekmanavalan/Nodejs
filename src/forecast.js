const request = require('request')

const forecast = (address, callback) => {

const url = `http://api.weatherstack.com/current?access_key=b245efce374d40aa1a2d0936acda744d&query=${address[1]},${address[1]}`

request({url : url, json:true}, (error,response) => {
    if(error){
        callback('unable to reach weather API service',undefined)
    }
    else if(response.body.error){
        callback('unable to find the location',undefined)
    }
    else{
    const data = response.body
    callback( undefined, [data.current.temperature,data.current.feelslike])
    }
})

}

module.exports=forecast