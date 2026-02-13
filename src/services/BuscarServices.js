const { Op } = require("sequelize");
const dataSource = require("../models");

class BuscaService {
  async buscarEmTudo(termo) {
    // 1. Se o usuário não digitar nada ou enviar apenas espaços, retorna vazio imediatamente
    if (!termo || termo.trim() === "") {
      return {};
    }

    // 2. Limpeza profunda do termo:
    // - trim(): remove espaços inúteis nas pontas
    // - replace: remove pontos (.) que o usuário possa digitar
    const termoLimpo = termo.trim().replace(/\./g, '');

    const modelos = ['Pizza', 'Esfiha', 'Bebida', 'Sobremesa'];
    let resultados = {};

    // 3. Criamos as promessas de busca
    const buscas = modelos.map(async (nomeModelo) => {
      const modelo = dataSource[nomeModelo];
      
      if (modelo) {
        return modelo.findAll({
          where: {
            nome: {
              /* [Op.iLike]: Funciona no PostgreSQL (ignora maiúsculas/minúsculas).
                 Se você estiver usando MySQL e der erro, mude para [Op.like].
                 O % em ambos os lados permite que "cala" encontre "Calabresa".
              */
              [Op.iLike]: `%${termoLimpo}%` 
            }
          }
        });
      }
      return [];
    });

    try {
      // 4. Executa todas as buscas ao mesmo tempo
      const retorno = await Promise.all(buscas);

      // 5. Monta o objeto final apenas com o que tiver conteúdo
      modelos.forEach((nome, index) => {
        const achados = retorno[index];

        // SÓ adiciona no JSON se o array tiver registros
        if (achados && achados.length > 0) {
          resultados[nome.toLowerCase()] = achados;
        }
      });

      return resultados;

    } catch (erro) {
      // Caso o seu banco não suporte iLike (ex: MySQL antigo), ele cai aqui
      // e tentamos uma busca alternativa com Like comum
      console.log("Tentando busca alternativa...");
      return this.buscaAlternativa(termoLimpo, modelos);
    }
  }

  // Função de backup caso o iLike falhe (comum em alguns ambientes MySQL/SQLite)
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