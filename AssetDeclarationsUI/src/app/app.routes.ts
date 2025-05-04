import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  Routes,
} from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { PersonComponent } from './pages/person/person.component';
import { RealEstateComponent } from './pages/real-estate/real-estate.component';
import { EditAssetDeclarationComponent } from './pages/edit-asset-declaration/edit-asset-declaration.component';
import { LoginComponent } from './pages/login/login.component';
import { AuthService } from './services/auth.service';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { PartiesComponent } from './pages/parties/parties.component';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const requiresAdmin = route.data['authRole'] === 'ADMIN';
    const isLoggedIn = this.authService.isLoggedIn();
    const isAdmin = this.authService.isAdminLoggedIn();

    console.log(route);
    console.log(isLoggedIn);
    console.log(isAdmin);
    console.log(requiresAdmin);

    if ((requiresAdmin && isAdmin) || (!requiresAdmin && isLoggedIn)) {
      return true;
    }

    this.router.navigate(['login']);
    return false;
  }
}

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: HomeComponent,
    data: { label: 'Znajdź polityka' },
  },
  { path: 'polityk/:link', component: PersonComponent},
  {
    path: 'nieruchomosci',
    component: RealEstateComponent,
    data: { label: 'Przegląd nieruchomości' },
  },
  { path: 'login', component: LoginComponent },
  {
    path: 'partie',
    component: PartiesComponent,
    data: { label: 'Porównanie partii' },
  },
  {
    path: 'edytuj',
    component: EditAssetDeclarationComponent,
    canActivate: [AuthGuard],
    data: { label: 'Edytuj', authRole: 'ADMIN' },
  },
  { path: '**', redirectTo: '', pathMatch: 'full' },
];
