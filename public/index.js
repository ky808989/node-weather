const express = require('express')
const path = require('path')
const hbs = require('hbs')
const geocode = require('../goecode.js')
const weather = require('../weather.js')

const app = express()
console.log(__dirname)

app.set('view engine', 'hbs')
app.set('views', __dirname + '/templates/views')
hbs.registerPartials(__dirname + '/templates/partials')

app.use(express.static(__dirname))

app.get('', (req, res) => {
    res.render('index', {
        title: 'About this app',
        name: 'Peter',
        content: 'Enter a location below to search it\'s current weather.'
    })
})

app.get('/weather', (req, res) => {
    let info = {title: 'Weather' , content:'Weather Info:' , contentInfo: '' , name: 'Peter'}
    if (!req.query.search) {
        info.contentInfo = {name: 'Please provide a location for searching'}
        res.send(info)
    } else {
        geocode(req.query.search, (geoErr, geoRes) => {
            if (geoErr) {
                info.contentInfo = {name:geoErr}
                res.send(info)
            } else {
                weather(geoRes.longitude, geoRes.latitude, (weaErr, weaRes) => {
                    if(weaErr){
                        info.contentInfo = {name: weaErr}
                        res.send(info)
                    }else{
                        info.contentInfo = weaRes
                        res.send(info)
                    }
                })
            }
        })
        // res.render('index', {
        //     title: 'Weather',
        //     content: 'Weather Info:',
        //     address: req.query.search,
        //     name: 'Peter'
        // })
    }
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About this app',
        name: 'Peter',
        content: 'There is no content at this moment'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'Peter',
        content: 'none'
    })
})

app.get('/help/*', (req, res) => {
    res.render('error', {
        title: 'help not found.',
        name: 'Peter',
        content: 'help not found for this content.'
    })
})

app.get('*', (req, res) => {
    res.render('error', {
        title: 'Page not found.',
        name: 'Peter',
        content: 'Page not found for this content.'
    })
})

app.listen(3000, () => {
    console.log('App started.')
})