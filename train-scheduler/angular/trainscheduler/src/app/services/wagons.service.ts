import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Wagon } from '../entity/Wagon';
import { WagonSeats } from '../entity/WagonSeats';
import { SavedSeats } from '../entity/SavedSeats';

@Injectable({
  providedIn: 'root'
})
export class WagonsService {

  baseUrl: string = "http://localhost:8080";
  wagonSeatsRequests: SavedSeats[];

  constructor(private http: HttpClient) { }
  
  getWagonsById(id: number): Observable<number[][]> {
    return this.http.get<number[][]>(`${this.baseUrl}/get_wagons?id=${id}`);
  }
  getSeatsById(id: number): Observable<WagonSeats[]> {
    return  this.http.get<WagonSeats[]>(`${this.baseUrl}/get_seats?id=${id}`);
  }

  updateSeats(wagonSeatsRequests: SavedSeats[]):Observable<any> {
    return this.http.put<SavedSeats[]>(`${this.baseUrl}/update_seats`,wagonSeatsRequests);
  }
  updateSeatsToAnyState(wagonSeatsRequests: SavedSeats[]):Observable<any> {
    return this.http.put<SavedSeats[]>(`${this.baseUrl}/updateSeatsToAnyState`,wagonSeatsRequests);
  }
}
