import jwt from "jsonwebtoken";
import dotenv from 'dotenv';
import { Request, Response, NextFunction } from "express";
import HttpError from "../error/httpError";
import User from "../../models/user";

dotenv.config();
const SECRET_KEY = process.env.SECRET_KEY || 'default_secret_key';


const authenticateToken = (request: Request, response: Response, next: NextFunction) => {
    const authHeader = request.headers.authorization;

    if (!authHeader) {
        throw next(new HttpError("Token não fornecido.", 401));
    }

    const token = authHeader.split(" ")[1];

    try {
        const decoded = jwt.verify(token, SECRET_KEY);
        console.log(decoded);

        if (typeof decoded === "object" && decoded !== null && "email" in decoded) {
            request.user = {
                id: decoded.id,
                name: decoded.name,
                email: decoded.email,
                password: "",
            } as User;
        } else {
            throw new HttpError("Token inválido ou com informações faltando.", 403);
        }
        
        next();
    } catch (error) {
        return next(new HttpError("Token inválido ou expirado.", 403));
    }
};

export default authenticateToken;