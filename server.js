const path = require('path')

// встановлюємо express
const express = require('express')
const app = express()

// встановлюємо директорію для віддачі статичного контенту (каталог проекту)
app.use(express.static(__dirname))

// налаштовуємо роботу із шаблонізаотором
app.set('views', path.join(__dirname, '/static/views'))
app.set('view engine', 'pug')

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

// запускаємо аплікацію
app.listen(process.env.PORT || 8080)
