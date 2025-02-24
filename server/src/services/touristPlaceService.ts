import { Model } from "mongoose";
import TouristPlaceModel, { ITouristPlace } from "../models/touristPlace";
import User from "../models/user";
import HttpError from "../utils/error/httpError";

interface TouristPlaceCreationData extends Partial<TouristPlace> {
    location?: { lat: number; lon: number };
}

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

    async fetchTouristLocationsByUser(userId: string) {
        const locations = await this.touristPlaceModel.findAll({
            where: { userID: userId },
        });
    
        if (!locations.length) {
            throw new HttpError("Nenhum local turístico encontrado para este usuário.", 404);
        }
    
        return locations;
    }
    

    async createTouristLocation(data: TouristPlaceCreationData, user: User) {
        const { location, ...otherData } = data;
    
        if (!location || !location.lat || !location.lon) {
            throw new HttpError("Coordenadas inválidas.", 400);
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