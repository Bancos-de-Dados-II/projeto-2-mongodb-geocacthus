import { ModelStatic } from "sequelize";
import Review from "../models/review";
import HttpError from "../utils/error/httpError";
import TouristPlace from "../models/touristPlace";

class ReviewService {
    private reviewModel: ModelStatic<Review>;
    private placeModel: ModelStatic<TouristPlace>;

    constructor(reviewModel: ModelStatic<Review>, placeModel: ModelStatic<TouristPlace>) {
        this.reviewModel = reviewModel;
        this.placeModel = placeModel
    };

    async createReview(userID: string, touristPlaceID: string, data: Partial<Review>) {
        console.log(userID, touristPlaceID, data);

        const touristPlace = await this.placeModel.findByPk(touristPlaceID);
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
        const reviews = await Review.findAll({
            where: { touristPlaceID },
            order: [["createdAt", "DESC"]],
        });

        if (!reviews || reviews.length === 0) {
            throw new HttpError("Nenhum review encontrado para este lugar turístico.", 404);
        }

        return reviews;
    }

    async getReviewById(reviewID: string) {
        const review = await Review.findByPk(reviewID);

        if (!review) {
            throw new HttpError("Review não encontrado.", 404);
        }

        return review;
    }

    async deleteReview(reviewID: string, userID: string) {
        const review = await Review.findByPk(reviewID);

        if (!review) {
            throw new HttpError("Review não encontrado.", 404);
        }

        if (review.userId !== userID) {
            throw new HttpError("Você não tem permissão para deletar este review.", 403);
        }

        await review.destroy();
        return review;
    }
}


export default ReviewService;