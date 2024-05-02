import { Component, OnInit } from '@angular/core';
import { ModalLoginComponent } from './modal-login/modal-login.component';
import { ModalService } from 'src/app/utils/modal.service';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent  implements OnInit {
  public active : boolean = false
  constructor(
    private modalSvc: ModalService,
    private router: Router,
  ) { }

  ngOnInit() {}
  setActive() : void {
    this.active = !this.active
  }
  async showModal() {
    this.modalSvc.openModalUser(ModalLoginComponent);
  }
  scrollToBottom(): void {
    window.scrollTo(0, document.body.scrollHeight);
  }
  ValidateSession(){
    let usuario =localStorage.getItem('nombre') || "";
    if(usuario===''){
      this.modalSvc.openModalUser(ModalLoginComponent);
    }else{
      this.router.navigate(['/entrevista/evaluar-usuario'])
    }
  }
  presentPopover(){
    window.open(environment.wsp, '_blank');
  }
}
