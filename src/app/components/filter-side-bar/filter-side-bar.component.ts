import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-filter-side-bar',
  templateUrl: './filter-side-bar.component.html',
  styleUrls: ['./filter-side-bar.component.css'],
})
export class FilterSideBarComponent {
  @Input() categoriesToDisplay!: string[];
  checkedCategories: string[] = [];
  @Output() categoriesToFilter = new EventEmitter<string[]>();

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
}
