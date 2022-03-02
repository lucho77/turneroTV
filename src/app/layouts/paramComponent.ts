import { Component } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
    selector: 'app-param-layout',
    templateUrl: './param.component.html',
  })
  export class ParamComponent {
    constructor(private activatedRoute: ActivatedRoute, private router:Router) {
        const usuario ={user:'',pass:''}; 
        this.activatedRoute.params.subscribe(params => {
            const user = (params['user']);
            const pass = (params['pass']);
            usuario.user = user;
            usuario.pass = pass;
            console.log(user);
            console.log(pass);
            localStorage.setItem('usuario', JSON.stringify(usuario));
            this.router.navigate(['']);

        });
      }
    

  }
