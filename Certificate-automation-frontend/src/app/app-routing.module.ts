import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { LoginDeniedComponent } from './login-denied/login-denied.component';

const routes: Routes = [
  {
    path:'login',
    component:LoginComponent
  },
  {
    path:'',
    redirectTo:'login',
    pathMatch:'full'
  },
  {
    path:'register',
    component:RegisterComponent
  },
  {
    path:'approval-failed',
    component:LoginDeniedComponent
  },
  {
    path:'student',
    loadChildren: () => import('./students/students.module').then(m => m.StudentsModule)
  },
  {
    path:'principal',
    loadChildren: () => import('./principal/principal.module').then(m => m.PrincipalModule)
  },
  {
    path:'dean',
    loadChildren: () => import('./dean/dean.module').then(m => m.DeanModule)
  },
  {
    path:'staff-advisor',
    loadChildren: () => import('./staff-advisor/staff-advisor.module').then(m => m.StaffAdvisorModule)
  },
  {
    path:'hod',
    loadChildren: () => import('./hod/hod.module').then(m => m.HodModule)
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
