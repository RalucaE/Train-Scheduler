import { Component, Inject } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { TokenService } from 'src/app/services/token.service';
import { UserService } from 'src/app/services/user.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { TokenexpirationService } from 'src/app/services/tokenexpiration.service';

@Component({
  selector: 'app-tokenexpirationdialog',
  templateUrl: './tokenexpirationdialog.component.html',
  styleUrls: ['./tokenexpirationdialog.component.css']
})
export class TokenexpirationdialogComponent {

  timeRemaining: Observable<number>;

  constructor(
    private tokenService: TokenService,
    private tokenExpirationService: TokenexpirationService, 
    private dialogRef: MatDialogRef<TokenexpirationdialogComponent>, 
    private router: Router,
    @Inject(MAT_DIALOG_DATA) public data: any) {
      this.timeRemaining = data.timeRemaining 
    }

  refreshToken(): void {
    this.tokenService.refreshToken().subscribe(
      data => {
        console.log(data);
        this.tokenExpirationService.clearTimer();
      },
      error => {
        console.error(error);
      }
    )
    this.dialogRef.close();
  }

  logout() {
    this.tokenExpirationService.clearTimer();
    localStorage.removeItem('ACCESS_TOKEN');
    localStorage.removeItem('REFRESH_TOKEN');
    this.dialogRef.close();
    window.location.href = '/login';
  }

}
