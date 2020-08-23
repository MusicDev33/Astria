import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RegisterComponent } from '@pages/register/register.component';
import { DashboardComponent } from '@pages/dashboard/dashboard.component';
import { AdminDashboardComponent } from '@admin-pages/admin-dashboard/admin-dashboard.component';
import { MarkdownHelpComponent } from '@pages/markdown-help/markdown-help.component';

import { NotFoundComponent } from '@pages/not-found/not-found.component';

import { InstructorCoursesComponent } from '@instructor-pages/instructor-courses/instructor-courses.component';
import { InstructorCourseComponent } from '@instructor-pages/instructor-course/instructor-course.component';

import { StudentCourseComponent } from '@student-pages/student-course/student-course.component';

import { AdminGuard } from '@guards/admin.guard';
import { InstructorGuard } from '@guards/instructor.guard';

const routes: Routes = [
  { path: 'login', loadChildren: '@modules/authentication/authentication.module#AuthenticationModule'},
  { path: 'register', component: RegisterComponent },
  { path: 'dashboard', pathMatch: 'full', redirectTo: 'dashboard/courses' },
  { path: 'dashboard/:mode', pathMatch: 'full', component: DashboardComponent },
  { path: 'admindash', pathMatch: 'full', component: AdminDashboardComponent, canActivate: [AdminGuard] },
  { path: 'instructor/:schoolID/:instructorID', component: InstructorCoursesComponent, canActivate: [InstructorGuard]},
  { path: 'instructor/:schoolID/:instructorID/:courseCode', component: InstructorCourseComponent, canActivate: [InstructorGuard]},
  { path: 'student/:schoolID/:instructorID/:courseCode', component: StudentCourseComponent },
  { path: 'courses/:schoolID/:courseCode', component: InstructorCourseComponent, canActivate: [InstructorGuard]},
  { path: 'help/markdown', component: MarkdownHelpComponent },
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    initialNavigation: 'enabled',
    anchorScrolling: 'enabled',
    scrollPositionRestoration: 'enabled'
})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
