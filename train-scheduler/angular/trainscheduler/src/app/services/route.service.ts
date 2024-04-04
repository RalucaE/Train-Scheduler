import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Route } from '../entity/Route';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RouteService {

  baseUrl: string = "http://localhost:8080";

  constructor(private http: HttpClient) { }
  
  searchRoute(route: Route): Observable<Route>{
    console.log('Ruta:', route);
    return this.http.post<Route>(`${this.baseUrl}/searchRoute`,route);
  }

  private messageSource = new BehaviorSubject<boolean>(null!);
  currentMessage = this.messageSource.asObservable();

  sendCheckBoxStatus( checked: boolean) {
    this.messageSource.next(checked);
  }
}
