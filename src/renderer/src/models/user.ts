export enum Roles{
    USER,
    ADMIN
}

export interface IUser{
    _id: string,
    login: string,
    email: string,
    password: string,
    role: Roles[],
    predges: string,
    balance: number,
    basket: string
}