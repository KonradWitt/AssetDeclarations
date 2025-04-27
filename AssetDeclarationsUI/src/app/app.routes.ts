import { CanActivate, Router, Routes } from '@angular/router';
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

  canActivate(): boolean | Observable<boolean> | Promise<boolean> {
    if (this.authService.isLoggedIn()) {
      return true;
    } else {
      this.router.navigate(['login']);
      return false;
    }
  }
}

export const routes: Routes = [
  { path: '', pathMatch: 'full', component: HomeComponent },
  { path: 'polityk', component: PersonComponent },
  { path: 'polityk/:link', component: PersonComponent },
  { path: 'nieruchomosci', component: RealEstateComponent },
  { path: 'login', component: LoginComponent },
  {path: 'partie', component: PartiesComponent},
  {
    path: 'edytuj',
    component: EditAssetDeclarationComponent,
    canActivate: [AuthGuard],
  },
];
