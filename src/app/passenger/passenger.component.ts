import { Component, OnInit, OnChanges } from '@angular/core';// SimpleChanges, Input
import { Passenger} from './passenger';
import { PassengerService } from './passenger.service';
import { EventsService } from '../events/events.service';

import { AngularFirestore,AngularFirestoreCollection  } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import { User, userRole } from 'app/login/user.interface';

export interface Item { name: string;}
export interface UserId extends User { id: string; }

@Component({
  //  moduleId: module.id,
    selector: 'passenger-component',
    templateUrl: 'passenger.component.html',
    providers: [PassengerService,EventsService]
})

export class PassengerComponent implements OnInit { 
    private passenegerCollection:AngularFirestoreCollection<User>;
    private loggedInPassenger:AngularFirestoreCollection<UserId>;
    userRole:userRole = {Admin:false, Passenger:true, Driver:false};
    
    passengers:User[] = [];
   
    passengerToSave:User = {uid:"0", firstName:"passenger to save",lastName:"passenger to save", destination:"none",email:"none",role:this.userRole,password:"pass"};//new Passenger(id:"0", name:"passenger to save", destination:"none");
    currentPassengerLoggedIn: Passenger = {id:"0", name:"passenger to save", destination:"none",email:"none"};//new Passenger("0", "passenger to save","none");

    constructor(afs:AngularFirestore,private passengerService:PassengerService, private EventsService:EventsService) {
    }

    ngOnInit() {
       this.passengerService.getPassengersFirebase()
       .map(events => events)
       .subscribe(data => {
         this.passengers = data,
           console.log("passengers:" + this.passengers)
       });
     }
      savePassenger(){
      console.log("passengerToSave: "+this.passengerToSave);
      this.passenegerCollection.add(this.passengerToSave);
    }
    savePassengerFirebase(){
      console.log("passengerToSave: "+this.passengerToSave);
      this.passengerToSave.role = this.userRole;
      this.passengerService.savePassengerFirebase(this.passengerToSave);
    }
}

