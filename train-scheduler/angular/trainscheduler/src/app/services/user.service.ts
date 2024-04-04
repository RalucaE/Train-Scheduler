import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../entity/user';
import { TicketHistory } from '../entity/TicketHistory';
import { Ticket } from '../entity/Ticket';
import { DataEmailRequest } from '../entity/DataEmailRequest';

@Injectable({
  providedIn: 'root',
})
export class UserService {

  baseUrl: string = "http://localhost:8080"

  constructor(private http: HttpClient) { }

  signin(user: User){
    return this.http.post<any>(`${this.baseUrl}/signin`, user);
  
  }

  register(user: User): Observable<any> {
    return this.http.post(`${this.baseUrl}/signup`, user);
  }

  isLoggedIn(): boolean {
    const token = localStorage.getItem('ACCESS_TOKEN');
    return token !== null;
  }

  getUserInfo(): Observable<User> {
    const token = localStorage.getItem('ACCESS_TOKEN');
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);
    return this.http.get<User>(`${this.baseUrl}/user-info`, {headers});
  }

  updateUserInfo(user: User): Observable<any> {
    const token = localStorage.getItem('ACCESS_TOKEN');
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);
    return this.http.put<User>(`${this.baseUrl}/user-info`, user,  {headers});
  }

  verifyToken(): Observable<any>{
    const token = localStorage.getItem('ACCESS_TOKEN');
    return this.http.post<any>(`${this.baseUrl}/verifytoken`, token);
  }

  logout(): Observable<any> {
    const token = localStorage.getItem('ACCESS_TOKEN');
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);
    return this.http.post<any>(`${this.baseUrl}/signout`, null, {headers});
  }

  getUserEmail(): Observable<string> {
    const token = localStorage.getItem('ACCESS_TOKEN');
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);
    return this.http.get(`${this.baseUrl}/getUserEmail`, {headers, responseType: 'text'});
  }

  checkStudentId(studentId: string): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/checkStudentId`, {studentId, responseType: 'text'});
  }

  checkPupilId(pupilId: string): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/checkPupilId`, {pupilId, responseType: 'text'});
  }
  
  buyTicket(buyRequest: DataEmailRequest[]): Observable<any> {
    const token = localStorage.getItem('ACCESS_TOKEN');
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);
    return this.http.post<any>(`${this.baseUrl}/buyTicketAndSendEmail`, buyRequest,{headers});
  }

  getHistory(): Observable<TicketHistory[]>{
    const token = localStorage.getItem('ACCESS_TOKEN');
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);
    return this.http.get<TicketHistory[]>(`${this.baseUrl}/getHistory`,{headers});

  }

  confirmAccount(confirmationToken: string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/confirm?token=${confirmationToken}`);
  }

}
