const express = require('express');
const pizza = require('./pizzaRoutes');
const esfiha = require('./esfihaRouter')

module.exports = (app) => {
    app.use(
        express.json(),
        pizza,
        esfiha
    )
}