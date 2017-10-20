import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import {Observer} from 'rxjs/Observer';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { AngularFirestore, AngularFirestoreCollection,AngularFirestoreDocument } from 'angularfire2/firestore';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { User } from './user.interface';
import { UUID } from 'angular2-uuid';

@Injectable()
export class loginService{
    private userDoc:AngularFirestoreDocument<User>;
    private userCollection:AngularFirestoreCollection<User>;
    usersList:Observable<User[]>;

    constructor(afs:AngularFirestore,public afAuth: AngularFireAuth){
        this.userCollection  = afs.collection<User>('users');
        //this
    }
    // getUserByParams(userID:string,userPassword:string){
    //     this.userList = this.userCollection.snapshotChanges()
    //     .map(user => user.)
    // }
    login() {
        this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
      }
      logout() {
        this.afAuth.auth.signOut();
      }
}