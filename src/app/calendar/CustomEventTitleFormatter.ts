import { LOCALE_ID, Inject } from '@angular/core';
import { CalendarEventTitleFormatter, CalendarEvent } from 'angular-calendar';
import { tripEvent } from 'app/calendar/tripEvent.interface';

export class CustomEventTitleFormatter extends CalendarEventTitleFormatter {
  constructor( @Inject(LOCALE_ID) private locale: string) {
    super();
  }

  // you can override any of the methods defined in the parent class

  month(event: CalendarEvent): string {
    return `<b>${new Intl.DateTimeFormat(this.locale, {
      hour: 'numeric',
      minute: 'numeric',
      hour12: false
    }).format(event.start)}</b> ${event.title}`;
  }

  week(event: CalendarEvent): string {
    return `<b>${new Intl.DateTimeFormat(this.locale, {
      hour: 'numeric',
      minute: 'numeric',
      hour12: false
    }).format(event.start)}</b> ${event.title}`;
  }

  // day(event: tripEvent): string {
  //   return `<b>${new Intl.DateTimeFormat(this.locale, {
  //     hour: 'numeric',
  //     minute: 'numeric'
  //   }).format(event.start)}</b><br /> ${event.title}</br >`;
  // }
  day(event: tripEvent): string {
    if (event.numOfFreeSeats > 0) {
      return `<span>  <b>${new Intl.DateTimeFormat(this.locale, {
        hour: 'numeric', minute: 'numeric',
        hour12: false,
      }).format(event.start)}</b></span> <span>${event.title}</span>
     
    <br />נותרו ${event.numOfFreeSeats} מקומות`;
    }
    else{
      return `${event.title}<b>${new Intl.DateTimeFormat(this.locale, {
        hour: 'numeric',
        minute: 'numeric',
        hour12: false
      }).format(event.start)}</b>
    
    <br />הנסיעה מלאה`;
    }
  }
}