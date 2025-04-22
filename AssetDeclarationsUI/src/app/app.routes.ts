import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { PersonComponent } from './pages/person/person.component';
import { RealEstateComponent } from './pages/real-estate/real-estate.component';
import { EditAssetDeclarationComponent } from './pages/edit-asset-declaration/edit-asset-declaration.component';
import { LoginComponent } from './pages/login/login.component';

export const routes: Routes = [
    { path: '', pathMatch:'full', component: HomeComponent },
    { path: 'polityk', component: PersonComponent },
    { path: 'polityk/:link', component: PersonComponent },
    { path: 'nieruchomosci', component: RealEstateComponent },
    { path: 'edytuj', component: EditAssetDeclarationComponent },
    { path: 'login', component: LoginComponent },
  ];