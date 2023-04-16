'use strict'

const mongoose = require('mongoose')

let _db = null

module.exports = function () {
    const dbUrl = 'mongodb://localhost:27017'
    console.log(dbUrl)
    mongoose
        .connect(dbUrl, {
            useCreateIndex: true,
            useNewUrlParser: true
        })
        .catch(error => {
            console.error(error.message)
        }).finally(() => {
            console.log("good");
        })

    if (_db === null) {
        _db = mongoose.connection
    }

    return _db
}