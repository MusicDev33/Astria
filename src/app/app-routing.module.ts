import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RegisterComponent } from '@pages/register/register.component';
import { DashboardComponent } from '@pages/dashboard/dashboard.component';
import { AdminDashboardComponent } from '@admin-pages/admin-dashboard/admin-dashboard.component';

import { NotFoundComponent } from '@pages/not-found/not-found.component';

import { InstructorCoursesComponent } from '@instructor-pages/instructor-courses/instructor-courses.component';

import { AdminGuard } from '@guards/admin.guard';

const routes: Routes = [
  { path: 'login',
    loadChildren: '@modules/authentication/authentication.module#AuthenticationModule'},
  { path: 'register', component: RegisterComponent },
  { path: 'dashboard', pathMatch: 'full', component: DashboardComponent },
  { path: 'admindash', pathMatch: 'full', component: AdminDashboardComponent, canActivate: [AdminGuard] },
  { path: 'instructor/:schoolID/:name', component: InstructorCoursesComponent},
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    initialNavigation: 'enabled'
})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
