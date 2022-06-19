import {FieldPacket} from 'mysql2';

import {pool} from '../utils/db';
import {Company} from '../types';

type CompanyResults = [Company[], FieldPacket[]];

export class CompanyRecord implements Company {
    id?: number;
    name: string;
    city: string;
    postCode: string;
    address: string;
    nip: string;
    regon: string;

    constructor(obj: Company) {

        this.id = obj.id;
        this.name = obj.name;
        this.city = obj.city;
        this.postCode = obj.postCode;
        this.address = obj.address;
        this.nip = obj.nip;
        this.regon = obj.regon;

    }

    static async getCompany() {
        const [results] = await pool.execute('SELECT * FROM `company` WHERE `id` = :id', {
            id: 1
        }) as CompanyResults;
        return results[0];
    }

    async updateCompany() {
        await pool.execute('UPDATE `company` SET `name` = :name, `city` = :city, `postCode` = :postCode, `address` = :address, `nip` = :nip, `regon` = :regon', this);
        return this;
    }
}