const express = require('express')
const app = express();
const Joi = require('joi')
const log = require('./middleware/logger')
const authenticate = require('./middleware/authenticate')
const helmet = require('helmet')
const morgan = require('morgan')
const config = require('config')
const startupDebugger = require('debug')('app:startup')
const dbDebugger = require('debug')('app:db')
const courses = require('./routes/courses')
const home = require('./routes/home')

app.set('view engine', 'pug')
app.set('views', './views')

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static('public'))
app.use(helmet())
app.use('/api/courses', courses)
app.use('/', home)

// Configuration
console.log('Application Name: ' + config.get('name'))
console.log('Application Name: ' + config.get('mail.host'))
console.log('Application Name: ' + config.get('mail.password'))

if (app.get('env') === 'development'){
    app.use(morgan('tiny'))
    startupDebugger('Morgan enabled...')
}



app.use(log)
app.use(authenticate)

console.log(`Node Env: ${process.env.NODE_ENV}`)




// PORT 
console.log(process.env.PORT)
const port = process.env.PORT || 3000
app.listen(port, () => console.log(`Listening on Port ${port}...`))

