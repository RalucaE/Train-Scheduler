import { Trains } from "./Trains";

export class TrainRoutes{
    id: number;
    oraPlecare: string;
    oraSosire: string;
    orasDestinatie: string;
    orasOrigine: string;
    trenSchimbare1: Trains;
    trenSchimbare2: Trains;
    trenSchimbare3: Trains;
    trenSchimbare4: Trains;
    enableShowDetails: boolean;
    timeSpent: string;
    monthDeparture: string;
}