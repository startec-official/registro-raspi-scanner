import { Component, OnInit } from '@angular/core';
import { Location } from "@angular/common";
import { NavigationEnd, Router } from '@angular/router';
import { HttpService } from './utils/http.service';
import { ScanInputService } from './utils/scan-input.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title="secure-scan-raspi-scanner";

  constructor( public inputHandler : ScanInputService,
               router : Router,
               private httpService : HttpService,
               private loc : Location ) {
    router.events.subscribe( (event ) => {
      if( event instanceof NavigationEnd ) {
        if( event.urlAfterRedirects == '/scan/code' || event.urlAfterRedirects == '/scan/print' ) {
          this.inputHandler.disabledState = false;
        }
        else {
          this.inputHandler.disabledState = true;
        }
      }
    });
  }

  ngOnInit(): void {
    const angularRoute = this.loc.path();
    const url = window.location.href;
    var nodeHost = url.replace(angularRoute, '').split(':')[1];
    while( nodeHost.indexOf('/') > -1 )
      nodeHost = nodeHost.replace('/','');
    this.httpService.serverURL = `http://${nodeHost}:${environment.port}`;
    console.log(`new server URL: ${this.httpService.serverURL}`);
  }
}
