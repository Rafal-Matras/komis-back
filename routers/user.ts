import {Router} from 'express';

import {UserRecord} from '../records/user.record';
import {BranchRecord} from '../records/branch.record';

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
        res.json(!!user);
    })

    .get('/checkemail/:email', async (req, res) => {
        const user = await UserRecord.findOneUserEmail(req.params.email);
        res.json(!!user);
    })

    .post('/', async (req, res) => {
        const user = new UserRecord(req.body);
        const branchId = await BranchRecord.findOneBranchName(user.branchId);
        user.branchId = branchId.id;
        await user.insertUser();
        res.json(user.id);
    })

    .put('/setpassword', async (req, res) => {
        const user = await UserRecord.findOneUserLogin(req.body.login) as UserRecord;
        user.password = req.body.password;
        await user.editUser();
        res.json(user.id);
    })

    .put('/edit/:login', async (req, res) => {
        const {name, lastName, login, email, role, branchId} = req.body;
        console.log(req.body);
        const user = await UserRecord.findOneUserLogin(req.params.login) as UserRecord;
        const branch = await BranchRecord.findOneBranchName(branchId);
        user.name = name;
        user.lastName = lastName;
        user.email = email;
        user.login = login;
        user.role = role;
        user.branchId = branch.id;
        await user.editUser();
        res.json(user.id);
    })

    .delete('/:login', async (req, res) => {
        const user = await UserRecord.findOneUserLogin(req.params.login) as UserRecord;
        await user.deleteUser();
        res.json(user.id);
    })


