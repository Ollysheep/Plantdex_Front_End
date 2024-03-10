import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-filter-side-bar',
  templateUrl: './filter-side-bar.component.html',
  styleUrls: ['./filter-side-bar.component.css'],
})
export class FilterSideBarComponent {
  @Input() categoriesToDisplay!: string[];
  @Input() sunlightLevelsToDisplay!: string[]; // Ajout de la liste des niveaux d'ensoleillement
  @Input() wateringToDisplay!: string[]; // Ajout de la liste des niveaux d'arrosage

  @Output() categoriesToFilter = new EventEmitter<string[]>();
  @Output() sunlightLevelsToFilter = new EventEmitter<string[]>(); // Émetteur pour les niveaux d'ensoleillement
  @Output() wateringToFilter = new EventEmitter<string[]>(); // Émetteur pour les niveaux d'arrosage

  checkedCategories: string[] = [];
  checkedSunlightLevels: string[] = []; // Tableau pour les niveaux d'ensoleillement
  checkedWatering: string[] = []; // Tableau pour les niveaux d'arrosage

  onCheckedCategories(event: Event) {
    const target = event.target as HTMLInputElement;

    /**
     * Lorsqu'un user coche une checkbox
     * -> On l'ajoute à un tableau de catégorie cochée */
    if (target.checked) {
      /**
       * Lorsqu'un user coche une checkbox après avoir tout décoché
       * -> On doit d'abord vider notre tableau
       * -> et l'ajoute à un tableau de catégorie cochée */
      if (this.checkedCategories.length === this.categoriesToDisplay.length) {
        this.checkedCategories = [];
      }
      this.checkedCategories.push(target.value);
    } else {
      /**
       * Lorsqu'un user décoche une checkbox
       * -> On la retire du tableau de catégorie cochée */
      this.checkedCategories = this.checkedCategories.filter(
        (categorie) => categorie !== target.value
      );

      /**
       * Lorqu'aucune catégorie n'est coché
       * -> On met toutes les catégories par défaut */
      if (this.checkedCategories.length === 0) {
        this.checkedCategories = [...this.categoriesToDisplay];
      }
    }

    this.categoriesToFilter.emit(this.checkedCategories);
  }

  // Fonction similaire pour les niveaux d'ensoleillement
  onCheckedSunlightLevels(event: Event) {
    const target = event.target as HTMLInputElement;

    if (target.checked) {
      if (
        this.checkedSunlightLevels.length ===
        this.sunlightLevelsToDisplay.length
      ) {
        this.checkedSunlightLevels = [];
      }
      this.checkedSunlightLevels.push(target.value);
    } else {
      this.checkedSunlightLevels = this.checkedSunlightLevels.filter(
        (level) => level !== target.value
      );

      if (this.checkedSunlightLevels.length === 0) {
        this.checkedSunlightLevels = [...this.sunlightLevelsToDisplay];
      }
    }

    this.sunlightLevelsToFilter.emit(this.checkedSunlightLevels);
  }

  // Fonction similaire pour les niveaux d'arrosage
  onCheckedWatering(event: Event) {
    const target = event.target as HTMLInputElement;

    if (target.checked) {
      if (this.checkedWatering.length === this.wateringToDisplay.length) {
        this.checkedWatering = [];
      }
      this.checkedWatering.push(target.value);
    } else {
      this.checkedWatering = this.checkedWatering.filter(
        (level) => level !== target.value
      );

      if (this.checkedWatering.length === 0) {
        this.checkedWatering = [...this.wateringToDisplay];
      }
    }

    this.wateringToFilter.emit(this.checkedWatering);
  }
}
