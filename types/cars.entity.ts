export interface SimpleCar {
    id?: string;
    mark: string;
    model: string;
    type: string;
    fuel: string;
    yearProduction: number;
    engineCapacity: number;
    power: number;
    color: string;
    mileage: number;
    doers: string;
    seats: string;
    price: number;
    reserved: string;
    sold: string;
    location: string;
    transmission: string;
    equipment: string;
}

export interface Car extends SimpleCar {
    drive: string;
    pricePurchase: number;
    vin: string;
    dateOverview: string;
    dateOC: string;
    datePurchase: string;
    registration: string;
    description: string;
    advance: string;
}

export interface SimpleCarEdit {
    name: string;
}

export interface CarEdit extends SimpleCarEdit {
    id?: string;
    markId?: string;
}

export interface SearchCar {
    mark: string;
    model: string;
    type: string;
    fuel: string;
    yearProductionFrom: number;
    yearProductionTo: number;
    engineCapacityFrom: number;
    engineCapacityTo: number;
    powerFrom: number;
    powerTo: number;
    mileageFrom: number;
    mileageTo: number;
    priceFrom: number;
    priceTo: number;
    transmission: string;
    equipment: string[];
}

export interface CarBuy {
    mark: string;
    model: string;
    yearProduction: string;
    vin: string;
    registration: string;
    mileage: string;
}


