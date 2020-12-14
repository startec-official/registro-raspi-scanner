import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
               private router : Router ) { }

  ngOnInit(): void {
    this.dataReady = false;
    this.currentUser = new User('',-1,'','');
    this.route.params.subscribe(( data ) => {
      // TODO : decode the data using the last 4 characters
      const parsedData : string[] = data.input.toString().split('|');
      this.currentUser.name = parsedData[0];
      this.currentUser.age = parseInt(parsedData[1]);
      this.currentUser.sex = parsedData[2];
      this.currentUser.address = parsedData[3];

      this.dataReady = true;
    });
  }

  saveData() {
    console.log('data sent to database...');
    for (const property in this.currentUser) {
      // TODO : encrypt each property here
      this.currentUser[property] = property;
    }
    console.log(this.currentUser);
  }

  tryAgain() {
    this.router.navigateByUrl('/scan');
  }
}
