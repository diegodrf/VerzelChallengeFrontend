import { Component, OnInit } from '@angular/core';
import { AppConstants } from 'src/app/app-constants';
import { LoginServiceService } from 'src/app/pages/login-page/login-service.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  title: string = 'VERZEL'
  isAuthenticated: boolean = false;

  constructor(
    private localStorageService: LocalStorageService,
    private loginService: LoginServiceService
  ) {
    loginService.getCurrentUser().subscribe((data: any) => this.isAuthenticated = data)
  }

  ngOnInit(): void {
    this.getUser();
  }

  getUser() {
    this.isAuthenticated = this.localStorageService.getAccessToken() ? true : false;
  }
}
