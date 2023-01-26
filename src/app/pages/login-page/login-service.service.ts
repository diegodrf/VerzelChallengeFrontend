import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class LoginServiceService {

  currentUserSubject: BehaviorSubject<boolean>;

  constructor(
    private httpClient: HttpClient,
    private authenticationService: AuthenticationService
  ) {
    let isAuthenticated = authenticationService.isAuthenticated();
    this.currentUserSubject = new BehaviorSubject<boolean>(isAuthenticated);
  }



  getCurrentUser(): Observable<boolean> {
    return this.currentUserSubject.asObservable();
  }
}
