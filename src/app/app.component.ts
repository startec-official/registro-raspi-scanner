import { Component, Input, OnInit } from '@angular/core';
import { ScanInputService } from './utils/scan-input.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor( public inputHandler : ScanInputService ) {}

  onActivate(event : any) {
    if( event.constructor.name == 'ScanCodeComponent' ) {
      this.inputHandler.disabledState = false;  
    }
    else {
      this.inputHandler.disabledState = true;
    }
  }
}
