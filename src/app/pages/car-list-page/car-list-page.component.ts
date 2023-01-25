import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { catchError, of, Subscription } from 'rxjs';
import { Vehicle } from 'src/app/models/vehicle';
import { CarService } from 'src/app/services/car.service';

@Component({
  selector: 'app-car-list-page',
  templateUrl: './car-list-page.component.html',
  styleUrls: ['./car-list-page.component.css']
})
export class CarListPageComponent implements OnInit, OnDestroy {

  cars: Vehicle[] = [];
  textSearch: string | null = null;
  tag: string | null = null;
  cars$?: Subscription;

  constructor(
    private carService: CarService,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.searchCars();
  }

  searchCars(event: any | null = null) {

    let orderByPriceLowerToHigher = true;
    if (event?.value == 1) {
      orderByPriceLowerToHigher = false;
    }

    this.cars$ = this.carService.getAll(this.textSearch, orderByPriceLowerToHigher)
      .pipe(
        catchError(
          (err: any) => {
            return of([]);
          }
        )
      )
      .subscribe(
        (data: any) => {
          this.cars = data;
        }
      );

    this.tag = this.textSearch;
    this.textSearch = null;
  }

  removeTag() {
    this.tag = null;
    this.searchCars();
  }

  ngOnDestroy() {
    this.cars$?.unsubscribe();
  }
}
