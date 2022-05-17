export interface Cars {
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
}

export type CarsShow = Omit<Cars, 'transmission' | 'pricePurchase' | 'vin' | 'datePurchase' | 'dateOverview' | 'dateOC' | 'equipment' | 'description' | 'contactId'>

export interface CarsEdit {
    carMark: string;
    carModel: string;
    carEquipment: string;
    carFuel: string;
    carType: string;
}

export interface CarFuels {
    id: number;
    name: string;
}

export interface CarTypes {
    id: number;
    name: string;
}

export interface CarMarks {
    id: number;
    name: string;
}

export interface CarModels {
    id: number;
    name: string;
    markId: number;
}

export interface CarEquipments {
    id: number;
    name: string;
}