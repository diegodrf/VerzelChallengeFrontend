import { Injectable } from '@angular/core';
import { AppConstants } from '../app-constants';
import { AccessToken } from '../models/responseModels/accessToken';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }

  setAccessToken(accessToken: AccessToken) {
    localStorage.setItem(AppConstants.ACCESS_TOKEN, JSON.stringify(accessToken));
  }

  getAccessToken(): AccessToken | null {
    let accessTokenString = localStorage.getItem(AppConstants.ACCESS_TOKEN);
    if (accessTokenString) {
      return JSON.parse(accessTokenString);
    }
    return null;
  }

  clearAccessToken() {
    localStorage.removeItem(AppConstants.ACCESS_TOKEN);
  }
}
