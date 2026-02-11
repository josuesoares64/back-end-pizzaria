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
        const categoria = req.body.categoria; // enviada no form-data
        dadosParaCriar.imagem = `uploads/${categoria}/${req.file.filename}`;
      }

      const novoProdutoCriado =
        await this.entidadeService.criaProduto(dadosParaCriar);
      return res.status(200).json(novoProdutoCriado);
    } catch (erro) {
      return res.status(500).json({ erro: erro.message });
    }
  }

  async deletar(req, res) {
    try {
      const { id } = req.params;

      const produto = await this.entidadeService.deletaProduto(id);

      if (!produto) {
        return res.status(404).json({
          message: "Produto não encontrado",
        });
      }

      return res.status(204).send();
    } catch (error) {
      return res.status(500).json({
        message: "Erro ao deletar produto",
        error: error.message,
      });
    }
  }
}

module.exports = Controller;
