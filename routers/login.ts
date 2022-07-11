import {Router} from 'express';
import {compare, hash} from 'bcrypt';

import {UserRecord} from '../records/user.record';

export const loginRouter = Router();

loginRouter

    .get('/:login/:password', async (req, res) => {
        const {login, password} = req.params;
        const user = await UserRecord.findOneUserLogin(login) as UserRecord;
        if (user !== null && user.password.length < 60) {
            res.json({login: user.login, passLength: true});
        } else if (user === null || !await compare(password, user.password)) {
            res.json({login: ''});
        } else {
            res.json({login: user.login});
        }
    })

    .post('/', async (req, res) => {
        const {login, password} = req.body;
        const user = await UserRecord.findOneUserLogin(login) as UserRecord;
        user.password = await hash(password, 10);
        console.log(user.password);
        await user.editUser();
        res.json({id: user.id});
    });