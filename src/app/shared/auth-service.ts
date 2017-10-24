// import 'rxjs/add/operator/do';
// import 'rxjs/add/operator/map';
// import 'rxjs/add/operator/take';

// import { Injectable } from '@angular/core';
// import {BehaviorSubject} from 'rxjs/BehaviorSubject';
// import { Observable } from 'rxjs/Observable';

// import { User } from '../login/user.interface';

// import { AngularFireAuth } from 'angularfire2/auth';
// import { AngularFireDatabase } from 'angularfire2/database';
// import * as firebase from 'firebase/app';

// @Injectable()
// export class AdminPermission {
//   user:Observable<User> = new Observable(null);
  
//     constructor(private afAuth: AngularFireAuth,private db:AngularFireDatabase) {
//       this.afAuth.authState.map(auth => {
//           //  .switchMap(auth => {
//           if(auth)
//           {
//               return this.db.object('users/' + auth.uid)
//           }
//           else{
//               return Observable.of(null);
//           }
//       })
//       .subscribe(user => {
//          console.log(user)
//       })
//   }
  
// }

