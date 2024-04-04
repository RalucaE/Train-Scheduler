import { Component } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';

import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/entity/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent  {
  
  showWrongCredentials: boolean;

  constructor(private userService: UserService, private router: Router, private route:ActivatedRoute) { }

  ngOnInit(){
    this.showWrongCredentials=false;
  }

  signin(loginForm: NgForm){
    let user: User = loginForm.value;
    this.userService.signin(user).subscribe(response => {
      console.log(response);
      if (response.validation) {
        localStorage.setItem("ACCESS_TOKEN", response["accessToken"]);
        localStorage.setItem("REFRESH_TOKEN", response["refreshToken"]);
        this.route.queryParams.subscribe(params => {
          const returnUrl = params['returnUrl'];
          if(returnUrl) {
            window.location.href = returnUrl;
          } else {
            window.location.href = '/home';
          }
        })
      } else {
        window.location.href = '/signup';
      }
    },(error: HttpErrorResponse)=>{
      this.showWrongCredentials=true;
      console.log(error.message);
    }
    );

  }
}
