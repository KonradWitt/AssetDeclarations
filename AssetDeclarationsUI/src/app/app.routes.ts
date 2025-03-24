import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { RankingsComponent } from './pages/rankings/rankings.component';
import { EditComponent } from './pages/edit/edit.component';
import { PersonComponent } from './pages/person/person.component';

export const routes: Routes = [
    { path: '', pathMatch:'full', component: HomeComponent },
    { path: 'rankings', component: RankingsComponent },
    { path: 'polityk', component: PersonComponent },
    { path: 'polityk/:link', component: PersonComponent },
  ];