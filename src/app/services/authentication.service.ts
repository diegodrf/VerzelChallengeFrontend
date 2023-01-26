import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AccessToken } from '../models/responseModels/accessToken';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  currentUserSubject: BehaviorSubject<boolean>;

  constructor(
    private httpClient: HttpClient,
    private localStorageService: LocalStorageService
  ) {
    this.currentUserSubject = new BehaviorSubject<boolean>(this.isAuthenticated());
  }

  login(username: string, password: string): Observable<AccessToken> {
    let url = `${environment.api_base_url}/authentication/login`;
    let body = {
      username: username,
      password: password
    };
    return this.httpClient.post<AccessToken>(url, body);
  }

  isAuthenticated(): boolean {
    let accessToken = this.localStorageService.getAccessToken();
    if (accessToken) {
      return true;
    }
    return false;
  }

  getCurrentUser(): Observable<boolean> {
    return this.currentUserSubject.asObservable();
  }
}
