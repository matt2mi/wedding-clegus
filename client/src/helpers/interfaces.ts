export interface Journey {
  id: number;
  name: string;
  fromCity: string;
  toCity: string;
  freeSeats: number;
  totalSeats: number;
  price: number;
  driverPhoneNumber: string;
}