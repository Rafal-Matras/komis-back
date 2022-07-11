import {pool} from '../utils/db';
import {Consumer} from '../types';
import {FieldPacket} from 'mysql2';
import {v4 as uuid} from 'uuid';
import {ValidationError} from '../utils/errors';

type ConsumerResults = [Consumer[], FieldPacket[]];

export class ConsumerRecord implements Consumer {
    id?: string;
    name: string;
    phone: string;
    email: string;
    description: string;
    keeper: string;
    option: string;
    branch: string;

    constructor(obj: Consumer) {

        if (!obj.name || obj.name.length > 15) {
            throw new ValidationError('namzwa nie może być pusta ani być przekraczać 15 znaków.');
        }
        if (obj.phone.length > 15) {
            throw new ValidationError('telefon nie może przekraczać 15 znaków.');
        }
        if (obj.email.length > 50) {
            throw new ValidationError('e-mail nie może  przekraczać 50 znaków.');
        }
        if (!obj.description || obj.description.length > 600) {
            throw new ValidationError('opis nie może być pusty ani przekraczać 600 znaków.');
        }
        if (!obj.keeper || obj.keeper.length > 30) {
            throw new ValidationError('opiekón nie może być pusty ani przekraczać 30 znaków.');
        }
        if (!obj.option || obj.option.length > 4) {
            throw new ValidationError('opcje nie mogą być puste ani przekraczać 4 znaków.');
        }
        if (!obj.branch || obj.branch.length > 36) {
            throw new ValidationError('id oddziału nie może być puste ani przekraczać 36 znaków.');
        }

        this.id = obj.id;
        this.name = obj.name;
        this.phone = obj.phone;
        this.email = obj.email;
        this.description = obj.description;
        this.keeper = obj.keeper;
        this.option = obj.option;
        this.branch = obj.branch;
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
        await pool.execute('INSERT INTO `consumers` (id,name,phone,email,description,keeper,option,branch) VALUES (:id,:name,:phone,:email,:description,:keeper,:option,:branch) ', this);
        return this.id;
    }

    async editConsumer() {
        await pool.execute('UPDATE `consumers` SET `name` = :name,`phone` = :phone,`email` = :email,`description` = :description,`keeper` = :keeper,`option` = :option, `branch` = :branch WHERE `id` = :id', this);
        return this.id;
    }

    async removeConsumer() {
        await pool.execute('DELETE FROM `consumers` WHERE `id` = :id', this);
        return this.id;
    }
}