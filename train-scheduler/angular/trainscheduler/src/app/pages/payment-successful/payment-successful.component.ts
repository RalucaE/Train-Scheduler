import { Component, OnInit } from '@angular/core';
import { TokenService } from 'src/app/services/token.service';
import jwt_decode from 'jwt-decode';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { TokenexpirationdialogComponent } from '../tokenexpirationdialog/tokenexpirationdialog.component';
import { SavedSeats } from 'src/app/entity/SavedSeats';

@Component({
  selector: 'app-payment-successful',
  templateUrl: './payment-successful.component.html',
  styleUrls: ['./payment-successful.component.css']
})
export class PaymentSuccessfulComponent implements OnInit{
  loading: boolean = true;
  redirecting: boolean = false;
  savedSeats: SavedSeats[];
  ngOnInit() {
    setTimeout(() => {
      this.loading = false;
      setTimeout(() => {
        this.redirecting = true;
        window.location.href = '/home';
      }, 3000);
    }, Math.floor(Math.random() * 4000) + 6000);
  }

}
