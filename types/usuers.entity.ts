export interface Users {
    id?: string;
    name: string;
    lastName: string;
    email: string;
    password: string;
    login: string;
    branchId: string;
    role: string;
}

export interface Roles {
    id: string;
    name: string;
}

export type UserLogin = Omit<Users, 'name' | 'lastName' | 'email'>;

export type Person = Omit<Users, 'id' | 'branchId' | 'role'>;