class Controller {
    constructor(entidadeService) {
        this.entidadeService = entidadeService; // corrigido
    }

    async pegaTodos(req, res) {
        try {
            const listaDeProduto = await this.entidadeService.pegaTodosOsProdutos();
            return res.status(200).json(listaDeProduto);
        } catch (erro) {
            return res.status(500).json({ erro: erro.message });
        }
    }

    async criaNovo(req, res) {
        const dadosParaCriar = req.body;
        try {
            if (req.file) {
                dadosParaCriar.imagem = req.file.filename;
            }
            const novoProdutoCriado = await this.entidadeService.criaProduto(
                dadosParaCriar
            );
            return res.status(200).json(novoProdutoCriado);
        } catch (erro) {
            return res.status(500).json({ erro: erro.message });
        }
    }
}

module.exports = Controller;
