export interface Branches {
    id?: string;
    name: string;
    city: string;
    postCode: string;
    address: string;
}

export type Branch = Omit<Branches, 'id'>