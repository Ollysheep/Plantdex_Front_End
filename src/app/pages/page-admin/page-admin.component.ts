import { Component, OnInit } from '@angular/core';
import { PlantsService } from '../../services/plants.service';
import { Plant } from '../../models/plant';

@Component({
  selector: 'app-page-admin',
  templateUrl: './page-admin.component.html',
  styleUrls: ['./page-admin.component.css'],
})
export class PageAdminComponent implements OnInit {
  plantsToDisplay!: Plant[];
  constructor(private plantsService: PlantsService) {}

  ngOnInit(): void {
    this.plantsService.getPlants().subscribe((plants) => {
      console.log(plants);
      this.plantsToDisplay = [...plants];
    });
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
