import { Component, ChangeDetectionStrategy, ViewChild, TemplateRef } from '@angular/core';
import { CalendarDayViewComponent } from './all-day.component';
import {
  startOfDay,
  endOfDay,
  subDays,
  addDays,
  endOfMonth,
  isSameDay,
  isSameMonth,
  addHours
} from 'date-fns';
import { Subject } from 'rxjs/Subject';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {
  CalendarEvent,
  CalendarEventAction,
  CalendarEventTimesChangedEvent
} from 'angular-calendar';
import { tripEvent, tripEventID } from '../calendar/tripEvent.interface';

const colors: any = {
  red: {
    primary: '#ad2121',
    secondary: '#FAE3E3'
  },
  blue: {
    primary: '#1e90ff',
    secondary: '#D1E8FF'
  },
  yellow: {
    primary: '#e3bc08',
    secondary: '#FDF1BA'
  }
};

@Component({
    // moduleId: module.id,
    selector: 'add-event',
    templateUrl: 'add-event.component.html'
})

export class AddEventComponent   {
  @ViewChild('modalContent') modalContent: TemplateRef<any>; 



view: string = 'month';

  viewDate: Date = new Date();

  modalData: {
    action: string,
    event: CalendarEvent
  };

  actions: CalendarEventAction[] = [{
    label: '<i class="fa fa-fw fa-pencil"></i>',
    onClick: ({event}: {event: CalendarEvent}): void => {
      this.handleEvent('Edited', event);
    }
  }, {
    label: '<i class="fa fa-fw fa-times"></i>',
    onClick: ({event}: {event: CalendarEvent}): void => {
      this.events = this.events.filter(iEvent => iEvent !== event);
      this.handleEvent('Deleted', event);
    }
  }];

  refresh: Subject<any> = new Subject();

  titles: string[] = ["1","2","3"];
  events: tripEventID[] = [{
    id:null,
    start: subDays(startOfDay(new Date()), 1),
    end: addDays(new Date(), 1),
    title: 'A 3 day event',
    color: colors.red,
    actions: this.actions,
    passengers:null,
    driver:null,
    isActive:true
  }
  , {
   id:null,
    start: startOfDay(new Date()),
    title: 'An event with no end date',
    color: colors.yellow,
    actions: this.actions,
    passengers:null,
    driver:null,
    isActive:true
  }, {
   id:null,
    start: subDays(endOfMonth(new Date()), 3),
    end: addDays(endOfMonth(new Date()), 3),
    title: 'A long event that spans 2 months',
    color: colors.blue,
    passengers:null,
    driver:null,
    isActive:true
  }, {
   id:null,
    start: addHours(startOfDay(new Date()), 2),
    end: new Date(),
    title: 'A draggable and resizable event',
    color: colors.yellow,
    actions: this.actions,
    resizable: {
      beforeStart: true,
      afterEnd: true
    },
    draggable: true,
    passengers:null,
    driver:null,
    isActive:true
  }];

singleEvent: tripEvent = {
  //id:null, 
  start: subDays(startOfDay(new Date()), 1),
   end: addDays(new Date(), 1),
   title: 'A 3 day event',
   color: colors.red,
   passengers:null,
   driver:null,
   isActive:true,
    // actions: this.actions
  }

constructor(private modal: NgbModal) {}

  handleEvent(action: string, event: CalendarEvent): void {
    this.modalData = {event, action};
    this.modal.open(this.modalContent, {size: 'lg'});
  }
      addEvent(): void {
    
    this.refresh.next();
  }

  saveEvent(): void {
    alert("great");
  }
}