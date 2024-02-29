import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { AuthenticationService } from '../service/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit{
  msgError = ''
  display=false;
  constructor(private authenticationService: AuthenticationService,private router: Router){

  }

  ngOnInit(): void {

    this.login();

  } 

  async login() {
    let u = environment.user;
    let p = environment.password;
    let g = environment.gla;
    const login = localStorage.getItem("login");
    if(login){
      const l= JSON.parse(login);
      u=l.user;
      p=l.password;
      g=l.idGrupReal;
    }
    const user:any = await this.connect(u,p,g);
    this.router.navigate(['/starter']);

  }

  connect(usuario:string,pass:string, gla:number) {

  return new Promise(resolve => {
  this.authenticationService.login(usuario, pass, 
  true).subscribe
  (user => {

    if (user.errorBusiness) {
                   // es un error
                   this.display=true;
                   console.log('ERRORRRRRRRRRRRRRRRRRRR');
                   console.log('error metodo login');
                   this.msgError = 'NO SE PUEDE ESTABLECER CONEXION CON EL SERVIDOR';
                  return;
               }
               // this.loadSpinner = false;
               user.gla = gla;
               localStorage.setItem('currentUser', JSON.stringify(user));
               localStorage.setItem('paramGlobal', JSON.stringify(user.listGlobales));
             
               // this.cargarChat(user);
                resolve(user);

  },
  (err: HttpErrorResponse) => {
    this.display=true;
    console.log('error metodo login');
    console.log(err);
      this.msgError = 'NO SE PUEDE ESTABLECER CONEXION CON EL SERVIDOR';
      return;

    }
  );
});
}

}
