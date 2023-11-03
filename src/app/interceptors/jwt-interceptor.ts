import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from "rxjs/operators";
import { AuthService } from '../services/auth.service';

const AUTHORIZATION = environment.AUTHORIZATION;
const BEARER = environment.BEARER;
const TOKEN = environment.BACKEND_TOKEN;

@Injectable({
  providedIn: 'root'
})
export class JwtInterceptor implements HttpInterceptor {

  constructor(private router: Router,
    private authService: AuthService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const currentUser = this.authService.currentUser;
    const isLoggedIn = currentUser && currentUser.token;
    const isApiUrl = request.url.startsWith(environment.BACKEND_ITA_WIKI_BASE_URL);
    if (isLoggedIn && isApiUrl) {
        request = request.clone({
            setHeaders: { Authorization: `Bearer ${currentUser.token}` }
        });
    }

    return next.handle(request);
    // let modifiedRequest = request;
    //const isApiUrl = request.url.startsWith(environment.BACKEND_BASE_URL);
    // if (TOKEN != null) {
    //   modifiedRequest = request.clone({ headers: request.headers.set(AUTHORIZATION, BEARER + TOKEN) });
    // }
    // return next.handle(modifiedRequest).pipe( //redireccionar si alguna petición arroja 401 - Forbidden
    //   catchError((error) => {
    //     if (error.status === 401) {
    //       this.router.navigateByUrl('/login');
    //     }
    //     return throwError(() => new Error(error.message));
    //   }));
  }
}
export const interceptorProvider = [{provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true}];
