import {Router} from 'express'

import {UserRecord} from "../records/user.record";
import {BranchRecord} from "../records/branch.record";

export const userRouter = Router();

userRouter

    .get('/', async (req, res) => {
        const users = await UserRecord.findAllUsers();
        res.json(users);
    })

    .get('/:id', async (req, res) => {
        const user = await UserRecord.findOneUser(req.params.id);
        const branch = await BranchRecord.findOneBranch(user.branchId);
        res.json({login: user.login, role: user.role, branchName: branch.branchName});
    })

    .post('/', async (req, res) => {
        const user = new UserRecord(req.body);
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


