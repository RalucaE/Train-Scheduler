import { CityDistants } from "./CityDistants";
import { Stations } from "./Stations";

export class Trains{
    id: number;
    numarTren: string;
    orasOrigine: string;
    oraPlecare: string;
    oraSosire: string;
    orasDestinatie: string;
    dataTime: string;
    stations: Stations[] ;
    cityDistans: CityDistants[];
    showStations: boolean;
    totalKilometers: number;
    classType: number;
    firstClass: boolean;
    secondClass:boolean;
    cuseta: boolean;
    bicicleta: boolean;
    
}


