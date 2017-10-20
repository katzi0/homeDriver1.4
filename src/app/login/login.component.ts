import {Component,OnInit} from '@angular/core';
import {User} from './user.interface';
// import {loginService} from './login.service';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';

@Component({
    selector: 'login-component',
    templateUrl: 'login.component.html',
    providers: [AngularFireAuth]
})

export class loginComponent implements OnInit{
    
    email:string;
    password:string;
    errorCode:string;
    errorMessage:string;
    constructor(public afAuth: AngularFireAuth){
        //this
    }
    ngOnInit(){
       // console.log(this.errorCode);
    }
    login() {
        firebase.auth().signInWithEmailAndPassword(this.email, this.password)
        .catch(error => { this.errorCode = error.code,this.errorMessage = error.errorMessage})
    };

      logout() {
        this.afAuth.auth.signOut();
      }
      signUp() {
        var errorCode;
        var errorMessage
        firebase.auth().createUserWithEmailAndPassword(this.email, this.password)
                .catch(error => { this.errorCode = error.code,this.errorMessage = error.errorMessage})
        };
}