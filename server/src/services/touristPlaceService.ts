import { Model } from "mongoose";
import TouristPlaceModel, { ITouristPlace } from "../models/touristPlace";
import User from "../models/user";

class TouristPlaceService {
    private touristPlaceModel: Model<ITouristPlace>;

    constructor(touristPlaceModel: Model<ITouristPlace>) {
        this.touristPlaceModel = touristPlaceModel;
    }

    async fetchAllTouristLocations() {
        return await this.touristPlaceModel.find()
            .populate('evaluationsLocations openingHours')
            .exec();
    }
    
    async fetchTouristLocationById(id: string) {
        const location = await this.touristPlaceModel.findById(id)
            .populate('evaluationsLocations openingHours')
            .exec();
        if (!location) {
            throw new Error("Local turístico não encontrado");
        }
        return location;
    }
    
    async createTouristLocation(data: ITouristPlace, user: User) {
        const newLocation = new this.touristPlaceModel({
            ...data,
            userID: user.id,
        });

        await newLocation.save();
        return newLocation;
    }
    
    async updateTouristLocation(id: string, data: Partial<ITouristPlace>) {
        const location = await this.touristPlaceModel.findByIdAndUpdate(id, data, { new: true }).exec();
        if (!location) {
            throw new Error("Local turístico não encontrado");
        }
        return location;
    }
    
    async deleteTouristLocation(id: string): Promise<ITouristPlace | null> {
        const location = await this.touristPlaceModel.findByIdAndDelete(id).exec();
        if (!location) {
            throw new Error("Local turístico não encontrado");
        }

        return location;
    }
}


export default TouristPlaceService;