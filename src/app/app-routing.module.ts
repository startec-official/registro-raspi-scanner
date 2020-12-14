import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ScanCodeComponent } from './scan-code/scan-code.component';
import { VerifyCompleteComponent } from './verify-complete/verify-complete.component';
import { VerifyComponent } from './verify/verify.component';


const routes: Routes = [
  { path : 'scan' , component : ScanCodeComponent },
  { path : 'verify/:input' , component : VerifyComponent },
  { path : 'complete' , component : VerifyCompleteComponent },
  { path : '' , redirectTo: '/scan' , pathMatch : 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
