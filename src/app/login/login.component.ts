import {Component,OnInit} from '@angular/core';
import {User, userRole} from './user.interface';
// import {loginService} from './login.service';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';

import { AngularFirestore, AngularFirestoreCollection,AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import { loginService } from './login.service';
import { AuthService } from '../login/auth-service';
import { Router } from '@angular/router';


@Component({
    selector: 'login-component',
    styleUrls: ['./login.css'],
    templateUrl: 'login.component.html',
    providers: [AngularFireAuth,loginService,AuthService]
})

export class loginComponent implements OnInit{
    showLogin = true;
    email:string;
    password:string;
    errorCode:string;
    errorMessage:string;
    
    submitted = false;
    onSubmit() { 
        this.showLogin ? this.login():this.signUp();
    }
    
    user:User = {
        destination : "",
        firstName : "",
        lastName : "",
        email : "",
        password : "",
        numOfSeats: 5,
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
    isPassenger:string="1";
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

    constructor(public router: Router,public afAuth: AngularFireAuth,public afs:AngularFirestore, ls:loginService, public authService:AuthService){
       
        this.usersCollection = this.afs.collection<User>('users');
       // this.usersCollection.valueChanges().subscribe(data => this.usersListObs = data);
        this.usersListObs = this.usersCollection.valueChanges();
      //  ls.getUserPermissions().subscribe(data => { data.length > 0 ? this.permissions =  data[0].role:null});
    }

    
    ngOnInit(){
        this.afAuth.authState.subscribe(data=>console.log(data));
       // console.log(this.errorCode);
    //    this.afs.collection<User>('users')
    }
    login() {
        console.log(this.authService.redirectUrl);
        firebase.auth().signInWithEmailAndPassword(this.email, this.password)
        .then((result=> {
            console.log("redirectUrl:"+this.authService.redirectUrl)
            this.router.navigate(['/calendar'])
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
                this.router.navigate(['/calendar'])
                // this.usersCollection.add(this.user);
                
            })
                .catch(error => { this.errorCode = error.code,this.errorMessage = error.errorMessage})
        };
    
        addUserToUsersList(){
            this.user.email = this.email;
            this.user.password = this.password;
            if(this.isPassenger == "1")
            {
                this.userRole.Passenger = true;
                this.userRole.Driver = false;
            }
            else
            {
                this.userRole.Passenger = false;
                this.userRole.Driver = true;
            }
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