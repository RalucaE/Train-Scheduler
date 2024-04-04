import { Component } from '@angular/core';
import { Data, NavigationExtras, Router } from '@angular/router';
import { DataEmailRequest } from 'src/app/entity/DataEmailRequest';
import { SavedSeats } from 'src/app/entity/SavedSeats';
import { Ticket } from 'src/app/entity/Ticket';
import { TrainSeats } from 'src/app/entity/TrainSeats';
import { WagonSeats } from 'src/app/entity/WagonSeats';
import { User } from 'src/app/entity/user';
import { CheckoutService } from 'src/app/services/checkout.service';
import { UserService } from 'src/app/services/user.service';
import { WagonsService } from 'src/app/services/wagons.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent {

  stripePublicKey = 'pk_test_51N7dPgLkenDR0OlpAVkHPWOElRHOjyqvwKBjFmyoif2sze1m7rNbqNPjHoqONPgoOwVwvgQtqHJts5DvuAQ9bE4p00kh82yGTa';

  constructor(private checkoutService: CheckoutService, private userService: UserService, private router: Router, private wagonsService: WagonsService) { }

  tickets: Ticket[] = [];

  user: User = new User();



  dataEmailRequest: DataEmailRequest[]=[];

  savedSeats: TrainSeats[];
  trainId: number;
  trainsIdArray: number[];

  chargeRequest = {
    cardHolderName: '',
    email: '',
    number: null,
    expMonth: null,
    expYear: null,
    cvc: '',
    amount: null
  };


  
  isLoggedIn(): boolean {
    const token = localStorage.getItem('ACCESS_TOKEN');
    return token !== null;
  }

  ngOnInit(): void {
    if(this.isLoggedIn()) {
      this.userService.getUserInfo().subscribe(
        user => {
          this.user = user;
          this.chargeRequest.email = user.email;
        },
        error => {
          console.error(error);
        }
      )
    }
    const state = history.state;
    this.chargeRequest.amount = state.amount;
    this.tickets = state.tickets;
    this.savedSeats = state.seats;
    this.trainId = state.trainId;
    this.trainsIdArray = state.trainsIdArray;

    console.log("amount", this.chargeRequest.amount);
    console.log(this.tickets);
  }



  navigateToSuccessfulPage() {
    const navigationExtras: NavigationExtras = {
      state: { tickets: this.tickets, seats: this.savedSeats}
    };
    this.router.navigate(['/payment-successful'], navigationExtras);
  }


  async onSubmit() {
    console.log(this.chargeRequest);

    for (this.trainId of this.trainsIdArray) {
      this.savedSeats[this.trainId].savedSeats.forEach(seat =>{
        seat.wagonSeatsResponseList.forEach(seatState => {
          seatState.seatState=0;
        })
    });
    const response = await this.wagonsService.updateSeatsToAnyState(this.savedSeats[this.trainId].savedSeats).toPromise();
  }

    this.setDataEmailRequest();    
    this.checkoutService.charge(this.chargeRequest).subscribe({
      next: data => {
        console.log(data);
        this.userService.buyTicket(this.dataEmailRequest).subscribe({
          next:data => {
            console.log(data);
          },
          error: err => {
            console.log(err);
          }
        })
        this.navigateToSuccessfulPage();
      },
      error: err => {
        console.error(err);
      }
    })
  }

  setDataEmailRequest(){
    this.tickets.forEach(ticket=>{
      var dataEmailRequestTemp = new DataEmailRequest();
      dataEmailRequestTemp.classType = ticket.classType;
      dataEmailRequestTemp.email = ticket.email;
      dataEmailRequestTemp.passagerName= ticket.passagerName;
      dataEmailRequestTemp.prices = ticket.prices;
      dataEmailRequestTemp.ticketType = ticket.ticketType;
      dataEmailRequestTemp.trainRouteId =ticket.trainRouteId;
      dataEmailRequestTemp.timeUntilArrival = ticket.timeUntilArrival;
      this.dataEmailRequest.push(dataEmailRequestTemp);    
    });

    var contor=0;
    try{
      for(let i = 0; i < this.savedSeats.length;i++){
        for(let k=0;k < this.savedSeats[i].savedSeats.length;k++){
          for(let j =0; j < this.savedSeats[i].savedSeats[k].wagonSeatsResponseList.length; j++){
            this.dataEmailRequest[contor].seatNumbers=this.savedSeats[i].savedSeats[k].wagonSeatsResponseList[j].seatNumber;
            contor++;
          }
        }        
      }
    }catch(errorMessage: any){
      console.log(errorMessage);
    }
   
  }


}
