import 'dotenv/config';
import { Router, Request, Response, NextFunction } from "express";
import AuthService from '../services/authService';
import User from '../models/user';
import FileService from '../services/fileService';


const SECRET_KEY: string = process.env.SECRET_KEY || 'default_secret_key';
const router = Router();
const authService = new AuthService(User, SECRET_KEY)
const uploadService = new FileService();
const fileService = new FileService();

router.post("/register", uploadService.singleUpload, async (request: Request, response: Response, next: NextFunction) => {
    try {
        const userDTO = request.body;

        let imageUrl: string | undefined;

        if (request.file) {
            imageUrl = fileService.generateImageUrl(request.file, request);
        }

        const newUser = await authService.createUser({ ...userDTO, image:imageUrl });

        response.status(201).json({
            message: "Usuário criado com sucesso.",
            data: newUser,
        });
    } catch (error) {
        next(error)
    };
});

router.post("/login", async (request: Request, response: Response, next: NextFunction) => {
    try {    
        const { email, password } = request.body;
        const token = await authService.login(email, password);
        response.status(200).json({
            message: "Usuário logado com sucesso.",
            token: token,
        });
    } catch (error) {
        next(error);
    };
});



export default router;