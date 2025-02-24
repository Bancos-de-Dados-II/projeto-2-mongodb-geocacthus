import { Response, Request, Router } from "express";

import authRouter from "./authentication";
import userRouter from "./users";
import touristPlaceRouter from "./touristPlace";
import reviewRouter from "./reviews";

let apiRoute: string;
export const configIndeceServerPoint = (indecePoint: string) => {
    apiRoute = `http://localhost:${process.env.SERVER_PORT}${indecePoint}`;
}

const indceRouter = {
    indice: '/',
    auth: '/auth',
    users: '/users',
    tourist_places: '/tourist-place',   
    hours: '/hours',
    reviews: '/reviews'
};

const router = Router();

router.get('/', (req: Request, res: Response) => {
    res.status(200).json({
        endpoints: {
            users: `${apiRoute}${indceRouter.users}`,
            tourist_places: `${apiRoute}${indceRouter.tourist_places}`,
            // hours: `${apiRoute}${indceRouter.hours}`,
            // reviews: `${apiRoute}${indceRouter.reviews}`
        }
    });
});

router.use(`${indceRouter.auth}`, authRouter);
router.use(`${indceRouter.users}`, userRouter);
router.use(`${indceRouter.tourist_places}`, touristPlaceRouter);
router.use(`${indceRouter.reviews}`, reviewRouter);

export default router;