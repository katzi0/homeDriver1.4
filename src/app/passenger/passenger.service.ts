import { Injectable } from '@angular/core';
// import { passengers } from './mock-passengers';
import { Passenger } from './passenger';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
//RXJS stuff
import { Observable } from 'rxjs/Observable';
import {Observer} from 'rxjs/Observer';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { AngularFirestore, AngularFirestoreCollection,AngularFirestoreDocument } from 'angularfire2/firestore';

import { UUID } from 'angular2-uuid';
import { User, userRole } from '../login/user.interface';


@Injectable()
export class PassengerService {
    private passengerCollection:AngularFirestoreCollection<User>;
    passengerList:Observable<User[]>;
    userRole:userRole = {Driver:false, Passenger:true, Admin:false};
   constructor(private http: Http,private afs:AngularFirestore)
   {
    this.passengerCollection = afs.collection<User>('users', ref => ref.where('role.Admin', '==', false).where('role.Driver', '==', false));
    this.passengerList = this.passengerCollection.snapshotChanges().map(a => {
        return a.map(b => {
            const data = b.payload.doc.data() as User;
            const id = b.payload.doc.id;
            console.log(data, id);
            return { id, ...data };
        })
    })
   }


   getPassengersFirebase() {
       return this.passengerList;
   }
   savePassengerFirebase(passengerToSave:User) {
        let uuid = UUID.UUID();
        this.passengerCollection.add({uid:uuid,firstName:passengerToSave.firstName,lastName:passengerToSave.lastName,destination:passengerToSave.destination,email:passengerToSave.email,password:passengerToSave.password,role:passengerToSave.role});
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