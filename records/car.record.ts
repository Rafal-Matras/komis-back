import {pool} from '../utils/db';
import {FieldPacket} from "mysql2";
import {v4 as uuid} from 'uuid';

import {Car} from "../types";

type CarResults = [Car[], FieldPacket[]]

export class CarRecord implements Car {
    id?: string;
    mark: string;
    model: string;
    type: string;
    fuel: string;
    yearProduction: number;
    engineCapacity: string;
    power: number;
    transmission: string;
    color: string;
    mileage: number;
    doers: number;
    seats: number;
    price: number;
    pricePurchase: number;
    vin: string;
    dateOverview: string;
    dateOC: string;
    datePurchase: string;
    equipment: string[];
    description: string;
    reserved: number;
    contactId?: string;
    location: string;

    constructor(obj: Car) {

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
        this.doers = obj.doers;
        this.seats = obj.seats;
        this.price = obj.price;
        this.pricePurchase = obj.pricePurchase;
        this.vin = obj.vin;
        this.dateOverview = obj.dateOverview;
        this.dateOC = obj.dateOC;
        this.datePurchase = obj.datePurchase;
        this.equipment = obj.equipment;
        this.description = obj.description;
        this.reserved = obj.reserved;
        this.contactId = obj.contactId;
        this.location = obj.location;
    }

    static async findAllCars() {
        const [results] = await pool.execute("SELECT `id`, `mark`, `model`, `type`, `fuel`, `yearProduction`, `engineCapacity`, `power`, `color`, `mileage`, `doers`, `seats`, `price` FROM `cars`") as CarResults;
        return results.length < 1 ? null : results;
    }

    static async findOneCar(id: string): Promise<CarRecord | null> {
        const [results] = await pool.execute("SELECT * FROM `cars` WHERE `id` = :id ", {
            id,
        }) as CarResults;
        return results.length < 1 ? null : new CarRecord(results[0]);
    }

    static async getEquipment() {
        const [results] = await pool.execute("SELECT `name` FROM `car_equipment` ");
        return results;
    }

    async insertCar() {
        this.id = uuid();
        await pool.execute("INSERT INTO `cars`( mark, model, type, fuel, yearProduction, engineCapacity, power, transmission, color, mileage, doers, seats, price, pricePurchase, vin, dateOverview, dataOc, datePurchase, equipment, description, reserved, contract) VALUES ( :mark, :model, :type, :fuel, :yearProduction, :engineCapacity, :power, :transmission, :color, :mileage, :doers, :seats, :price, :pricePurchase, :vin, :dateOverview, :dataOc, :datePurchase, :equipment, :description, :reserved, :contract)", this);
        return this.id;
    }

    async editCar() {
        await pool.execute("UPDATE `cars` SET `mark` = :mark, `model` = :model, `type` = :type, `fuel` = :fuel,`yearProduction` = :yearProduction, `engineCapacity` = :engineCapacity, `power` = :power,`transmission` = :transmission, `color` = :color, `mileage` =: mileage, `doers` = :doers, `seats` = :seats, `price` = :price, `pricePurchase` = :pricePurchase, `vin` = :vin, `dateOverview` = :dateOverview, `dataOc` = :dataOc, `datePurchase` = :datePurchase, `equipment` = :equipment, `description` = :description, `reserved` = :reserved, `contract` = :contract WHERE id = :id", this);
        return this.id;
    }

    async deleteCar() {
        await pool.execute("DELETE FROM `cars` WHERE `id` = :id", {
            id: this.id
        })
    }

    static async addEquipment(name: string) {
        const id = uuid();
        await pool.execute("INSERT INTO `car_equipment` (id,name) VALUES (:id,:name)", {
            id,
            name,
        });
        return id
    }

    static async getFuel() {
        const [results] = await pool.execute("SELECT `name` FROM `car_fuel`");
        return results;
    }

    static async addFuel(name: string) {
        const id = uuid();
        await pool.execute("INSERT INTO `car_fuel` (id,name) VALUES (:id,:name)", {
            id,
            name,
        });
        return id
    }

    static async getMark() {
        const [results] = await pool.execute("SELECT `name` FROM `car_mark`");
        return results;
    }

    static async addMark(name: string) {
        const id = uuid();
        await pool.execute("INSERT INTO `car_mark` (id,name) VALUES (:id,:name)", {
            id,
            name,
        });
        return id
    }

    static async getModel(idMark: number) {
        const [results] = await pool.execute("SELECT `name` FROM `car_model` WHERE `mark_id` = :idMark", {
            idMark,
        });
        return results;
    }

    static async addModel(idMark: string, name: string) {
        const id = uuid();
        await pool.execute("INSERT INTO `car_model` (id,name,mark_id) VALUES (:id,:name,:idMark)", {
            id,
            name,
            idMark,
        });
        return id
    }

    static async getType() {
        const [results] = await pool.execute("SELECT `name` FROM `car_type`");
        return results;
    }

    static async addType(name: string) {
        const id = uuid();
        await pool.execute("INSERT INTO `car_type` (id,name) VALUES (:id,:name)", {
            id,
            name,
        });
        return id
    }
}