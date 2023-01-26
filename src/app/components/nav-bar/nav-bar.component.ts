import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit, OnDestroy {

  title: string = 'VERZEL'
  isAuthenticated: boolean = false;
  $subscription: Subscription;

  constructor(
    private localStorageService: LocalStorageService,
    private authenticationService: AuthenticationService
  ) {
    this.$subscription = authenticationService.getCurrentUser().subscribe((data: any) => this.isAuthenticated = data)
  }

  ngOnInit(): void {
    this.getUser();
  }

  getUser() {
    this.isAuthenticated = this.localStorageService.getAccessToken() ? true : false;
  }

  ngOnDestroy(): void {
    this.$subscription.unsubscribe();
  }
}
