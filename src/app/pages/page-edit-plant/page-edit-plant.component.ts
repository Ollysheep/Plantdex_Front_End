import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Plant } from 'src/app/models/plant';
import { PlantsService } from 'src/app/services/plants.service';
import { Router } from '@angular/router';
import { FormEditPlantComponent } from '../../components/form-edit-plant/form-edit-plant.component';

@Component({
  selector: 'app-page-edit-plant',
  templateUrl: './page-edit-plant.component.html',
  styleUrls: ['./page-edit-plant.component.css'],
})
export class PageEditPlantComponent implements OnInit {
  /* plantId: number = 0;
   *plantDetails: Plant = {} as Plant;*/

  plantId!: number;
  plantDetails!: Plant;

  constructor(
    private route: ActivatedRoute,
    private plantsService: PlantsService,
    private router: Router
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.plantId = params['id'];
      console.log('ID de la plante:', this.plantId);

      this.plantsService.getPlantsById(this.plantId).subscribe({
        next: (plantDetails) => {
          this.plantDetails = plantDetails;
          console.log('Les détails de la plante: ', this.plantDetails);
        },
        error: (err) => {
          console.error(err);
        },
      });
    });
  }

  editPlant(updatedPlant: Plant) {
    this.plantsService.updatePlant(this.plantId, updatedPlant).subscribe({
      next: () => {
        console.log('Détails de la plante mis à jour avec succès');
        this.router.navigate(['/admin']);
      },
      error: (err) => {
        console.error(err);
      },
    });
  }
}
