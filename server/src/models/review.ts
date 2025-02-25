import mongoose, { Model, Schema } from "mongoose";


interface IReview {
    rating: number;
    comment: string;
    userID: string;
    touristPlaceID: mongoose.Types.ObjectId;
};

const ReviewSchema = new mongoose.Schema<IReview>({
    rating: {
        type: Number,
        required: true,
        min: 1,
        max: 5,
    },
    comment: {
        type: String,
        required: true,
    },
    userID: {
        type: String,
        required: true,
        ref: 'User',
    },
    touristPlaceID: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'touristPlaces',
    },
}, {
    collection: 'reviews',
    timestamps: true
});

const ReviewModel: Model<IReview> = mongoose.model<IReview>('Review', ReviewSchema);


export default ReviewModel;
export { IReview };