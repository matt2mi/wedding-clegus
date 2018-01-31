export class Journey {
    id: string;
    driverFirstName: string;
    driverName: string;
    driverPhoneNumber: string;
    driverEmail: string;
    fromCity: string;
    toCity: string;
    freeSeats: number;
    comment: string;

    constructor() {
        return {
            id: '',
            driverFirstName: '',
            driverName: '',
            driverPhoneNumber: '',
            driverEmail: '',
            fromCity: '',
            toCity: '',
            freeSeats: 0,
            comment: ''
        };
    }
}

export interface PresenceResponse {
    id: string;
    name: string;
    firstname: string;
    phoneNumber: string;
    email: string;
    nbPersons: string;
    nbVeganPersons: string;
    comment: string;
}