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
      case 'PEU':
        return ['sun-fill', 'sun', 'sun'];
      case 'MOYEN':
        return ['sun-fill', 'sun-fill', 'sun'];
      case 'BEAUCOUP':
        return ['sun-fill', 'sun-fill', 'sun-fill'];
      default:
        return [];
    }
  }

  getWateringIcons(arrosage: number): ('droplet' | 'droplet-fill')[] {
    switch (arrosage) {
      case 1:
        return ['droplet-fill', 'droplet', 'droplet'];
      case 2:
        return ['droplet-fill', 'droplet-fill', 'droplet'];
      case 3:
        return ['droplet-fill', 'droplet-fill', 'droplet-fill'];
      default:
        return [];
    }
    /* if (arrosageNumber === 1) {
      return ['droplet-fill', 'droplet', 'droplet'];
    } else if (arrosage === 2) {
      return ['droplet-fill', 'droplet-fill', 'droplet'];
    } else if (arrosage === 3) {
      return ['droplet-fill', 'droplet-fill', 'droplet-fill'];
    } else {
      return [];
    }*/
  }
}
