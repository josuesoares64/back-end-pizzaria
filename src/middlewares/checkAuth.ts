import { JwtPayload, verify } from "jsonwebtoken";
import jsonSecret from '../config/jsonSecret'
import { NextFunction, Request, Response } from "express";

interface JwtUser extends JwtPayload {
    id: string;
    email: string;
    role: string;
}

const autenticado = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).send({ message: 'Token não informado' });
    }

    const [, accessToken] = authHeader.split(' ');

    if(!accessToken) {
        return res.status(401).send({ message: `Formato inválido. Use: Bearer <token>`})
    }

    try {
        const decoded = verify(accessToken, jsonSecret.secret) as unknown as JwtUser;
        req.userId = decoded.id;
        req.userEmail = decoded.email;
        req.userRole = decoded.role;
        return next();
    } catch (error) {
        return res.status(401).send({ message: 'Token inválido ou expirado'})
    }
}

export default autenticado;