import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-verify-complete',
  templateUrl: './verify-complete.component.html',
  styleUrls: ['./verify-complete.component.css']
})
export class VerifyCompleteComponent implements OnInit {

  constructor( private router : Router ) { }

  ngOnInit(): void {
  }

  tryAgain() {
    this.router.navigateByUrl('/scan');
  }

}
