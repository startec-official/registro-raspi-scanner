import { HttpErrorResponse, HttpEventType } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { HttpService } from '../utils/http.service';
import { map , catchError } from "rxjs/operators";
import { of } from 'rxjs';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  
  isLoading : boolean;
  fileToUpload : File;

  constructor( private httpService : HttpService ) { }

  ngOnInit(): void {
    this.isLoading = false;
  }

  handleFileInput( files : FileList ) : void {
    this.fileToUpload = files.item(0);
  }

  startUploadKey() : void {
    this.httpService.uploadKey(this.fileToUpload).subscribe((data)=>{
      console.log(data);
    }, error => console.log(error));
  }

  // downloadData() {
  //   this.httpService.downloadData().subscribe((data) => {
  //     console.log(data);
  //   });
  // }
}
