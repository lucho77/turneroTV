import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    devolverProyecto () {
        //const api = 'https://online1.sfssa.com.ar/SFSFrameworkRest/api/framework/dina';
       // const api = 'http://192.168.20.253:8080/SFSFrameworkRest/api/framework/dina';
        //const api = 'api/framework/dina';
        return environment.api;
    }

    menu: any = [];
    parametroGlobales: any = [];
    constructor(private http: HttpClient) { }
    login(username: string, password: string, novalidahabilitado:boolean) {
        console.log('Permitido en el Authentication service');
        return this.http.get<any>(`${this.devolverProyecto()}/loginSimple/${username}/${password}/configura/${novalidahabilitado}`);
    }
    version() {
        console.log('obteniendo version Server');
        return this.http.get<any>(`${this.devolverProyecto()}/versionServer/`);
    }
}
