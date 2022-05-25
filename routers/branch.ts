import {Router} from 'express'
import {BranchRecord} from "../records/branch.record";


export const branchRouter = Router();

branchRouter

    .get('/all', async (req, res) => {
        const branches = await BranchRecord.findAllBranches();
        res.json(branches)
    })

    .get('/all/names', async (req, res) => {
        const branches = await BranchRecord.findAllBranchesNames();
        res.json(branches)
    })

    .get('/:id', async (req, res) => {
        const branch = await BranchRecord.findOneBranch(req.params.id);
        res.json(branch)
    })

    .post('/', async (req, res) => {
        const branch = new BranchRecord(req.body);
        await branch.insertBranch()
        res.json(branch)
    })
    .put('/:id', async (req, res) => {
        const branch = new BranchRecord(req.body);
        branch.id = req.params.id
        await branch.editBranch()
        res.json({branch})
    })

    .delete('/:id', async (req, res) => {
        const branch = await BranchRecord.findOneBranch(req.params.id) as BranchRecord;
        await branch.deleteBranch()
        res.json({branch})
    })