import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { User } from './user';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor( private http : HttpClient ) { }

  saveData( userToSave : User ) {
    return this.http.post( `http://${environment.localhost}:${environment.port}/save` , JSON.stringify(userToSave) , {
      headers : { 'Content-Type' : 'application/json' },
      responseType : 'text'
    });
  }
}
