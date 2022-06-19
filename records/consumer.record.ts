import {pool} from '../utils/db';
import {Consumer} from '../types';
import {FieldPacket} from 'mysql2';
import {v4 as uuid} from 'uuid';

type ConsumerResults = [Consumer[], FieldPacket[]];

export class ConsumerRecord implements Consumer {
    id?: string;
    name: string;
    phone: string;
    email: string;
    description: string;
    keeper: string;
    option: string;

    constructor(obj: Consumer) {
        this.id = obj.id;
        this.name = obj.name;
        this.phone = obj.phone;
        this.email = obj.email;
        this.description = obj.description;
        this.keeper = obj.keeper;
        this.option = obj.option;

    }

    static async findAll() {
        const [results] = await pool.execute('SELECT * FROM `consumers`') as ConsumerResults;
        return results;
    }

    static async findOne(id: string) {
        const [results] = await pool.execute('SELECT * FROM `consumers` WHERE `id` = :id', {
            id
        }) as ConsumerResults;
        return results.length < 1 ? null : new ConsumerRecord(results[0]);
    }

    async insertConsumer() {
        if (!this.id) {
            this.id = uuid();
        } else {
            throw new Error('nie można zmienić istniejące pole');
        }
        await pool.execute('INSERT INTO `consumers` (id,name,phone,email,description,keeper,option) VALUES (:id,:name,:phone,:email,:description,:keeper,:option) ', this);
        return this.id;
    }

    async removeConsumer() {
        await pool.execute('DELETE FROM `consumers` WHERE `id` = :id', this);
        return this.id;
    }
}