import { DatePipe } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, NgForm,  } from '@angular/forms';
import { MatMenuTrigger } from '@angular/material/menu';
import { Router } from '@angular/router';
import { Observable, map, startWith } from 'rxjs';
import { Route } from 'src/app/entity/Route';
import { RouteService } from 'src/app/services/route.service';
import { TrainRoutesService } from 'src/app/services/train-routes.service';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit{
  
  title = "SearchRoute";
  currentDate =new Date();
  myRoute = new Route();
  route!: Route;
  checked: boolean = false;
  origin: string;
  destination: string;
 
  originSuggestions: string[] = [];
  filteredOriginSuggestions: Observable<string[]>;

  destinationSuggestions: string[] = [];
  filteredDestinationSuggestions: Observable<string[]>;

  selectedDate: Date;
  transformedDate: string;
  dataTime: string;

  @ViewChild('searchForm', { static: true }) searchForm: NgForm;
 
  constructor(private router: Router, private routeService: RouteService, private datePipe: DatePipe, private trainRoutesService: TrainRoutesService) {}

  ngOnInit(): void {
    this.routeService.currentMessage.subscribe(checked => this.checked = checked);
    this.getTrainData(); 
    setTimeout(() => {
      this.filteredOriginSuggestions = this.searchForm.controls['orasOrigine'].valueChanges.pipe(
        startWith(''),
        map(value => this.filterOrigin(value || '')),
      );
      this.filteredDestinationSuggestions = this.searchForm.controls['orasDestinatie'].valueChanges.pipe(
        startWith(''),
        map(value => this.filterDestination(value || '')),
      );
    });
  }

  getTrainData() {
    this.trainRoutesService.getTrains()
      .subscribe((trains) => {
        for(let i = 0 ; i< trains.length ; i++)
        {
          this.originSuggestions.push(trains[i].orasOrigine);
          this.destinationSuggestions.push(trains[i].orasDestinatie);
        }
      //Eliminam dublurile      
      this.originSuggestions = [...new Set(this.originSuggestions)];
      this.destinationSuggestions = [...new Set(this.destinationSuggestions)];
      });
  }
  
  async submit(searchForm: NgForm) {
    this.route = searchForm.value;
   
    if(this.selectedDate!)
       this.dataTime = this.convertDateToString();
    else 
    this.dataTime = '';

    this.route.dateTime = this.dataTime;
    this.routeService.searchRoute(this.route).subscribe
    (data =>{
      this.routeService.sendCheckBoxStatus(this.checked);
      searchForm.reset(); 
      this.router.navigate(['/train-route'], { queryParams: { orasOrigine: data.orasOrigine, orasDestinatie: data.orasDestinatie, dateTime: this.dataTime}});
    }, 
    error =>{
      console.log(this.route.dateTime);
      const err = document.querySelector('.errorlabel') as HTMLDivElement;
      const err1 = document.querySelector('.errorlabel-from') as HTMLDivElement;
      const err2 = document.querySelector('.errorlabel-to') as HTMLDivElement;
      const err3 = document.querySelector('.errorlabel-date') as HTMLDivElement;

      if(this.route.orasOrigine == '' && this.route.orasDestinatie == '' && this.route.dateTime == '')
      {
        err1.innerHTML = '<span> Origin city is required </span>';
        err2.innerHTML = '<span> Destination city is required </span>';
        err3.innerHTML = '<span> Date is required </span>';
      }
      else if(this.route.orasOrigine == '' && this.route.orasDestinatie == '') {
                err1.innerHTML = '<span> Origin city is required </span>';
                err2.innerHTML = '<span> Destination city is required </span>';
              }
              else if(this.route.orasOrigine == '' && this.route.dateTime == '') {
                        err1.innerHTML = '<span> Origin city is required </span>';
                        err3.innerHTML = '<span> Date is required </span>';
                      }
                    else if(this.route.orasDestinatie == '' && this.route.dateTime == '') {
                              err2.innerHTML = '<span> Destination city is required </span>';
                              err3.innerHTML = '<span> Date is required </span>';
                            }
                          else if(this.route.orasOrigine == '')
                                  err1.innerHTML = '<span> Origin city is required </span>';
                              else if(this.route.orasDestinatie == '')
                                        err2.innerHTML = '<span> Destination city is required </span>';
                                    else if (this.route.dateTime == '')
                                              err3.innerHTML = '<span> Date is required </span>';
                                          else
                                            err.innerHTML = '<span> The route was not found </span>';
    });
  }
  
  reverseValues(searchForm: NgForm){  
    this.origin = searchForm.value.orasOrigine ;
    this.destination  = searchForm.value.orasDestinatie;
    searchForm.controls['orasOrigine'].setValue(this.destination);
    searchForm.controls['orasDestinatie'].setValue(this.origin);   
  }

  changeCheckBoxValue(value:any) {
    this.checked = !value;
  }
 
  frequentedRoute(plecare: string, destinatie: string){
    this.myRoute.orasOrigine = plecare;
    this.myRoute.orasDestinatie = destinatie;
    this.myRoute.dateTime = "2023-11-03"; //this.datePipe.transform(this.currentDate, 'yyyy-MM-dd')!;
    const dataTime: string = "2023-11-03";//this.myRoute.dateTime;
    this.routeService.searchRoute(this.myRoute).subscribe
    (data =>{
      this.router.navigate(['/train-route'], { queryParams: { orasOrigine: data.orasOrigine, orasDestinatie: data.orasDestinatie, dateTime: dataTime}});
    });
  }

  filterOrigin(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.originSuggestions.filter(option => option.toLowerCase().includes(filterValue));
  }
  filterDestination(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.destinationSuggestions.filter(option => option.toLowerCase().includes(filterValue));
  }
  convertDateToString(): string {
    const year = this.selectedDate.getFullYear();
    const month = (this.selectedDate.getMonth() + 1).toString().padStart(2, '0');
    const day = this.selectedDate.getDate().toString().padStart(2, '0');
    return this.transformedDate = `${year}-${month}-${day}`;
  }
}