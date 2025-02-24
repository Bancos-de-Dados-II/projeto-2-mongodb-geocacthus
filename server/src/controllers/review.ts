import ReviewModel from "../models/review";

interface IReviewDTO {
    rating: number;
    date: Date;
}

class Review {
    private review: typeof ReviewModel;

    constructor(reviewModel: typeof ReviewModel) {
        this.review = reviewModel;
    }

    async createEvaluate(reviewDTO: IReviewDTO, touristLocationId: string, userId: string) {
        const { rating, date } = reviewDTO;

        if (!rating || !date) return { status: 400, message: "Missing required fields" };

        try {
            const newReview = new this.review({
                rating,
                date,
                userId,
                touristLocationId,
            });

            await newReview.save();

            return { status: 201, message: "Review created successfully", data: newReview };
        } catch (error) {
            console.log(error);
            return { status: 500, message: "Internal Server Error", error: (error as Error).message };
        }
    }

    async getEvaluates(touristLocationId: string) {
        try {
            const reviews = await this.review.find({ touristLocationId }).exec();

            return { status: 200, message: "Reviews retrieved successfully", data: reviews };
        } catch (error) {
            console.log(error);
            return { status: 500, message: "Internal Server Error", error: (error as Error).message };
        }
    }

    async deleteEvaluate(userId: string, touristLocationId: string, date: Date) {
        try {
            const review = await this.review.findOne({
                date: new Date(date),
                touristLocationId,
                userId,
            }).exec();

            if (!review) return { status: 404, message: "No reviews found for this user" };

            await review.deleteOne().exec();

            return { status: 200, message: "Reviews deleted successfully" };
        } catch (error) {
            console.log(error);
            return { status: 500, message: "Internal Server Error", error: (error as Error).message };
        }
    }
}

export default Review;