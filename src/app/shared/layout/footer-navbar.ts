import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'footer-navbar',
    template:  `
    <nav class="navbar fixed-bottom navbar-light bg-faded footerNav">
    <div class="btn-group footryNavbar" data-toggle="buttons">
        <label class="btn btn-primary">
          <a href="" routerLink="/login">התחברות</a>
        </label>
        <label class="btn btn-primary">
          <a href="" routerLink="/events">מנהל</a>
        </label>
        <label class="btn btn-primary">
          <a href="" routerLink="/profile">אזור אישי</a>
        </label>
        <label class="btn btn-primary">
          <a href="" routerLink="/calendar">לו"ז</a>
        </label>
      </div>  
  </nav>
    `,
    styleUrls: ['./footer-navbar.css']
  
})

export class FooterNavbarComponent implements OnInit {
    constructor() { }

    ngOnInit() { }
}
