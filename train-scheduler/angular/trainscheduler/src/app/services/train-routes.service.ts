import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TrainRoutes } from '../entity/TrainRoutes';
import { Observable } from 'rxjs';
import { Trains } from '../entity/Trains';

@Injectable({
  providedIn: 'root'
})
export class TrainRoutesService {

  baseUrl: string = "http://localhost:8080"
  constructor(private http: HttpClient) { }

  getTrainRoutes(orasOrigine: string | null, orasDestinatie: string | null, dateTime: string | null): Observable<TrainRoutes[]>{
    return this.http.get<TrainRoutes[]>(`http://localhost:8080/GetTrainRoutes?orasOrigine=${orasOrigine}&orasDestinatie=${orasDestinatie}&dateTime=${dateTime}`);
  }
  getTrainRouteById(id: number): Observable<TrainRoutes> {
    return this.http.get<TrainRoutes>(`${this.baseUrl}/getTrainRoute?trainRoute=${id}`);
  }

  getTrains(): Observable<Trains[]>{
    return this.http.get<Trains[]>(`http://localhost:8080/GetAllTrains`);
  }

  getHistoryElement(id: number): Observable<any>{
    const token = localStorage.getItem('ACCESS_TOKEN');
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);
    return this.http.get<any>(`http://localhost:8080/createPdfToDownload?id=${id}`,{headers});
  }
}
