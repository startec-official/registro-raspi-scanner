import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from './user';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  serverURL : string = `http://${environment.localhost}:${environment.port}`;

  constructor( private http : HttpClient ) { }

  saveData( userToSave : User ) {
    let address : string = `${this.serverURL}/save`;
    console.log(address);
    return this.http.post( address , JSON.stringify(userToSave) , {
      headers : { 'Content-Type' : 'application/json' },
      responseType : 'text'
    });
  }

  uploadKey( fileToUpload : File ) { // FIXME : add data body
    const formData = new FormData();
    formData.append('fileKey' , fileToUpload , fileToUpload.name); // the name of the field must match that in the server
    return this.http.post( `${this.serverURL}/upload` , formData , {
      responseType : 'text'
    } );
  }
}
