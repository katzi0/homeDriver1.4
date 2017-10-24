export class User {
    email: string;
    // username: string;
    password: string;
    firstName: string;
    lastName: string;
    destination?:string;
    role:userRole;
}

export interface userRole {
    Passenger:boolean;
    Driver?:boolean;
    Admin?:boolean;
}
