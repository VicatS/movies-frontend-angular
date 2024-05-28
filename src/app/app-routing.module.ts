import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MovieListComponent } from './components/movie-list/movie-list.component';
import { MovieFormComponent } from './components/movie-form/movie-form.component';
import { MovieDetailComponent } from './components/movie-detail/movie-detail.component';
import { MovieManagementComponent } from './components/movie-management/movie-management.component';

const routes: Routes = [
  { path: '', component: MovieListComponent },
  { path: 'add', component: MovieFormComponent },
  { path: 'edit/:id', component: MovieFormComponent },
  { path: 'detail/:id', component: MovieDetailComponent },
  { path: 'manage', component: MovieManagementComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
