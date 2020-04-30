const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode.js')
const forecast = require('./utils/forecast')


// console.log(__dirname)
// console.log(__filename)
// console.log(path.join(__dirname, '../html'))
const dir = path.join(__dirname, '../template')
const viewpath = path.join(__dirname, '../hbs/views')
const partialspath = path.join(__dirname, '../hbs/partials')

const app = express()

app.set('view engine', 'hbs')
app.set('views', viewpath)
hbs.registerPartials(partialspath)
app.use(express.static(dir))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Ritika Shenoy'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Ritika Shenoy'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'HELP????',
        name: 'Ritika Shenoy'
    })
})


// app.get('', (req, res) => {
//     res.send('Hello Express')

// })

// for help route
// app.get('/help', (req, res) => {
//     res.send('<h2>Do yo need any help!!</h2>')
// })

// for about route
// app.get('/about', (req, res) => {

//     res.send({
//         name: 'Ritika',
//         age: 20
//     })
// })

// for weather route
app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must enter address'
        })
    }
    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            return res.send({ error })
                // res.send('Error: ', error)
                // console.log('Error: ', error)
                // console.log('Data: ', data)
        }

        forecast(latitude, longitude, (error, forecastdata) => {
            if (error) {
                return res.send({ error })
                    // res.send('Error: ', error)
            }
            res.send({
                location,
                address: req.query.address,
                forecastdata,
                //  res.send({
                //     addresss
                // })


            })

        })

    })

})



app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Ritika',
        error: 'Help article not found'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404 Error',
        name: 'Ritika',
        error: 'page not found'
    })
})


app.listen(4000, () => {
    console.log('Server is started.')
})