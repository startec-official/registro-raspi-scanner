import { Component, OnInit } from '@angular/core';
import { HttpService } from '../utils/http.service';
import { RemoteHttpService } from '../utils/remote-http.service';
import { map , catchError } from 'rxjs/operators';
import { HttpEvent, HttpEventType } from '@angular/common/http';

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
  isUploadingData : boolean;

  printerList : string[];
  setPrinterButtonEnabled : boolean[];

  remoteHost : { hostname : string , ip : string };
  remoteHostSet : boolean;
  
  showErrorAlertHost: boolean;
  showErrorAlertUpload : boolean;
  showSetHost : boolean;

  uploadProgress : number;

  constructor( private httpService : HttpService,
               private remoteService : RemoteHttpService ) { }

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
    this.remoteHost  = { hostname : '' , ip : '' };
    this.remoteHostSet = false;
    this.showErrorAlertHost = false;
    this.showSetHost = false;
    this.isUploadingData = false;
    this.showErrorAlertUpload = false;
    this.uploadProgress = 0;
    this.getPrinterList();
    this.getRemoteHost();
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

  downloadRawData() : void {
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

  getIPAddress() : void {
    this.httpService.getIPAddress().subscribe((ipAddress) => {
      this.ipValue = ipAddress;
    },
    (error) => {
      this.ipValue = 'Cannot get IP address at this time. Check your network connection';
    });
  }

  getPrinterList() : void {
    this.httpService.getPrinters().subscribe((printersList) => {
      for (const key in printersList) {
        this.printerList.push(printersList[key]);
      }
      this.setPrinterButtonEnabled = this.printerList.map(() => true);
      if( this.setPrinterButtonEnabled.length > 0 )
        this.setPrinterButtonEnabled[0] = false;
    });
  }

  setPrinter( printerIndex : number ) : void {
    this.httpService.setPrinter( this.printerList[printerIndex] ).subscribe((data) => {
      for (let i = 0; i < this.setPrinterButtonEnabled.length; i++) {this.setPrinterButtonEnabled[i] = true;} // set all to false
      this.setPrinterButtonEnabled[printerIndex] = false;
    },
    (error) => {
      console.log(error);
      console.log('cannot set at this time...');
    });
  }

  getRemoteHost() : void {
    this.remoteService.getRemoteHost().subscribe(host => {
      this.remoteHost = host;
      this.remoteHostSet = true;
    },
    (error) => {
      console.log(error);
      this.remoteHostSet = false;
    });
  }

  setRemoteHost( _hostname : string , _ip : string , _user : string , _password : string ) {
    this.showErrorAlertHost = false;
    this.remoteService.setRemoteHost( { hostname : _hostname , ip : _ip , user: _user , password : _password } ).subscribe((resp) => {
      console.log(resp);
      this.remoteHostSet = true;
      this.showSetHost = false;
      this.remoteHost = { hostname : _hostname , ip : _ip };
    },
    (error) => {
      this.showErrorAlertHost = true;
      console.log(error);
    });
  }

  uploadData() { // TODO : leanify code
    this.showErrorAlertUpload = false;
    this.isUploadingData = true;
    this.remoteService.testConnection().subscribe((resp) => {
      this.remoteService.sendDataToHost().subscribe((res) => {
        console.log(res);
        this.isUploadingData = false;
      },
      (err) => {
        this.showErrorAlertUpload = true;
        console.log(err);
      });
    },
    (error) => {
      this.showErrorAlertUpload = true;
      console.log(error);
    });
  }

  goToLink(url: string) {
    window.open(url, "_blank");
  }
}
