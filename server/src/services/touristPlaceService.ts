import { Model } from "mongoose";
import TouristPlaceModel, { ITouristPlace } from "../models/touristPlace";
import User from "../models/user";

class TouristPlaceService {
    private touristPlaceModel: Model<ITouristPlace>;

    constructor(touristPlaceModel: Model<ITouristPlace>) {
        this.touristPlaceModel = touristPlaceModel;
    }

    async fetchAllTouristLocations() {
        return await this.touristPlaceModel.find();
    }
    
    async fetchTouristLocationById(id: string) {
        const location = await this.touristPlaceModel.findById(id);
        if (!location) {
            throw new Error("Local turístico não encontrado");
        }

        console.log(location);
        return location;
    }

    async fetchTouristLocationByUserId(userId: string) {
        const locations = await this.touristPlaceModel.find({ userID: userId });
    
        if (!locations || locations.length === 0) {
            throw new Error("Nenhum local turístico encontrado para este usuário");
        }
    
        console.log(locations);
        return locations;
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