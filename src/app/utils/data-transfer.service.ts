import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataTransferService {

  public transferData : string;
  constructor() {
    this.transferData = '';
  }
}
