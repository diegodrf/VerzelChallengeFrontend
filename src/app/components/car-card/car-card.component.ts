import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Vehicle } from 'src/app/models/vehicle';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-car-card',
  templateUrl: './car-card.component.html',
  styleUrls: ['./car-card.component.css']
})
export class CarCardComponent {

  @Input() car!: Vehicle;
  isLoggedIn = false;
  apiImagesBaseUrl = environment.api_images_base_url;
  defaultImagePath = '/assets/images/default-cars.jpeg';

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService
  ) {
    authenticationService
      .getCurrentUser()
      .subscribe((data: any) => {
        this.isLoggedIn = data;
      });
  }

  edit() {
    this.router.navigate(['/edit', this.car.id])
  }
}
