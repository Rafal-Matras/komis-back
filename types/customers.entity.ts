export interface SimpleConsumer {
    firstName: string;
    surName: string;
    phone: string;
    email: string;
}

export interface Consumer extends SimpleConsumer {
    id: string;
    personalIdentityNumber?: number;
    street?: string;
    city?: string;
    zipCode?: string;
    nip?: string;
    regon?: number;
    firmName?: string;
    whatWants: string;
    description: string;
}

export interface ConsumerReserved extends SimpleConsumer {
    dateFinishReservation: number;
    priceAdvance: string;
}

export interface ConsumerArrangement {
    name: string;
    pesel?: string;
    nip?: string;
    document?: string;
    documentId?: string;
    address: string;
    postCode: string;
    city: string;
    price: string;
    priceInWords: string;
}