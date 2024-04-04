import { Component } from '@angular/core';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';
import { TrainRoutes } from 'src/app/entity/TrainRoutes';
import { Trains } from 'src/app/entity/Trains';
import { TrainRoutesService } from 'src/app/services/train-routes.service';

@Component({
  selector: 'app-ticket-type-selection',
  templateUrl: './ticket-type-selection.component.html',
  styleUrls: ['./ticket-type-selection.component.css']
})
export class TicketTypeSelectionComponent {

  ticketAdult = 0;
  ticketChildren = 0;
  ticketPupils = 0;
  ticketStudents = 0;
  ticketPensioners = 0;
  numberOfTickets=0;

  classType = 2;

  trainRoute: TrainRoutes;
  trains: Trains[] = [];
  totalKm: number;
  price = 0;
  totalToPay = 0;

  isSuccessful= false;

  routeId: number;

  pricesPerTrain: number[] = [];
  timePerTrain: string[] = [];

  showScrollIndicator = false;

  constructor(private trainRoutesService: TrainRoutesService, private router: Router,private activeRoute: ActivatedRoute) { }
   
  async ngOnInit() {
    this.activeRoute.queryParamMap.subscribe(params=>{
      this.routeId= Number(params.get("trainRoute"));
    })
    const response = this.trainRoutesService.getTrainRouteById(this.routeId).subscribe(response=>{
      this.trainRoute=response;
    });
   
    this.showScrollToTopButton();
  }

  calculatePrice(): number {
    const listOfChangeTrains =  [this.trainRoute?.trenSchimbare1, this.trainRoute?.trenSchimbare2, this.trainRoute?.trenSchimbare3, this.trainRoute?.trenSchimbare4].filter(tren=> tren!==null);
    listOfChangeTrains.forEach(train => {
      train?.stations.sort((a, b) => a.id - b.id);
    });

    this.totalKm = 0;
    this.price = 0;
    listOfChangeTrains.forEach(train => {
      train.cityDistans.forEach(city =>{
         this.totalKm = this.totalKm + city.km;
      }); 
    });

    this.price = Number((this.totalKm * 0.25).toFixed(2));
  
    return this.price;
  }

  calculatePricePerTrain(): number[] {
    const listOfChangeTrains = [this.trainRoute?.trenSchimbare1, this.trainRoute?.trenSchimbare2, this.trainRoute?.trenSchimbare3, this.trainRoute?.trenSchimbare4].filter(tren => tren !== null);
    listOfChangeTrains.forEach(train => {
      train?.stations.sort((a, b) => a.id - b.id);
    });
  
    this.totalKm = 0;
    listOfChangeTrains.forEach(train => {
      let trainKm = 0; // Distance traveled by train
      train.cityDistans.forEach(city => {
        trainKm += city.km;
        this.totalKm += city.km;
      });
      const trainPrice = Number((trainKm * 0.25).toFixed(2)); // Price per train
      this.pricesPerTrain.push(trainPrice); // Add price to the list
    });
    
    return this.pricesPerTrain;
  }
  

  incrementClass() {
    if(this.classType < 2) {
      this.classType++;
    }
  }

  decrementClass() {
    if(this.classType > 1)
    this.classType--;
  }

  increment(inputNumber: number) {

    if(!this.ticketsExceeded) {
      if(inputNumber === 1){
        this.ticketAdult++;
        this.numberOfTickets++;
      } else if(inputNumber === 2) {
        this.ticketChildren++;
        this.numberOfTickets++;
      } else if(inputNumber === 3) {
        this.ticketPupils++;
        this.numberOfTickets++;
      } else if(inputNumber === 4) {
        this.ticketStudents++;
        this.numberOfTickets++;
      } else if(inputNumber === 5) {
        this.ticketPensioners++;
        this.numberOfTickets++;
      }
    }
  }

  decrement(inputNumber: number) {

    if(inputNumber === 1 && this.ticketAdult > 0){
      this.ticketAdult--;
      this.numberOfTickets--;
    } else if (inputNumber === 2 && this.ticketChildren > 0) {
      this.ticketChildren--;
      this.numberOfTickets--;
    } else if (inputNumber === 3 && this.ticketPupils > 0) {
      this.ticketPupils--;
      this.numberOfTickets--;
    } else if (inputNumber === 4 && this.ticketStudents > 0) {
      this.ticketStudents--;
      this.numberOfTickets--;
    } else if (inputNumber === 5 && this.ticketPensioners > 0) {
      this.ticketPensioners--;
      this.numberOfTickets--;
    }
  }

  get ticketsExceeded(): boolean {
    this.numberOfTickets = this.ticketAdult + this.ticketChildren + this.ticketPupils + this.ticketStudents + this.ticketPensioners;
    return (this.numberOfTickets >= 6);
  }

  getTrainTime(): string[] {
    const listOfChangeTrains = [this.trainRoute?.trenSchimbare1, this.trainRoute?.trenSchimbare2, this.trainRoute?.trenSchimbare3, this.trainRoute?.trenSchimbare4].filter(tren => tren !== null);
    listOfChangeTrains.forEach(train => {
      train?.stations.sort((a, b) => a.id - b.id);
    });
  
    listOfChangeTrains.forEach(train => {
      const oraPlecare = train.oraPlecare;
      const oraSosire = train.oraSosire;

      const [h1, m1] = oraPlecare.split(":");
      const [h2, m2] = oraSosire.split(":");
  
      const date1 = new Date(0, 0, 0, +h1, +m1);
      const date2 = new Date(0, 0, 0, +h2, +m2);
  
      const diffInMs = date2.getTime() - date1.getTime();
      const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
      const diffInMinutes = Math.floor((diffInMs % (1000 * 60 * 60)) / (1000 * 60));
  
      const timeSpent=`${diffInHours} ore ${diffInMinutes} minute`;
      this.timePerTrain.push(timeSpent);
    });
    return this.timePerTrain;
  }

      
  
  onSubmit() {
    const listOfChangeTrains = [this.trainRoute?.trenSchimbare1, this.trainRoute?.trenSchimbare2, this.trainRoute?.trenSchimbare3, this.trainRoute?.trenSchimbare4].filter(tren => tren !== null);
    console.log(this.classType);
    if(this.numberOfTickets > 0) {
       const navigationExtras: NavigationExtras = {
        state: {
          routeId: this.routeId,
          classType: this.classType,
          ticketAdult: this.ticketAdult,
          ticketChildren: this.ticketChildren,
          ticketPupils: this.ticketPupils,
          ticketStudents: this.ticketStudents,
          ticketPensioners: this.ticketPensioners,
          price: this.calculatePrice(),
          pricesPerTrain: this.calculatePricePerTrain(),
          timePerTrain: this.getTrainTime(),
          listOfChangeTrains: listOfChangeTrains
        }
       };
       this.router.navigate(['/select-seat'], navigationExtras);
      this.isSuccessful = true;
    }
    
  }

  showScrollToTopButton(): void {
    setTimeout(() => {
      const element = document.getElementById("myform")!;
      this.showScrollIndicator = element.scrollHeight > element.clientHeight;
      const back = document.querySelector('.back') as HTMLDivElement;
      back.style.display = this.showScrollIndicator ? "unset" : "none";
    }, 100);
  }

  scrollToTop(): void {
    const element = document.getElementById("myform")!;
    element.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  }

}