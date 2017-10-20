export class User {
    id: string;
    username: string;
    password: string;
    firstName: string;
    lastName: string;
    destination?:string;
    role:userRole;
}

export enum userRole {
    Passenger,
    driver
}