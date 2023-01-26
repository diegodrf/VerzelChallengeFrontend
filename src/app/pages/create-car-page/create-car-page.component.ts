import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { catchError, Observable, of, Subject, Subscription, takeUntil } from 'rxjs';
import { Brand } from 'src/app/models/brand';
import { Vehicle } from 'src/app/models/vehicle';
import { CarService } from 'src/app/services/car.service';

@Component({
  selector: 'app-create-car-page',
  templateUrl: './create-car-page.component.html',
  styleUrls: ['./create-car-page.component.css']
})
export class CreateCarPageComponent implements OnInit, OnDestroy {

  brandControl = ['', Validators.compose([
    Validators.required
  ])];
  nameControl = ['', Validators.compose([
    Validators.required,
    Validators.minLength(2)
  ])];
  modelControl = ['', Validators.compose([
    Validators.required,
    Validators.minLength(2)
  ])];
  priceControl = ['', Validators.compose([
    Validators.required
  ])];
  imageControl = ['', Validators.compose([
  ])];

  form: FormGroup;

  brands: Brand[] = [];
  brands$?: Subscription;
  imageBase64: string | null = null;
  isUpdateAction = false;
  car?: Vehicle;
  currentImageFromWeb$?: Observable<Blob>;
  $unsubscribe: Subject<boolean> = new Subject<boolean>();

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private carService: CarService
  ) {
    this.form = formBuilder.group({
      brand: this.brandControl,
      name: this.nameControl,
      model: this.modelControl,
      price: this.priceControl,
      image: this.imageControl
    });
  }

  ngOnInit(): void {
    this.getBrands();
    this.route.paramMap
      .pipe(takeUntil(this.$unsubscribe))
      .subscribe(
        (params: ParamMap) => {
          let carId = params.get('id');
          if (carId) {
            this.loadCarDetails(Number.parseInt(carId!));
            this.isUpdateAction = true;
          }
        }
      );
  }

  getBrands() {
    this.carService.getBrands()
      .pipe(
        catchError(
          (err: any) => {
            return of([]);
          }
        ),
        takeUntil(this.$unsubscribe)
      )
      .subscribe(
        (data: any) => {
          this.brands = data;
        }
      );
  }

  createCar() {
    let vehicle = {
      name: this.form.controls['name'].value,
      model: this.form.controls['model'].value,
      price: this.form.controls['price'].value,
      brandId: Number.parseInt(this.form.controls['brand'].value),
      imageBase64: this.imageBase64
    };

    this.carService.create(vehicle)
      .pipe(takeUntil(this.$unsubscribe))
      .subscribe(() => this.router.navigate(['/']));
  }

  handleUpload(event: any) {
    const file = event.target.files[0];
    this.transformImageToBase64(file)
  }

  transformImageToBase64(data: Blob) {
    const reader = new FileReader();
    reader.readAsDataURL(data);
    reader.onload = () => {
      this.imageBase64 = reader.result?.toString()!;
    };
  }

  loadCarDetails(carId: number) {
    this.carService.getById(carId)
      .pipe(takeUntil(this.$unsubscribe))
      .subscribe(
        (data: Vehicle) => {
          this.car = data;
          this.form.controls['name'].setValue(this.car.name);
          this.form.controls['model'].setValue(this.car.model);
          this.form.controls['price'].setValue(this.car.price);
          this.form.controls['brand'].setValue(this.car.brand.id);
        }
      )
  }

  deleteCar() {
    this.carService.deleteById(this.car!.id)
      .pipe(takeUntil(this.$unsubscribe))
      .subscribe(
        () => {
          this.router.navigate(['/']);
        });
  }

  updateCar() {
    let vehicle = {
      name: this.form.controls['name'].value,
      model: this.form.controls['model'].value,
      price: this.form.controls['price'].value,
      brandId: Number.parseInt(this.form.controls['brand'].value),
      imageBase64: this.imageBase64
    };
    this.carService.update(this.car!.id, vehicle)
      .pipe(takeUntil(this.$unsubscribe))
      .subscribe(
        () => {
          this.router.navigate(['/']);
        })
  }

  ngOnDestroy(): void {
    this.$unsubscribe.unsubscribe();
  }
}
