export interface RegisteredUsers {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    username: string;
    password: string;
    mobileNumber: string;
}

export interface LoggedInUsers {    
    username: string;
    password: string;    
}

export interface AccessToken {
    token: string;
}