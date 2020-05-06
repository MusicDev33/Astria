import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RegisterComponent } from '@pages/register/register.component';
import { DashboardComponent } from '@pages/dashboard/dashboard.component';
import { AdminDashboardComponent } from '@admin-pages/admin-dashboard/admin-dashboard.component';

import { AdminGuard } from '@guards/admin.guard';

const routes: Routes = [
  { path: 'login',
    loadChildren: '@modules/authentication/authentication.module#AuthenticationModule'},
  { path: 'register', component: RegisterComponent },
  { path: 'dashboard', pathMatch: 'full', component: DashboardComponent },
  { path: 'dashboard/admin', pathMatch: 'full', component: AdminDashboardComponent, canActivate: [AdminGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    initialNavigation: 'enabled'
})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
