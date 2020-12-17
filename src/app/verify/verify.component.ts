import { Component, HostListener, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CryptoService } from '../utils/crypto.service';
import { HttpService } from '../utils/http.service';
import { User } from '../utils/user';

@Component({
  selector: 'app-verify',
  templateUrl: './verify.component.html',
  styleUrls: ['./verify.component.css']
})
export class VerifyComponent implements OnInit {

  currentUser : User;
  dataReady : boolean;
  sendDataObs: Observable<string>;
  reattemptDialogShow : boolean;
  disableTryAgain : boolean;
  accScanStarted : boolean;
  waitObs: Observable<boolean>;

  constructor( private route : ActivatedRoute,
               private router : Router,
               private httpService : HttpService,
               private cryptoService : CryptoService ) { }

  ngOnInit(): void {
    this.dataReady = false;
    this.reattemptDialogShow = false;
    this.disableTryAgain = false;
    this.accScanStarted = false;
    this.currentUser = new User('',-1,'','','','');

    this.waitObs = new Observable( subscriber => {
      setTimeout(() => {
        subscriber.next(true);
        subscriber.complete();
      }, 5000);
    });

    this.route.params.subscribe(( data ) => {
      let parsedString = this.cryptoService.decryptQr( data.input.toString() );

      if( parsedString == "error" ) {
        this.reattemptDialogShow = true;
      }
      else {
        const parsedData : string[] = parsedString.split( environment.delimiter ); // UPGRADE : set delimiter to custom
        this.currentUser.name = parsedData[0];
        this.currentUser.age = parseInt(parsedData[1]);
        this.currentUser.birthdate = parsedData[2];
        this.currentUser.sex = parsedData[3];
        this.currentUser.phoneNumber = parsedData[4];
        this.currentUser.address = parsedData[5];

        this.dataReady = true;
      }
    });
  }

  saveData() {
    console.log('data sent to database...');
    this.dataReady = false;
    this.sendDataObs = this.httpService.saveData(this.currentUser);
    this.sendDataObs.subscribe((response : string)=>{
      this.dataReady = true;
      this.router.navigateByUrl('/complete');
      console.log(response);
    });
  }

  tryAgain() {
    this.router.navigateByUrl('/scan');
  }

  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent( event ) {
    if( !this.accScanStarted ) {
      this.accScanStarted = true;
      this.disableTryAgain = true;
      this.waitObs.subscribe((data: any) => {
        this.disableTryAgain = false;
        this.accScanStarted = false;
      });
    }
  }
}
