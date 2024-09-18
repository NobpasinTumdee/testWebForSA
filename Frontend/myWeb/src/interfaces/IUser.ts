export interface UsersInterface {
    ID?: number;
    email?: string;
    username?: string;
    password?: string;
    status?: string;
    firstname?: string;
    lastname?: string;
    GenderID?: string;
    gender?: string;
    age?:string;
    phonenumber?: string;
}

export interface GenderInterface {
    ID?: number;
    gender?: string;
}