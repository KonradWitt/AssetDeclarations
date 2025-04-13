import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { PersonComponent } from './pages/person/person.component';
import { RealEstateComponent } from './pages/real-estate/real-estate.component';

export const routes: Routes = [
    { path: '', pathMatch:'full', component: HomeComponent },
    { path: 'polityk', component: PersonComponent },
    { path: 'polityk/:link', component: PersonComponent },
    { path: 'nieruchomosci', component: RealEstateComponent },
  ];