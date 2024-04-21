import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
declare var google: any;
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent  implements OnInit {

  constructor(
    private router : Router,

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
      sessionStorage.setItem("userToken",JSON.stringify(contToken));
      //navigate to home/
      this.router.navigate(['/entrevista/home']);
    }
  }

}
