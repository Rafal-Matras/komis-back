import {Request, Response, Router} from 'express'
import {compare, hash} from "bcrypt";

import {UserRecord} from "../records/user.record";

export const loginRouter = Router();

interface DataQuery {
    login: string;
    password: string;
}

loginRouter

    .get('/', async (req: Request, res: Response) => {
        const {login, password} = req.query as unknown as DataQuery
        const user = await UserRecord.findOne(login);
        if (user !== null && user.password.length < 36) {
            res.json({login: user.login, passLength: true})
        } else if (user === null || !await compare(password, user.password)) {
            res.json({login: ''});
        } else if (user.role === 'ADMIN') {
            res.json({login: user.login});
        } else if (user.role === 'REG_ADMIN') {
            res.json({login: user.login});
        } else {
            res.json({login: user.login});
        }
    })

    .post('/', async (req: Request, res: Response) => {
        const {login, password} = req.body;
        const user = await UserRecord.findOne(`${login}`);
        if (user === null) {
            throw new Error('error');
        }
        user.password = await hash(password, 10);
        await user.setPassword();
        res.json({id: user.id});
    })