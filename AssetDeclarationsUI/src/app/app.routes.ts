import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { EditComponent } from './pages/edit/edit.component';
import { PersonComponent } from './pages/person/person.component';
import { PropertiesComponent } from './pages/properties/properties.component';

export const routes: Routes = [
    { path: '', pathMatch:'full', component: HomeComponent },
    { path: 'polityk', component: PersonComponent },
    { path: 'polityk/:link', component: PersonComponent },
    { path: 'nieruchomosci', component: PropertiesComponent },
  ];