import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-account-confirmation',
  templateUrl: './account-confirmation.component.html',
  styleUrls: ['./account-confirmation.component.css']
})
export class AccountConfirmationComponent implements OnInit{

  constructor(private userService: UserService, private router: Router) { }

  message: string;
  confirmationToken: string;

  ngOnInit(): void {
      this.confirmationToken = localStorage.getItem("confirmationToken");
      console.log(this.confirmationToken);
      this.confirmAccount();
  }

  confirmAccount(): void {
    this.userService.confirmAccount(this.confirmationToken).subscribe(
      response => {
        console.log(response);
        this.message = response.message;
        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 5000);
      },
      error => {
        console.error(error);
        this.message = error.error;
      }
    );
  }

}
