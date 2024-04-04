import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { RouteService } from 'src/app/services/route.service';


@Component({
  selector: 'app-return-routes-dialog',
  templateUrl: './return-routes-dialog.component.html',
  styleUrls: ['./return-routes-dialog.component.css']
})

export class ReturnRoutesDialogComponent implements OnInit{

  orasDestinatie: string;
  orasOrigine: string;
  selectedDate: Date;
  transformedDate: string;
  minDate = new Date();
  errorMessage: string;
  isSuccessful = true;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, 
    private routeService: RouteService, 
    private router: Router,
    public dialogRef: MatDialogRef<ReturnRoutesDialogComponent>
  ) {
    this.orasDestinatie = data.orasOrigine;
    this.orasOrigine = data.orasDestinatie;
  }

  ngOnInit(): void {
  }

  convertDateToString(): string {
    const year = this.selectedDate.getFullYear();
    const month = (this.selectedDate.getMonth() + 1).toString().padStart(2, '0');
    const day = this.selectedDate.getDate().toString().padStart(2, '0');
    return this.transformedDate = `${year}-${month}-${day}`;
  }

  returnRouteList(): void {
    const queryParams = {
      orasOrigine: this.orasOrigine,
      orasDestinatie: this.orasDestinatie,
      dateTime: this.convertDateToString()
    };

    this.routeService.searchRoute(queryParams).subscribe(
      data => {
        const urlTree = this.router.createUrlTree(['/train-route'], { queryParams });
        const url = this.router.serializeUrl(urlTree);
      
        this.router.navigateByUrl(url).then(() => {
          window.location.reload();
        });
      },
      error => {
        console.error(error);
        this.isSuccessful = false;
      }
    )
  }

  closeModal(): void {
    this.dialogRef.close();
  }

}
