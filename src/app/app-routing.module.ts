import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageHomeComponent } from './pages/page-home/page-home.component';
import { PageMyPlantsComponent } from './pages/page-my-plants/page-my-plants.component';
import { PageAdminComponent } from './pages/page-admin/page-admin.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { PageNewPlantComponent } from './pages/page-new-plant/page-new-plant.component';
import { PagePlantDetailsComponent } from './pages/page-plant-details/page-plant-details.component';
import { PageEditPlantComponent } from './pages/page-edit-plant/page-edit-plant.component';

const routes: Routes = [
  //Set route for url : http://localhost:4200
  { path: '', component: PageHomeComponent },
  //Set route for url : http://localhost:4200/my-plants
  { path: 'my-plants', component: PageMyPlantsComponent },
  //Set route for url : http://localhost:4200/admin -> PageAdminComponent
  { path: 'admin', component: PageAdminComponent },
  { path: 'admin/new-plant', component: PageNewPlantComponent },
  /* Définition de la route pour afficher les détails d'une plante avec un paramètre ID dans l'URL.
   * Le chemin 'plant/details/:id' signifie que l'ID de la plante sera capturé depuis l'URL
   * Exemple d'URL valide : http://localhost:4200/plant/details/42, où 42 est l'ID de la plante. */
  { path: 'plant/details/:id', component: PagePlantDetailsComponent },
  { path: 'admin/plant/edit/:id', component: PageEditPlantComponent },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
