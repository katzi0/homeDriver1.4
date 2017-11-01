import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'footer-navbar',
    template:  `
    <nav class="navbar fixed-bottom navbar-light bg-faded footerNav">
    <div class="btn-group footryNavbar" data-toggle="buttons">
        <div>
          <a href="" routerLink="/login">התחברות</a>
        </div>
        <div>
          <a href="" routerLink="/events">מנהל</a>
        </div>
        <div>
          <a href="" routerLink="/profile">אזור אישי</a>
        </div>
        <div>
        
          <a href="" routerLink="/calendar">לו"ז</a>
        </div>
    </div>  
  </nav>
    `,
    styleUrls: ['./footer-navbar.css']
  
})

export class FooterNavbarComponent implements OnInit {
    constructor() { }

    ngOnInit() { }
}
