import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalService } from 'src/app/utils/modal.service';
declare var google: any;
@Component({
  selector: 'app-modal-login',
  templateUrl: './modal-login.component.html',
  styleUrls: ['./modal-login.component.scss'],
})
export class ModalLoginComponent  implements OnInit {

  constructor(
    private router : Router,
    private modalSvc: ModalService,
  ) { }

  ngOnInit() {
    google.accounts.id.initialize({
      client_id:'759064264685-42g1c3400tdi2upvsu6s780aj1c7cau4.apps.googleusercontent.com',
      callback:(response: any )=>this.handleLogin(response)
    });
    google.accounts.id.renderButton(document.getElementById("google-btn"),{
      theme:'filled_blue',
      size:'large',
      shape:'rectangle',
      width:350,
    });
  }
  private decodeToken(token :string ){
    return JSON.parse(atob(token.split(".")[1]));
  }
  handleLogin(response: any ){
    if (response) {
      //decode token
      const contToken = this.decodeToken(response.credential);
      //store in session
      sessionStorage.setItem("nombre",contToken.name);
      sessionStorage.setItem("img",contToken.picture);
      //cerrar modal
      this.cerrarModal();
      //navigate to home/
      this.router.navigate(['/entrevista/evaluar-usuario']);
    }
  }
  cerrarModal() {
    return this.modalSvc.cancel();
  }
}
