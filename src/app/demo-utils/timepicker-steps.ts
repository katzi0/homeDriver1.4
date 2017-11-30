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
 import { NgbTimepicker } from '@ng-bootstrap/ng-bootstrap';
import { NgbTime } from '@ng-bootstrap/ng-bootstrap/timepicker/ngb-time';

@Component({
  selector: 'ngb-timepicker-steps',
  templateUrl: './timepicker-steps.html'
})
export class NgbdTimepickerSteps extends NgbTimepicker{
  
  @Input() timeStruct;
  hourStep = 1;
  minuteStep = 5;
  // test:any;
  // updateTime(){
  //   console.log(this.time);
  // }
  @Output() timeStructChange = new EventEmitter();
  change(newValue) {
    console.log('newvalue', newValue)
    this.timeStruct = newValue;
    this.timeStructChange.emit(newValue);
  }
}

