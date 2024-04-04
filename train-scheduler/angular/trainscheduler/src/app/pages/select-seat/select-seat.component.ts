import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { WagonSeats } from '../../entity/WagonSeats';
import { SavedSeats } from '../../entity/SavedSeats';
import { WagonsService } from 'src/app/services/wagons.service';
import { TrainSeats } from 'src/app/entity/TrainSeats';

@Component({
  selector: 'app-select-seat',
  templateUrl: './select-seat.component.html',
  styleUrls: ['./select-seat.component.css']
})
export class SelectSeatComponent implements OnInit {

  showScrollIndicator = false;
  showSeatsIndicator = false;
  showTrainIndicator = false;
  classType: number;
  ticketAdult: number;
  ticketChildren: number;
  ticketPupils: number;
  ticketStudents: number;
  ticketPensioners: number;
  tickets: number;
  routeId: number;
  price: number;
  pricePerTrain: number[] = [];
  timePerTrain: string[] = [];

  backgroundImageFront = '../../../assets/images/front.png';
  backgroundImageMiddle = '../../../assets/images/middle.png';
  backgroundImageBack = '../../../assets/images/back.png';
  backgroundImageFrontSelected = '../../../assets/images/front-selected.png';
  backgroundImageMiddleSelected = '../../../assets/images/middle-selected.png';
  backgroundImageBackSelected = '../../../assets/images/back-selected.png';

  blue = "rgb(0, 140, 255)";
  green = "rgb(0, 128, 0)";
  orange = "rgba(248, 95, 7, 0.84)";
  red = "rgba(232, 15, 15, 0.84)";

  trainsPerRoute: number;
  train: number[] = [];
  trainId: number;
  trainsIdArray: number[] =[];

  selectedWagonsArray : number[] = [];

  wagonsIdArrays: number[][] = [];
  wagonsPerTrain: number[] = [];
  numarVagoane: number;
  idVagon: number;
  numarLocuriVagon:number =0 ;
  wagons: number[][] | undefined;
  firstWagon: number;
  lastWagon: number;
  middleWagons: number[] = [];
  
  rows: number[] = [] ;
  seats : WagonSeats[] =[];
  lastSeat: number = 0;
  almostLastSeat: number = 0;
  selectedSeats:number[] = [];
  savedSeats : TrainSeats[] = [];
  listOfChangeTrains: any;
  constructor(private router: Router, private wagonsService: WagonsService){}

  async ngOnInit() {
    this.showScrollButtons();
    const state = history.state;
    this.routeId = state.routeId;
    this.classType = state.classType;
    this.ticketAdult = state.ticketAdult;
    this.ticketChildren = state.ticketChildren;
    this.ticketPupils = state.ticketPupils;
    this.ticketStudents = state.ticketStudents;
    this.ticketPensioners = state.ticketPensioners;
    this.price = state.price;
    this.pricePerTrain = state.pricesPerTrain;
    this.timePerTrain = state.timePerTrain;
    this.listOfChangeTrains = state.listOfChangeTrains;
    this.tickets = this.ticketAdult + this.ticketChildren + this.ticketPupils + this.ticketStudents + this.ticketPensioners;

    //Get Wagons
    this.trainId = 0;
    this.wagons = await this.getWagons();
    this.trainsPerRoute = this.wagons?.length!;  //Numarul de trenuri per ruta
    for (let i = 0; i < this.trainsPerRoute; i++) {
      this.trainsIdArray.push(i);
    }

    this.trainsIdArray.forEach( trainId => {
      this.selectedSeats[trainId] = 0;
    });

    this.wagonsPerTrain = this.wagons?.map(innerArray => innerArray.length)!;
    this.wagonsPerTrain.forEach(value => {
      this.train.push(value);  //Numarul de vagoane per tren
    })

    this.wagons?.forEach (innerArray => {
      const wagonsIdArray = innerArray.slice();
      this.wagonsIdArrays.push(wagonsIdArray);  //Un array ce contine id urile vagoanelor
    });
    this.setWagonId();
    this.numarVagoane= this.wagonsPerTrain[this.trainsIdArray[0]]-2;
  
    //Get and Initialize seats
    this.seats = await this.getSeats(1);
  }
 
  setWagonId():void{
    this.firstWagon = this.wagonsIdArrays[this.trainsIdArray[0]][0];
    this.lastWagon = this.wagonsIdArrays[this.trainsIdArray[0]][this.wagonsPerTrain[this.trainsIdArray[0]]-1];
    for(let i = 0; i<this.wagonsPerTrain[0]-2;i++){
      this.middleWagons.push(this.wagonsIdArrays[this.trainsIdArray[0]][i+1]);
    }
  }

  async getWagons(): Promise<number[][] | undefined> {
    const response = await this.wagonsService.getWagonsById(this.routeId).toPromise();
    return response as number[][] | undefined;
  }
   
  async getSeats(id:number): Promise<WagonSeats[]> {
    const response = await this.wagonsService.getSeatsById(id).toPromise()!;
    return response as WagonSeats[];
  } 

  showTrain(event: MouseEvent): void {
    this.showScrollButtons();
    this.middleWagons = [];
    const train = event.target as HTMLDivElement;
    if(train != null)
      this.trainId = parseInt(train.id.substring(6));

    this.numarVagoane= this.wagonsPerTrain[this.trainsIdArray[this.trainId]]-2;
    this.firstWagon = this.wagonsIdArrays[this.trainsIdArray[this.trainId]][0];
    this.lastWagon = this.wagonsIdArrays[this.trainsIdArray[this.trainId]][this.wagonsPerTrain[this.trainsIdArray[this.trainId]]-1];

    for(let i = 0; i<this.wagonsPerTrain[this.trainId]-2;i++){
      this.middleWagons.push(this.wagonsIdArrays[this.trainsIdArray[this.trainId]][i+1]);
    }
  }
  async showSeats(event: MouseEvent) {
    this.resetBackground();
    this.showSeatsIndicator = this.showSeatsIndicator ? false : true;
    this.rows = [];

    var trains = document.getElementById("train-section")!;
    var buttons = document.getElementById("scroll-buttons")!;
    this.trainsIdArray.forEach(train => {
      var select_train_button = document.getElementById("train-" + train)!;
      select_train_button.style.pointerEvents = "none";
    });

    trains.style.boxShadow = "0px 0px 1px 5000px rgba(0,0,0,0.6) , 0px 0px 1px 5000px rgba(0,0,0,0.6) inset";
    trains.style.pointerEvents = "none";
    buttons.style.pointerEvents = "none";
    

    const image = event.target as HTMLDivElement;
    switch(image.id)
    {
      case "train-front": {
        this.idVagon = this.firstWagon;
        image.setAttribute("src", this.showSeatsIndicator ? this.backgroundImageFrontSelected : this.backgroundImageFront);
        break;
      }
      case "train-back": {
        this.idVagon = this.lastWagon;
        image.setAttribute("src", this.showSeatsIndicator ? this.backgroundImageBackSelected : this.backgroundImageBack);
        break;
      }
      default: {
        this.idVagon = (parseInt(image.id.substring(13)));
        image.setAttribute("src", this.showSeatsIndicator ? this.backgroundImageMiddleSelected : this.backgroundImageMiddle);
        break;
      }
    }

    this.seats = await this.getSeats(this.idVagon);
    this.numarLocuriVagon = this.seats?.length/2!;
    const numarRanduri = (this.numarLocuriVagon - 4)/4;
    this.lastSeat =  this.numarLocuriVagon-1;
    this.almostLastSeat = this.numarLocuriVagon-2;

    for (let i = 1; i <= numarRanduri*4; i=i+4) {
      this.rows.push((this.seats[i].seatNumber)-1);
    }

    this.initSeatsComponents();
    setTimeout(() => {
      this.updateButtonsPointerEvents();
    }, 100);
   
  }

  scrollToRight(): void {
    const element = document.getElementById("train-section")!;
    element.scrollBy({
      left: 500,
      behavior: 'smooth'
    });
  }

  scrollToLeft(): void {
    const element = document.getElementById("train-section")!;
    element.scrollBy({
      left: -500,
      behavior: 'smooth'
    });
  }

  showScrollButtons(): void {
    setTimeout(() => {
      const element = document.getElementById("train-section")!;
      this.showScrollIndicator = element.scrollWidth > element.clientWidth;
      const buttons = document.querySelector('.scroll-buttons') as HTMLDivElement;
      buttons.style.display = this.showScrollIndicator ? "unset" : "none";
    }, 100);
  }

  async onSubmit(){
    var errorIndicator = false;
    const err = document.querySelector('.submit-error-lable') as HTMLDivElement;
    if(this.selectedSeats[0] < this.tickets) {
        const syntheticEvent = new MouseEvent('click');
        this.trainId = 0;
        this.showTrain(syntheticEvent);
        errorIndicator = true;

        if(this.tickets == 1)
          err.innerHTML = '<span> You must select ' + this.tickets + ' seat </span>';
        else
          err.innerHTML = '<span> You must select ' + this.tickets + ' seats </span>'; 
      
    }
    else {
      this.trainsIdArray.forEach( trainId => {
        if(this.selectedSeats[trainId] < this.tickets) {
          const syntheticEvent = new MouseEvent('click');
          this.trainId = trainId;
          this.showTrain(syntheticEvent);
          errorIndicator = true;

          if(this.tickets == 1)
            err.innerHTML = '<span> You must select ' + this.tickets + ' seat </span>';
          else
            err.innerHTML = '<span> You must select ' + this.tickets + ' seats </span>'; 
        }
      });
    }
    if(errorIndicator == false) {
      const state = history.state;
      state.seats = this.savedSeats;
      state.trainId = this.trainId;
      state.trainsIdArray = this.trainsIdArray;
      for (this.trainId of this.trainsIdArray) {
        const response = await this.wagonsService.updateSeats(this.savedSeats[this.trainId].savedSeats).toPromise();
      }
      const navigationExtras: NavigationExtras = {
        state
      };
      this.router.navigate(['/passenger-info'], navigationExtras);
    }
  }
  
  changeColor(event: MouseEvent): void{
    const seat = event.target as HTMLDivElement;
    var color = window.getComputedStyle(seat).backgroundColor;
    if(color != this.orange && color != this.red) {
      color = color == this.blue ? this.green : this.blue; 
      seat.style.backgroundColor = color==this.blue ? this.blue: this.green;
    }

    if(color == this.green)
      this.selectedSeats[this.trainId]++ ;
    else if(color == this.blue)
            this.selectedSeats[this.trainId]--;
    this.updateButtonsPointerEvents();
  }
  
  async save(event: MouseEvent) {
    this.resetBackground();
    const div = document.getElementById("seats-section")!;
    div.style.display="none";
    this.showSeatsIndicator = false;
    const parentDiv = document.getElementById("seats")!;
    const elements = (parentDiv as HTMLElement).querySelectorAll('*');
    var wagonSeats: WagonSeats[] = [];
    this.selectedWagonsArray = [];
    elements.forEach((element) => {
      const backgroundColor = getComputedStyle(element).backgroundColor;
      if (backgroundColor == this.green) {
        let newSeats: WagonSeats = new WagonSeats();
        newSeats.seatNumber = parseInt(element.id);
        newSeats.seatState = 1;
        wagonSeats.push(newSeats);
      }
    });

    var wagonSavedSeats: SavedSeats = {
      wagonId : this.idVagon,
      wagonSeatsResponseList : wagonSeats
    }
    var selectedTrainIndex = this.savedSeats.findIndex(train => train.trainId == this.trainId); 
    if(selectedTrainIndex >= 0) {
      var selectedWagonIndex = this.savedSeats[selectedTrainIndex].savedSeats.findIndex(wagon => wagon.wagonId == this.idVagon);
      if(selectedWagonIndex >= 0){
        this.savedSeats[selectedTrainIndex].savedSeats[selectedWagonIndex].wagonSeatsResponseList = wagonSavedSeats.wagonSeatsResponseList;
      }
      else {
        this.savedSeats[selectedTrainIndex].savedSeats.push({
          wagonId: wagonSavedSeats.wagonId,
          wagonSeatsResponseList: wagonSavedSeats.wagonSeatsResponseList
        });
      }
    }
    else {
      var newTrainSeats: TrainSeats = {
        trainId: this.trainId,
        savedSeats: []
      }
      newTrainSeats.savedSeats.push({
        wagonId: wagonSavedSeats.wagonId,
        wagonSeatsResponseList: wagonSavedSeats.wagonSeatsResponseList
      });
      this.savedSeats.push(newTrainSeats);
    }
  }

  getIndexArray(length: number): number[] {
    return Array.from({ length }, (_, index) => index);
  }

  closeBox(): void {
    this.showSeatsIndicator = false;
    this.resetBackground();
  }

  resetBackground(): void {
    var trains = document.getElementById("train-section")!;
    var buttons = document.getElementById("scroll-buttons")!;

    trains.style.boxShadow = "none";
    trains.style.pointerEvents = "visible";
    buttons.style.pointerEvents = "visible";
    this.trainsIdArray.forEach(train => {
      var select_train_button = document.getElementById("train-" + train)!;
      select_train_button.style.pointerEvents = "visible";
    });

    var train_front = document.getElementById("train-front")!;
    train_front.setAttribute("src", this.backgroundImageFront);
    
    var train_back = document.getElementById("train-back")!;
    train_back.setAttribute("src", this.backgroundImageBack);

    this.middleWagons.forEach(value => {
      var train_middle = document.getElementById("train-middle-"+value)!;
      train_middle.setAttribute("src", this.backgroundImageMiddle);
    });
  }

  initSeatsComponents(): void {
    var selectedTrainIndex = this.savedSeats.findIndex(train => train.trainId == this.trainId); 
    if(selectedTrainIndex >= 0 ) {
      this.selectedSeats[this.trainId] = 0;
      this.savedSeats[selectedTrainIndex].savedSeats.forEach(wagon => {
        var selectedWagonIndex = this.savedSeats[selectedTrainIndex].savedSeats.findIndex(wagon => wagon.wagonId == this.idVagon);
        var selectedWagonId = selectedWagonIndex != -1 ? this.savedSeats[selectedTrainIndex].savedSeats[selectedWagonIndex].wagonId : -1;
        wagon.wagonSeatsResponseList?.forEach(seat => {
          setTimeout(() => {
            const element = document.getElementById(seat.seatNumber.toString())!;
            element.style.pointerEvents = "pointer";
            this.selectedSeats[this.trainId]++;
            if(wagon.wagonId == selectedWagonId) {
              element.style.backgroundColor = this.green;
            }
          });
        });
      });
    }
  }

  updateButtonsPointerEvents(): void {
    const parentDiv = document.getElementById("seats")!;
    const elements = parentDiv.querySelectorAll('*');

    this.trainsIdArray.forEach(train => {
      elements.forEach((element) => {
        if(this.selectedSeats[this.trainId] >= this.tickets) { 
          const backgroundColor = getComputedStyle(element).backgroundColor;
          if (backgroundColor == this.green) {
            if(document.getElementById(element.id))
            document.getElementById(element.id)!.style.pointerEvents = "all"; 
          }
          else {
            if(document.getElementById(element.id))
              document.getElementById(element.id)!.style.pointerEvents = "none";
          }
        }
        else {
          elements.forEach((element) => {
            if(document.getElementById(element.id))
              document.getElementById(element.id)!.style.pointerEvents = "all"; 
          });
        }
      });
    });
  }
}