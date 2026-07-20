import { Request, Response } from "express";
import enderecoService from "../services/enderecoService";

class EnderecoController {
  async getEndereco(req: Request, res: Response) {
    try {
      const endereco = await enderecoService.getEndereco(req.userId as string);
      if (!endereco) return res.status(404).json({ message: "Endereço não cadastrado" });
      return res.status(200).json(endereco);
    } catch (error) {
      return res.status(500).json({ message: "Erro ao buscar endereço" });
    }
  }

  async upsertEndereco(req: Request, res: Response) {
    try {
      const endereco = await enderecoService.upsertEndereco(req.userId as string, req.body);
      return res.status(200).json(endereco);
    } catch (error) {
      return res.status(500).json({ message: "Erro ao salvar endereço" });
    }
  }
}

export default new EnderecoController();