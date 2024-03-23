import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StudentDashboardComponent } from './student-dashboard/student-dashboard.component';
import { ProfileComponent } from './profile/profile.component';
import { ApplicationFormComponent } from './application-form/application-form.component';

const routes: Routes = [
  {
    path:'',
    component:StudentDashboardComponent,
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
        path:'application-form',
        component:ApplicationFormComponent
      }
    ]
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StudentsRoutingModule { }
