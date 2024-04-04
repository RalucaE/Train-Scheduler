import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { MatMenu } from '@angular/material/menu';
import { UserService } from '../services/user.service';
import { Observable, catchError, of, tap } from 'rxjs';
import { Router } from '@angular/router';
import { User } from '../entity/user';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

export class HeaderComponent implements OnInit{
  @ViewChild('menu') menu!: MatMenu;

  constructor(private userService: UserService, private router: Router, private elementRef: ElementRef) { }

  user: User = new User();
  isClicked = false;

  ngOnInit(): void {
      this.userService.getUserInfo().subscribe(
        response => {
          this.user=response;
        },
        error => {
          console.error(error);
        }
      )
  }


  handleClick() {
    this.isClicked = true;
  }

  @HostListener('document:click', ['$event.target'])
  onClickOutside(targetElement: any) {
    const isClickedOutside = !this.elementRef.nativeElement.contains(targetElement);

    if (isClickedOutside) {
      this.isClicked = false;
    }
  }

  getFirstName(): string {
    if(!this.user.fullName || this.user.fullName.trim() === '') {
      return this.user.username;
    } else {
      return this.user.fullName.split(' ')[0];
    }
  }

  logout(event: Event) {
    event.preventDefault();

    this.userService.logout().subscribe(
      response => {
        console.log(response);
        localStorage.removeItem('ACCESS_TOKEN');
        localStorage.removeItem('REFRESH_TOKEN');
        this.router.navigate(['/login']);
      }, 
      error => {
        console.error(error);
      }
    )
  }

  isLoggedIn(): boolean {
    const token = localStorage.getItem('ACCESS_TOKEN');
    return token !== null;
  }

}
