import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
declare var google: any;
@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent  implements OnInit {

  constructor(
    private router : Router
  ) { }

  ngOnInit() {}
  logout(){
    sessionStorage.removeItem("userToken");
    google.accounts.id.disableAutoSelect();
    this.router.navigate(['']);
  }
}
