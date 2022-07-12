import {Router} from 'express';
import {BranchRecord} from '../records/branch.record';
import {UserRecord} from '../records/user.record';

export const branchRouter = Router();

branchRouter

    .get('/all', async (req, res) => {
        const branches = await BranchRecord.findAllBranches();
        res.json(branches);
    })

    .get('/all/names', async (req, res) => {
        const branches = await BranchRecord.findAllBranchesNames();
        res.json(branches);
    })

    .get('/:id', async (req, res) => {
        const branch = await BranchRecord.findOneBranch(req.params.id);
        res.json(branch);
    })

    .get('/check-branch-name/:name', async (req, res) => {
        const branch = await BranchRecord.findOneBranchName(req.params.name);
        res.json(!!branch);
    })

    .get('/usersLeft/:name', async (req, res) => {
        const branch = await BranchRecord.findOneBranchName(req.params.name);
        const userLeft = await UserRecord.findUsersBranch(branch.id);
        userLeft.length < 1 ? res.json(false) : res.json(true);
    })

    .get('/getid/:name', async (req, res) => {
        const branch = await BranchRecord.findOneBranchName(req.params.name);
        res.json(branch.id);
    })

    .get('/getcity/:name', async (req, res) => {
        const branch = await BranchRecord.findOneBranchName(req.params.name);
        res.json(branch);
    })

    .post('/', async (req, res) => {
        const branch = new BranchRecord(req.body);
        await branch.insertBranch();
        res.json(branch);
    })

    .put('/:branchName', async (req, res) => {
        const {branchName, city, postCode, address, phone} = req.body;
        const branch = await BranchRecord.findOneBranchName(req.params.branchName) as BranchRecord;
        branch.branchName = branchName;
        branch.city = city;
        branch.postCode = postCode;
        branch.address = address;
        branch.phone = phone;
        await branch.editBranch();
        res.json(`${branchName}${city}${postCode}${address}`);
    })

    .delete('/:branchName', async (req, res) => {
        const branch = await BranchRecord.findOneBranchName(req.params.branchName) as BranchRecord;
        await branch.deleteBranch();
        res.json({branch});
    })