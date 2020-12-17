import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';  
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CryptoService {

  constructor() { }

  decryptQr( input : string ) {
    let ciphertext : string = input.substring(0,input.length - environment.charKeyCount);
    let key : string = input.substring(input.length - environment.charKeyCount , input.length);
    try {
      return CryptoJS.AES.decrypt( ciphertext , key ).toString(CryptoJS.enc.Utf8);
    }
    catch(e) {
      console.log( "Data corrupted, scan again..." );
      return "error";
    }
  }
}
