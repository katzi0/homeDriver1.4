import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';
/*bootstrap*/
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';

/*autocomplete */
import { Ng2CompleterModule } from "ng2-completer";

import { AppComponent } from './app.component';
import { PassengerComponent } from './passenger/passenger.component';
import { DriverComponent } from './driver/driver.component';
import { TripComponent } from './trip/trip.component';
import { TripFormComponent } from './trip/trip-form.component';

/* calendar*/ 
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CalendarModule } from 'angular-calendar';

// import { DayViewModule } from './calendar/module';
import { CalendarDayViewComponent } from './calendar/all-day.component'
import { AddEventComponent } from './calendar/add-event.component'

import { DemoUtilsModule } from './demo-utils/module';
// import { DemoModule } from './calendar/module';

import { EventsComponent } from './events/events.component';
// import { EventsListComponent } from './events/events-list';
//login
import { loginComponent } from './login/login.component';

//AngularFireModule
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { environment } from '../environments/environment';

/*auth*/
 import { AuthGuard } from './login/auth-guard.service';
 import { AuthService } from './login/auth-service';
import { LoginRoutingModule } from './login/login-routing.module';
/*auth*/
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { CanActivate, Router } from '@angular/router';

/* user profile */
import { ProfileComponent } from './profile/profile.component';

/*font awasome*/
import { AngularFontAwesomeModule } from 'angular-font-awesome/angular-font-awesome';

/*footer navbar*/
// import { FooterNavbarComponent } from './shared/footer-navbar';
import { FooterNavbarComponent } from './shared/layout/footer-navbar';
/* calendar*/
const appRoutes: Routes = [
  { path:'passengers', component: PassengerComponent, canActivate: [AuthGuard] },
  { path:'drivers', component: DriverComponent, canActivate: [AuthGuard] },
  { path: 'add-event' , component: AddEventComponent, canActivate: [AuthGuard] },
  { path: 'calendar' , component: CalendarDayViewComponent, canActivate: [AuthGuard] },
  { path: '' , component: CalendarDayViewComponent, canActivate: [AuthGuard] },
  { path: 'events', component: EventsComponent, canActivate: [AuthGuard] },
  { path: 'trips', component: TripComponent, canActivate: [AuthGuard] },
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
  { path: 'login', component: loginComponent },

]

@NgModule({
  declarations: [
    AppComponent, PassengerComponent, DriverComponent, TripComponent, TripFormComponent,
    CalendarDayViewComponent, AddEventComponent,EventsComponent,loginComponent,ProfileComponent
    , FooterNavbarComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
     RouterModule.forRoot(appRoutes),
    BrowserAnimationsModule, // angular 4.0+ only
    CalendarModule.forRoot(),
    NgbModule.forRoot(),
    // NgbModule,
    NgbModalModule,
    DemoUtilsModule,
    Ng2CompleterModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFontAwesomeModule,
    LoginRoutingModule
    // , DemoModule
  ],
  providers: [AuthGuard,AngularFireAuth],
  bootstrap: [AppComponent]
})
export class AppModule { }
