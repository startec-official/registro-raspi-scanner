import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-scan-code',
  templateUrl: './scan-code.component.html',
  styleUrls: ['./scan-code.component.css']
})
export class ScanCodeComponent implements OnInit {
  code : string;
  termDetCt : number;

  constructor( private router : Router ) {}

  ngOnInit(): void {
    this.code = "";
    this.termDetCt = 0;
  }

  sendData() : void {
    this.code = this.code.substring( 0 , this.code.length - 2 );
    this.router.navigate(['/verify' , this.code ]);
  }

  onInputChanged( event : Event ) {
    if( this.code.charAt(this.code.length-1) == "<" ) {
      this.termDetCt ++;
      if( this.termDetCt >= 2 ) {
        this.sendData();
      }
    }
  }
}
