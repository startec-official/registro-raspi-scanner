import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { ScanInputService } from './utils/scan-input.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title="secure-scan-raspi-scanner";

  constructor( public inputHandler : ScanInputService,
               router : Router ) {
    router.events.subscribe( (event ) => {
      if( event instanceof NavigationEnd ) {
        if( event.urlAfterRedirects == '/scan' ) {
          console.log( 'you got scanned...' );
          this.inputHandler.disabledState = false;
        }
        else {
          this.inputHandler.disabledState = true;
        }
      }
    });
  }
}
