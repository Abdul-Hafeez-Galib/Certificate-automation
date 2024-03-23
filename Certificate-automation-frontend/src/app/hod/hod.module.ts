import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material/material.module';
import { HodRoutingModule } from './hod-routing.module';
import { ProfileComponent } from './profile/profile.component';
import { HodDashboardComponent } from './hod-dashboard/hod-dashboard.component';
import { ApprovalRequestComponent } from './approval-request/approval-request.component';
import { CertificateRequestComponent } from './certificate-request/certificate-request.component';


@NgModule({
  declarations: [
    ProfileComponent,
    HodDashboardComponent,
    ApprovalRequestComponent,
    CertificateRequestComponent
  ],
  imports: [
    CommonModule,
    HodRoutingModule,
    MaterialModule
  ]
})
export class HodModule { }
