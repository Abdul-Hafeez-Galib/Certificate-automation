import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material/material.module';
import { DeanRoutingModule } from './dean-routing.module';
import { DeanDashboardComponent } from './dean-dashboard/dean-dashboard.component';
import { ApprovalRequestComponent } from './approval-request/approval-request.component';
import { ProfileComponent } from './profile/profile.component';
import { CertificateRequestComponent } from './certificate-request/certificate-request.component';


@NgModule({
  declarations: [
    DeanDashboardComponent,
    ApprovalRequestComponent,
    ProfileComponent,
    CertificateRequestComponent
  ],
  imports: [
    CommonModule,
    DeanRoutingModule,
    MaterialModule
  ]
})
export class DeanModule { }
