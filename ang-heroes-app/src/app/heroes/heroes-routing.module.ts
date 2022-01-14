import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AddHeroesComponent } from './pages/add-heroes/add-heroes.component';
import { AllHeroesComponent } from './pages/all-heroes/all-heroes.component';
import { HomeHeroComponent } from './pages/home-hero/home-hero.component';
import { SearchHeroesComponent } from './pages/search-heroes/search-heroes.component';
import { ShowHeroComponent } from './pages/show-hero/show-hero.component';

const routes: Routes = [
  { 
    path: '',
    component: HomeHeroComponent,
    children: [
      {
        path: 'all',
        component: AllHeroesComponent
      },
      {
        path: 'add',
        component: AddHeroesComponent
      },
      {
        path: 'edit/:id',
        component: AddHeroesComponent
      },
      {
        path: 'search',
        component: SearchHeroesComponent
      },
      {
        path: ':id',
        component: ShowHeroComponent
      },
      {
        path: '**',
        redirectTo: 'all'
      }
    ]
  }
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild( routes )
  ],
  exports: [
    RouterModule
  ]
})
export class HeroesRoutingModule { }
