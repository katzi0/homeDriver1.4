import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { User, userRole } from './user.interface';
import { UUID } from 'angular2-uuid';

import { AuthService } from '../login/auth-service';

@Injectable()
export class loginService {
    private userDoc: AngularFirestoreDocument<User>;
    private usersCollection: AngularFirestoreCollection<User>;
    usersList: Observable<User[]>;
    docLoggetUser: AngularFirestoreDocument<User>;
    loggedUser: Observable<User>;
    loggedUserId:string;
    userRole: userRole = {
        Passenger: true,
        Driver: false,
        Admin: false
    };
    constructor(public afs: AngularFirestore, public afAuth: AngularFireAuth, private authService:AuthService) {
        this.usersCollection = afs.collection<User>('users');
        this.getSignedUserDetails();
        
        //this
    }
    // getUserByParams(userID:string,userPassword:string){
    //     this.userList = this.userCollection.snapshotChanges()
    //     .map(user => user.)
    // }
    login() {
        this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider())
            .then((result => {
                //return 
                console.log("redirectUrl:"+this.authService.redirectUrl)
                console.log("getIdToken" + result.user.getIdToken());
            }));
    }
    logout() {
        this.afAuth.auth.signOut();
    }
    getSignedUserDetails() {
        let user = firebase.auth().currentUser;
        if (user) {
            // this.usersCollection()
            this.usersCollection = this.afs.collection<User>('users', ref => ref.where('email', '==', user.email))
            this.loggedUser = this.usersCollection.snapshotChanges().map(a => {
                    return a.map(b => {
                    const data = b.payload.doc.data() as User;
                    const id = b.payload.doc.id;
                    // this.docLoggetUser = this.afs.doc<User>('users/' + id);
                    // this.loggedUser = this.docLoggetUser.valueChanges();
                    console.log("data:" + data + "id:" + id);
                    return data;
                });
            }).flatMap(b=>b).take(1)
            // this.usersList = this.usersCollection.snapshotChanges().map(a => {
            //     return a.map(b => {
            //         const data = b.payload.doc.data() as User;
            //         const id = b.payload.doc.id;
            //         this.docLoggetUser = this.afs.doc<User>('users/' + id);
            //         this.loggedUser = this.docLoggetUser.valueChanges();
            //         console.log("data:" + data + "id:" + id);
            //         return { id, ...data };
            //     });
            // })
            console.log("loggedUser:"+this.loggedUser);
        }
        else {
            return null;
        }
    }
    // getUserDetails() {
    //     this.docLoggetUser = this.afs.doc<User>('users/' + this.usersList[0].)
    
    //     return this.usersList;
    // }
    getUserDetails(){
        //return this.loggedUser;
        return this.loggedUser;
       // return this.loggedUserId;
        //return this.usersList;
    }
    getUserId() {
        return this.usersCollection.snapshotChanges().map(a => {
            return a.map(b => {
                // const data = b.payload.doc.data() as User;
                const id = b.payload.doc.id;
                console.log("id:" + id);
                return id;
            });
        })

    }
}