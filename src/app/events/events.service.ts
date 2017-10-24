import { Injectable } from '@angular/core';

import { Http, Response, RequestOptions, Headers } from '@angular/http';
//RXJS stuff
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import {
    CalendarEvent,
    CalendarEventAction,
} from 'angular-calendar';
import { tripEvent, tripEventID } from '../calendar/tripEvent.interface';

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
import { driver } from '../driver/driver';
import { Passenger } from '../passenger/passenger';

import { AngularFirestore, AngularFirestoreCollection,AngularFirestoreDocument } from 'angularfire2/firestore';


@Injectable()
export class EventsService {

    private eventsCollection: AngularFirestoreCollection<tripEvent>;
    eventsList: Observable<tripEventID[]>;
    itemToRemoveDoc:AngularFirestoreDocument<tripEventID>;
    itemToRemove:Observable<tripEventID>;
    $itemToDeleteID:string;
    passengers:AngularFirestoreCollection<Passenger[]>;

    constructor(private http: Http, private afs: AngularFirestore) {
        this.eventsCollection = afs.collection<tripEventID>('calendarEvent');
        this.eventsList = this.eventsCollection.snapshotChanges().map(a => {
            return a.map(b => {
                const data = b.payload.doc.data() as tripEvent;
                const id = b.payload.doc.id;
                console.log("data:" + data + "id:" + id);
                return { id, ...data };
            })
        })
    }
    deleteEvent(calendarEvent:tripEventID){
       // this.$itemToDeleteID = calendarEvent.id;
         this.itemToRemoveDoc = this.afs.doc<tripEventID>('calenderEvent/' + calendarEvent.id);
        // this.itemToRemove = this.itemToRemoveDoc.valueChanges();
        console.log("itemToRemove:"+this.itemToRemove);
        this.itemToRemoveDoc.delete();
    }
    deActivateEvent(calendarEvent:tripEventID){
        calendarEvent.isActive = false;
         this.eventsCollection.doc(calendarEvent.id).update(calendarEvent);
    }
    getEventsFireBase(){
        return this.eventsList;
    }
    updateEvent(calendarEvent:tripEventID){
        console.log("updated eventid:"+calendarEvent.id);
        this.eventsCollection.doc(calendarEvent.id).update(calendarEvent);
    }
    removePassengersFromTrip(trip:tripEventID,passenger:Passenger){
        this.itemToRemoveDoc = this.afs.doc<tripEventID>('calenderEvent/' + trip.id);
        let index = trip.passengers.findIndex(p => p.id == passenger.id);
        trip.passengers.splice(index,1);
        this.eventsCollection.doc(trip.id).update(trip);
    }
}