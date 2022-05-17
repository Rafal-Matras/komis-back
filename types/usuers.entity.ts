export interface Users {
    id?: string;
    name: string;
    lastName: string;
    email: string;
    password: string;
    login: string;
    role: string;
    branchId: string;
}

export interface Roles {
    id: string;
    name: string;
}

export type UserShow = Omit<Users, 'id' | 'password' | `branchId` | 'role'>

export type UserLogin = Omit<Users, 'name' | 'lastName' | 'email'>;

export type Person = Omit<Users, 'id'>;