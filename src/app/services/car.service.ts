import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppConstants } from '../app-constants';
import { Brand } from '../models/brand';
import { Vehicle } from '../models/vehicle';

@Injectable({
  providedIn: 'root'
})
export class CarService {

  constructor(
    private httpClient: HttpClient
  ) { }

  getBrands(): Observable<Brand[]> {
    return this.httpClient.get<Brand[]>(`${AppConstants.API_BASE_URL}/vehicles/brands`);
  }

  create(car: any, accessToken: string): Observable<Vehicle> {
    let url = `${AppConstants.API_BASE_URL}/vehicles`;
    return this.httpClient.post<Vehicle>(url, car, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`
      }
    });
  }

  getById(id: number): Observable<Vehicle> {
    let url = `${AppConstants.API_BASE_URL}/vehicles/${id}`;
    return this.httpClient.get<Vehicle>(url);
  }

  update(id: number, car: any, accessToken: string): Observable<Vehicle> {
    let url = `${AppConstants.API_BASE_URL}/vehicles/${id}`;
    return this.httpClient.put<Vehicle>(url, car, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`
      }
    });
  }

  deleteById(id: number, accessToken: string): Observable<void> {
    let url = `${AppConstants.API_BASE_URL}/vehicles/${id}`;
    return this.httpClient.delete<void>(url, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`
      }
    });
  }

  getAll(text: string | null = null, priceLowerToHigher: boolean = true): Observable<Vehicle[]> {
    let params: string[] = []
    if (text) {
      params.push(`q=${text}`);
    };
    params.push(`priceLowerToHigher=${priceLowerToHigher}`);

    let url: string = `${AppConstants.API_BASE_URL}/vehicles?${params.join('&')}`;

    return this.httpClient.get<Vehicle[]>(url);
  }
}
