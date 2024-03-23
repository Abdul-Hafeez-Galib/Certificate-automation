import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DeanDashboardComponent } from './dean-dashboard/dean-dashboard.component';
import { ProfileComponent } from './profile/profile.component';
import { ApprovalRequestComponent } from './approval-request/approval-request.component';
import { CertificateRequestComponent } from './certificate-request/certificate-request.component';

const routes: Routes = [
  {
    path:'',
    component:DeanDashboardComponent,
    children:[
      {
        path:'profile',
        component:ProfileComponent
      },
      {
        path:'',
        redirectTo:'profile',
        pathMatch:'full'
      },
      {
        path:'approval-request',
        component:ApprovalRequestComponent
      },
      {
        path:'certificate-request',
        component:CertificateRequestComponent

      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DeanRoutingModule { }
