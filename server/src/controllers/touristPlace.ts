import { ModelStatic } from "sequelize";
import TouristPlaceModel from "../models/touristPlace";

interface ITouristPlaceDTO {
    name: string;
    description: string;
    category: string;
    image: string;
    phone: string;
    latitude: number;
    longitude: number;
}

interface ITouristPlaceAuth {
    id: string;
    name?: string;
    description?: string;
    category?: string;
    image?: string;
    phone?: string;
    latitude?: number;
    longitude?: number;
}

class TouristPlace {
    private touristPlaceModel: typeof TouristPlaceModel;

    constructor(touristLocationModel: typeof TouristPlaceModel) {
        this.touristPlaceModel = touristLocationModel;
    }

    async createTouristPlace(touristPlaceDTO: ITouristPlaceDTO, userId: string) {
        const { name, description, category, image, phone, latitude, longitude } = touristPlaceDTO;

        if (!name || !description || !category || !image || !phone || !latitude || !longitude) return { status: 400, message: "Missing required fields" };

        try {
            const newTourist = new this.touristPlaceModel({ 
                name, 
                description, 
                category, 
                image, 
                phone, 
                location: {
                    type: 'Point',
                    coordinates: [longitude, latitude],
                },
                userID: userId,
            });

            await newTourist.save();

            return { status: 201, message: "Tourist place created successfully", data: newTourist };
        } catch (error) {
            console.log(error);
            return { status: 500, message: "Internal Server Error", error: (error as Error).message };
        }
    }

    async getTouristPlace() {
        try {
            const tourists = await this.touristPlaceModel.find().exec();

            return { status: 200, message: "Tourist places retrieved successfully", data: tourists };
        } catch (error) {
            console.log(error);
            return { status: 500, message: "Internal Server Error", error: (error as Error).message };
        }
    }

    async getTouristPlaceById(touristPlaceId: string) {
        try {
            const tourist = await this.touristPlaceModel.findById(touristPlaceId).exec();

            if (!tourist) return { status: 404, message: "Tourist place not found", data: null };

            return { status: 200, message: "Tourist place retrieved successfully", data: tourist };
        } catch (error) {
            console.log(error);
            return { status: 500, message: "Internal Server Error", error: (error as Error).message };
        }
    }

    async updateTouristPlace(touristPlaceAuth: ITouristPlaceAuth, updates: ITouristPlaceDTO) {
        try {
            const tourist = (await this.getTouristPlaceById(touristPlaceAuth.id)).data;

            if (!tourist) return { status: 404, message: "Tourist place not found" };

            await tourist.updateOne(updates).exec();

            return { status: 200, message: "Tourist place updated successfully", data: tourist };
        } catch (error) {
            console.log(error);
            return { status: 500, message: "Internal Server Error", error: (error as Error).message };
        }
    }

    async deleteTouristPlace(touristPlaceAuth: ITouristPlaceAuth) {
        try {
            const tourist = (await this.getTouristPlaceById(touristPlaceAuth.id)).data;

            if (!tourist) return { status: 404, message: "Tourist place not found" };

            await tourist.deleteOne().exec();

            return { status: 200, message: "Tourist place deleted successfully" };
        } catch (error) {
            console.log(error);
            return { status: 500, message: "Internal Server Error", error: (error as Error).message };
        }
    }
    
}

export default TouristPlace;