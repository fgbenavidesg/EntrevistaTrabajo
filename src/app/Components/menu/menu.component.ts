import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AutServiceLogic } from 'src/app/serviceLogic/aut-service-logic.service';
declare var google: any;
@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent  implements OnInit {
  public active : boolean = false
  public user! : string;
  public userImg! : string;
  constructor(
    private router : Router,
    private storage : AutServiceLogic
  ) {

    this.user = storage.getStorage('nombre');
    this.userImg = storage.getStorage('img').toString();
  }

  ngOnInit() {}


  setActive() : void {
    this.active = !this.active
  }
  logout(){
    sessionStorage.clear();
    google.accounts.id.disableAutoSelect();
    this.router.navigate(['']);
  }
}
