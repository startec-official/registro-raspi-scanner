import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from './user';

@Injectable({
  providedIn: 'root'
})
export class RemoteHttpService {
  
  serverURL : string = `http://${environment.localhost}:${environment.port}`;

  constructor(private http : HttpClient) { }

  testConnection() : Observable<string> {
    return this.http.get(`${this.serverURL}/remote/sayhi` , {
      responseType : 'text'
    });
  }

  sendDataToHost() : Observable<string> {
    return this.http.post(`${this.serverURL}/remote/upload` , null , {
      responseType : 'text'
    });
  }

  getRemoteHost() : Observable<any> {
    return this.http.get(`${this.serverURL}/remote/get` , {
      responseType : 'json'
    });
  }

  setRemoteHost(hostObject : {hostname : string , ip : string , user : string , password : string }) : Observable<string> { // TODO : hash the password too
    return this.http.post(`${this.serverURL}/remote/set` , hostObject , {
      headers : { 'Content-Type' : 'application/json' },
      responseType : 'text'
    });
  }
}
