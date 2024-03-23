import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material/material.module';
import { StaffAdvisorRoutingModule } from './staff-advisor-routing.module';
import { StaffAdvisorDashboardComponent } from './staff-advisor-dashboard/staff-advisor-dashboard.component';
import { ProfileComponent } from './profile/profile.component';
import { ApprovalRequestComponent } from './approval-request/approval-request.component';
import { CertificateRequestComponent } from './certificate-request/certificate-request.component';


@NgModule({
  declarations: [
    StaffAdvisorDashboardComponent,
    ProfileComponent,
    ApprovalRequestComponent,
    CertificateRequestComponent
  ],
  imports: [
    CommonModule,
    StaffAdvisorRoutingModule,
    MaterialModule
  ],
})
export class StaffAdvisorModule { }
