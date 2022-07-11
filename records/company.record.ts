import {FieldPacket} from 'mysql2';

import {pool} from '../utils/db';
import {Company} from '../types';
import {ValidationError} from '../utils/errors';

type CompanyResults = [Company[], FieldPacket[]];

export class CompanyRecord implements Company {
    id?: string;
    name: string;
    city: string;
    postCode: string;
    address: string;
    phone: string;
    nip: string;
    regon: string;

    constructor(obj: Company) {

        if (!obj.name || obj.name.length > 50) {
            throw new ValidationError('nazwa firmy nie może być pusta ani przekraczać 50 znaków.');
        }
        if (!obj.city || obj.city.length > 15) {
            throw new ValidationError('nazwa miasta nie może być pusta ani przekraczać 15 znaków.');
        }
        if (!obj.postCode || obj.postCode.length > 6) {
            throw new ValidationError('kod pocztowy nie może być pusty ani przekraczać 6 znaków.');
        }
        if (!obj.address || obj.address.length > 30) {
            throw new ValidationError('adres nie może być pusty ani przekraczać 30 znaków.');
        }
        if (!obj.nip || obj.nip.length > 13) {
            throw new ValidationError('nip nie może być pusty ani przekraczać 13 znaków.');
        }
        if (!obj.regon || obj.regon.length > 14) {
            throw new ValidationError('regon nie może być pusty ani przekraczać 14 znaków.');
        }
        if (!obj.phone || obj.phone.length > 13) {
            throw new ValidationError('telefon nie może być pusty ani przekraczać 13 znaków.');
        }

        this.id = obj.id;
        this.name = obj.name;
        this.city = obj.city;
        this.postCode = obj.postCode;
        this.address = obj.address;
        this.phone = obj.phone;
        this.nip = obj.nip;
        this.regon = obj.regon;

    }

    static async getCompany() {
        const [results] = await pool.execute('SELECT * FROM `company` WHERE `id` = :id', {
            id: 'd6bd1bf1-feae-11ec-abd7-b42e99f2f96c'
        }) as CompanyResults;
        return results[0];
    }

    async updateCompany() {
        await pool.execute('UPDATE `company` SET `name` = :name, `city` = :city, `postCode` = :postCode, `address` = :address, `phone` = :phone, `nip` = :nip, `regon` = :regon', this);
        return this;
    }
}