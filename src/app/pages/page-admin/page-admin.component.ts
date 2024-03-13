import { Component, OnInit } from '@angular/core';
import { PlantsService } from '../../services/plants.service';
import { Plant } from '../../models/plant';
import { ImageErrorHandlerService } from '../../services/ImageErrorHandler.service';

@Component({
  selector: 'app-page-admin',
  templateUrl: './page-admin.component.html',
  styleUrls: ['./page-admin.component.css'],
})
export class PageAdminComponent implements OnInit {
  plantsToDisplay!: Plant[];
  constructor(
    private plantsService: PlantsService,
    private imageErrorHandlerService: ImageErrorHandlerService
  ) {}

  ngOnInit(): void {
    this.plantsService.getPlants().subscribe((plants) => {
      console.log(plants);
      this.plantsToDisplay = [...plants];
    });
  }

  handleImageError(): void {
    this.imageErrorHandlerService.handleImageError(event);
  }

  onClickDeletePlant(plantId: number) {
    this.plantsService.deletePlant(plantId).subscribe({
      next: () => {
        this.plantsToDisplay = this.plantsToDisplay.filter(
          (x) => x.id !== plantId
        );
      },
      error: (err) => {
        console.error(err);
      },
    });
  }
}
