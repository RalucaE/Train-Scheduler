import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { SavedSeats } from 'src/app/entity/SavedSeats';
import { Ticket } from 'src/app/entity/Ticket';
import { TrainSeats } from 'src/app/entity/TrainSeats';
import { User } from 'src/app/entity/user';
import { UserService } from 'src/app/services/user.service';
import { MatDialog } from '@angular/material/dialog';
import { GobackwarningdialogComponent } from '../gobackwarningdialog/gobackwarningdialog.component';
import { WagonsService } from 'src/app/services/wagons.service';

@Component({
  selector: 'app-passenger-info',
  templateUrl: './passenger-info.component.html',
  styleUrls: ['./passenger-info.component.css']
})
export class PassengerInfoComponent implements OnInit {

  constructor(private userService: UserService, private router: Router, private route:ActivatedRoute, public dialog: MatDialog,private wagonsService: WagonsService) { }

  adultUser: User = new User();
  adultUsers: User[] = [];
  childUser: User = new User();
  childrenUsers: User[] = [];
  pupilUser: User = new User();
  pupilUsers: User[] = [];
  studentUser: User = new User();
  studentUsers: User[] = [];
  pensionerUser: User = new User();
  pensionerUsers: User[] = [];

  ticketTypes: any[] = [];

  classType: number;
  ticketAdult: number;
  ticketChildren: number;
  ticketPupils: number;
  ticketStudents: number;
  ticketPensioners: number;
  totalToPay: number;

  price: number;

  routeId: number;

  userEmail: string;

  isSuccessful: boolean = true;
  isSignUpFailed = false;

  errorMessage: string;

  prices: any[] = [];

  adults: Ticket[] = [];
  children: Ticket[] = [];
  pupils: Ticket[] = [];
  students: Ticket[] = [];
  pensioners: Ticket[] = [];

  pricePerTrain: number[] = [];
  timePerTrain: string[] = [];

  
  showScrollIndicator = false;
  @ViewChildren('f') formList: QueryList<any>;

  savedSeats: TrainSeats[];
  trainId: number;
  trainsIdArray: number[];

  ngOnInit() {
    const state = history.state;
    this.routeId = state.routeId;
    this.classType = state.classType;
    this.ticketAdult = state.ticketAdult;
    this.ticketChildren = state.ticketChildren;
    this.ticketPupils = state.ticketPupils;
    this.ticketStudents = state.ticketStudents;
    this.ticketPensioners = state.ticketPensioners;
    this.price = state.price;
    this.initializeAdultUsers(this.ticketAdult);
    this.initializeChildrenUsers(this.ticketChildren);
    this.initializePupilUsers(this.ticketPupils);
    this.initializeStudentUsers(this.ticketStudents);
    this.initializePensionerUsers(this.ticketPensioners);
    this.pricePerTrain = state.pricesPerTrain;
    this.timePerTrain = state.timePerTrain;
    this.savedSeats = state.seats;
    this.trainId = state.trainId;
    this.trainsIdArray = state.trainsIdArray;
    // this.getTicketTypes();
    this.userService.getUserEmail().subscribe({
      next: email => {
        this.userEmail = email;
        console.log("logged in user's email:", this.userEmail);
      },
      error: err => {
        console.error(err);
      }
    })

    this.showScrollToTopButton();
  }


  calculatePrice(): number {
    this.totalToPay = this.ticketAdult * 1 * this.price + this.ticketChildren * 0.45 * this.price + this.ticketPupils * 0 * this.price
     + this.ticketStudents * 0.5 * this.price + this.ticketPensioners * 0.25 * this.price;

     if(this.classType == 1) {  
      this.totalToPay *= 2;
     }
     
     return parseFloat(this.totalToPay.toFixed(2));
  }

  initializeAdultUsers(numUsers: number) {
    this.adultUsers = [];
    for (let i = 0; i < numUsers; i++) {
      this.adultUsers.push(new User());
    }
  }

  initializeChildrenUsers(numUsers: number) {
    this.childrenUsers = [];
    for (let i = 0; i < numUsers; i++) {
      this.childrenUsers.push(new User());
    }
  }

  initializePupilUsers(numUsers: number) {
    this.pupilUsers = [];
    for (let i = 0; i < numUsers; i++) {
      this.pupilUsers.push(new User());
    }
  }

  initializeStudentUsers(numUsers: number) {
    this.studentUsers = [];
    for (let i = 0; i < numUsers; i++) {
      this.studentUsers.push(new User());
    }
  }

  initializePensionerUsers(numUsers: number) {
    this.pensionerUsers = [];
    for (let i = 0; i < numUsers; i++) {
      this.pensionerUsers.push(new User());
    }
  }

  getTicketTypes(): string[] {
    for (let i = 0; i < this.ticketAdult; i++) {
      this.ticketTypes.push("Adult");
    }

    for (let i = 0; i < this.ticketChildren; i++) {
      this.ticketTypes.push("Children");
    }

    for (let i = 0; i < this.ticketPupils; i++) {
      this.ticketTypes.push("Pupil");
    }

    for (let i = 0; i < this.ticketStudents; i++) {
      this.ticketTypes.push("Student");
    }

    for (let i = 0; i < this.ticketPensioners; i++) {
      this.ticketTypes.push("Pensioner");
    }
    console.log("TicketTypes:", this.ticketTypes);
    return this.ticketTypes;
  }

  checkStudentIdExists() {
    for (let i = 0; i < this.studentUsers.length; i++) {
      const studentId = this.studentUsers[i].studentId;
      this.userService.checkStudentId(studentId).subscribe(response => {
        this.onSubmit();
      }, error => {
        console.error(error);
      });
    }
  }

  navigateToCheckout(): void {
    const navigationExtras: NavigationExtras = {
      state: { amount: this.calculatePrice() , tickets: this.createTickets(), seats: this.savedSeats, trainId: this.trainId,trainsIdArray: this.trainsIdArray }
    };
    this.router.navigate(['/checkout'], navigationExtras);
  }

  async onSubmit(): Promise<void> {
    let isStudentValid = true;
    let isPupilValid = true;
    let passengerList: any[] = [];
    let allUsers = this.adultUsers.concat(this.childrenUsers, this.pupilUsers, this.studentUsers, this.pensionerUsers);
    for (let user of allUsers) {
      passengerList.push(user.fullName);
    }
    
  
    for (let i = 0; i < this.studentUsers.length; i++) {
      const studentId = this.studentUsers[i].studentId;
  
      try {
        await this.userService.checkStudentId(studentId).toPromise();
      } catch (err: any) {
        console.log(err);
        this.errorMessage = err.error.message;
        this.isSuccessful = false;
        isStudentValid = false;
        break;
      }
    }

    for (let i = 0; i < this.pupilUsers.length; i++) {
      const pupilId = this.pupilUsers[i].pupilId;
  
      try {
        await this.userService.checkPupilId(pupilId).toPromise();
      } catch (err: any) {
        console.log(err);
        this.errorMessage = err.error.message;
        this.isSuccessful = false;
        isPupilValid = false;
        break;
      }
    }
  
    if (isStudentValid && isPupilValid) {
      // this.userService.buyTicket(this.routeId, this.userEmail, passengerList, this.prices, this.ticketTypes, this.classType).subscribe({
      //   next: data => {
      //     console.log(data);
          this.navigateToCheckout();
          const tickets = this.createTickets();
          console.log("list", tickets);
      //   },
      //   error: err => {
      //     console.log(err);
      //     this.errorMessage = err.error.message;
      //     this.isSuccessful = false;
      //   }
      // });
    }
  }
  
  showScrollToTopButton(): void {
    setTimeout(() => {
      const element = document.getElementById("form")!;
      this.showScrollIndicator = element.scrollHeight > element.clientHeight;
      const back = document.querySelector('.back') as HTMLDivElement;
      back.style.display = this.showScrollIndicator ? "unset" : "none";
    }, 100);
  }

  scrollToTop(): void {
    const element = document.getElementById("form")!;
    element.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  }
  
  createTickets(): Ticket[] {
    const adultTickets: Ticket[] = [];
    for(let i=0; i< this.trainsIdArray.length; i++ ){
      for(let j = 0; j < this.adultUsers.length; j++) {
        const adult: Ticket = {
          trainRouteId: this.routeId,
          email: this.userEmail,
          passagerName: this.adultUsers[j].fullName,
          prices: this.pricePerTrain.map(price => price * 1),
          ticketType: 'Adult',
          classType: this.classType,
          timeUntilArrival: this.timePerTrain
        }
        adultTickets.push(adult);
      }
    }
    
    
    const childrenTickets: Ticket[] = [];
    for(let i=0; i< this.trainsIdArray.length; i++ ){
      for(let i = 0; i < this.childrenUsers.length; i++) {
        const child: Ticket = {
          trainRouteId: this.routeId,
          email: this.userEmail,
          passagerName: this.childrenUsers[i].fullName,
          prices: this.pricePerTrain.map(price => price * 0.45),
          ticketType: 'Child',
          classType: this.classType,
          timeUntilArrival: this.timePerTrain
        }
        childrenTickets.push(child);
      }
    }
    

    const pupilTickets: Ticket[] = [];
    for(let i=0; i< this.trainsIdArray.length; i++ ){
      for(let i = 0; i < this.pupilUsers.length; i++) {
        const pupil: Ticket = {
          trainRouteId: this.routeId,
          email: this.userEmail,
          passagerName: this.pupilUsers[i].fullName,
          prices: this.pricePerTrain.map(price => price * 0),
          ticketType: 'Pupil',
          classType: this.classType,
          timeUntilArrival: this.timePerTrain
        }
        pupilTickets.push(pupil);
      }
    }
    

    const studentTickets: Ticket[] = [];
    for(let i=0; i< this.trainsIdArray.length; i++ ){
      for(let i = 0; i < this.studentUsers.length; i++) {
        const student: Ticket = {
          trainRouteId: this.routeId,
          email: this.userEmail,
          passagerName: this.studentUsers[i].fullName,
          prices: this.pricePerTrain.map(price => price * 0.5),
          ticketType: 'Student',
          classType: this.classType,
          timeUntilArrival: this.timePerTrain
        }
        studentTickets.push(student);
      }
    }
   

    const pensionerTickets: Ticket[] = [];
    for(let i=0; i< this.trainsIdArray.length; i++ ){
      for(let i = 0; i < this.pensionerUsers.length; i++) {
        const pensioner: Ticket = {
          trainRouteId: this.routeId,
          email: this.userEmail,
          passagerName: this.pensionerUsers[i].fullName,
          prices: this.pricePerTrain.map(price => price * 0.25),
          ticketType: 'Pensioner',
          classType: this.classType,
          timeUntilArrival: this.timePerTrain
        }
        pensionerTickets.push(pensioner);
      }
    }
   

    const allTickets: Ticket[] = adultTickets.concat(childrenTickets, pupilTickets, studentTickets, pensionerTickets);

    return allTickets;
  }

  // async openDialog(){
  //   const dialogRef = this.dialog.open(GobackwarningdialogComponent, {
  //     width: '250px',
  //   });

  //   dialogRef.afterClosed().subscribe(result => {
  //     if (result) {
  //       this.savedSeats.forEach(savedSeat => {
  //         savedSeat.savedSeats.forEach(seat => {
  //           seat.wagonSeatsResponseList.forEach(wagonSeat => {
  //             wagonSeat.seatState=2;
  //           })
  //         })
  //       });
  //       this.wagonsService.updateSeatsToAnyState(this.savedSeats[this.trainId].savedSeats).subscribe(response=>{
  //         console.log(response);
  //       },error =>{
  //         const messages = {
  //           statusCode: error.statusCode,
  //         };
  //         this.router.navigate(['/404'], { queryParams: messages });
  //       }); 
  //       const navigationExtras: NavigationExtras = {
  //         state: {
  //           routeId: this.routeId,
  //           classType: this.classType,
  //           ticketAdult: this.ticketAdult,
  //           ticketChildren: this.ticketChildren,
  //           ticketPupils: this.ticketPupils,
  //           ticketStudents: this.ticketStudents,
  //           ticketPensioners: this.ticketPensioners,
  //           price: this.calculatePrice(),
  //         }
  //        };
  //        this.router.navigate(['/select-seat'], navigationExtras);

  //       console.log('User confirmed.');
  //     } else {
  //       // User clicked Cancel or closed the dialog
  //       console.log('User cancelled.');
  //     }
  //   });
  // }
  
}