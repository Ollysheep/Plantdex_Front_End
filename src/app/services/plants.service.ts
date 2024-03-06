import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Plant } from '../models/plant';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PlantsService {
  constructor(private http: HttpClient) {}

  getPlants(): Observable<Plant[]> {
    return this.http.get<Plant[]>('http://localhost:3000/plants');
  }

  createNewPlant(plantToCreate: Plant): Observable<Plant> {
    return this.http.post<Plant>('http://localhost:3000/plants', plantToCreate);
  }

  deletePlant(plantId: number) {
    return this.http.delete(`http://localhost:3000/plants/${plantId}`);
  }

  getPlantsById(plantId: number): Observable<Plant> {
    console.log('ID appelé: ', plantId);
    return this.http.get<Plant>(`http://localhost:3000/plants/${plantId}`);
  }

  updatePlant(plantId: number, updatedPlant: Plant): Observable<any> {
    const apiUrl = `http://localhost:3000/plants/${plantId}`;
    return this.http.put(apiUrl, updatedPlant);
  }
}
