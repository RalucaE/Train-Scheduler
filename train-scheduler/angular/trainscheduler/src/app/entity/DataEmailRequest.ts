import { WagonSeats } from "./WagonSeats";

export class DataEmailRequest {
    trainRouteId: number;
    email: string;
    passagerName: string;
    prices: any[];
    ticketType: string;
    classType: number;
    timeUntilArrival: any[];
    seatNumbers: Number;
}