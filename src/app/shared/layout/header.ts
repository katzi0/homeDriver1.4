import { Component} from '@angular/core';

@Component({
    selector: 'header',
    template:`
    <div class="container-fluid">
    <div class="row">
    <div class="col-md-12">
      <div class="margin60px">
        <div class="logo"></div>
      </div>
    </div>
  </div>
  </div>
    `,
    styles:[`.logo {
        background: url(https://firebasestorage.googleapis.com/v0/b/homedriver-fa718.appspot.com/o/logo.png?alt=media&token=f2efe48a-d218-4a46-8cd3-9e1a7ae524c0);
        /* background-color: red; */
        background-size: 200px 150px;
        width: 200px;
        height: 150px;
        background-repeat: no-repeat;
        text-align: center;
    }
    .margin60px {
        width:100%;
        /* margin-top:60px; */
        height:150px;
        justify-content: center;
        display: inline-flex;
    }
    `],

})

export class HeaderComponent {
}