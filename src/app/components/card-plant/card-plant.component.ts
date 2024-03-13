import { Component, Input, OnInit } from '@angular/core';
import { Plant } from '../../models/plant';
import { ImageErrorHandlerService } from '../../services/ImageErrorHandler.service';

@Component({
  selector: 'app-card-plant',
  templateUrl: './card-plant.component.html',
  styleUrls: ['./card-plant.component.css'],
})
export class CardPlantComponent implements OnInit {
  @Input() plant!: Plant;
  @Input() plantId: number = 0;

  constructor(private imageErrorHandlerService: ImageErrorHandlerService) {}

  ngOnInit(): void {}

  handleImageError(): void {
    this.imageErrorHandlerService.handleImageError(event);
  }

  getSunIcons(soleil: string): ('sun' | 'sun-fill')[] {
    switch (soleil) {
      case 'Peu':
        return ['sun-fill', 'sun', 'sun'];
      case 'Moyen':
        return ['sun-fill', 'sun-fill', 'sun'];
      case 'Beaucoup':
        return ['sun-fill', 'sun-fill', 'sun-fill'];
      default:
        return [];
    }
  }

  getWateringIcons(arrosage: string): ('droplet' | 'droplet-fill')[] {
    switch (arrosage) {
      case '1':
        return ['droplet-fill', 'droplet', 'droplet'];
      case '2':
        return ['droplet-fill', 'droplet-fill', 'droplet'];
      case '3':
        return ['droplet-fill', 'droplet-fill', 'droplet-fill'];
      default:
        return [];
    }
  }
}
