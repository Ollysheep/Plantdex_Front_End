import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Plant } from 'src/app/models/plant';
import { PlantsService } from 'src/app/services/plants.service';
import { ImageErrorHandlerService } from 'src/app/services/ImageErrorHandler.service';

@Component({
  selector: 'app-page-plant-details',
  templateUrl: './page-plant-details.component.html',
  styleUrls: ['./page-plant-details.component.css'],
})
export class PagePlantDetailsComponent {
  plantId: number = 42;
  plantsToDisplay!: Plant;

  constructor(
    private route: ActivatedRoute,
    private plantsService: PlantsService,
    private imageErrorHandlerService: ImageErrorHandlerService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      // Accède au paramètre id de l'URL
      this.plantId = params['id'];
      console.log('ID de la plante:', this.plantId);

      this.plantsService.getPlantsById(this.plantId).subscribe({
        next: (plantDetails) => {
          this.plantsToDisplay = plantDetails;
          console.log('Les détails de la plante: ', this.plantsToDisplay);
        },
        error: (err) => {
          console.error(err);
        },
      });
    });
  }

  // Fonction pour gérer les erreurs d'image
  handleImageError(event: any) {
    this.imageErrorHandlerService.handleImageError(event);
  }
}
