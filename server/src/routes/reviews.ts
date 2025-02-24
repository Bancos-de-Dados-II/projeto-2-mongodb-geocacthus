import { NextFunction, Router, Request, Response } from "express";
import authenticateToken from "../utils/middlewares/authenticateToken";
import ReviewService from "../services/reviewService";
import Review from "../models/review";
import TouristPlace from "../models/touristPlace";
import HttpError from "../utils/error/httpError";

const router = Router();
const reviewService = new ReviewService(Review, TouristPlace);



router.post("/:placeID", authenticateToken, async(request: Request, response: Response, next: NextFunction) => {
    const { placeID } = request.params;
    const data = request.body;

    if (!request.user) {
        throw new HttpError("Usuário não autenticado.", 401)
    }

    const userID = request.user.id;

    try {
        const review = await reviewService.createReview(userID, placeID, data);
        response.status(201).json(review);
    } catch (error) {
        next(error);
    }
})

router.get("/:placeId", async(request: Request, response: Response, next: NextFunction) => {
    const { placeId } = request.params;

    try {
        const reviews = await reviewService.getReviewsForPlace(placeId);
        response.status(200).json(reviews);
    } catch(error) {
        next(error);
    }
})

router.delete("/", authenticateToken, async(request: Request, response: Response, next: NextFunction) => {
    const { id } = request.params;

    if (!request.user) {
        throw new HttpError("Usuário não autenticado.", 401)
    }

    const userID = request.user?.id;

    try {
        const message = await reviewService.deleteReview(id, userID);
        response.status(200).json(message);
    } catch (error) {
        next(error);
    }
})


export default router;