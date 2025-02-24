import { NextFunction, Request, Response, Router } from "express";
import TouristPlaceService from "../services/touristPlaceService";
import TouristPlace from "../models/touristPlace";
import authenticateToken from "../utils/middlewares/authenticateToken";

const router = Router();
const touristPlaceService = new TouristPlaceService(TouristPlace);


router.get("/", async (request: Request, response: Response, next: NextFunction) => {
    try {
        const locations = await touristPlaceService.fetchAllTouristLocations();
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
  
router.post("/", authenticateToken, async (request: Request, response: Response, next: NextFunction) => {
    try {
        const userAuth = request.user;
        console.log(userAuth);
        if (!userAuth) {
            throw new Error("Usuário não encontrado.");
        }

        const { latitude, longitude, ...data } = request.body;

        if (!latitude || !longitude) {
            response.status(400).json({ message: "Missing required fields: latitude and longitude" });
        }

        const locationData = {
            ...data,
            location: {
                type: 'Point',
                coordinates: [longitude, latitude],
            }
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