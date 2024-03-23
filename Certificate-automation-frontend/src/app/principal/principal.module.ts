import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MaterialModule } from '../material/material.module';
import { PrincipalRoutingModule } from './principal-routing.module';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { PrincipalDashboardComponent } from './principal-dashboard/principal-dashboard.component';
import { ProfileComponent } from './profile/profile.component';
import { ApprovalRequestComponent } from './approval-request/approval-request.component';

@NgModule({
  declarations: [
    PrincipalDashboardComponent,
    ProfileComponent,
    ApprovalRequestComponent
  ],
  imports: [
    CommonModule,
    PrincipalRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class PrincipalModule { }
