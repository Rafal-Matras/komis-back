export interface SimpleConsumer {
    id?: string;
    name: string;
    phone: string;
    email: string;
}

export interface Consumer extends SimpleConsumer {
    description: string;
    keeper: string;
    option: string;
}

export interface ConsumerReserved extends SimpleConsumer {
    dateFinishReservation: number;
    priceAdvance: string;
}

export interface ConsumerArrangement {
    name: string;
    pesel: string;
    nip: string;
    document: string;
    documentId: string;
    address: string;
    postCode: string;
    city: string;
    price: string;
    priceInWords: string;
}
