import { Injectable } from '@angular/core';
import { passengers } from './mock-passengers';
import { Passenger } from './passenger';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
//RXJS stuff
import { Observable } from 'rxjs/Observable';
import {Observer} from 'rxjs/Observer';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { AngularFirestore, AngularFirestoreCollection,AngularFirestoreDocument } from 'angularfire2/firestore';

import { UUID } from 'angular2-uuid';


@Injectable()
export class PassengerService {
    private passengerCollection:AngularFirestoreCollection<Passenger>;
    passengerList:Observable<Passenger[]>;
   
   constructor(private http: Http,private afs:AngularFirestore)
   {
    this.passengerCollection = afs.collection<Passenger>('passengers');
    this.passengerList = this.passengerCollection.snapshotChanges().map(a => {
        return a.map(b => {
            const data = b.payload.doc.data() as Passenger;
            const id = b.payload.doc.id;
            console.log(data, id);
            return { id, ...data };
        })
    })
   }
   getPassengersFirebase() {
       return this.passengerList;
   }
   savePassengerFirebase(passengerToSave:Passenger) {
        let uuid = UUID.UUID();
        this.passengerCollection.add({id:uuid,name:passengerToSave.name,destination:passengerToSave.destination,email:passengerToSave.email});
   }
   
    // getPassengers() {
    //    return this.http.get(`http://localhost:50751/api/Passenger/`)
    //     .map((res:Response) => res.json());
    // }
    // getSepcificPassenger(passengerID) {
    //    return this.http.get(`http://localhost:50751/api/Passenger/` + passengerID)
    //     .map((res:Response) => res.json());
    // }
    // savePassenger(passenger:Passenger) {
    //     // var passengerToSave: Passenger = {
    //     //     id: null,
    //     //     name: "shai"
    //     // }
              
    //      let headers = new Headers({ 'Content-Type': 'application/json' });
    //      let options = new RequestOptions({ headers: headers });

    //      return this.http.post('http://localhost:50751/api/Passenger/',passenger,headers)
    //      .map((res:Response) => res.json());
    // }

}