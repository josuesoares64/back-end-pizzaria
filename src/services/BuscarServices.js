const { Op } = require("sequelize");
const dataSource = require("../models");

class BuscaService {
  async buscarEmTudo(termo) {
    if (!termo || termo.trim() === "") {
      return {};
    }

    const termoLimpo = termo.trim().replace(/\./g, '');

    const modelos = ['Pizza', 'Esfiha', 'Bebida', 'Sobremesa'];
    let resultados = {};

    const buscas = modelos.map(async (nomeModelo) => {
      const modelo = dataSource[nomeModelo];
      
      if (modelo) {
        return modelo.findAll({
          where: {
            nome: {
              [Op.iLike]: `%${termoLimpo}%` 
            }
          }
        });
      }
      return [];
    });

    try {
      const retorno = await Promise.all(buscas);

      modelos.forEach((nome, index) => {
        const achados = retorno[index];

        if (achados && achados.length > 0) {
          resultados[nome.toLowerCase()] = achados;
        }
      });

      return resultados;

    } catch (erro) {
      console.log("Tentando busca alternativa...");
      return this.buscaAlternativa(termoLimpo, modelos);
    }
  }

  async buscaAlternativa(termo, modelos) {
    let resultados = {};
    const buscas = modelos.map(async (nomeModelo) => {
      const modelo = dataSource[nomeModelo];
      return modelo ? modelo.findAll({
        where: { nome: { [Op.like]: `%${termo}%` } }
      }) : [];
    });
    const retorno = await Promise.all(buscas);
    modelos.forEach((nome, index) => {
      if (retorno[index].length > 0) resultados[nome.toLowerCase()] = retorno[index];
    });
    return resultados;
  }
}

module.exports = BuscaService;