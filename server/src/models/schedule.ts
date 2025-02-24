import mongoose, { Model, Schema } from "mongoose";


interface ISchedules {
    day: string;
    firstHours: string;
    lastHours: string;
    touristLocationID: mongoose.Types.ObjectId;
};

const SchedulesSchema: Schema = new Schema<ISchedules>({
    day: {
        type: String,
        required: true,
        enum: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
    },
    firstHours: {
        type: String,
        required: true,
    },
    lastHours: {
        type: String,
        required: true,
    },
    touristLocationID: {
        type: Schema.Types.ObjectId,
        ref: 'TouristPlace',
        required: true,
    }
}, {
    collection: 'schedules',
    timestamps: false
});

const SchedulesModel: Model<ISchedules> = mongoose.model<ISchedules>('Schedules', SchedulesSchema);


export default SchedulesModel;
export { ISchedules };