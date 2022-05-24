export interface SimpleUser {
    name: string;
    lastName: string;
    email: string;
    login: string;
}

export interface User extends SimpleUser {
    id?: string;
    password: string;
    role: string;
    branchId: string;
}

export interface List extends SimpleUser {
    branchName: string;
}

export interface Roles {
    id: string;
    name: string;
}