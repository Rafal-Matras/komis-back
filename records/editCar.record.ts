import {FieldPacket} from "mysql2";
import {v4 as uuid} from 'uuid';

import {pool} from '../utils/db';
import {CarEdit} from '../types';

type EditCarResults = [CarEdit[], FieldPacket[]]

export class EditCarRecord implements CarEdit {
    id?: string;
    name: string;
    markId?: string;

    constructor(obj: CarEdit) {

        this.id = obj.id;
        this.name = obj.name;
        this.markId = obj.markId;
    }

    // -----------Mark----------

    static async findAllMarks() {
        const [results] = await pool.execute("SELECT `name` FROM `car_mark` WHERE `name` != 'select'");
        return results;
    }

    static async findOneMark(name: string) {
        const [results] = await pool.execute("SELECT * FROM `car_mark` WHERE `name` = :name", {
            name
        }) as EditCarResults;
        return results.length < 1 ? null : new EditCarRecord(results[0])
    }

    static async findAllModels(markId: string) {
        const [results] = await pool.execute("SELECT `name` FROM `car_model` WHERE `mark_id` = :markId", {
            markId,
        });
        return results;
    }

    static async findOneModel(name: string) {
        const [results] = await pool.execute("SELECT * FROM `car_model` WHERE `name` = :name", {
            name
        }) as EditCarResults;
        return results.length < 1 ? null : new EditCarRecord(results[0])
    }

    //-------MODEL----

    static async findAllEquipments() {
        const [results] = await pool.execute("SELECT `name` FROM `car_equipment`");
        return results;
    }

    static async findOneEquipment(name: string) {
        const [results] = await pool.execute("SELECT * FROM `car_equipment` WHERE `name` = :name", {
            name
        }) as EditCarResults;
        return results.length < 1 ? null : new EditCarRecord(results[0])
    }

    static async findAllFuels() {
        const [results] = await pool.execute("SELECT `name` FROM `car_fuel`");
        return results;
    }

    static async findOneFuel(name: string) {
        const [results] = await pool.execute("SELECT * FROM `car_fuel` WHERE `name` = :name", {
            name
        }) as EditCarResults;
        return results.length < 1 ? null : new EditCarRecord(results[0])
    }

    //-------Equipment------

    static async findAllTypes() {
        const [results] = await pool.execute("SELECT `name` FROM `car_type`");
        return results;
    }

    static async findOneType(name: string) {
        const [results] = await pool.execute("SELECT * FROM `car_type` WHERE `name` = :name", {
            name
        }) as EditCarResults;
        return results.length < 1 ? null : new EditCarRecord(results[0])
    }

    async addMark() {
        this.id = uuid();
        await pool.execute("INSERT INTO `car_mark` (id, name) VALUES (:id, :name)", this);
        return this.id
    }

    async deleteMark() {
        await pool.execute("DELETE FROM `car_mark` WHERE `id` = :id", this);
        return this.id
    }

    //------Fuel----

    async addModel() {
        this.id = uuid();
        console.log()
        await pool.execute("INSERT INTO `car_model` (id,name,mark_id) VALUES (:id,:name,:markId)", this);
        return this.id
    }

    async deleteModel() {
        await pool.execute("DELETE FROM `car_model` WHERE `id` = :id", this);
        return this.id
    }

    async addEquipment() {
        this.id = uuid();
        await pool.execute("INSERT INTO `car_equipment` (id,name) VALUES (:id,:name)", this);
        return this.id
    }

    async deleteEquipment() {
        await pool.execute("DELETE FROM `car_equipment` WHERE `id` = :id", this);
        return this.id
    }

    //--------Type--------

    async addFuel() {
        this.id = uuid();
        await pool.execute("INSERT INTO `car_fuel` (id,name) VALUES (:id,:name)", this);
        return this.id
    }

    async deleteFuel() {
        await pool.execute("DELETE FROM `car_fuel` WHERE `id` = :id", this);
        return this.id
    }

    async addType() {
        this.id = uuid();
        await pool.execute("INSERT INTO `car_type` (id,name) VALUES (:id,:name)", this);
        return this.id
    }

    async deleteType() {
        await pool.execute("DELETE FROM `car_type` WHERE `id` = :id", this);
        return this.id
    }
}