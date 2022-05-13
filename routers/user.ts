import {Request, Response, Router} from 'express'
import {UserRecord} from "../records/user.record";

export const userRouter = Router();

interface DataQuery {
    login: string;
}

userRouter

    .get('/', async (req: Request, res: Response) => {
        const {login} = req.query as unknown as DataQuery
        const user = await UserRecord.findOne(login);
        const branch = await user?.setBranch()
        if (user === null || branch === null) {
            res.json({login: ''});
        } else {
            res.json({login: user.login, role: user.role, branch: branch?.name});
        }
    });
