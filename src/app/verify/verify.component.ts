import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
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

  constructor( private route : ActivatedRoute,
               private router : Router,
               private httpService : HttpService ) { }

  ngOnInit(): void {
    this.dataReady = false;
    this.currentUser = new User('',-1,'','','','');
    this.route.params.subscribe(( data ) => {
      // TODO : decode the data using the last 4 characters
      const parsedData : string[] = data.input.toString().split('|'); // UPGRADE : set delimiter to custom
      this.currentUser.name = parsedData[0];
      this.currentUser.age = parseInt(parsedData[1]);
      this.currentUser.birthdate = parsedData[2];
      this.currentUser.sex = parsedData[3];
      this.currentUser.phoneNumber = parsedData[4];
      this.currentUser.address = parsedData[5];

      this.dataReady = true;
    });
  }

  saveData() {
    console.log('data sent to database...');
    this.dataReady = false;
    this.sendDataObs = this.httpService.saveData(this.currentUser);
    this.sendDataObs.subscribe((response : string)=>{
      this.dataReady = true;
      console.log(response);
    });
  }

  tryAgain() {
    this.router.navigateByUrl('/scan');
  }
}
