import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';  

@Injectable({
  providedIn: 'root'
})
export class CryptoService {

  constructor() { }

  decryptQr( input : string ) {
    let ciphertext : string = input.substring(0,input.length-4); // UPGRADE : custom key lengths
    let key : string = input.substring(input.length - 4 , input.length);
    try {
      return CryptoJS.AES.decrypt( ciphertext , key ).toString(CryptoJS.enc.Utf8);
    }
    catch(e) {
      console.log( "Data corrupted, scan again..." );
      return "error";
    }
  }
}
