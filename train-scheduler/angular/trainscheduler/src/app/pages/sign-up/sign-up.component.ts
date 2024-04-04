import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/entity/user';

import { UserService } from 'src/app/services/user.service';

import { FormGroup, FormControl, Validators } from '@angular/forms'; // Import Validators and related classes

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  user: User = new User();
  passwordPattern = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
  isRegexPattern=false;
  passwordForm: FormGroup = new FormGroup({
    password: new FormControl('', [Validators.required, Validators.pattern(this.passwordPattern)])
  });
  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {
  }

  onSubmit(): void {
    const password =this.user.password;
    const isPasswordValid = this.passwordPattern.test(password);

    if (!isPasswordValid) {
      this.isRegexPattern=true;
      return;
    }
    this.userService.register(this.user).subscribe(
      data => {
        console.log(data);
        this.isSuccessful = true;
        this.isSignUpFailed = false;
        this.isRegexPattern=false;
        const confirmationToken = data.message;
        localStorage.setItem("confirmationToken", confirmationToken);
      },
      err => {
        console.error(err);
        this.errorMessage = err.error.message;
        this.isSignUpFailed = true;
      }
      
    );
  }


}



