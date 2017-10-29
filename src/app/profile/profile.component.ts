import { Component, OnInit } from '@angular/core';
import { loginService } from '../login/login.service';
import { User } from 'app/login/user.interface';
import { Observable } from 'rxjs/Observable';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EventsService } from 'app/events/events.service';
import { CalendarDayViewComponent } from '../calendar/all-day.component';
@Component({
    selector: 'user-profile',
    templateUrl: './profile.component.html',
    providers:[EventsService,loginService]
})

export class ProfileComponent implements OnInit {
    loggenUser: User;
    // loggenUser: Observable<User>;
    

    constructor(private modal: NgbModal, private eventService: EventsService, private ls: loginService) { }
    
    ngOnInit() {
        //this.loggenUser = 
        this.ls.getUserDetails()
        .subscribe(data => {
           this.loggenUser= data,
            console.log("loggenUser: " + data.email)
        })
     }
}