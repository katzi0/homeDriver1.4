import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgbDatepickerModule, NgbTimepickerModule } from '@ng-bootstrap/ng-bootstrap';
import { CalendarModule } from 'angular-calendar';
import { CalendarHeaderComponent } from './calendar-header.component';
import { DateTimePickerComponent } from './date-time-picker.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbdDatepickerI18n } from '../calendar/datepicker-i18n';
import { NgbdTimepickerSteps } from './timepicker-steps';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NgbModule,
    NgbDatepickerModule.forRoot(),
    NgbTimepickerModule.forRoot(),
    CalendarModule
    
  ],
  declarations: [
    CalendarHeaderComponent,
    DateTimePickerComponent,
    NgbdDatepickerI18n,
    NgbdTimepickerSteps,
    
    
    
  ],
  exports: [
    CalendarHeaderComponent,
    DateTimePickerComponent,
    NgbdDatepickerI18n,
    NgbdTimepickerSteps
    
  ]
})
export class DemoUtilsModule {}