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
}

module.exports = Controller;
