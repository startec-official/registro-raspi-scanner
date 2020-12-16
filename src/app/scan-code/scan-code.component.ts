import { Component, OnInit , ViewChild, ElementRef, DoCheck } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { ScanInputService } from '../utils/scan-input.service';

@Component({
  selector: 'app-scan-code',
  templateUrl: './scan-code.component.html',
  styleUrls: ['./scan-code.component.css']
})
export class ScanCodeComponent implements OnInit, DoCheck {
  code : string;
  termDetCt : number;
  inputDisabled : boolean;

  constructor( private router : Router,
               public inputHandler : ScanInputService ) {}
  
  ngOnInit(): void {
    this.code = "";
    this.termDetCt = 0;
    this.inputDisabled = this.inputHandler.disabledState;
  }

  ngDoCheck(): void {
    this.inputDisabled = this.inputHandler.disabledState;
  }

  sendData() : void {
    this.code = this.code.substring( 0 , this.code.length - 2 );
    this.router.navigate(['/verify' , this.code ]);
  }

  clearInput() : void {
    this.code = '';
  }

  onInputChanged( event : Event ) {
    if( this.code.charAt(this.code.length-1) == environment.terminator ) {
      this.termDetCt ++;
      if( this.termDetCt >= 2 ) {
        this.sendData();
      }
    }
  }

  @ViewChild("codeField") codeInput: ElementRef;
    ngAfterViewInit() {
    this.codeInput.nativeElement.focus();
  }
}
