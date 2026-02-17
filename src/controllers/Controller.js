class Controller {
  constructor(entidadeService, categoria) {
    this.entidadeService = entidadeService; // corrigido
    this.categoria = categoria;
  }

  async pegaTodos(req, res) {
    try {
      const listaDeProduto = await this.entidadeService.pegaTodosOsProdutos();
      return res.status(200).json(listaDeProduto);
    } catch (erro) {
      return res.status(500).json({ erro: erro.message });
    }
  }

  async pegaUm(req, res) {
    const { id } = req.params;
    try {
      const umRegistro = await this.entidadeService.pegarPorId(id);
      if (!umRegistro) {
        return res.status(404).json({ message: "Registro não encontrado" });
      }
      return res.status(200).json(umRegistro);
    } catch (erro) {
      return res.status(500).json({ erro: erro.message });
    }
  }

  async criaNovo(req, res) {
    const dadosParaCriar = req.body;
    try {
      if (req.file) {
        // Agora this.categoria estará preenchido com 'sobremesas', 'pizzas', etc.
        dadosParaCriar.imagem = `uploads/${this.categoria}/${req.file.filename}`;
      }

      const novoProdutoCriado =
        await this.entidadeService.criaProduto(dadosParaCriar);
      return res.status(200).json(novoProdutoCriado);
    } catch (erro) {
      return res.status(500).json({ erro: erro.message });
    }
  }

  async atualizar(req, res) {
    const { id } = req.params;
    const dadosAtualizados = req.body;

    try {
      // Verifica se uma nova imagem foi enviada no PUT
      if (req.file) {
        dadosAtualizados.imagem = `uploads/${this.categoria}/${req.file.filename}`;
      }

      const atualizado = await this.entidadeService.atualizaProduto(
        dadosAtualizados,
        id,
      );

      if (!atualizado) {
        return res
          .status(404)
          .json({ message: `Registro com id ${id} não foi encontrado.` });
      }

      return res
        .status(200)
        .json({ message: `Registro atualizado com sucesso.` });
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
