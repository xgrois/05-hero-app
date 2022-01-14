import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from '../material/material.module';
import { HeroesRoutingModule } from './heroes-routing.module';

// Components
import { AddHeroesComponent } from './pages/add-heroes/add-heroes.component';
import { SearchHeroesComponent } from './pages/search-heroes/search-heroes.component';
import { ShowHeroComponent } from './pages/show-hero/show-hero.component';
import { HomeHeroComponent } from './pages/home-hero/home-hero.component';
import { AllHeroesComponent } from './pages/all-heroes/all-heroes.component';
import { HeroCardComponent } from './components/hero-card/hero-card.component';

// Pipes
import { ImagePipe } from './pipes/image.pipe';
import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';



@NgModule({
  declarations: [
    AddHeroesComponent,
    SearchHeroesComponent,
    ShowHeroComponent,
    HomeHeroComponent,
    AllHeroesComponent,
    HeroCardComponent,
    ImagePipe,
    ConfirmDialogComponent
  ],
  imports: [
    CommonModule,
    FlexLayoutModule,
    FormsModule,
    MaterialModule,
    HeroesRoutingModule
  ]
})
export class HeroesModule { }
