import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-connect',
  templateUrl: './connect.component.html',
  styleUrls: ['./connect.component.scss']
})
export class ConnectComponent implements OnInit{
  login : any = {
    user:environment.user,
    password:environment.password,
    idGrupReal:0
  }

  constructor(private router: Router, private acRoute: ActivatedRoute){

  }

  ngOnInit(): void {
    this.acRoute.params.subscribe( params => {
      this.login.user = params['usuario'];
      this.login.password = params['pass'];
      this.login.idGrupReal = params['idGrupReal'];
      localStorage.setItem('login',JSON.stringify(this.login));
      this.router.navigate(['/login']);
    });
  } 

}
