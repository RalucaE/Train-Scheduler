import { Injectable } from '@angular/core';
import jwt_decode from 'jwt-decode';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { TokenexpirationdialogComponent } from '../pages/tokenexpirationdialog/tokenexpirationdialog.component';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})

export class TokenexpirationService {

  timeRemaining: number;
  showPopup: boolean = false;
  timer: any;
  dialogRef: MatDialogRef<TokenexpirationdialogComponent> | null = null;

  private remainingTimeSubject: BehaviorSubject<number> = new BehaviorSubject<number>(0);

  constructor(private dialog: MatDialog, private router: Router) {}
  
  initialize() {
    this.checkTokenExpiration();
    this.startTimer();
  }

  checkTokenExpiration() {
    const token = localStorage.getItem('ACCESS_TOKEN');
    if (token) {
      const decodedToken: any = jwt_decode(token);
      const expirationTime = decodedToken.exp * 1000; // Convert expiration time to milliseconds
      const currentTime = Date.now();
      const timeDifference = expirationTime - currentTime;
      this.timeRemaining = Math.ceil(timeDifference / 1000); // Convert time difference to seconds
      console.log(token);
      console.log('Token expiration:', this.timeRemaining, 'seconds remaining');
    }
  }

  startTimer() {
    this.timer = setInterval(() => {
      this.timeRemaining--; // Decrement the remaining time every second
      this.remainingTimeSubject.next(this.timeRemaining); // Emit the updated remaining time

      if (this.timeRemaining <= 60 && this.timeRemaining >=0 && !this.showPopup) {
        this.showPopup = true;
        this.openTokenExpirationDialog();
      }

      if (this.timeRemaining <= 0) {
        this.logout();
      }
    }, 1000);
  }

  openTokenExpirationDialog() {
    const dialogConfig: MatDialogConfig = {
      width: '450px',
      panelClass: 'centered-dialog',
      disableClose: true,
      data: { timeRemaining: this.remainingTimeSubject }
    };
    const dialogRef = this.dialog.open(TokenexpirationdialogComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.dialogRef = null;
    });
  }

  logout() {
    this.clearTimer();
    localStorage.removeItem('ACCESS_TOKEN');
    localStorage.removeItem('REFRESH_TOKEN');
    if (this.dialogRef) {
      this.dialogRef.close(); // Close the dialog
    }
    window.location.href = '/login';
  }

  clearTimer(): void {
    clearInterval(this.timer);
  }

}
