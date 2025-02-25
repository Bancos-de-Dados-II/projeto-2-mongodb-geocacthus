import { Model } from "mongoose";
import Review, { IReview } from "../models/review";
import HttpError from "../utils/error/httpError";
import TouristPlace, { ITouristPlace } from "../models/touristPlace";

class ReviewService {
    private reviewModel: Model<IReview>;
    private placeModel: Model<ITouristPlace>;

    constructor(reviewModel: Model<IReview>, placeModel: Model<ITouristPlace>) {
        this.reviewModel = reviewModel;
        this.placeModel = placeModel
    };

    async createReview(userID: string, touristPlaceID: string, data: Partial<IReview>) {
        console.log(userID, touristPlaceID, data);

        const touristPlace = await this.placeModel.findById(touristPlaceID);
        if (!touristPlace) {
            throw new HttpError("Lugar turístico não encontrado.", 404);
        }

        if (!data.rating || !data.comment) {
            throw new HttpError("Rating e comentário são obrigatórios.", 400);
        }

        const review = await Review.create({
            userID,
            touristPlaceID: touristPlaceID,
            rating: data.rating,
            comment: data.comment,
        });

        return review;
    }

    async getReviewsForPlace(touristPlaceID: string) {
        const reviews = await this.reviewModel.find({ touristPlaceID }).sort({ createdAt: -1 });

        if (!reviews || reviews.length === 0) {
            throw new HttpError("Nenhum review encontrado para este lugar turístico.", 404);
        }

        return reviews;
    }

    async getReviewById(reviewID: string) {
        const review = await Review.findById(reviewID)
            .populate('touristPlaceID')
            .exec();

        if (!review) {
            throw new HttpError("Review não encontrado.", 404);
        }

        return review;
    }

    async deleteReview(reviewID: string, userID: string) {
        const review = await Review.findByIdAndDelete(reviewID).exec();

        if (!review) {
            throw new HttpError("Review não encontrado.", 404);
        }

        if (review.userId !== userID) {
            throw new HttpError("Você não tem permissão para deletar este review.", 403);
        }

        return review;
    }
}


export default ReviewService;