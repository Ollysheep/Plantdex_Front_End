import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Plant } from '../models/plant';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PlantsService {
  apiurl = 'http://localhost:8080/api/plante';
  constructor(private http: HttpClient) {}

  getPlants(): Observable<Plant[]> {
    return this.http.get<Plant[]>(this.apiurl);
  }

  createNewPlant(plantToCreate: Plant): Observable<Plant> {
    return this.http.post<Plant>(`${this.apiurl}`, plantToCreate);
  }

  deletePlant(plantId: number) {
    return this.http.delete(`${this.apiurl}/${plantId}`);
  }

  getPlantsById(plantId: number): Observable<Plant> {
    console.log('ID appelé: ', plantId);
    return this.http.get<Plant>(`${this.apiurl}/${plantId}`);
  }

  updatePlant(plantId: number, updatedPlant: Plant): Observable<any> {
    return this.http.put(`${this.apiurl}/${plantId}`, updatedPlant);
  }
}
