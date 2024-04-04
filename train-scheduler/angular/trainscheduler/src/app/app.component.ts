import { Component, OnInit } from '@angular/core';
import { TokenexpirationService } from './services/tokenexpiration.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'trainscheduler';

  constructor(private tokenExpirationService: TokenexpirationService) {}

  ngOnInit() {
    this.tokenExpirationService.initialize();
  }

}