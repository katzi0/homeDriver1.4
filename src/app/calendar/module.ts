import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CalendarModule } from 'angular-calendar';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { DemoUtilsModule } from '../demo-utils/module';
import { CalendarDayViewComponent } from './all-day.component';
// import { DateControlComponent } from './date-control.component';
import { AddEventComponent } from './add-event.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
 import { NgbdTimepickerSteps } from '../demo-utils/timepicker-steps';
import { AngularFontAwesomeModule } from 'angular-font-awesome/angular-font-awesome';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NgbModule.forRoot(),
    NgbModalModule.forRoot(),
    CalendarModule.forRoot(),
    DemoUtilsModule,AngularFontAwesomeModule
    // DateControlComponent
    
  ],
  declarations: [
    //CalendarDayViewComponent,
     //AddEventComponent
  ],
  exports: [
    //CalendarDayViewComponent, AddEventComponent
  ],
  bootstrap: [CalendarDayViewComponent]
})
export class DayViewModule {}