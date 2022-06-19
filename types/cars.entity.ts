export interface SimpleCar {
    id?: string;
    mark: string;
    model: string;
    type: string;
    fuel: string;
    yearProduction: string;
    engineCapacity: string;
    power: string;
    color: string;
    mileage: string;
    doers: string;
    seats: string;
    price: string;
    reserved: string;
    sold: string;
    location: string;
}

export interface Car extends SimpleCar {
    transmission: string;
    drive: string;
    pricePurchase: string;
    vin: string;
    dateOverview: string;
    dateOC: string;
    datePurchase: string;
    registration: string;
    equipment: string;
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

export interface CarBuy {
    mark: string;
    model: string;
    yearProduction: string;
    vin: string;
    registration: string;
    mileage: string;
}


