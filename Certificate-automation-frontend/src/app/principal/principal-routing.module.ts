import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PrincipalDashboardComponent } from './principal-dashboard/principal-dashboard.component';
import { ProfileComponent } from './profile/profile.component';
import { ApprovalRequestComponent } from './approval-request/approval-request.component';

const routes: Routes = [
  {
    path:'',
    component:PrincipalDashboardComponent,
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
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PrincipalRoutingModule { }
