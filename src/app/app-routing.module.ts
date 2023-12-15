import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageHomeComponent } from './pages/page-home/page-home.component';
import { PageMyPlantsComponent } from './pages/page-my-plants/page-my-plants.component';
import { PageAdminComponent } from './pages/page-admin/page-admin.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';

const routes: Routes = [
  //Set route for url : http://localhost:4200
  { path: '', component: PageHomeComponent },
  //Set route for url : http://localhost:4200/my-plants
  { path: 'my-plants', component: PageMyPlantsComponent },
  //Set route for url : http://localhost:4200/admin -> PageAdminComponent
  { path: 'admin', component: PageAdminComponent },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
