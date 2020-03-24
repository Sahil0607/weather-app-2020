const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();

// Path Directory
const publicDirectoryPath = path.join(__dirname, '../public');
const viewPath = path.join(__dirname, '../templates/views');
const partialPath = path.join(__dirname, '../templates/partials');

// Setup hendlebars engine and views loctions
app.set('view engine', 'hbs');
app.set('views', viewPath);
hbs.registerPartials(partialPath);

// Set up static directory serve || Load first when run 
app.use(express.static(publicDirectoryPath));

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Sahil Weather App'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Page',
        name: 'Sahil About'
    });
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help Page',
        content: 'This is bold text which is goes to help page',
        name: 'Sahil Help'
    });
});

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: 'Help 404 Page',
        error: 'Help 404 Page not found',
        name: 'Footer for 404 page'
    });
});

app.get('/weather', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'Query not found'
        });
    }

    geocode(req.query.search, (error, {longitude, latitude, location} = {}) => {
        if (error) {
           return res.send({
               error: error
           });
        } 
        forecast(longitude, latitude, (error, data) => {
            if (error) {
                return res.send({
                    error: error
                });
            }
            res.send({
                forecast: data,
                location: location
             });
        })
    });

    
});

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'Query not found'
        });
    }

    console.log(req.query.search);
    res.send({
        products: []
    });
});

app.get('*', (req, res) => {
    res.render('404', {
        title: '404 Page',
        error: 'Page Not Found',
        name: 'Footer for 404 page'
    });
});

app.listen(3000, () => {
    console.log('Server is up on port 3000');
});



 