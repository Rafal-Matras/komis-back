import {FieldPacket} from 'mysql2';
import {v4 as uuid} from 'uuid';

import {pool} from '../utils/db';
import {Car} from '../types';
import {ValidationError} from '../utils/errors';

type CarResults = [Car[], FieldPacket[]]

export class CarRecord implements Car {
    id?: string;
    mark: string;
    model: string;
    type: string;
    fuel: string;
    yearProduction: string;
    engineCapacity: string;
    power: string;
    transmission: string;
    drive: string;
    color: string;
    mileage: string;
    doers: string;
    seats: string;
    price: string;
    pricePurchase: string;
    vin: string;
    dateOverview: string;
    dateOC: string;
    datePurchase: string;
    registration: string;
    equipment: string;
    description: string;
    reserved: string;
    sold: string;
    advance: string;
    location: string;

    constructor(obj: Car) {

        if (!obj.mark || obj.mark.length > 15) {
            throw new ValidationError('nazwa filli nie może być pusta ani przekraczać 6 znaków.')
        }

        this.id = obj.id;
        this.mark = obj.mark;
        this.model = obj.model;
        this.type = obj.type;
        this.fuel = obj.fuel;
        this.yearProduction = obj.yearProduction;
        this.engineCapacity = obj.engineCapacity;
        this.power = obj.power;
        this.transmission = obj.transmission;
        this.color = obj.color;
        this.mileage = obj.mileage;
        this.drive = obj.drive;
        this.doers = obj.doers;
        this.seats = obj.seats;
        this.price = obj.price;
        this.pricePurchase = obj.pricePurchase;
        this.vin = obj.vin;
        this.dateOverview = obj.dateOverview;
        this.dateOC = obj.dateOC;
        this.datePurchase = obj.datePurchase;
        this.registration = obj.registration;
        this.equipment = obj.equipment;
        this.description = obj.description;
        this.reserved = obj.reserved;
        this.sold = obj.sold;
        this.advance = obj.advance;
        this.location = obj.location;
    }

    static async findAllCars() {
        const [results] = await pool.execute("SELECT * FROM `cars`") as CarResults;
        return results.length < 1 ? null : results;
    }

    static async findAllCarsViews(location: string) {
        const [results] = await pool.execute("SELECT `id`, `mark`, `model`, `type`, `fuel`, `yearProduction`,`engineCapacity`, `power`, `color`, `mileage`, `doers`, `seats`, `price`, `reserved`, `advance` FROM `cars` WHERE `location` = :location AND `sold` = :sold", {
            location,
            sold: 'N'
        }) as CarResults;
        return results.length < 1 ? null : results;
    }

    static async findOneCar(id: string): Promise<CarRecord | null> {
        const [results] = await pool.execute("SELECT * FROM `cars` WHERE `id` = :id ", {
            id,
        }) as CarResults;
        return results.length < 1 ? null : new CarRecord(results[0]);
    }

    async insertCar() {
        if (!this.id) {
            this.id = uuid()
        } else {
            throw new Error('nie można zmienić istniejące pole')
        }
        await pool.execute('INSERT INTO `cars` (id,mark,model,type,fuel,yearProduction,engineCapacity,power,transmission,drive,color,mileage,doers,seats,price,pricePurchase,vin,dateOverview,dateOC,datePurchase,registration,equipment,description,reserved,sold,advance,location) VALUES (:id,:mark,:model,:type,:fuel,:yearProduction,:engineCapacity,:power,:transmission,:drive,:color,:mileage,:doers,:seats,:price,:pricePurchase,:vin,:dateOverview,:dateOC,:datePurchase,:registration,:equipment,:description,:reserved,:sold,:advance,:location)', this);
        return this.id;
    }

    async editCar() {
        console.log(this.reserved);
        await pool.execute('UPDATE `cars` SET `id` = :id, `mark` = :mark, `model` = :model, `type` = :type, `fuel` = :fuel, `yearProduction` = :yearProduction, `engineCapacity` = :engineCapacity, `power` = :power, `transmission` = :transmission, `color` = :color, `mileage` = :mileage, `drive` = :drive, `doers` = :doers, `seats` = :seats, `price` = :price, `pricePurchase` = :pricePurchase, `vin` = :vin, `dateOverview` = :dateOverview, `dateOC` = :dateOC, `datePurchase` = :datePurchase, `registration` = :registration, `equipment` = :equipment, `description` = :description, `reserved` = :reserved, `sold` = :sold, `advance` = :advance, `location` = :location WHERE `id` = :id ', this);
        return this.id;
    }

    async deleteCar() {
        await pool.execute("DELETE FROM `cars` WHERE `id` = :id", {
            id: this.id
        })
    }

}

