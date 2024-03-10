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
  sunlightLevelsToSend: string[] = [];
  wateringToSend: string[] = [];

  globalSearchUser: string = '';
  globalSelectedCategories: string[] = [];
  globalSelectedSunlightLevels: string[] = [];
  globalSelectedWatering: string[] = [];

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
      this.sunlightLevelsToSend = this.getSunlightLevelsFromPlants(data);
      this.wateringToSend = this.getWateringFromPlants(data);
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

  getSunlightLevelsFromPlants(plants: Plant[]): string[] {
    const sunlightLevelArray = plants.map((x) => x.soleil);
    const sunlightLevelSetUnique = new Set(sunlightLevelArray);
    const sunlightLevelArrayUnique = [...sunlightLevelSetUnique];
    console.log('Ensoleillement', sunlightLevelArrayUnique);

    return sunlightLevelArrayUnique;
  }

  getWateringFromPlants(plants: Plant[]): string[] {
    const wateringArray: string[] = plants.map((x) => x.arrosage);
    const wateringSetUnique: Set<string> = new Set(wateringArray);
    const wateringArrayUnique: string[] = [...wateringSetUnique];
    console.log('Arrosage:', wateringArrayUnique);

    return wateringArrayUnique;
  }

  filterPlantsByCategories(categories: string[]) {
    this.globalSelectedCategories = [...categories];
    this.plantsToDisplay = this.genericFilter(
      this.allPlants,
      this.globalSelectedCategories,
      this.globalSelectedSunlightLevels,
      this.globalSelectedWatering,
      this.globalSearchUser
    );
  }

  filterPlantsBySunlightLevels(sunlightLevels: string[]) {
    this.globalSelectedSunlightLevels = [...sunlightLevels];
    console.log('Ensoleillement:', this.globalSelectedSunlightLevels);

    this.plantsToDisplay = this.allPlants.filter((plant) => {
      // Vérifier si au moins un niveau d'ensoleillement est présent dans la liste sélectionnée
      return this.globalSelectedSunlightLevels.includes(plant.soleil);
    });

    // Appliquer ensuite les autres filtres
    this.plantsToDisplay = this.genericFilter(
      this.plantsToDisplay,
      this.globalSelectedCategories,
      this.globalSelectedSunlightLevels,
      this.globalSelectedWatering,
      this.globalSearchUser
    );
  }

  filterPlantsByWatering(watering: string[]) {
    this.globalSelectedWatering = [...watering];
    console.log('Arrosage:', this.globalSelectedWatering);

    this.plantsToDisplay = this.allPlants.filter((plant) => {
      // Vérifier si au moins un niveau d'arrosage est présent dans la liste sélectionnée
      return this.globalSelectedWatering.includes(plant.arrosage);
    });

    // Appliquer ensuite les autres filtres
    this.plantsToDisplay = this.genericFilter(
      this.plantsToDisplay,
      this.globalSelectedCategories,
      this.globalSelectedSunlightLevels,
      this.globalSelectedWatering,
      this.globalSearchUser
    );
  }

  onSearchUser(search: string) {
    this.globalSearchUser = search;
    this.plantsToDisplay = this.genericFilter(
      this.allPlants,
      this.globalSelectedCategories,
      this.globalSelectedSunlightLevels,
      this.globalSelectedWatering,
      this.globalSearchUser
    );
  }

  genericFilter(
    allPlants: Plant[],
    selectedCategories: string[],
    selectedSunlightLevels: string[],
    selectedWatering: string[],
    searchUser: string
  ) {
    let filteredPlants = [...allPlants];

    // Filtrage par catégories
    if (selectedCategories.length !== 0) {
      filteredPlants = filteredPlants.filter((x) =>
        selectedCategories.includes(x.categorie)
      );
    }

    // Filtrage par ensoleillement
    if (selectedSunlightLevels.length !== 0) {
      filteredPlants = filteredPlants.filter((x) =>
        selectedSunlightLevels.includes(x.soleil)
      );
      console.log('Filtré par ensoleillement:', filteredPlants);
    }

    // Filtrage par arrosage
    if (selectedWatering.length !== 0) {
      filteredPlants = filteredPlants.filter((x) =>
        selectedWatering.includes(x.arrosage)
      );
      console.log('Filtré par arrosage:', filteredPlants);
    }

    // Filtrage par recherche utilisateur
    filteredPlants = filteredPlants.filter((x) =>
      x.nom.toLocaleLowerCase().includes(searchUser.toLocaleLowerCase())
    );

    return filteredPlants;
  }
}
