import { User } from "./user";

export class TicketHistory{
    id: number;
    pret: string;
    numarTren: string;
    orasPlecare: string;
    orasSosire: string;
    oraPlecare: string;
    oraSosire: string;
    numePasager: string;
    dataCumparareTicket: string;
    classType: string;
    tipTicket: string;
    user: User;
}