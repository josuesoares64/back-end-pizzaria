const express = require('express');
const pizza = require('./pizzaRoutes');
const esfiha = require('./esfihaRouter')
const sobremesa = require('./SobremesasRouter')
const bebida = require('./bebidaRouter')
const busca = require('./buscaRoutes')

module.exports = (app) => {
    app.use(
        express.json(),
        pizza,
        esfiha,
        sobremesa,
        bebida,
        busca
    )
}