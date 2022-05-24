export interface SimpleCar {
    id?: string;
    mark: string;
    model: string;
    type: string;
    fuel: string;
    yearProduction: number;
    engineCapacity: string;
    power: number;
    color: string;
    mileage: number;
    doers: number;
    seats: number;
    price: number;
    reserved: number;
    location: string;
}

export interface Car extends SimpleCar {
    transmission: string;
    pricePurchase: number;
    vin: string;
    dateOverview: string;
    dateOC: string;
    datePurchase: string;
    equipment: string[];
    description: string;
    contactId?: string;
}


export interface CarsEdit {
    carMark: string;
    carModel: string;
    carEquipment: string;
    carFuel: string;
    carType: string;
}


export interface CarDescription {
    id: number;
    name: string;
    markId?: number;
}

