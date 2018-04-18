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
                comment: string = 'commentcomment\ncommentcomment\ncommentcomment',
                driverFirstName: string = 'matt',
                driverName: string = 'demi',
                driverPhoneNumber: string = '0601020304',
                driverEmail: string = 'driverEmail@driverEmail.fr',
                fromCity: string = 'from',
                toCity: string = 'to') {
        return {
            id: id,
            driverFirstName,
            driverName,
            driverPhoneNumber,
            driverEmail,
            fromCity,
            toCity,
            freeSeats: 0,
            comment
        };
    }
}

export interface PresenceResponse {
    id: string;
    who: string;
    phoneNumber: string;
    email: string;
    nbPersons: string;
    nbPorkPersons: string;
    nbVeganPersons: string;
    whenSaturdayMorning: boolean;
    whenSaturdayLunch: boolean;
    whenSaturdayDiner: boolean;
    whenSundayLunch: boolean;
    commentSundayLunchInfo: string;
    comment: string;
}