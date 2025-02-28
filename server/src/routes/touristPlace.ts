import { NextFunction, Request, Response, Router } from "express";
import TouristPlaceService from "../services/touristPlaceService";
import TouristPlace from "../models/touristPlace";
import authenticateToken from "../utils/middlewares/authenticateToken";
import GeocodingService from "../services/GeocodingService";
import HttpError from "../utils/error/httpError";
import FileService from "../services/fileService";

const router = Router();
const fileService = new FileService();
const uploadService = new FileService();
const touristPlaceService = new TouristPlaceService(TouristPlace);
const geocodingService = new GeocodingService();


router.get("/", async (request: Request, response: Response, next: NextFunction) => {
    try {
        const locations = await touristPlaceService.fetchAllTouristLocations();
        console.log(locations);
        response.status(200).json(locations);
    } catch (error) {
        next(error);
    }
});

router.get("/:id", async (request: Request, response: Response, next: NextFunction) => {
    try {
        const { id } = request.params;
        const location = await touristPlaceService.fetchTouristLocationById(id);
        response.status(200).json(location);
    } catch (error) {
        next(error);
    }
});

router.post("/", authenticateToken, uploadService.multipleUploads, async (request: Request, response: Response, next: NextFunction) => {
    try {
        const userAuth = request.user;
        if (!userAuth) {
            throw new Error("Usuário não autenticado.");
        }

        const { address, ...data } = request.body;

        if (!address) {
            throw new HttpError("O endereço é obrigatório.", 400);
        }

        const { lat, lon } = await geocodingService.getCoordinates(address);

        const imageUrls = request.files
            ? (request.files as Express.Multer.File[]).map(file => {
                return fileService.generateImageUrl(file, request);
            })
            : [];


        const locationData = {
            ...data,
            location: {
                type: 'Point',
                coordinates: [lon, lat],
            },
            images: imageUrls
        };

        const newLocation = await touristPlaceService.createTouristLocation(locationData, userAuth);

        response.status(201).json(newLocation);
    } catch (error) {
        next(error);
    }
});

router.put("/:id", async (request: Request, response: Response, next: NextFunction) => {
    try {
        const { id } = request.params;
        const data = request.body;
        const updatedLocation = await touristPlaceService.updateTouristLocation(id, data);
        response.status(200).json(updatedLocation);
    } catch (error) {
        next(error);
    }
});

router.delete("/:id", async (request: Request, response: Response, next: NextFunction) => {
    try {
        const { id } = request.params;
        await touristPlaceService.deleteTouristLocation(id);
        response.status(204).send();
    } catch (error) {
        next(error);
    }
});


export default router;