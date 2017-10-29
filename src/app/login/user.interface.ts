export class User {
    email: string;
    uid?: string;
    id?: string;
    // username: string;
    password: string;
    firstName: string;
    lastName: string;
    destination?:string;
    role:userRole;
    numOfSeats?:number;
}

export interface userRole {
    Passenger:boolean;
    Driver?:boolean;
    Admin?:boolean;
}
