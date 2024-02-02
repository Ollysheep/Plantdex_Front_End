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
  globalSearchUser: string = '';
  globalSelectedCategories: string[] = [];

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
    this.globalSelectedCategories = [...categories];
    this.plantsToDisplay = this.genericFilter(
      this.allPlants,
      this.globalSelectedCategories,
      this.globalSearchUser
    );
  }

  onSearchUser(search: string) {
    this.globalSearchUser = search;
    this.plantsToDisplay = this.genericFilter(
      this.allPlants,
      this.globalSelectedCategories,
      this.globalSearchUser
    );
  }

  genericFilter(
    allPlants: Plant[],
    selectedCategories: string[],
    searchUser: string
  ) {
    let filteredPlants = [...allPlants];

    if (selectedCategories.length !== 0) {
      filteredPlants = filteredPlants.filter((x) =>
        selectedCategories.includes(x.categorie)
      );
    }

    filteredPlants = filteredPlants.filter((x) =>
      x.nom.toLocaleLowerCase().includes(searchUser.toLocaleLowerCase())
    );

    return filteredPlants;
  }
}
