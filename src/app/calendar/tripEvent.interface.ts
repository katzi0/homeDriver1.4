import {
    CalendarEvent,
    CalendarEventAction
  } from 'angular-calendar';

  
  import { Passenger} from '../passenger/passenger';
  import { driver} from '../driver/driver';
  
export interface tripEvent extends CalendarEvent  {
    id:string;
    passengers:Passenger[];
    driver:driver;
    isActive:boolean;
}