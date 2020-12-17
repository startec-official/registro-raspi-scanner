import { BrowserModule } from '@angular/platform-browser';
import { HostListener, NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { ScanCodeComponent } from './scan-code/scan-code.component';
import { VerifyComponent } from './verify/verify.component';
import { HttpClientModule } from "@angular/common/http";
import { VerifyCompleteComponent } from './verify-complete/verify-complete.component';
import { ScanInputService } from './utils/scan-input.service';
import { AdminComponent } from './admin/admin.component';

@NgModule({
  declarations: [
    AppComponent,
    ScanCodeComponent,
    VerifyComponent,
    VerifyCompleteComponent,
    AdminComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [ScanInputService],
  bootstrap: [AppComponent]
})
export class AppModule { }
