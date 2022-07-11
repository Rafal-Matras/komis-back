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
    yearProduction: number;
    engineCapacity: number;
    power: number;
    transmission: string;
    drive: string;
    color: string;
    mileage: number;
    doers: string;
    seats: string;
    price: number;
    pricePurchase: number;
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
            throw new ValidationError('model nie może być pusty ani przekraczać 15 znaków.');
        }
        if (!obj.model || obj.model.length > 20) {
            throw new ValidationError('marka nie może być pusta ani przekraczać 20 znaków.');
        }
        if (!obj.type || obj.type.length > 10) {
            throw new ValidationError('typ nadwozia nie może być pusty ani przekraczać 10 znaków.');
        }
        if (!obj.fuel || obj.fuel.length > 15) {
            throw new ValidationError('rodzaj paliwa nie może być pusty ani przekraczać 15 znaków.');
        }
        if (!obj.yearProduction || obj.yearProduction > 9999) {
            throw new ValidationError('rok produkcji nie może być pusty ani być większa niż 9999.');
        }
        if (!obj.engineCapacity || obj.engineCapacity > 9999) {
            throw new ValidationError('pojemnośc silnika nie może być pusta ani być większa niż 9999.');
        }
        if (!obj.power || obj.power > 9999) {
            throw new ValidationError('moc silnika nie może być pusta ani być większa niż 9999.');
        }
        if (!obj.transmission || obj.transmission.length > 12) {
            throw new ValidationError('skrzynia biegów nie może być pusta ani przekraczać 12 znaków.');
        }
        if (!obj.drive || obj.drive.length > 20) {
            throw new ValidationError('napęd nie może być pusty ani przekraczać 20 znaków.');
        }
        if (!obj.color || obj.color.length > 16) {
            throw new ValidationError('kolor nie może być pusty ani przekraczać 16 znaków.');
        }
        if (!obj.mileage || obj.mileage > 9999999) {
            throw new ValidationError('przebieg nie może być pusty ani być większa niż 9999999.');
        }
        if (!obj.doers || obj.doers.length > 1) {
            throw new ValidationError('liczba dzwi nie może być pusta ani być większa niż 9.');
        }
        if (!obj.seats || obj.seats.length > 1) {
            throw new ValidationError('liczba miejsc nie może być pusta ani być większa niż 9.');
        }
        if (!obj.price || obj.price > 9999999) {
            throw new ValidationError('cena nie może być pusta ani być większa niż 9999999.');
        }
        if (!obj.pricePurchase || obj.pricePurchase > 9999999) {
            throw new ValidationError('cena zakupu nie może być pusta ani być większa niż 9999999.');
        }
        if (!obj.vin || obj.vin.length > 17) {
            throw new ValidationError('nr. Vin nie może być pusty ani być przekraczać 17 znaków.');
        }
        if (!obj.dateOverview || obj.dateOverview.length > 10) {
            throw new ValidationError('data przeglądu nie może być pusta ani być przekraczać 10 znaków.');
        }
        if (!obj.dateOC || obj.dateOC.length > 10) {
            throw new ValidationError('data OC nie może być pusta ani być przekraczać 10 znaków.');
        }
        if (!obj.datePurchase || obj.datePurchase.length > 10) {
            throw new ValidationError('data zakupu nie może być pusta ani być przekraczać 10 znaków.');
        }
        if (!obj.registration || obj.registration.length > 10) {
            throw new ValidationError('nr rejestracyjny nie może być pusta ani być przekraczać 10 znaków.');
        }
        if (!obj.equipment || obj.equipment.length > 800) {
            throw new ValidationError('wyposarzenie nie może być puste ani być przekraczać 800 znaków.');
        }
        if (!obj.description || obj.description.length > 600) {
            throw new ValidationError('opis nie może być pusty ani być przekraczać 600 znaków.');
        }
        if (!obj.reserved || obj.reserved.length > 250) {
            throw new ValidationError('rezerwacja nie może być pusta ani być przekraczać 250 znaków.');
        }
        if (!obj.sold || obj.sold.length > 3) {
            throw new ValidationError('sprzedany nie może być pusty ani być przekraczać 3 znaków.');
        }
        if (!obj.advance || obj.advance.length > 100) {
            throw new ValidationError('zaliczka nie może być pusta ani być przekraczać 100 znaków.');
        }
        if (!obj.location || obj.location.length > 36) {
            throw new ValidationError('lokalizacja nie może być pusta ani być przekraczać 36 znaków.');
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
        const [results] = await pool.execute('SELECT * FROM `cars`') as CarResults;
        return results.length < 1 ? null : results;
    }

    static async findCarsViews(location: string) {
        const [results] = await pool.execute('SELECT `id`, `mark`, `model`, `type`, `fuel`, `yearProduction`,`engineCapacity`, `power`, `color`, `mileage`,`transmission`, `doers`, `seats`, `price`,`equipment`, `reserved`, `advance` FROM `cars` WHERE `location` = :location AND `sold` = :sold', {
            location,
            sold: 'N'
        }) as CarResults;
        return results.length < 1 ? null : results;
    }

    static async findAllCarsViews() {
        const [results] = await pool.execute('SELECT `id`, `mark`, `model`, `type`, `fuel`, `yearProduction`,`engineCapacity`, `power`, `color`, `mileage`,`transmission`, `doers`, `seats`, `price`,`equipment`, `reserved`, `advance` FROM `cars` WHERE  `sold` = :sold', {
            sold: 'N'
        }) as CarResults;
        return results.length < 1 ? null : results;
    }

    static async findOneCar(id: string): Promise<CarRecord | null> {
        const [results] = await pool.execute('SELECT * FROM `cars` WHERE `id` = :id ', {
            id,
        }) as CarResults;
        return results.length < 1 ? null : new CarRecord(results[0]);
    }

    async insertCar() {
        if (!this.id) {
            this.id = uuid();
        } else {
            throw new Error('nie można zmienić istniejące pole');
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
        await pool.execute('DELETE FROM `cars` WHERE `id` = :id', {
            id: this.id
        });
    }

}

