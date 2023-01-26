import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AccessToken } from '../models/responseModels/accessToken';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }

  setAccessToken(accessToken: AccessToken) {
    localStorage.setItem(environment.access_token, JSON.stringify(accessToken));
  }

  getAccessToken(): AccessToken | null {
    let accessTokenString = localStorage.getItem(environment.access_token);
    if (accessTokenString) {
      return JSON.parse(accessTokenString);
    }
    return null;
  }

  clearAccessToken() {
    localStorage.removeItem(environment.access_token);
  }
}
