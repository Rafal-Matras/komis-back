import {Router} from 'express';

import {CarRecord} from "../records/car.record";
import {EditCarRecord} from "../records/editCar.record";

interface DataQuery {
    name: string;
    model: string;
}

export const carsRouter = Router();

carsRouter

    .get('/', async (req, res) => {
        const cars = await CarRecord.findAllCars();
        res.json(cars);
    })

    .get('/:id', async (req, res) => {
        const car = await CarRecord.findOneCar(req.params.id);
        res.json(car);
    })

    .post('/', async (req, res) => {
        const car = new CarRecord(req.body);
        await car.insertCar();
        res.json(car);
    })

    .put('/:id', async (req, res) => {
        const car = new CarRecord(req.body);
        car.id = req.params.id;
        await car.editCar();
        res.json(car.id);
    })

    .delete('/:id', async (req, res) => {
        const car = await CarRecord.findOneCar(req.params.id) as CarRecord;
        await car.deleteCar();
        res.json(car.id);
    })

    //-------------Admin ADD/Remove Car Items----------


    .get('/edit/all', async (req, res) => {
        const marks = await EditCarRecord.findAllMarks();
        res.json(marks);
    })

    .get('/edit/car/', async (req, res) => {
        const {name, model} = req.query as unknown as DataQuery;
        let id = '';
        if (name === 'model' && model !== '0') {
            const carId = await EditCarRecord.findOneMark(model);
            id = carId.id;
        }
        switch (name) {
            case 'mark':
                const allMarkName = await EditCarRecord.findAllMarks();
                res.json(allMarkName);
                break;
            case 'model':
                const allModelName = await EditCarRecord.findAllModels(id);
                res.json(allModelName);
                break;
            case 'equipment':
                const allEquipmentName = await EditCarRecord.findAllEquipments();
                res.json(allEquipmentName);
                break;
            case 'fuel':
                const allFuelName = await EditCarRecord.findAllFuels();
                res.json(allFuelName);
                break;
            case 'type':
                const allTypeName = await EditCarRecord.findAllTypes();
                res.json(allTypeName);
                break;
        }
    })

    .get('/edit/:name', async (req, res) => {
        const car = await EditCarRecord.findOneMark(req.params.name);
        res.json(car);
    })

    .post('/edit/:type', async (req, res) => {
        const type = req.params.type;
        const {name, mark} = req.body;
        const editCar = new EditCarRecord({name: name});
        if (mark) {
            const markId = await EditCarRecord.findOneMark(mark);
            editCar.markId = markId.id;
        }
        switch (type) {
            case 'mark':
                await editCar.addMark();
                break;
            case 'model':
                await editCar.addModel();
                break;
            case 'equipment':
                await editCar.addEquipment();
                break;
            case 'fuel':
                await editCar.addFuel();
                break;
            case 'type':
                await editCar.addType();
                break;
        }
        res.json(editCar.id);
    })

    .delete('/edit/:item', async (req, res) => {
        const type = req.params.item;
        const {carValue} = req.body;
        switch (type) {
            case 'mark':
                const markDelete = await EditCarRecord.findOneMark(carValue);
                await markDelete.deleteMark();
                res.json(markDelete.id);
                break;
            case 'model':
                const modelDelete = await EditCarRecord.findOneModel(carValue);
                await modelDelete.deleteModel();
                res.json(modelDelete.id);
                break;
            case 'equipment':
                const equipmentDelete = await EditCarRecord.findOneEquipment(carValue);
                await equipmentDelete.deleteEquipment();
                res.json(equipmentDelete.id);
                break;
            case 'fuel':
                const fuelDelete = await EditCarRecord.findOneFuel(carValue);
                await fuelDelete.deleteFuel();
                res.json(fuelDelete.id);
                break;
            case 'type':
                const typeDelete = await EditCarRecord.findOneType(carValue);
                await typeDelete.deleteType();
                res.json(typeDelete.id);
                break;
        }
    })