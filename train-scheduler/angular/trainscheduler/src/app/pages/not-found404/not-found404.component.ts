import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-not-found404',
  templateUrl: './not-found404.component.html',
  styleUrls: ['./not-found404.component.css']
})
export class NotFound404Component implements OnInit {

  statusCode: string;
  ErrorMessage: string;
  constructor(private route: ActivatedRoute){}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.statusCode = params['message1'];
    });
    if(this.statusCode == "404"){
      this.ErrorMessage="Not found!"
    }else if(this.statusCode == "500"){
      this.ErrorMessage="Serve error";
    }else{
      this.ErrorMessage="Bad Request";
    }
  }
}
