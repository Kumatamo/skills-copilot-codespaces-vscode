// create web server
const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const port = 3000

// set body parser
app.use(bodyParser.urlencoded({ extended: true }))

// set view engine
app.set('view engine', 'pug')

// set static files
app.use(express.static('public'))

// set routes
app.use('/', require('./routes/home'))
app.use('/comments', require('./routes/comments'))

// listen to the port
app.listen(port, () => {
  console.log(`Express is listening on localhost:${port}`)
})