import SchedulesModel from "../models/schedule";

interface ISchedulesDTO {
    day: string;
    firstHours: string;
    lastHours: string;
}

class Schedules {
    private schedule: typeof SchedulesModel;

    constructor(scheduleModel: typeof SchedulesModel) {
        this.schedule = scheduleModel;
    }

    async createHour(scheduleDTO: ISchedulesDTO, touristLocationID: string) {
        const { day, firstHours, lastHours } = scheduleDTO;

        if (!day || !firstHours || !lastHours) return { status: 400, message: "Missing required fields" };

        try {
            const newSchedule = new this.schedule({
                day,
                firstHours,
                lastHours,
                touristLocationID,
            });

            await newSchedule.save();

            return { status: 201, message: "Schedule created successfully", data: newSchedule };
        } catch (error) {
            console.log(error);
            return { status: 500, message: "Internal Server Error", error: (error as Error).message };
        }
    }

    async getReview(touristLocationID: string) {
        try {
            const schedules = await this.schedule.find({ touristLocationID }).exec();

            return { status: 200, message: "Schedules retrieved successfully", data: schedules };
        } catch (error) {
            console.log(error);
            return { status: 500, message: "Internal Server Error", error: (error as Error).message };
        }
    }
}

export default Schedules;