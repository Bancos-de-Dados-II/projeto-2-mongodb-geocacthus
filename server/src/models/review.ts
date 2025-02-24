import mongoose, { Model, Schema } from "mongoose";


interface IReview {
    rating: number;
    date: Date;
    userId: string;
    touristLocationID: mongoose.Types.ObjectId;
};

const ReviewSchema = new mongoose.Schema<IReview>({
    rating: {
        type: Number,
        required: true,
        min: 1,
        max: 5,
    },
    date: {
        type: Date,
        required: true,
    },
    userId: {
        type: String,
        required: true,
        ref: 'User',
    },
    touristLocationID: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'TouristPlace',
    },
}, {
    collection: 'reviews',
    timestamps: false
});

const ReviewModel: Model<IReview> = mongoose.model<IReview>('Review', ReviewSchema);


export default ReviewModel;
export { IReview };