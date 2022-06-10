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
    pricePurchase: string;
    vin: string;
    dateOverview: string;
    dateOC: string;
    datePurchase: string;
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


