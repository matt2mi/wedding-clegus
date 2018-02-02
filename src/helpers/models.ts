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
    displayDetails?: boolean;

    constructor(id: string = 'id',
                driverFirstName: string = 'matt',
                driverName: string = 'demi',
                fromCity: string = 'from',
                toCity: string = 'to') {
        return {
            id: id,
            driverFirstName: driverFirstName,
            driverName: driverName,
            driverPhoneNumber: '',
            driverEmail: '',
            fromCity: fromCity,
            toCity: toCity,
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