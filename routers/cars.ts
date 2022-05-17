import {Request, Response, Router} from 'express'

import {CarRecord} from "../records/car.record";

export const carsRouter = Router();

carsRouter

    .get('/equipment', async (req: Request, res: Response) => {
        const equipment = await CarRecord.getEquipment();
        res.json(equipment);
    })

    .put('/equipment', async (req: Request, res: Response) => {
        const {name} = req.body;
        const id = await CarRecord.addEquipment(name);
        res.json(id)
    })

    .get('/fuel', async (req: Request, res: Response) => {
        const fuel = await CarRecord.getFuel();
        res.json(fuel);
    })

    .put('/fuel', async (req: Request, res: Response) => {
        const {name} = req.body;
        const id = await CarRecord.addEquipment(name);
        res.json(id)
    })

    .get('/type', async (req: Request, res: Response) => {
        const type = await CarRecord.getType();
        res.json(type);
    })

    .put('/type', async (req: Request, res: Response) => {
        const {name} = req.body;
        const id = await CarRecord.addEquipment(name);
        res.json(id)
    })

    .get('/mark', async (req: Request, res: Response) => {
        const mark = await CarRecord.getMark();
        res.json(mark);
    })

    .put('/mark', async (req: Request, res: Response) => {
        const {name} = req.body;
        const id = await CarRecord.addEquipment(name);
        res.json(id)
    })

    .get('/model', async (req: Request, res: Response) => {
        const {id} = req.body;
        const model = await CarRecord.getModel(id);
        res.json(model);
    })


// .post('/', async (req: Request, res: Response) => {
//     const {login, password} = req.body;
//     const user = await UserRecord.findOne(`${login}`);
//     if (user === null) {
//         throw new Error('error');
//     }
//     user.password = await hash(password, 10);
//     await user.setPassword();
//     res.json({id: user.id});
// })