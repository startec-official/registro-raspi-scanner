import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { ScanCodeComponent } from './scan-code/scan-code.component';
import { VerifyCompleteComponent } from './verify-complete/verify-complete.component';
import { VerifyComponent } from './verify/verify.component';


const routes: Routes = [
  { path : 'scan/:mode' , component : ScanCodeComponent },
  { path : 'verify/:mode' , component : VerifyComponent },
  { path : 'complete/:mode' , component : VerifyCompleteComponent },
  { path : 'admin' , component : AdminComponent },
  { path : '' , redirectTo: '/scan/code' , pathMatch : 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
