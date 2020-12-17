import { Component, OnInit } from '@angular/core';
import { HttpService } from '../utils/http.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  
  isLoading : boolean;
  fileToUpload : File;
  showErrorAlert : boolean;
  enableDownloadButton : boolean;
  isEncrypted : boolean;
  isGeneratingData : boolean;
  isGeneratingKeys : boolean;

  constructor( private httpService : HttpService ) { }

  ngOnInit(): void {
    this.isLoading = false;
    this.showErrorAlert = false;
    this.enableDownloadButton = false;
    this.isEncrypted = false;
    this.isGeneratingData = false;
    this.isGeneratingKeys = false;
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
}
