const express = require('express')
const hbs = require('hbs')
const app = express()
const path = require('path')
const geocode = require('./geocode')
const forecast = require('./forecast')

const publicDirectory = path.join(__dirname,'../public')
const viewpath = path.join(__dirname,'../templates/views')
const partialspath = path.join(__dirname,'../templates/partials')

//adding the env to run in heroku and 3000 to run in local.
const port = process.env.PORT || 3000
//configurations
//setting the hbs so that we can render header and footer common to all pages
app.set('view engine','hbs')
app.set('views', viewpath)
app.use(express.static(publicDirectory))
hbs.registerPartials(partialspath)


app.get('',(req,res) => {

    //render renders the html page named index as the view. The name index should be same name as the html file name
    res.render('index',{
        title: 'Home',
    })
})

app.get('/about',(req,res) => {

    res.render('about',{
        name: 'vivek',
        github: 'github.com/vivekmanavalan',
        twitter: 'twitter.com/vivekvivy'
    })
})

app.get('/weather',(req,res) => {
    if(!req.query.address){
        return res.render('404',{
            error: 'Please give a valid input'
        })
    }
    console.log(req.query.address)
    let search = req.query.address
    if(!search){
        return res.render('404',{
            error:'please provide a valid input'})
    }
    geocode(search,(error, data) => {
    if(error){
       
      return res.render('404',{error:error})
    }
    forecast([data[0], data[1] ], (error,forecastdata) => {
        if(error){
            return res.render('404',{
                error:error})
        }
            console.log(`${data[2]}`)
            res.send({temperature: forecastdata[0],
                forecast: forecastdata[1],
                location: data[2]
            })
        
    })
})
})

app.get('*',(req,res) => {

})

app.listen(port,()=>{
    console.log(`Server started in 3000 ${port}`)
})