export interface Consumers {
    id: string;
    firstName: string;
    surName: string;
    tel: string;
    email: string;
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