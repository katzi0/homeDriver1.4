import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
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
/*passengers*/
import { PassengerService } from '../passenger/passenger.service';
import { Passenger } from '../passenger/passenger';

/*drivers*/
import { driverService } from '../driver/driver.service';
import { driver } from '../driver/driver';  
import { tripEvent } from 'app/calendar/tripEvent.interface';
import { EventsService } from 'app/events/events.service';
import { colors } from 'app/demo-utils/colors';
@Component({
    selector: 'events-list',
    templateUrl: './events-list.html'
})

export class EventsListComponent implements OnInit {
    editedCalendarEvent: tripEvent = {
        //  id: null,
        title: 'New edited event',
        start: startOfDay(new Date()),
        end: endOfDay(new Date()),
        color: colors.red,
        draggable: true,
        // passengers:[],
        // driver: null,
        resizable: {
          beforeStart: true,
          afterEnd: true
        },
        passengers: null,
        driver: null,
        isActive: true
      }
    private eventsCollection: AngularFirestoreCollection<tripEvent>;
    eventsList: Observable<tripEvent[]>;
    constructor(private eventsService: EventsService,
            private PassengerService: PassengerService,
            private driverService: driverService,
            private afs: AngularFirestore,
        ) 
    {
        this.eventsCollection = afs.collection<tripEvent>('calendarEvent');
    }
       

    ngOnInit() { }
}