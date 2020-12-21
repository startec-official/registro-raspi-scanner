import { Component, OnInit } from '@angular/core';
import { HttpService } from '../utils/http.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  
  fileToUpload : File;
  showErrorAlert : boolean;
  enableDownloadButton : boolean;

  ipValue : string;

  isEncrypted : boolean;
  isLoading : boolean;
  isGeneratingData : boolean;
  isGeneratingKeys : boolean;

  printerList : string[];
  setPrinterButtonEnabled : boolean[];

  constructor( private httpService : HttpService ) { }

  ngOnInit(): void {
    this.ipValue = '';
    this.isLoading = false;
    this.showErrorAlert = false;
    this.enableDownloadButton = false;
    this.isEncrypted = false;
    this.isGeneratingData = false;
    this.isGeneratingKeys = false;
    this.printerList = [];
    this.setPrinterButtonEnabled = [];
    this.getPrinterList();
  }

  handleFileInput( files : FileList ) : void {
    this.fileToUpload = files.item(0);
  }

  startUploadKey() : void {
    this.httpService.uploadKey(this.fileToUpload).subscribe((data)=>{
      console.log(data);
      this.enableDownloadButton = true;
    }, error => console.log(error));
  }

  downloadData() : void {
    this.showErrorAlert = false;
    this.isGeneratingData = true;
    this.httpService.downloadData().subscribe(
      (blob) => {
        this.isGeneratingData = false;
        const a = document.createElement('a');
        const objectUrl = URL.createObjectURL(blob);
        a.href = objectUrl;
        a.download = 'users.csv';
        a.click();
        URL.revokeObjectURL(objectUrl);
      },
      () => {
        this.showErrorAlert = true;
        this.fileToUpload = undefined;
        this.enableDownloadButton = false;
        this.isGeneratingData = false;
      }
    );
  }

  downloadRawData() {
    this.isGeneratingData = true;
    this.httpService.downloadRawData().subscribe((blob)=>{
      this.isGeneratingData = false;
      const a = document.createElement('a');
      const objectUrl = URL.createObjectURL(blob);
      a.href = objectUrl;
      a.download = 'users_raw.csv';
      a.click();
      URL.revokeObjectURL(objectUrl);
    });
  }

  generateKeys() : void { 
    this.isGeneratingKeys = true;
    this.httpService.generateKeys().subscribe((data) => {
      console.log(data);
      this.isGeneratingKeys = false;
    });
  }

  getIPAddress() {
    this.httpService.getIPAddress().subscribe((ipAddress) => {
      this.ipValue = ipAddress;
    },
    (error) => {
      this.ipValue = 'Cannot get IP address at this time. Check your network connection';
    });
  }

  getPrinterList() {
    this.httpService.getPrinters().subscribe((printersList) => {
      for (const key in printersList) {
        this.printerList.push(printersList[key]);
      }
      this.setPrinterButtonEnabled = this.printerList.map(() => true);
      if( this.setPrinterButtonEnabled.length > 0 )
        this.setPrinterButtonEnabled[0] = false;
    });
  }

  setPrinter( printerIndex : number ) {
    this.httpService.setPrinter( this.printerList[printerIndex] ).subscribe((data) => {
      for (let i = 0; i < this.setPrinterButtonEnabled.length; i++) {this.setPrinterButtonEnabled[i] = true;} // set all to false
      this.setPrinterButtonEnabled[printerIndex] = false;
    },
    (error) => {
      console.log(error);
      console.log('cannot set at this time...');
    });
  }

  goToLink(url: string) {
    window.open(url, "_blank");
  }
}
