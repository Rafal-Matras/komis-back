import {Request, Response, Router} from 'express'
import {UserRecord} from "../records/user.record";

export const userRouter = Router();

interface DataQuery {
    id: string;
    login: string;
    branchName: string;
}

userRouter

    .get('/', async (req: Request, res: Response) => {
        const {login} = req.query as unknown as DataQuery;
        const user = await UserRecord.findOne(login);
        console.log(user)
        if (user === null) {
            res.json({login: ''});
        } else {
            const branch = await UserRecord.findBranchName(user.branchId);
            res.json({login: user.login, role: user.role, branchName: branch});
        }
    })

    .put('/', async (req: Request, res: Response) => {
        const person = req.body;
        console.log(person)
        const id = await UserRecord.addUser(person);
        res.json(id)
    })

    .get('/list', async (req: Request, res: Response) => {
        const users = await UserRecord.findAllUsers()
        res.json(users)
    })

    .get('/same-login', async (req: Request, res: Response) => {
        const {login} = req.query as unknown as DataQuery;
        const loginList = await UserRecord.sameLogin();
        console.log(loginList)
        res.json([].concat(loginList).some(el => el.login === login))
    })

    .get('/branch-id', async (req: Request, res: Response) => {
        const {branchName} = req.query as unknown as DataQuery;
        const branchId = await UserRecord.setBranchId(branchName);
        res.json(branchId)
    })

    .get('/branch', async (req: Request, res: Response) => {
        const {id} = req.query as unknown as DataQuery
        const data = await UserRecord.findBranchName(id);
        res.json({name: data})
    })

    .get('/branch/name', async (req: Request, res: Response) => {
        const branchName = await UserRecord.setBranchName();
        console.log(branchName)
        res.json(branchName);
    })
