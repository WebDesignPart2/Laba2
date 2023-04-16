const path = require('path')
const bodyParser = require('body-parser')
const flash = require('connect-flash')
const config = require('./config')
const session = require('express-session')

const appLocalsStringsMiddleware = require('./middlewares/app_locals')
const notFoundMiddleware = require('./middlewares/not_found')
const errorMiddleware = require('./middlewares/error')

// встановлюємо express
const express = require('express')
const app = express()

// встановлюємо директорію для віддачі статичного контенту (каталог проекту)
app.use(express.static(__dirname))

app.use(session({
  secret: 'secret',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}))
app.use(flash())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

// налаштовуємо роботу із шаблонізаотором
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'pug')


app.use(appLocalsStringsMiddleware)

// налаштовуємо маршрутизацію
app.get('/', function (_request, response) {
  response.render('pages/index', { title: 'Home' })
})

//кастомні роути
app.get('/port', function (_request, response) {
  response.render('pages/port', { title: 'Port' })
})
app.get('/ship', function (_request, response) {
  response.render('pages/ship', { title: 'Ships' })
})
app.get('/pier', function (_request, response) {
  response.render('pages/pier', { title: 'Piers' })
})
app.get('/shipInPort', function (_request, response) {
  response.render('pages/shipInPort', { title: 'ShipInPort' })
})

app.use(notFoundMiddleware)
app.use(errorMiddleware)

// запускаємо аплікацію
const { host, port } = config
app.listen(port, host, () => {
  console.log(`Server running at http://${host}:${port}/`)
})
