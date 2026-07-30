import { Request, Response, NextFunction } from "express";
import db from "../database/models";

export default async function checkPizzariaVinculo(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const vinculo = await db.PizzariaUser.findOne({
      where: { user_id: req.userId },
    });

    if (!vinculo) {
      return res.status(403).json({ error: "Usuário não tem acesso a nenhuma pizzaria" });
    }

    req.pizzariaId = vinculo.pizzaria_id;
    next();
  } catch (error) {
    res.status(400).json({ error: (error as Error).message });
  }
}