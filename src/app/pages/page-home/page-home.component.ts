import { Component, OnInit } from '@angular/core';
import { PlantsService } from '../../services/plants.service';
import { Plant } from '../../models/plant';

@Component({
  selector: 'app-page-home',
  templateUrl: './page-home.component.html',
  styleUrls: ['./page-home.component.css'],
})
export class PageHomeComponent implements OnInit {
  plantsToDisplay: Plant[] = [];
  allPlants: Plant[] = [];
  categoriesToSend: string[] = [];

  constructor(private plantsService: PlantsService) {}

  ngOnInit(): void {
    this.plantsService.getPlants().subscribe((data) => {
      console.log(data);
      this.plantsToDisplay = [...data];
      this.allPlants = [...data];
      /**
       * EXERCICE ALGO EN DESSOUS
       */
      this.categoriesToSend = this.getCategoriesFromPlants(data);
    });
  }

  getCategoriesFromPlants(plants: Plant[]): string[] {
    // Retourner un tableau contenant les catégories des plantes de manière unique
    // => ['plante verte', 'orchidés', 'bonsaïs']
    // Indice : .map() / Set
    /**
     * Etapes :
     * 1 - Mapper notre tableau de plant[] pour string[] (de catégorie)
     * 2 - Supprimer les doublons de catégorie en utilisant un Set
     * 3 - Retransfromer notre Set en tableau
     */
    const categoryArray = plants.map((x) => x.categorie);
    const categorySetUnique = new Set(categoryArray);
    const categoryArrayUnique = [...categorySetUnique];

    return categoryArrayUnique;
  }

  filterPlantsByCategories(categories: string[]) {
    /**
     * Implémentation du filtre des
     * plantes en fonction de leur categorie
     * .includes() et .filter()
     * const pets = ['cat', 'dog', 'bat'];
      console.log(pets.includes('cat'));
     */
    this.plantsToDisplay = this.allPlants.filter((x) =>
      categories.includes(x.categorie)
    );
  }
}
