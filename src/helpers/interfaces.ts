export interface Journey {
    id: string;
    name: string;
    fromCity: string;
    toCity: string;
    freeSeats: number;
    totalSeats: number;
    price: number;
    driverPhoneNumber: string;
}

export interface PresenceResponse {
    id: string;
    name: string;
    firstname: string;
    nbPersons: number;
    phoneNumber: string;
}