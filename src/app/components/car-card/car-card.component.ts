import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Vehicle } from 'src/app/models/vehicle';
import { LoginServiceService } from 'src/app/pages/login-page/login-service.service';

@Component({
  selector: 'app-car-card',
  templateUrl: './car-card.component.html',
  styleUrls: ['./car-card.component.css']
})
export class CarCardComponent implements OnInit {

  @Input() car!: Vehicle;
  isLoggedIn = false;

  alternativeImage: string = 'https://images.kavak.services/images/127451/EXTERIOR-frontSidePilotNear-16363920717303.jpg?d=540x310'
  constructor(
    private router: Router,
    private loginService: LoginServiceService
  ) {
    loginService
      .getCurrentUser()
      .subscribe(
        (data: any) => this.isLoggedIn = data
      )
  }

  ngOnInit(): void {
  }

  edit() {
    console.log('Edit cliked : ' + this.car.id);
    this.router.navigate(['/edit', this.car.id])
  }
}
