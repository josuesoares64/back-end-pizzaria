const BuscaService = require('../services/BuscarServices');
const buscaService = new BuscaService();

class BuscaController {
    async buscarGlobal(req, res) {
        const { nome } = req.query;
        try {
            const resultados = await buscaService.buscarEmTudo(nome);
            return res.status(200).json(resultados);
        } catch (erro) {
            return res.status(500).json({ erro: erro.message });
        }
    }
}
module.exports = BuscaController;