import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class LoginServiceService {

  currentUserSubject = new BehaviorSubject<boolean>(false);

  constructor(
    private httpClient: HttpClient
  ) { }

  

  getCurrentUser(): Observable<boolean> {
    return this.currentUserSubject.asObservable();
  }
}
