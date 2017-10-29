import { Component, ChangeDetectionStrategy, ViewChild, TemplateRef, OnInit, ViewEncapsulation, Input } from '@angular/core';
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
  CalendarEventTimesChangedEvent,
  CalendarEventTitleFormatter,
  CalendarDateFormatter
} from 'angular-calendar';
import { tripEvent, tripEventID } from '../calendar/tripEvent.interface';
import { CustomDateFormatter } from './custom-data-formatter';

import { EventsService } from '../events/events.service';
import { Observable } from 'rxjs/Observable';
// import { CalendarEventTitleFormatter } from 'app/providers/calendarEventTitleFormatter.provider';
import { CustomEventTitleFormatter } from 'app/calendar/CustomEventTitleFormatter';
import { loginService } from '../login/login.service';
import { User } from 'app/login/user.interface';

@Component({
  selector: 'all-day',
  // changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './template.html',
  providers: [
    {
      provide: CalendarEventTitleFormatter,
      useClass: CustomEventTitleFormatter
    },
    {
      provide: CalendarDateFormatter,
      useClass: CustomDateFormatter
    },
    EventsService, loginService
  ],
  //  encapsulation: ViewEncapsulation.None,
  //   styleUrls: ['./app.component.css']
  // styles: [
  //   `
  //  .my-custom-class a {
  //    color: #FF3D7F !important;
  //    font-size:15px;
  //  }
  // `
  // ]
})
export class CalendarDayViewComponent implements OnInit {
  @ViewChild('modalContent') modalContent: TemplateRef<any>;
  @Input () isProfilePage:boolean = false;
  view: string = 'month';
  locale: string = 'he';
  viewDate: Date = new Date();

  modalData: {
    action: string,
    event: CalendarEvent
  };

  actions: CalendarEventAction[] = [{
    label: '<i class="fa fa-fw fa-pencil"></i>',
    onClick: ({ event }: { event: CalendarEvent }): void => {
      this.handleEvent('Edited', event);
    }
  }, {
    label: '<i class="fa fa-fw fa-times"></i>',
    onClick: ({ event }: { event: CalendarEvent }): void => {
      this.events = this.events.filter(iEvent => iEvent !== event);
      this.handleEvent('Deleted', event);
    }
  }];

  refresh: Subject<any> = new Subject();

  events: tripEventID[] = [];
  eventsFireBaseRaw: Observable<tripEvent[]>;
  eventsFireBaseFiltered: Observable<tripEvent[]>;
  
  loggenUser: User;
  activeDayIsOpen: boolean = true;

  constructor(private modal: NgbModal, private eventService: EventsService, private ls: loginService) { }

  ngOnInit() {
    //  this.eventService.getEventsFireBase()
    //                   .map(events => events.filter(event => event.isActive))
    //                   .subscribe(data=>{this.events = data,console.log("events:"+this.events);});

    this.eventsFireBaseRaw = this.eventService.getEventsFireBase().map(events => events)
    this.eventsFireBaseFiltered = this.eventsFireBaseRaw
    //this.eventsFireBase.subscribe(trips => this.eventsFireBaseFiltered = trips)
    //.map(events => events.filter(event => event.isActive))
    // .subscribe(data=>{this.eventsFireBase = data,console.log("events:"+this.events);});
    
    this.ls.getUserDetails()
      .subscribe(data => {
        this.loggenUser = data,
          console.log("loggenUser: " + data.email)
          if(this.isProfilePage){
            this.showUserEvents();
          }
      })
  }

  dayClicked({ date, events }: { date: Date, events: CalendarEvent[] }): void {

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

  eventTimesChanged({ event, newStart, newEnd }: CalendarEventTimesChangedEvent): void {
    event.start = newStart;
    event.end = newEnd;
    this.handleEvent('Dropped or resized', event);
    this.refresh.next();
  }

  handleEvent(action: string, event: CalendarEvent): void {
    this.modalData = { event, action };
    this.modal.open(this.modalContent, { size: 'sm' });
  }
  stringToDate(): void {
    this.events.forEach(element => {
      element.end = new Date(element.end);
      element.start = new Date(element.start);
    });
  }

  // addEvent(): void {
  //   this.events.push({
  //     id:null,
  //     title: 'New event',
  //     start: startOfDay(new Date()),
  //     end: endOfDay(new Date()),
  //     color: colors.red,
  //     draggable: true,
  //     resizable: {
  //       beforeStart: true,
  //       afterEnd: true
  //     },
  //     passengers:null,
  //     driver:null,
  //     isActive:true
  //   });
  //   this.refresh.next();
  // }
  showUserEvents() {
    this.eventsFireBaseFiltered = this.eventsFireBaseRaw
                                            .map(events => events
                                              .filter(event=>event.passengers
                                                .some(p=> p.email === this.loggenUser.email)))
  }
  showAllEvents(){
    this.eventsFireBaseFiltered = this.eventsFireBaseRaw
  }
}