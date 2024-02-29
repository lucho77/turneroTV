import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UrlHandlingStrategy } from '@angular/router';
import { TvConstants } from '../constants/tvConstants';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // add authorization header with jwt token if available
        console.log(request);
        const currentUser = JSON.parse(localStorage.getItem('currentUser')!);
        if (currentUser && currentUser.token && !request.url.includes(TvConstants.URL_REFRESHTOKEN)) {
            let url = request.url;
            url = url.replace('SFSFrameworkMobile/', '');
            request = request.clone({url: url,
                setHeaders: {
                    Authorization: `Bearer ${currentUser.token}`
                }

            });
        }

        return next.handle(request);
    }
}
