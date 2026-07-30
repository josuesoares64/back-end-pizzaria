import { Request, Response } from 'express';
import produtoPrecoService from '../services/produtoPrecoService';
import db from '../database/models';
import { Op } from 'sequelize';

const getPizzariaIdComAcesso = async (
    userId: string,
    roles: string[],
    res: Response
): Promise<string | null> => {
    const vinculo = await db.PizzariaUser.findOne({
        where: { user_id: userId, role: { [Op.in]: roles } }
    });

    if (!vinculo) {
        res.status(403).json({ error: 'Usuário não tem acesso a esse recurso.' });
        return null;
    }

    return vinculo.pizzaria_id;
};

const vincularTamanhos = async (req: Request, res: Response) => {
    try {
        const { produtoId } = req.params as { produtoId: string };
        const { tamanho_ids } = req.body;

        if (!Array.isArray(tamanho_ids) || tamanho_ids.length === 0) {
            return res.status(400).json({ error: 'tamanho_ids deve ser uma lista não vazia.' });
        }

        const pizzariaId = await getPizzariaIdComAcesso(req.userId as string, ['dono'], res);
        if (!pizzariaId) return;

        const resultado = await produtoPrecoService.vincularTamanhos(produtoId, tamanho_ids, pizzariaId);
        return res.status(201).json(resultado);
    } catch (err: any) {
        return res.status(400).json({ error: err.message });
    }
};

const desvincularTamanho = async (req: Request, res: Response) => {
    try {
        const { produtoId, tamanhoId } = req.params as { produtoId: string; tamanhoId: string };

        const pizzariaId = await getPizzariaIdComAcesso(req.userId as string, ['dono'], res);
        if (!pizzariaId) return;

        await produtoPrecoService.desvincularTamanho(produtoId, tamanhoId, pizzariaId);
        return res.status(204).send();
    } catch (err: any) {
        return res.status(400).json({ error: err.message });
    }
};

const listarPrecos = async (req: Request, res: Response) => {
    try {
        const { produtoId } = req.params as { produtoId: string };

        const pizzariaId = await getPizzariaIdComAcesso(req.userId as string, ['dono', 'funcionario'], res);
        if (!pizzariaId) return;

        const resultado = await produtoPrecoService.listarPrecos(produtoId, pizzariaId);
        return res.status(200).json(resultado);
    } catch (err: any) {
        return res.status(400).json({ error: err.message });
    }
};

const atualizarPrecos = async (req: Request, res: Response) => {
    try {
        const { produtoId } = req.params as { produtoId: string };
        const { precos } = req.body;

        if (!Array.isArray(precos) || precos.length === 0) {
            return res.status(400).json({ error: 'precos deve ser uma lista não vazia.' });
        }

        const pizzariaId = await getPizzariaIdComAcesso(req.userId as string, ['dono'], res);
        if (!pizzariaId) return;

        const resultado = await produtoPrecoService.atualizarPrecos(produtoId, precos, pizzariaId);
        return res.status(200).json(resultado);
    } catch (err: any) {
        return res.status(400).json({ error: err.message });
    }
};

export default {
    vincularTamanhos,
    desvincularTamanho,
    listarPrecos,
    atualizarPrecos
};