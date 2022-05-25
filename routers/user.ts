import {Router} from 'express'

import {UserRecord} from "../records/user.record";
import {BranchRecord} from "../records/branch.record";

export const userRouter = Router();

userRouter

    .get('/', async (req, res) => {
        const users = await UserRecord.findAllUsers();
        res.json(users);
    })

    .get('/user/:login', async (req, res) => {
        const user = await UserRecord.findOneUserLogin(req.params.login);
        const branch = await BranchRecord.findOneBranch(user.branchId);
        res.json({login: user.login, role: user.role, branchName: branch.branchName});
    })

    .get('/checklogin/:login', async (req, res) => {
        const user = await UserRecord.findOneUserLogin(req.params.login);
        if (user) {
            res.json(true)
        } else {
            res.json(false)
        }
    })

    .post('/', async (req, res) => {
        const user = new UserRecord(req.body);
        user.branchId = await BranchRecord.findOneBranchName(user.branchId);
        await user.insertUser();
        res.json(user.id);
    })

    .put('/:id', async (req, res) => {
        const user = new UserRecord(req.body)
        user.id = req.params.id;
        await user.editUser()
        res.json(user.id)
    })

    .delete('/:id', async (req, res) => {
        const user = await UserRecord.findOneUser(req.params.id) as UserRecord;
        await user.deleteUser()
        res.json(user.id)
    })


