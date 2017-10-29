import {
    CalendarEvent,
    CalendarEventAction
  } from 'angular-calendar';

  
  import { Passenger} from '../passenger/passenger';
  import { driver} from '../driver/driver';
import { User } from 'app/login/user.interface';
  
export interface tripEvent extends CalendarEvent  {
    //id:string;
    passengers:User[];
    driver:driver;
    isActive:boolean;
}

export interface tripEventID extends tripEvent {
    id:string
}