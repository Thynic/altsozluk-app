const path = require('path')
const express = require('express')
const hbs = require('hbs')

const app = express()
const port = process.env.PORT || 3000

//paths
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//handlers
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)


//setup static directory
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Alt Sözlük',
        name: 'Thynic'
    })
})

app.get('/about', (req,res) => {
    res.render('about', {
        title: 'Hakkında',
        name: 'Thynic'
    })
})

app.get('/help', (req,res) => {
    res.render('help', {
        message: '',
        title: 'Yardım',
        name: 'Thynic'
    })
})

app.listen(port, () => {
    console.log('server is up on port ' + port)
})