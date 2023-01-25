import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppConstants } from '../app-constants';
import { AccessToken } from '../models/responseModels/accessToken';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(
    private httpClient: HttpClient,
    private localStorageService: LocalStorageService
  ) { }

  login(username: string, password: string): Observable<AccessToken> {
    let url = `${AppConstants.API_BASE_URL}/authentication/login`;
    let body = {
      username: username,
      passwordHash: password
    };
    return this.httpClient.post<AccessToken>(url, body);
  }

  isAuthenticated(): boolean {
    let accessToken = this.localStorageService.getAccessToken();
    if (accessToken) {
      return true;
    };
    return false;
  }
}
