import {Router} from 'express'
import {BranchRecord} from "../records/branch.record";

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

    .post('/', async (req, res) => {
        const branch = new BranchRecord(req.body);
        await branch.insertBranch();
        res.json(branch);
    })
    .put('/:branchName', async (req, res) => {
        const {branchName, city, postCode, address} = req.body;
        const branch = await BranchRecord.findOneBranchName(req.params.branchName) as BranchRecord;
        branch.branchName = branchName;
        branch.city = city;
        branch.postCode = postCode;
        branch.address = address;
        console.log(branch);
        await branch.editBranch();
        res.json(`${branchName}${city}${postCode}${address}`);
    })

    .delete('/:branchName', async (req, res) => {
        const branch = await BranchRecord.findOneBranchName(req.params.branchName) as BranchRecord;
        await branch.deleteBranch();
        res.json({branch});
    })