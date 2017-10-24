import {Component,OnInit} from '@angular/core';
import {User, userRole} from './user.interface';
// import {loginService} from './login.service';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';

import { AngularFirestore, AngularFirestoreCollection,AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import { loginService } from './login.service';


@Component({
    selector: 'login-component',
    templateUrl: 'login.component.html',
    providers: [AngularFireAuth,loginService]
})

export class loginComponent implements OnInit{
    showLogin = true;
    email:string;
    password:string;
    errorCode:string;
    errorMessage:string;
    user:User = {
        destination : "",
        firstName : "",
        lastName : "",
        email : "",
        password : "",
        role:{
            Passenger : true,
            Driver : false,
            Admin : false,
        }
    };
    userRole:userRole = {
        Passenger:true,
        Driver:false,
        Admin:false
    };
    loggedUserDoc:AngularFirestoreDocument<User>;
    loggedUser:Observable<User>;
    usersCollection: AngularFirestoreCollection<User>;
    usersList:User[];
    usersListObs:Observable<User[]>;
    permissions:userRole = {
        Passenger:true,
        Driver:false,
        Admin:false
    };

    constructor(public afAuth: AngularFireAuth,public afs:AngularFirestore, ls:loginService){

        this.usersCollection = this.afs.collection<User>('users');
       // this.usersCollection.valueChanges().subscribe(data => this.usersListObs = data);
        this.usersListObs = this.usersCollection.valueChanges();
      //  ls.getUserPermissions().subscribe(data => { data.length > 0 ? this.permissions =  data[0].role:null});
    }
    ngOnInit(){
       // console.log(this.errorCode);
    //    this.afs.collection<User>('users')
    }
    login() {
        firebase.auth().signInWithEmailAndPassword(this.email, this.password)
        .then((result=> {
            //return 
            // this.loggedU
        }))
        .catch(error => { this.errorCode = error.code,this.errorMessage = error.errorMessage})
    };

      logout() {
        this.afAuth.auth.signOut();
      }
      signUp() {
        var errorCode;
        var errorMessage;
        
        firebase.auth().createUserWithEmailAndPassword(this.email, this.password)
                .then(result =>{ console.log("signup succeed"),
                this.addUserToUsersList()
                
                // this.usersCollection.add(this.user);
                
            })
                .catch(error => { this.errorCode = error.code,this.errorMessage = error.errorMessage})
        };
    //     getSignedUserDetails(){
    //         let user = firebase.auth().currentUser;
    //         if(user){
    //             // this.usersCollection()
    //             this.usersCollection = this.afs.collection<User>('users',ref => ref.where('email', '==', user.email))
    //             this.usersCollection.snapshotChanges().map(a => {
    //                 return a.map(b => {
    //                     const data = b.payload.doc.data() as User;
    //                     const id = b.payload.doc.id;
    //                     console.log("data:" + data + "id:" + id);
    //                     return { id, ...data };
    //                 });
    //             //.valueChanges().subscribe(data => this.usersList);
    //         }).subscribe(data => {this.usersList = data,console.log("userData:"+ data)});
    //     }
    // }
        addUserToUsersList(){
            this.user.email = this.email;
            this.user.password = this.password;
            this.userRole.Passenger = true;
            this.userRole.Driver = false;
            this.userRole.Admin = false;
            this.user.role = this.userRole;
            this.usersCollection.add(this.user);
        }
        fillFieldsForTesting(){
            this.user.destination = "חדרה";
            this.user.firstName = "shai";
            this.user.lastName = "shai";
            this.user.email = "test";
            this.user.password = "test";
            this.userRole.Passenger = true;
            this.userRole.Driver = false;
            this.userRole.Admin = false;
        }
}