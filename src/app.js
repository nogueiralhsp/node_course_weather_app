// Source Code: lib/path.js
// The path module provides utilities for working with file and directory paths. It can be accessed using:
// const path = require('path');
const path = require('path')

const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const express = require('express')
const hbs = require('hbs')

const app = express ()
const port = process.env.PORT || 3000


//Define paths for express config
const publicDirectoryPath = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')
// __dirname is the path where the app.js lives in!!!


//Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)

//Setup static directory to server
app.use(express.static(publicDirectoryPath))


app.get('',(req,res) =>{
     res.render('index',{
          title: 'Weather',
          name: 'Henrique Nogueira'
     })
})


app.get('/about', (req,res) => {
     res.render ('about',{
          title: 'About Me',
          name: 'Henrique Nogueira'

     })

})

app.get('/weather', (req,res) => {

     if (!req.query.address){
          return res.send ({
               error: 'You must provide a search term'
          })
     }

     geocode (req.query.address, ( error,{longitude,latitude,location} ={})=>{
          if(error){
               return res.send({error})
          }
     
          forecast(latitude,longitude, 'm',(error,forecastData) => {
               if (error) { 
                    return res.send ({error})
               }

               res.send({
                    forecastData,
                    location,
                    address:req.query.address
               })
          })
     
     })

     // res.send ({
     //      forcast: 'vai chover',
     //      location: 'ubachuva',
     //      address: req.query.address
     // })

})

app.get('/products', (req, res)=>{

     if(!req.query.search){
          return res.send({
               error: 'You must provide a search term'
          })
     }


     res.send({
          product:[]
     })
})

app.get('/help', (req,res) => {
     res.render ('help',{
          title: 'Help',
          helpText:"don't folow me, I'm lost too || just for now =)",
          name: 'Henrique Nogueira'
     })

})
app.get ('/help/*',(req, res)=>{
     res.render('404',{
          title: '404',
          errorMessage: 'Help article not found.',
          name: 'Henrique Nogueira'
     })
})

app.get ('*',(req, res)=>{
     res.render('404',{
          title: '404',
          errorMessage: 'Page not found.',
          name: 'Henrique Nogueira'
     })
})

app.listen(port, () => { //localhost:3000

console.log('Server is up on port 3000\nlocalhost:'+port)

})