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
  wateringToSend: number[] = [];

  globalSearchUser: string = '';
  globalSelectedCategories: string[] = [];
  globalSelectedSunlightLevels: string[] = [];
  globalSelectedWatering: number[] = [];

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
    const categoryArray = plants.map((plants) => plants.categorie.libelle);
    const categorySetUnique = new Set(categoryArray);
    console.log(categorySetUnique);

    const categoryArrayUnique = [...categorySetUnique];

    return categoryArrayUnique;
  }

  getSunlightLevelsFromPlants(plants: Plant[]): string[] {
    const sunlightLevelArray = plants.map((plants) => plants.soleil);
    const sunlightLevelSetUnique = new Set(sunlightLevelArray);
    const sunlightLevelArrayUnique = [...sunlightLevelSetUnique];
    console.log('Ensoleillement', sunlightLevelArrayUnique);

    return sunlightLevelArrayUnique;
  }

  getWateringFromPlants(plants: Plant[]): number[] {
    const wateringArray = plants.map((plants) => plants.arrosage);
    const wateringSetUnique = new Set(wateringArray);
    const wateringArrayUnique: number[] = [...wateringSetUnique];
    console.log('Arrosage:', wateringArrayUnique);

    return wateringArrayUnique;
  }

  filterPlantsByCategories(categories: string[]) {
    this.globalSelectedCategories = [...categories];
    console.log('Catégories sélectionnées:', this.globalSelectedCategories);
    this.plantsToDisplay = this.allPlants.filter((plant) => {
      // Vérifier si au moins une catégorie est présente dans la liste sélectionnée
      return this.globalSelectedCategories.includes(plant.categorie.libelle);
    });

    // Appliquer ensuite les autres filtres
    // Assurez-vous que tous les appels à genericFilter fournissent les cinq arguments nécessaires.
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
    // Assurez-vous que tous les appels à genericFilter fournissent les cinq arguments nécessaires.
    this.plantsToDisplay = this.genericFilter(
      this.allPlants,
      this.globalSelectedCategories,
      this.globalSelectedSunlightLevels,
      this.globalSelectedWatering,
      this.globalSearchUser
    );
  }

  filterPlantsByWatering(watering: number[]) {
    this.globalSelectedWatering = [...watering];
    console.log('Arrosage:', this.globalSelectedWatering);

    this.plantsToDisplay = this.allPlants.filter((plant) => {
      return this.globalSelectedWatering.includes(plant.arrosage); // Convertir seulement si nécessaire
    });

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
    selectedWatering: number[],
    searchUser: string
  ) {
    console.log('Executing genericFilter');
    let filteredPlants = [...allPlants];

    if (selectedCategories.length) {
      filteredPlants = filteredPlants.filter((plants) =>
        selectedCategories.includes(plants.categorie.libelle)
      );
    }

    if (selectedSunlightLevels.length) {
      filteredPlants = filteredPlants.filter((plants) =>
        selectedSunlightLevels.includes(plants.soleil)
      );
    }

    if (selectedWatering.length) {
      filteredPlants = filteredPlants.filter((plants) =>
        selectedWatering.includes(plants.arrosage)
      );
    }

    if (searchUser) {
      filteredPlants = filteredPlants.filter((plants) =>
        plants.nom.toLowerCase().includes(searchUser.toLowerCase())
      );
    }

    return filteredPlants;
  }
}
