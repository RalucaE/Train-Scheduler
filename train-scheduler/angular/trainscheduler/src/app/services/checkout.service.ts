import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {

  private baseUrl = "http://localhost:8080";

  constructor(private http: HttpClient) { }

  charge(chargeRequest: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/charge`, chargeRequest);
  }
}
