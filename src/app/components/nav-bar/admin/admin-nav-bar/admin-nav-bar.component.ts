import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';

@Component({
  selector: 'app-admin-nav-bar',
  templateUrl: './admin-nav-bar.component.html',
  styleUrls: ['./admin-nav-bar.component.css']
})
export class AdminNavBarComponent {
  constructor(
    private router: Router,
    private localStorageService: LocalStorageService,
    private authenticationService: AuthenticationService
  ) { }

  logOut() {
    this.localStorageService.clearAccessToken();
    this.authenticationService.currentUserSubject.next(false);
    this.router.navigate(['/']);
  }

}
