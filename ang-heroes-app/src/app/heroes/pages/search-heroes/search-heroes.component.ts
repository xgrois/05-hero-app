import { Component, OnInit } from '@angular/core';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { Hero } from '../../interfaces/heroes.interface';
import { HeroesService } from '../../services/heroes.service';

@Component({
  selector: 'app-search-heroes',
  templateUrl: './search-heroes.component.html',
  styles: [
  ]
})
export class SearchHeroesComponent implements OnInit {

  searchTerm: string = '';

  heroes: Hero[] = [];

  selectedHero: Hero | undefined;

  constructor(private heroesService: HeroesService) { }

  ngOnInit(): void {
  }

  search() {
    console.log(this.searchTerm);
    this.heroesService.getHeroesPartial(this.searchTerm.trim())
      .subscribe( heroes => this.heroes = heroes);
  }

  onSelected(event: MatAutocompleteSelectedEvent) {

    const hero: Hero = event.option.value;
    
    if (!hero) {
      console.log("Hero has no value assigned");
      this.selectedHero = undefined;
      return;
    }

    console.log(hero);
    this.searchTerm = hero.superhero;

    this.heroesService.getHero(hero.id!)
      .subscribe( hero => { 
        this.selectedHero = hero
      });
  }

}
