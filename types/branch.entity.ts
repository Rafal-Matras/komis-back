export interface Branch {
    id?: string;
    branchName: string;
    city: string;
    postCode: string;
    address: string;
    phone: string;
}

export interface BranchNames {
    id: string;
    name: string;
}

export interface Company {
    id?: number;
    name: string;
    city: string;
    postCode: string;
    address: string;
    phone: string;
    nip: string;
    regon: string;
}