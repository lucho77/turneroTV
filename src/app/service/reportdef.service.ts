import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { User } from '../model/user';
import { FinderParamsDTO } from '../model/finderParamsDTO';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ReportdefService {
    constructor(private http: HttpClient) { }
     devolverProyecto () {
        const api = 'https://online1.sfssa.com.ar/SFSFrameworkRest/api/framework/dina';
        //const api = 'api/framework/dina';
        return api;
    }
    
    login(username: string, password: string) :Observable<any>{
        console.log('Permitido en el Authentication service');
        return this.http.get<any>(`${this.devolverProyecto()}/login/${username}/${password}/configura`);
    }

    consultarAbmGeneric(dato: User, finder: FinderParamsDTO ):Observable<any> {
        finder.dataSource = dato.datasource!;
        finder.username = dato.username!;
        finder.webServicesAddress = dato.webservice!;
        finder.modelPackage = dato.packageModel!;
        finder.idUsuarioUra = dato.idUsuarioUra!;
        return this.http.post<any>(`${this.devolverProyecto()}/consultarDatosBusquedaGenerica/`, finder)
        .pipe(map(result => result));
    }



}
