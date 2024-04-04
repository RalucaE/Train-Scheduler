import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {} from 'googlemaps';
import { Observable, forkJoin } from 'rxjs';
import { TrainRoutes } from 'src/app/entity/TrainRoutes';
import { Trains } from 'src/app/entity/Trains';
import { Stations } from 'src/app/entity/Stations';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { TrainRoutesService } from 'src/app/services/train-routes.service';
import { CityDistants } from 'src/app/entity/CityDistants';
import { RouteService } from 'src/app/services/route.service';
import { DatePipe } from '@angular/common';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { ReturnRoutesDialogComponent } from '../return-routes-dialog/return-routes-dialog.component';
import { NotLoggedInModalComponent } from '../not-logged-in-modal/not-logged-in-modal.component';

declare const google: any;
declare var window: any;
@Component({
  selector: 'app-train-routes',
  templateUrl: './train-routes.component.html',
  styleUrls: ['./train-routes.component.css']
})
export class TrainRoutesComponent implements OnInit {
  map: google.maps.Map;
  orasOrigine: string | null;
  orasDestinatie: string | null;
  dateTime: string | null;
  trainRoutes: TrainRoutes[] | undefined ;
  trains: Trains[] = [] ;
  showMap: boolean ;
  showCalculatePriceSection: boolean = false;
  showPrice: boolean = false;
  price: number;
  totalKm: number;
  selectedOption: string;
  classType: number;
  checked: boolean;
  currentDate: Date;
  time: string;
  showScrollIndicator = false;
  dialogRef: MatDialogRef<ReturnRoutesDialogComponent> | null = null;

  constructor(private trainRoutesService: TrainRoutesService, 
    private http: HttpClient, private route: ActivatedRoute, 
    private router: Router, private routeService: RouteService, 
    private datePipe: DatePipe,
    private dialog: MatDialog) {}

  async ngOnInit() {
    this.route.queryParamMap.subscribe(params =>{
      this.orasOrigine = params.get("orasOrigine");
      this.orasDestinatie = params.get("orasDestinatie");
      this.dateTime = params.get("dateTime")
    });
    this.routeService.currentMessage.subscribe(checked => this.checked = checked);
 
    if(!this.checked)
    {
      const response = await this.trainRoutesService.getTrainRoutes(this.orasOrigine, this.orasDestinatie, this.dateTime).toPromise();
      this.trainRoutes = response;
    }
    else
    {
      this.currentDate = new Date();
      this.time = this.currentDate.toLocaleTimeString();
      this.trainRoutesService.getTrainRoutes(this.orasOrigine, this.orasDestinatie, this.dateTime).subscribe(response=>{     
        this.trainRoutes=response.filter(response => this.compareTimes(response.oraPlecare, this.time) == true );
      });
    }

    this.trainRoutes?.forEach(trainRoute=>{
      const oraPlecare = trainRoute.oraPlecare;
      const oraSosire = trainRoute.oraSosire;

      const [h1, m1] = oraPlecare.split(":");
      const [h2, m2] = oraSosire.split(":");
  
      const date1 = new Date(0, 0, 0, +h1, +m1);
      const date2 = new Date(0, 0, 0, +h2, +m2);
  
      const diffInMs = date2.getTime() - date1.getTime();
      const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
      const diffInMinutes = Math.floor((diffInMs % (1000 * 60 * 60)) / (1000 * 60));

      const dateStr = '2023-05-03';
      const date = new Date(dateStr);
      const formattedDate = this.datePipe.transform(date, 'MMMM');
      trainRoute.monthDeparture = formattedDate!;
      trainRoute.timeSpent=`${diffInHours} hours ${diffInMinutes} minutes`;

    });

    setTimeout(() => {
      const element = document.getElementById("rute-cont")!;
      this.showScrollIndicator = element.scrollHeight > element.clientHeight;
      const back = document.querySelector('.back') as HTMLDivElement;
      back.style.display = this.showScrollIndicator ? "unset" : "none";
    }, 100);
  
  }

  compareTimes(time1: string, time2: string): boolean {
    const date1 = new Date('2000-01-01 ' + time1); 
    const date2 = new Date('2000-01-01 ' + time2); 
    if(date1>date2)
      return true;
    return false;
  }

  async initMap(routeId: number) {
    this.showScrollToTopButton();
    if(this.showMap){
      this.showMap=false;
      return;
    }
    this.showMap=true;

    const mapOptions: google.maps.MapOptions = {
      center: { lat: 44.43, lng: 26.09 },
      zoom: 7,
    };
    
    const trainRoute = this.trainRoutes?.find(route => routeId === route.id);
    const listOfChangeTrains =  [trainRoute?.trenSchimbare1, trainRoute?.trenSchimbare2, trainRoute?.trenSchimbare3, trainRoute?.trenSchimbare4].filter(tren=> tren!==null);
  
    // listOfChangeTrains.forEach(train => {
    //   train?.stations.sort((a, b) => a.id - b.id);
    // });
 

    this.map = new google.maps.Map(document.getElementById('map'), mapOptions);
    let staionsName: string[] =[]
    const cities = listOfChangeTrains.reduce( (accumulator: string[], train: Trains | undefined) => {
      if (!train) {
        return accumulator;
      }
      if (!accumulator.includes(train.orasOrigine)) {
        accumulator.push(train.orasOrigine);
        staionsName.push(train.orasOrigine);
      }
   
      train.stations.forEach((station: Stations | undefined) => {
        if (!station) {
          return;
        }
        if (!accumulator.includes(station.stationName)) {
          accumulator.push(station.stationName);
        }
      });
      if (!accumulator.includes(train.orasDestinatie)) {
        accumulator.push(train.orasDestinatie);
        staionsName.push(train.orasDestinatie);
      }
      return accumulator;
    }, []);

    const citiesLngLat = await Promise.all(cities.map(async (city) => {
      const results = await this.getLatLng(city).toPromise();
      return results.results[0].geometry.location;
    }));

    const stationsLngLat = await Promise.all(staionsName.map(async (city) => {
      const results = await this.getLatLng(city).toPromise();
      return results.results[0].geometry.location;
    }));

    stationsLngLat.map(stations =>{
      this.placeMarker(stations);
    });

    const trainPath = new google.maps.Polyline({
      path: citiesLngLat,
      geodesic: true,
      strokeColor: '#FF0000',
      strokeOpacity: 1.0,
      strokeWeight: 2,
    });

    trainPath.setMap(this.map);
  }

  placeMarker(city: any){
    const marker1 = new google.maps.Marker({
      position: city,
      map: this.map,
      title: 'Marker',
    });
  }

  getLatLng(cityName: string): Observable<any> {
    return this.http.get<any>(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${cityName}&key=AIzaSyCnAyl_UH7znKTjAEGlY74F-Y-KJOeMnbs`
    );
  }

  redirectToReturnRoute(){
    const queryParams = {
      orasOrigine: this.orasDestinatie,
      orasDestinatie: this.orasOrigine,
      dateTime: this.dateTime
    };
    const urlTree = this.router.createUrlTree(['/train-route'], { queryParams });
    const url = this.router.serializeUrl(urlTree);
  
    this.router.navigateByUrl(url).then(() => {
      window.location.reload();
    });
  }

  enableShowStations(train: Trains){
    this.showScrollToTopButton();
    if(train.showStations){
      train.showStations=false;
      return;
    }
    //train.stations.sort((a,b)=> a.id - b.id);
    train.showStations=true;
  }
  
  showDetails(trainRoute: TrainRoutes){
    this.trainRoutes?.forEach(train =>{
      if(train.id != trainRoute.id){
        train.enableShowDetails=false;
        this.showMap=false;
        this.showCalculatePriceSection=false;
      }
    });
    if(trainRoute.enableShowDetails){
      trainRoute.enableShowDetails=false;
      return;
    }
    this.trains =  [trainRoute?.trenSchimbare1, trainRoute?.trenSchimbare2, trainRoute?.trenSchimbare3, trainRoute?.trenSchimbare4].filter(tren=> tren!==null);
    this.trains.forEach(train =>{
      train.totalKilometers=0;
      train.cityDistans.forEach(city => {
        train.totalKilometers=train.totalKilometers + city.km; 
      });
    });
    trainRoute.enableShowDetails=true;
    this.showPrice=false;
   
  }

  showPriceSection(){
    this.showScrollToTopButton();
    if(this.showCalculatePriceSection){
      this.showCalculatePriceSection=false;
      return;
    }
    this.selectedOption="Adult"
    this.trains.forEach(train =>{
      train.classType=1;
    });
    this.showCalculatePriceSection=true;
  }

  showPriceCalculated(){
    this.showPrice=true;
    this.totalKm=0;
    this.price=0;
    this.trains.forEach(train => {
     train.cityDistans.forEach(city =>{
        this.totalKm = this.totalKm + city.km;
     }); 
   });
 
   this.price = Number((this.totalKm * 0.25).toFixed(2));
   if(this.selectedOption=="Adult"){
     this.price = Number((this.price * 1).toFixed(2));
    }
   if(this.selectedOption=="Copil"){
     this.price = Number((this.price * 0.45).toFixed(2));
    }
   if(this.selectedOption=="Elev"){
     this.price = Number((this.price * 0).toFixed(2));
    }
   if(this.selectedOption=="Pensionar"){
     this.price = Number((this.price * 0.25).toFixed(2));
    }
   if(this.selectedOption=="Student"){
     this.price = Number((this.price * 0.5).toFixed(2));
    }
    this.trains.forEach(train=>{
      if(train.classType==0){
        this.price = this.price * 2;
      }
    })
  
  }

  isLoggedIn(): boolean {
    const token = localStorage.getItem('ACCESS_TOKEN');
    return token !== null;
  }

  goToBuyTicket(id: number){
    if (this.isLoggedIn()) {
      const id2=id;
      this.router.navigate(['/ticket-type'], { queryParams: { trainRoute: id}});
    } else {
      this.openWarningModal();
    }
  }

  openWarningModal(): void {
    const dialogConfig: MatDialogConfig = {
      // width: '450px',
      // panelClass: 'centered-dialog',
    };
    const dialogRef = this.dialog.open(NotLoggedInModalComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.dialogRef = null;
    });
  }

  showScrollToTopButton(): void {
    setTimeout(() => {
      const element = document.getElementById("det-cont")!;
      this.showScrollIndicator = element.scrollHeight > element.clientHeight;
      const back = document.querySelector('.back') as HTMLDivElement;
      back.style.display = this.showScrollIndicator ? "unset" : "none";
    }, 100);
  }

  scrollToTop(): void {
    const element = document.getElementById("det-cont")!;
    element.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  }

  openModal(): void {
    const dialogConfig: MatDialogConfig = {
      // width: '450px',
      // panelClass: 'centered-dialog',
      data: {orasOrigine: this.orasOrigine, orasDestinatie: this.orasDestinatie}
    };
    const dialogRef = this.dialog.open(ReturnRoutesDialogComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.dialogRef = null;
    });
  }
  
  @ViewChild('targetDiv', { static: false }) targetDiv: ElementRef;
  scrollToDiv() {
    if (this.targetDiv && this.targetDiv.nativeElement) {
      this.targetDiv.nativeElement.scrollIntoView({ behavior: 'smooth' });
    }
  }
  @ViewChild('targetDiv2', { static: false }) targetDiv2: ElementRef;
  scrollToDiv2() {
    setTimeout(() => {
      if (this.targetDiv2 && this.targetDiv2.nativeElement) {
        this.targetDiv2.nativeElement.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  }
}