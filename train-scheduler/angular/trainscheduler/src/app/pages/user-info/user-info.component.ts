import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/entity/user';

import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.css']
})
export class UserInfoComponent implements OnInit{

  user: User = new User();

  isSuccessful = false;
  errorMessage = '';

  constructor(public userService: UserService, private router: Router) { }

  isLoggedIn(): boolean {
    const token = localStorage.getItem('ACCESS_TOKEN');
    return token !== null;
  }

  ngOnInit(): void {
    if(this.isLoggedIn()) {
      this.userService.getUserInfo().subscribe(
        user => {
          this.user = user,
          console.log(user);
        },
        error => {
          console.error(error);
          
        }
      );
    }else{
      this.router.navigate(['/login']);
    }
  }

  onSubmit(): void{
    this.userService.updateUserInfo(this.user).subscribe({
      next: data => {
        console.log(data);
        this.isSuccessful = true;
      },
      error: err => {
        this.errorMessage = err.error.message;
      }
      
    });
  }





}
