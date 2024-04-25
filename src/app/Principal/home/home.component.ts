import { Component, OnInit } from '@angular/core';
import { ModalLoginComponent } from './modal-login/modal-login.component';
import { ModalService } from 'src/app/utils/modal.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent  implements OnInit {
  public active : boolean = false
  constructor(
    private modalSvc: ModalService,
  ) { }

  ngOnInit() {}
  setActive() : void {
    this.active = !this.active
  }
  async showModal() {
    this.modalSvc.openModalUser(ModalLoginComponent);
  }
}
