import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
      this.currentUser.address = parsedData[4];
      this.currentUser.phoneNumber = parsedData[5];

      this.dataReady = true;
    });
  }

  saveData() {
    console.log('data sent to database...');
    this.dataReady = false;
    for (const property in this.currentUser) {
      // TODO : encrypt each property here
      this.currentUser[property] = property;
    }
    console.log(this.currentUser);
    this.httpService.saveData(this.currentUser).subscribe((response)=>{
      console.log(response);
      this.dataReady = true;
    });
  }

  tryAgain() {
    this.router.navigateByUrl('/scan');
  }
}
