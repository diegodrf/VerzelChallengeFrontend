import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class HttpInterceptorService implements HttpInterceptor {
  token?: string | null;

  constructor(
    private localStorageService: LocalStorageService
  ) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json');

    this.token = this.localStorageService.getAccessToken();

    if (this.token) {
      headers = headers.set('Authorization', 'Bearer ' + this.token);
    }

    const newRequest = req.clone({ headers });

    return next.handle(newRequest);
  }
}