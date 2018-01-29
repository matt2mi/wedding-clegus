export interface Journey {
    id: string;
    driverFirstName: string;
    driverName: string;
    driverPhoneNumber: string;
    driverEmail: string;
    fromCity: string;
    toCity: string;
    freeSeats: number;
    comment: string;
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