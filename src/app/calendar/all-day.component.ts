import { Component, ChangeDetectionStrategy, ViewChild, TemplateRef, OnInit,ViewEncapsulation } from '@angular/core';
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
import { tripEvent } from '../calendar/tripEvent.interface';


import { EventsService } from '../events/events.service';
import { Observable } from 'rxjs/Observable';


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
  selector: 'all-day',
  templateUrl: './template.html',
  providers: [EventsService],
  encapsulation: ViewEncapsulation.None,
//   styleUrls: ['./app.component.css']
styles: [
  `
 .my-custom-class a {
   color: #FF3D7F !important;
   font-size:15px;
 }
`
]
})
export class CalendarDayViewComponent implements OnInit {
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
 events: tripEvent[] = [];
 eventsFireBase: Observable<tripEvent[]>;

  activeDayIsOpen: boolean = true;

  constructor(private modal: NgbModal, private eventService:EventsService) {}

  ngOnInit(){
    // this.eventService.getEvents().subscribe(data =>
    //  {this.events.push(data[data.length-1]),
    //    console.log(this.events)} )
    //    this.eventService.getEvents().subscribe(data =>
    //  {this.events = data,
    //    console.log(this.events),this.stringToDate(),this.refresh.next();} )

     this.eventService.getEventsFireBase().map(events => events.filter(event => event.isActive)).subscribe(data=>{this.events = data,console.log("events:"+this.events);});
      
  }

  dayClicked({date, events}: {date: Date, events: CalendarEvent[]}): void {

    if (isSameMonth(date, this.viewDate)) {
      if (
        (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
        events.length === 0
      ) {
        this.activeDayIsOpen = false;
      } else {
        this.activeDayIsOpen = true;
        this.viewDate = date;
      }
    }
  }

  eventTimesChanged({event, newStart, newEnd}: CalendarEventTimesChangedEvent): void {
    event.start = newStart;
    event.end = newEnd;
    this.handleEvent('Dropped or resized', event);
    this.refresh.next();
  }

  handleEvent(action: string, event: CalendarEvent): void {
    this.modalData = {event, action};
    this.modal.open(this.modalContent, {size: 'lg'});
  }

  addEvent(): void {
    this.events.push({
      id:null,
      title: 'New event',
      start: startOfDay(new Date()),
      end: endOfDay(new Date()),
      color: colors.red,
      draggable: true,
      resizable: {
        beforeStart: true,
        afterEnd: true
      },
      passengers:null,
      driver:null,
      isActive:true
    });
    this.refresh.next();
  }
  stringToDate(): void{
    this.events.forEach(element => {
      element.end = new Date(element.end);
      element.start = new Date(element.start);
    });
  }

}