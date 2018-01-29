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

export interface City {
    nom: string;
    code: string;
    codeDepartement: string;
    codeRegion: string;
    codesPostaux: string[];
    population: number;
    _score: number;
}
