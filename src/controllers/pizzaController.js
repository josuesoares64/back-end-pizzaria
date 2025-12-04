const Pizza = require('../models/Pizzas');

exports.getAll = async (req, res) => {
    try {
        const pizzas = await Pizza.findAll();
        res.json(pizzas);
    } catch (error) {
        console.error("Erro ao listar pizzas:", error);
        res.status(500).json({ error: "Erro ao listar pizzas." });
    }
};

exports.create = async (req, res) => {
    try {
        const { nome, descricao, preco_pequena, preco_media, preco_grande, preco_familia } = req.body;

        const imagem = req.file ? req.file.filename : null;

        const pizza = await Pizza.create({
            nome,
            descricao,
            imagem,
            preco_pequena,
            preco_media,
            preco_grande,
            preco_familia
        });

        res.status(201).json(pizza);
    } catch (error) {
        console.error("ERRO CRIANDO PIZZA:", error);
        res.status(500).json({ error: "Erro ao criar pizza." });
    }
};
