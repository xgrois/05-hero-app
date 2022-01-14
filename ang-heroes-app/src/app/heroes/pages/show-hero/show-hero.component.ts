import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { Hero } from '../../interfaces/heroes.interface';
import { HeroesService } from '../../services/heroes.service';

@Component({
  selector: 'app-show-hero',
  templateUrl: './show-hero.component.html',
  styles: [
  ]
})
export class ShowHeroComponent implements OnInit {

  hero!: Hero;

  constructor(private route: ActivatedRoute, private heroesService: HeroesService, private router: Router) { }

  ngOnInit(): void {
    /*
    this.route.params
      .subscribe( params => {
        console.log(params['id']);
        this.heroesService.getHero(params['id']).subscribe(hero => this.hero = hero);
      });
      */
    this.route.params
      .pipe(
        switchMap( params => this.heroesService.getHero(params['id']) )
      )
      .subscribe( hero => this.hero = hero );

  }

  back() {
    this.router.navigate(['/heroes/all']);
  }

}
