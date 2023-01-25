import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppConstants } from 'src/app/app-constants';
import { LoginServiceService } from 'src/app/pages/login-page/login-service.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';

@Component({
  selector: 'app-admin-nav-bar',
  templateUrl: './admin-nav-bar.component.html',
  styleUrls: ['./admin-nav-bar.component.css']
})
export class AdminNavBarComponent implements OnInit {
  constructor(
    private router: Router,
    private localStorageService: LocalStorageService,
    private loginService: LoginServiceService
  ) { }

  ngOnInit(): void {
  }

  logOut() {
    this.localStorageService.clearAccessToken();
    this.loginService.currentUserSubject.next(false);
    this.router.navigate(['/']);
  }

}
