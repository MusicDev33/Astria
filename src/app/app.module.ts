import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { MarkdownModule } from 'ngx-markdown';

import { CookieService } from 'ngx-cookie-service';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { RegisterComponent } from '@pages/register/register.component';
import { DashboardComponent } from '@pages/dashboard/dashboard.component';

import { NavbarComponent } from './components/navbar/navbar.component';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { CalendarComponent } from './components/calendar/calendar.component';
import { UpcomingEventsComponent } from './components/upcoming-events/upcoming-events.component';
import { CourseLargeComponent } from './components/course-large/course-large.component';
import { CourseSmallComponent } from './components/course-small/course-small.component';
import { PricingComponent } from './pages/pricing/pricing.component';
import { TasklistComponent } from './components/tasklist/tasklist.component';
import { InstructorCoursesComponent } from './instructor-pages/instructor-courses/instructor-courses.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';

import { PCCalendarComponent } from './pg-components/p-c-calendar/p-c-calendar.component';
import { PCTasklistComponent } from './pg-components/p-c-tasklist/p-c-tasklist.component';
import { PCInstructorComponent } from './pg-components/p-c-instructor/p-c-instructor.component';
import { PCEventComponent } from './pg-components/p-c-event/p-c-event.component';

// Admin
import { AdminDashboardComponent } from './admin-pages/admin-dashboard/admin-dashboard.component';

// Services
import { RegisterService } from '@services/register.service';
import { AuthService } from '@services/auth.service';
import { JwtService } from '@services/jwt.service';
import { UserDataService } from '@services/user-data.service';
import { SchoolService } from '@services/school.service';
import { CourseService } from '@services/course.service';
import { AnnouncementService } from '@services/announcement.service';

// Modules
import { AuthenticationModule } from '@modules/authentication/authentication.module';
import { CourseCardComponent } from './components/course-card/course-card.component';
import { InstructorCourseComponent } from './instructor-pages/instructor-course/instructor-course.component';
import { StudentCoursesComponent } from './pages/student-courses/student-courses.component';
import { IconCardComponent } from './components/icon-card/icon-card.component';
import { ContextMenuComponent } from './components/context-menu/context-menu.component';
import { InstCtxHomeComponent } from './context-menus/inst-ctx-home/inst-ctx-home.component';
import { InstCtxAnnouncementsComponent } from './context-menus/inst-ctx-announcements/inst-ctx-announcements.component';
import { InstCtxStudentsComponent } from './context-menus/inst-ctx-students/inst-ctx-students.component';
import { InstCtxAssignmentsComponent } from './context-menus/inst-ctx-assignments/inst-ctx-assignments.component';
import { MarkdownHelpComponent } from './pages/markdown-help/markdown-help.component';
import { InstCtxSyllabusComponent } from './context-menus/inst-ctx-syllabus/inst-ctx-syllabus.component';

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    DashboardComponent,
    NavbarComponent,
    SidenavComponent,
    CalendarComponent,
    UpcomingEventsComponent,
    CourseLargeComponent,
    CourseSmallComponent,
    PCCalendarComponent,
    PCTasklistComponent,
    PCInstructorComponent,
    PCEventComponent,
    PricingComponent,
    TasklistComponent,
    AdminDashboardComponent,
    InstructorCoursesComponent,
    NotFoundComponent,
    CourseCardComponent,
    InstructorCourseComponent,
    StudentCoursesComponent,
    IconCardComponent,
    ContextMenuComponent,
    InstCtxHomeComponent,
    InstCtxAnnouncementsComponent,
    InstCtxStudentsComponent,
    InstCtxAssignmentsComponent,
    MarkdownHelpComponent,
    InstCtxSyllabusComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    AuthenticationModule,
    RouterModule,
    MarkdownModule.forRoot()
  ],
  providers: [
    RegisterService,
    AuthService,
    CookieService,
    JwtService,
    UserDataService,
    SchoolService,
    CourseService,
    AnnouncementService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
