import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { HttpService } from './utils/http.service';
import { ScanInputService } from './utils/scan-input.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title="secure-scan-raspi-scanner";

  constructor( public inputHandler : ScanInputService,
               router : Router,
               private httpService : HttpService ) {
    router.events.subscribe( (event ) => {
      if( event instanceof NavigationEnd ) {
        if( event.urlAfterRedirects == '/scan' ) {
          this.inputHandler.disabledState = false;
        }
        else {
          this.inputHandler.disabledState = true;
        }
      }
    });
  }

  ngOnInit(): void {
    this.httpService.getIpAddress().subscribe((ipAddress)=>{
      this.httpService.serverURL = `http://${ipAddress.trim()}:${environment.port}`;
      console.log(`new server URL: ${this.httpService.serverURL}`);
    },
    (err)=>{
      console.log(err);
    });
  }
}
