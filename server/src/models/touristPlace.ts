import mongoose, { Schema, Document, Model } from 'mongoose';
import pointSchema from './point';


interface ITouristPlace {
    name: string;
    description: string;
    category: string;
    image: string;
    phone: string;
    location: {
        type: string;
        coordinates: [number, number];
    };
    userID: String;
    createdAt?: Date;
    updatedAt?: Date;
}

const TouristPlaceSchema: Schema = new Schema<ITouristPlace>({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true
    },
    location: { // [longitude, latitude]
        type: pointSchema,
        required: true
    },
    userID: { 
        type: String, 
        required: true, 
        ref: 'User' 
    },
}, {
    collection: 'touristPlaces',
    timestamps: true
});

const TouristPlaceModel: Model<ITouristPlace> = mongoose.model<ITouristPlace>('TouristPlace', TouristPlaceSchema);

export default TouristPlaceModel;
export { ITouristPlace };