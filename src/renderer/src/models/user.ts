export enum Roles{
    USER,
    ADMIN
}

export interface IUser{
    _id: string,
    login: string,
    email: string,
    password: string,
    roles: Roles[],
    pledge: string,
    balance: number,
    basket: string
}
