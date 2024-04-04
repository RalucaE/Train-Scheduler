import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-not-logged-in-modal',
  templateUrl: './not-logged-in-modal.component.html',
  styleUrls: ['./not-logged-in-modal.component.css']
})
export class NotLoggedInModalComponent {

  constructor(public dialogRef: MatDialogRef<NotLoggedInModalComponent>, private router: Router) { }

  redirectToLogin(): void {
    this.dialogRef.close();
    const returnUrl = this.router.url;
    this.router.navigate(['/login'], { queryParams: { returnUrl } });
  }
  

  closeModal(): void {
    this.dialogRef.close();
  }

}
