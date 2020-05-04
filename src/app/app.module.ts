import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

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

// Modules
import { AuthenticationModule } from '@modules/authentication/authentication.module';

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
    AdminDashboardComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    AuthenticationModule
  ],
  providers: [
    RegisterService,
    AuthService,
    CookieService,
    JwtService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
