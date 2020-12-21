import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-verify-complete',
  templateUrl: './verify-complete.component.html',
  styleUrls: ['./verify-complete.component.css']
})
export class VerifyCompleteComponent implements OnInit {
  printMode : boolean;

  constructor( private router : Router,
               private route : ActivatedRoute ) { }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.printMode = params.mode === 'print';
      console.log(params);
    });
  }

  tryAgain() {
    this.router.navigateByUrl(`/scan/${this.printMode ? 'print' : 'code' }`);
  }

}
