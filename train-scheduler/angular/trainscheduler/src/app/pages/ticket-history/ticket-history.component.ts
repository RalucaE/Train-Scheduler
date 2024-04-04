import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { TicketHistory } from 'src/app/entity/TicketHistory';
import { UserService } from 'src/app/services/user.service';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TrainRoutesService } from 'src/app/services/train-routes.service';
import { Clipboard } from '@angular/cdk/clipboard';

declare var require: any
const FileSaver = require('file-saver');


@Component({
  selector: 'app-ticket-history',
  templateUrl: './ticket-history.component.html',
  styleUrls: ['./ticket-history.component.css'],
})
export class TicketHistoryComponent implements OnInit {
  ticketHistory: TicketHistory[] ;
  searchTerm: string = ''; // Declare searchTerm variable here
  displayedColumns: string[] = ['oraPlecare', 'orasPlecare', 'numarTren', 'orasSosire', 'oraSosire','numePasager','dataCumparareTicket','actions'];
  dataSource = new MatTableDataSource<HistoryTable>;


  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private userService: UserService, private trainRoutesService: TrainRoutesService, private clipboard: Clipboard, private snackBar: MatSnackBar) {
    
  }

  async downloadPdf(trainId: number){
 
    const response = await this.trainRoutesService.getHistoryElement(trainId).toPromise();
    const pdfUrl="../../../assets/ticket.pdf"
    const pdfName='test.pdf';
    FileSaver.saveAs(pdfUrl,pdfName);
  }

  async copyDownloadLinkToClipboard(trainId: number){
    const response = await this.trainRoutesService.getHistoryElement(trainId).toPromise();
    const downloadLink = 'http://localhost:8080/download/ticket';
    this.clipboard.copy(downloadLink);
    this.snackBar.open('Link copied to clipboard', 'Dismiss', {
      duration: 2000, // Adjust the duration as per your preference
      horizontalPosition: 'start',
      verticalPosition: 'bottom'
    });
  }

  async openPdf(trainId: number){
    const response = await this.trainRoutesService.getHistoryElement(trainId).toPromise();
    const pdfUrl = "../../../assets/ticket.pdf"; 
    window.open(pdfUrl, '_blank');
  }
  async ngOnInit(){
     const response = await this.userService.getHistory().toPromise();
     const ELEMENT_DATA: HistoryTable[]=response!;
     this.dataSource = new MatTableDataSource<HistoryTable>(ELEMENT_DATA);
     this.dataSource.paginator = this.paginator;
     this.ticketHistory=response!;
  }
 
}
export interface HistoryTable {
  id: number;
  oraPlecare: string;
  orasPlecare: string;
  orasSosire: string;
  oraSosire: string;
  numarTren: string;
  numePasager: string;
  dataCumparareTicket: string;
  

}
