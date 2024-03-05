import { Component } from '@angular/core';
import { Plant } from '../../models/plant';
import { PlantsService } from '../../services/plants.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-page-new-plant',
  templateUrl: './page-new-plant.component.html',
  styleUrls: ['./page-new-plant.component.css'],
})
export class PageNewPlantComponent {
  constructor(private plantsService: PlantsService, private router: Router) {}

  newPlantSubmitted(plant: Plant) {
    this.plantsService.createNewPlant(plant).subscribe((resp) => {
      console.log('New plant created', resp);
      // Notre plante est créée on navigue vers la page admin
      this.router.navigate(['/admin']);
    });
  }
}
