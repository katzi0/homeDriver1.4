import {
  Component,
  Input,
  Output,
  EventEmitter,
  SimpleChanges,
  OnChanges
} from '@angular/core';
import {
  getSeconds,
  getMinutes,
  getHours,
  getDate,
  getMonth,
  getYear,
  setSeconds,
  setMinutes,
  setHours,
  setDate,
  setMonth,
  setYear
} from 'date-fns';
import {
  NgbDateStruct,
  NgbTimeStruct
} from '@ng-bootstrap/ng-bootstrap';
//import {NgbDatepickerI18n} from '@ng-bootstrap/ng-bootstrap';
//  import { CustomDatepickerI18n } from '../calendar/datepicker-i18n';

@Component({
  selector: 'mwl-demo-utils-date-time-picker',
  template: `
  
    <form class="form-inline pickDateInpt" *ngIf="isEndDate=='0'">
      <div class="form-group">
        <div class="input-group directionRtl">
          <input
            readonly
            class="form-control"
            [placeholder]="placeholder"
            name="date"
            [(ngModel)]="dateStruct"
            (ngModelChange)="updateDate()"
            ngbDatepicker
            #datePicker="ngbDatepicker">
            <div class="input-group-addon" (click)="datePicker.toggle()" >
              <i class="fa fa-calendar"></i>
            </div>
        </div>
      </div>
    </form>
    <div class="pickTimeDiv form-inline">
    <label *ngIf="isEndDate=='0'" class="mr-sm-2" for="inlineFormCustomSelect">משעה</label>
    <label *ngIf="isEndDate=='1'" class="mr-sm-2" for="inlineFormCustomSelect">עד שעה</label>
    <div *ngIf="isEndDate=='1'">
    <!--{{endTimeModified}}
    <input type="radio" value="beef" name="food" [(ngModel)]="myFood"> נסיעה קצרה
    <input type="radio" value="beef" name="food" [(ngModel)]="myFood"> נסיעה ארוכה-->
  </div>
    
  <ngb-timepicker-steps [(timeStruct)]="timeStruct" (timeStructChange)="updateTime($event)"></ngb-timepicker-steps>
  </div>
  <!--   <ngb-timepicker [(ngModel)]="timeStruct"  (ngModelChange)="updateTime()" [meridian]="false"></ngb-timepicker>-->
<!--<ngb-timepicker-steps (updateTime)="updateTime($event)"></ngb-timepicker-steps>-->
  `,
  styles: [`
    .form-group {
      width: 100%;
    }
    .pickDateInpt {
      display: block;
      direction:rtl;
    }
    .directionRtl {
      direction:ltr;
    }
    .pickTimeDiv {
      float:right;
      margin:10px;
      direction:rtl;
    }
    .pickTimeDiv label {
      margin-left:10px;
    }
  `]
  
})
export class DateTimePickerComponent implements OnChanges {
  @Input() isEndDate:string;
  @Input() placeholder: string;
 
  @Input() date: Date;
  @Input() endTimeModified: Date;
  @Output() dateChange: EventEmitter<Date> = new EventEmitter();

  dateStruct: NgbDateStruct;

  timeStruct: NgbTimeStruct;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['date']) {
      this.dateStruct = {
        day: getDate(this.date),
        month: getMonth(this.date) + 1,
        year: getYear(this.date)
      };
      this.timeStruct = {
        second: getSeconds(this.date),
        minute: getMinutes(this.date),
        hour: getHours(this.date)
      };
    }
    else if(changes['endTimeModified']) {
      this.dateStruct = {
        day: getDate(this.endTimeModified),
        month: getMonth(this.endTimeModified) + 1,
        year: getYear(this.endTimeModified)
      };
      this.timeStruct = {
        second: getSeconds(this.endTimeModified),
        minute: getMinutes(this.endTimeModified),
        hour: getHours(this.endTimeModified)
      };
    }
  }

  onChange(){
    
  }

  updateDate(): void {
    const newDate: Date = setYear(setMonth(setDate(this.date, this.dateStruct.day), this.dateStruct.month - 1), this.dateStruct.year);
    this.dateChange.next(newDate);
  }

  //  updateTime(item): void {
  updateTime(item): void {
   const newDate: Date = setHours(setMinutes(setSeconds(this.date, this.timeStruct.second), this.timeStruct.minute), this.timeStruct.hour);
  //  const newDate: Date = setHours(setMinutes(setSeconds(this.date, item.second), item.minute), item.hour);
    this.dateChange.next(newDate);
  }


}