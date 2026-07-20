import db from "../database/models";
import { EnderecoDTO } from "../types/endereco.dto";

class EnderecoService {
  async getEndereco(userId: string) {
    return db.Endereco.findOne({ where: { user_id: userId } });
  }

  async upsertEndereco(userId: string, dto: EnderecoDTO) {
    const existente = await db.Endereco.findOne({ where: { user_id: userId } });

    if (existente) {
      await existente.update(dto);
      return existente;
    }

    return db.Endereco.create({ ...dto, user_id: userId });
  }
}

export default new EnderecoService();