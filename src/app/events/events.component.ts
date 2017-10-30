import { Component, OnInit, Input } from '@angular/core';
// import { EventsListComponent } from './events-list';
import { EventsService } from './events.service';
import {
  CalendarEvent,
  CalendarEventAction,
} from 'angular-calendar';
import { tripEvent, tripEventID } from '../calendar/tripEvent.interface';

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

/*auto complete*/
import { CompleterService, CompleterData, CompleterItem } from 'ng2-completer';


/*passengers*/
import { PassengerService } from '../passenger/passenger.service';
import { Passenger } from '../passenger/passenger';

/*drivers*/
import { driverService } from '../driver/driver.service';
import { driver } from '../driver/driver';

/*permissions*/
import { loginService } from '../login/login.service';
import { userRole, User } from 'app/login/user.interface';

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
  },
  green: {
    primary:'#CCEBE3',
    secondary:'#F9FDFC'
  }

};

@Component({
  // moduleId: module.id,
  selector: 'events',
  templateUrl: 'events.component.html',
  providers: [EventsService, PassengerService, driverService, loginService]
})

export class EventsComponent implements OnInit {
  //@Input() calendarEvent : CalendarEvent;
  editedCalendarEvent: tripEvent = {
    //  id: null,
    title: 'כיוון הנסיעה',
    start: startOfDay(new Date(Date.now())),
    end: endOfDay(new Date(Date.now())),
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
  /*autocomplete */
  protected searchStr: string;
  protected searchStrDriver: string;
  protected captain: string;
  // driver: string;
  protected dataService: CompleterData;
  // protected searchData = [
  //   { color: 'red', value: '#f00' },
  //   { color: 'green', value: '#0f0' },
  //   { color: 'blue', value: '#00f' },
  //   { color: 'cyan', value: '#0ff' },
  //   { color: 'magenta', value: '#f0f' },
  //   { color: 'yellow', value: '#ff0' },
  //   { color: 'black', value: '#000' }
  // ];

  protected passengersList = ['James T. Kirk', 'Benjamin Sisko', 'Jean-Luc Picard', 'Spock', 'Jonathan Archer', 'Hikaru Sulu', 'Christopher Pike', 'Rachel Garrett'];
  protected driversList = ['James T. Kirk', 'Benjamin Sisko', 'Jean-Luc Picard', 'Spock', 'Jonathan Archer', 'Hikaru Sulu', 'Christopher Pike', 'Rachel Garrett'];
  private eventsCollection: AngularFirestoreCollection<tripEvent>;
  eventsList: Observable<tripEvent[]>;
  //  lastEventID:string;

  onEdit: boolean = false;
  events: tripEventID[] = [];
  passengers: Array<User>;// [{id:"0", name:"1" ,destination:"1"}];
  passengersObs: Observable<User[]>;
  // passengers: any[] = [];
  selectedDriver:User;
  drivers: User[] = [];
  selectedPassengersMap: {} = {};
  selectedPassengers: Array<User> = [];
  selectedDriversMap: {} = {};
  selectedDrivers: Passenger[] = [];

  passengerToPush: User;

  numOfFreeSeats:number;

  permissions: userRole = {
    Passenger: null,
    Driver: null,
    Admin: null
  };

  constructor(private eventsService: EventsService,
    private PassengerService: PassengerService,
    private driverService: driverService,
    private completerService: CompleterService,
    private afs: AngularFirestore,
    private ls: loginService) {
    this.eventsCollection = afs.collection<tripEvent>('calendarEvent');
    ls.getUserDetails().subscribe(data => this.permissions = data.role);
    // this.passengersObs = 
    this.PassengerService.getPassengersFirebase().subscribe(data => { this.passengers = data});
    this.PassengerService.getDriversFirebase().subscribe(data => { this.drivers = data});
    
    // ls.getUserDetails().subscribe(data => this.permissions = data[0].role);
    // this.dataService = completerService.local(this.searchData, 'color', 'color');
  }

  ngOnInit() {
    this.eventsService.getEventsFireBase()
      .map(events => events
        .filter(event => event.isActive))
      .subscribe(data => {
        this.events = data,
          console.log("events:" + this.events + "smapleEvent:"+this.events[0].passengers)
      });
       
  }

  addEvent(): void {
    this.events.push({
      id: null,
      title: 'New event',
      start: startOfDay(new Date()),
      end: endOfDay(new Date()),
      color: {
        // key: null,
        primary: '#ad2121',
        secondary: '#FAE3E3'
      },
      draggable: true,
      resizable: {
        beforeStart: true,
        afterEnd: true
      },
      passengers: null,
      driver: null,
      isActive: true
    });

  }
  deleteEvent(tripEvent: tripEventID) {
    this.eventsService.deleteEvent(tripEvent);
  }
  saveEventFireBase() {
     this.numOfFreeSeats > 0? this.editedCalendarEvent.color = colors.green:this.editedCalendarEvent.color = colors.red;
   // this.editedCalendarEvent.
   this.editedCalendarEvent.numOfFreeSeats = this.numOfFreeSeats;
    this.editedCalendarEvent.driver = this.selectedDriver;
    this.editedCalendarEvent.passengers = this.selectedPassengers;
    //this.editedCalendarEvent.id = this.afs.createId();
    this.eventsCollection.add(this.editedCalendarEvent);
  }
  updateEventFireBase(tripEvent: tripEventID) {
    this.eventsService.updateEvent(tripEvent);
  }
  deActivateEvent(tripEvent: tripEventID) {
    // this.eventsService.deleteEvent(tripEvent);
    this.eventsService.deActivateEvent(tripEvent);
  }
  // saveEvent(): void {
  //   this.eventsService.saveEvents(this.editedCalendarEvent).subscribe(data => {
  //     this.events.push(data), console.log(data)
  //   });
  // }
  initSelectedList(list): void {
    for (var i = 0; i < list.length; i++) {
      //  this.selectedPassengers = ({[this.passengers[i].name] : true}); 
      this.selectedPassengersMap[this.passengers[i].uid] = false;
    }
  }
  updateCheckedOptions(passenger, event) {
    this.selectedPassengersMap[passenger.id] = event.target.checked;
  }
  updateSelectedPassengers() {
    for (var x in this.selectedPassengersMap) {
      this.passengerToPush = this.passengers.find(passenger => passenger.id == x);
      console.log(this.passengerToPush);
      if (this.selectedPassengersMap[x]) {
        //.map(y => this.passengerToPush = y);
        if (!this.selectedPassengers.find(passenger => this.passengerToPush.id == passenger.id)){
          if(this.selectedDriver.numOfSeats - this.selectedPassengers.length > 0){
            this.selectedPassengers.push(this.passengerToPush);//this.passengers.filter(passenger => passenger.id == x)
            this.numOfFreeSeats = this.selectedDriver.numOfSeats - this.selectedPassengers.length;
          }
            else {
              console.log("no more empty seats");
            }
        }
      }
      else {
        let index = this.selectedPassengers.findIndex(passenger => this.passengerToPush == passenger);

        if (index > -1) {
          this.selectedPassengers.splice(index, 1);
          this.numOfFreeSeats = this.selectedDriver.numOfSeats - this.selectedPassengers.length;
        }
      }
    }
  }
  checkForPassengers() {

  }
  removeFromTrip(event, passenger) {
    console.log("passnerger:" + passenger + "/n" + "event:" + event);
    this.eventsService.removePassengersFromTrip(event, passenger);
  }

  //remove selected passenger from event
  removePassengerFromEvent(passenger) {
    this.editedCalendarEvent.passengers.splice(passenger, 1);
    this.selectedPassengers.splice(passenger, 1);
    this.passengersList.push(passenger);
  }

  toggleSelectedPassenger(passenger: Passenger) {
    if (this.selectedPassengersMap[passenger.id]) {
      this.selectedPassengersMap[passenger.id] = false;
    }
    else {
      this.selectedPassengersMap[passenger.id] = true;
    }
    this.updateSelectedPassengers();
  }
  checkIfPassengerSelected(passenger: Passenger) {
    return {
      'list-group-item': true,
      'active': this.selectedPassengersMap[passenger.id]
    }
  }
  changeDriver(driver:User){
    // this.selectedDriver = driver;
    // console.log(this.selectedDriver.firstName + " " + this.selectedDriver.lastName);
  }
}