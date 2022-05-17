import {pool} from '../utils/db';
import {FieldPacket} from "mysql2";
import {v4 as uuid} from 'uuid';

import {Cars} from "../types";


export class CarRecord {
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

    constructor(obj: Cars) {

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

    static async findAll() {
        const [results] = await pool.execute("SELECT * FROM `cars`") as [CarRecord[], FieldPacket[]];
        return results.length < 1 ? null : results
    }

    static async findOne(id: string): Promise<CarRecord | null> {
        const [results] = await pool.execute("SELECT * FROM `cars` WHERE `id` = :id ", {
            id,
        }) as [CarRecord[], FieldPacket[]];
        return results.length < 1 ? null : new CarRecord(results[0]);
    }

    static async getEquipment() {
        const [results] = await pool.execute("SELECT `name` FROM `car_equipment` ");
        return results;
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