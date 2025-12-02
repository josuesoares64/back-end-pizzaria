const Pizza = require('../models/Pizzas');

//LISTAR TODAS
exports.getAll = async (req, res) => {
    try {
        const pizzas = await Pizza.findAll();
        res.json(pizzas);
    } catch (error) {
        // 🚨 Adicionado console.error para depuração
        console.error("❌ Erro ao listar pizzas:", error);
        res.status(500).json({ error: "Erro ao listar pizzas." });
    }
};

//CRIAR 
exports.create = async (req, res) => {
    try {
        // 1. O Multer (se usado na rota) adiciona o arquivo em req.file
        // O caminho dos dados é o que o Multer salvou no servidor
        const caminhoImagem = req.file ? req.file.path : null; 
        
        // 2. Os dados de texto (nome, descrição, preços) vêm de req.body
        const { nome, descricao, preco_pequena, preco_media, preco_grande, preco_familia } = req.body;
        
        // Assumindo que você tem vários campos de preço (como no seu modelo anterior)
        // Se o seu modelo só tem "preco", ajuste esta desestruturação e o objeto abaixo.

        // 3. Monta o objeto final para o Sequelize
        const pizza = await Pizza.create({
            nome,
            descricao,
            // 4. O campo 'imagem' no DB recebe o caminho do arquivo salvo no servidor
            imagem: caminhoImagem, 
            
            // Inclua todos os campos de preço que seu modelo espera:
            preco_pequena,
            preco_media,
            preco_grande,
            preco_familia
        });

        res.status(201).json(pizza);
    } catch (error) {
        // 🚨 Registra o erro detalhado do Sequelize no terminal.
        console.error("❌ ERRO DETALHADO AO CRIAR PIZZA:", error);
        res.status(500).json({ error: "Erro ao criar pizza." });
    }
}