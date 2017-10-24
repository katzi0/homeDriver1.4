import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import {Observer} from 'rxjs/Observer';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { AngularFirestore, AngularFirestoreCollection,AngularFirestoreDocument } from 'angularfire2/firestore';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { User, userRole } from './user.interface';
import { UUID } from 'angular2-uuid';

@Injectable()
export class loginService{
    private userDoc:AngularFirestoreDocument<User>;
    private usersCollection:AngularFirestoreCollection<User>;
    usersList:Observable<User[]>;
    docLoggetUser:AngularFirestoreDocument<User>;
    loggedUser:Observable<User>;
    userRole:userRole = {
        Passenger:true,
        Driver:false,
        Admin:false
    };
    constructor(public afs:AngularFirestore,public afAuth: AngularFireAuth){
        this.usersCollection  = afs.collection<User>('users');
        this.getSignedUserDetails();
        //this
    }
    // getUserByParams(userID:string,userPassword:string){
    //     this.userList = this.userCollection.snapshotChanges()
    //     .map(user => user.)
    // }
    login() {
        this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider())
                        .then((result=> {
                            //return 
                            console.log("getIdToken" + result.user.getIdToken());
                        }));
      }
      logout() {
        this.afAuth.auth.signOut();
      }
      getSignedUserDetails(){
        let user = firebase.auth().currentUser;
        if(user){
            // this.usersCollection()
            this.usersCollection = this.afs.collection<User>('users',ref => ref.where('email', '==', user.email))
            this.usersList = this.usersCollection.snapshotChanges().map(a => {
                return a.map(b => {
                    const data = b.payload.doc.data() as User;
                    const id = b.payload.doc.id;
                    console.log("data:" + data + "id:" + id);
                    return { id, ...data };
                });
            //.valueChanges().subscribe(data => this.usersList);
        })
    }
    else{
        return null;
    }
}
getUserPermissions(){
    return this.usersList;
}
      
}