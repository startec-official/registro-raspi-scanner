import { Component, OnInit , ViewChild, ElementRef, DoCheck } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { DataTransferService } from '../utils/data-transfer.service';
import { HttpService } from '../utils/http.service';
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
  printMode : boolean;
  isLoading : boolean;
  noPrinters : boolean;

  constructor( private router : Router,
               private route : ActivatedRoute,
               private httpService : HttpService,
               public inputHandler : ScanInputService,
               public dataTransfer : DataTransferService) {}
  
  ngOnInit(): void {
    this.code = "";
    this.termDetCt = 0;
    this.isLoading = false;
    this.noPrinters = false;
    this.route.paramMap.subscribe( params => {
      var modeString = params.get('mode');
      this.printMode = modeString == 'print';
    });
    this.inputDisabled = this.inputHandler.disabledState;
  }

  ngDoCheck(): void {
    this.inputDisabled = this.inputHandler.disabledState;
  }

  sendData() : void {
    this.code = this.code.substring( 0 , this.code.length - 2 );
    this.dataTransfer.transferData = this.code;
    this.router.navigate(['/verify' , this.printMode ? 'print' : 'code' ]);
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
