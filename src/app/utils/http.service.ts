import { HttpClient } from '@angular/common/http';
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

  saveData( userToSave : User ) : Observable<string> {
    let address : string = `${this.serverURL}/api/save`;
    return this.http.post( address , JSON.stringify(userToSave) , {
      headers : { 'Content-Type' : 'application/json' },
      responseType : 'text'
    });
  }

  uploadKey( fileToUpload : File ) : Observable<string> { // FIXME : add data body
    const formData = new FormData();
    formData.append('fileKey' , fileToUpload , fileToUpload.name); // the name of the field must match that in the server
    return this.http.post( `${this.serverURL}/api/upload` , formData , {
      responseType : 'text'
    } );
  }

  downloadData() : Observable<Blob> {
    return this.http.get( `${this.serverURL}/api/download/encrypted` , {
      responseType : 'blob'
    });
  }

  downloadRawData() : Observable<Blob> {
    return this.http.get( `${this.serverURL}/api/download/raw`, {
      responseType : 'blob'
    });
  }

  generateKeys() : Observable<string> {
    return this.http.post( `${this.serverURL}/api/generate` , null , {
      responseType : 'text'
    });
  }

  getIPAddress() : Observable<string> {
    return this.http.get( `${this.serverURL}/api/ip` , {
      responseType : 'text'
    });
  }

  getPrinters() {
    return this.http.get( `${this.serverURL}/print/printers` , {
      responseType : 'json'
    });
  }

  setPrinter(newPrinter : string ) : Observable<string> {
    return this.http.post( `${this.serverURL}/print/set/${newPrinter}` , null , {
      responseType: 'text'
    });
  }

  printData( dataBody : User ) : Observable<string> {
    return this.http.post( `${this.serverURL}/print/send` , JSON.stringify(dataBody) , {
      headers : { 'Content-Type' : 'application/json' },
      responseType : 'text'
    });
  }

  deleteData() : Observable<string> {
    return this.http.delete(`${this.serverURL}/api/delete` , {
      responseType : 'text'
    });
  }
}
