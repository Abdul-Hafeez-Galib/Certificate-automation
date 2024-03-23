import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MaterialModule } from '../material/material.module';
import { StudentsRoutingModule } from './students-routing.module';
import { StudentDashboardComponent } from './student-dashboard/student-dashboard.component';
import { ProfileComponent } from './profile/profile.component';
import { HttpClientModule } from '@angular/common/http';
import { ApplicationFormComponent } from './application-form/application-form.component';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    StudentDashboardComponent,
    ProfileComponent,
    ApplicationFormComponent,

  ],
  imports: [
    CommonModule,
    StudentsRoutingModule,
    MaterialModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class StudentsModule { }
