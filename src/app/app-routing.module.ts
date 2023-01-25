import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CarListPageComponent } from './pages/car-list-page/car-list-page.component';
import { CreateCarPageComponent } from './pages/create-car-page/create-car-page.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { AuthenticationService } from './services/authentication.service';
import { RouterValidatorService } from './services/router-validator.service';

const routes: Routes = [
  { path: '', component: CarListPageComponent },
  { path: 'login', component: LoginPageComponent },
  {
    path: 'new',
    component: CreateCarPageComponent,
    canActivate: [RouterValidatorService]
  },
  {
    path: 'edit/:id',
    component: CreateCarPageComponent,
    canActivate: [RouterValidatorService]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
