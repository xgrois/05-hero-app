import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { ConfirmDialogComponent } from '../../components/confirm-dialog/confirm-dialog.component';
import { Hero, Publisher } from '../../interfaces/heroes.interface';
import { HeroesService } from '../../services/heroes.service';

@Component({
  selector: 'app-add-heroes',
  templateUrl: './add-heroes.component.html',
  styles: [
  ]
})
export class AddHeroesComponent implements OnInit {

  hero: Hero = {
    superhero: '',
    alter_ego: '',
    characters: '',
    first_appearance: '',
    publisher: Publisher.DCComics,
    alt_img: ''
  }

  publishers = [
    {
      id: 'DC Comics',
      desc: 'DC - Comics'
    },
    {
      id: 'Marvel Comics',
      desc: 'Marvel - Comics'
    }
  ];

  constructor(private heroesService: HeroesService, 
              private activatedRoute: ActivatedRoute, 
              private router: Router,
              private _snackBar: MatSnackBar,
              public dialog: MatDialog) { }

  

  ngOnInit(): void {

    if (!this.router.url.includes('edit')) {
      return;
    }

    // This component is lauched via edit or add, so we try to fill our empty hero
    // with existing data in case it already exists
    this.activatedRoute.params
      .pipe(
        switchMap(params => this.heroesService.getHero(params['id']))
      )
      .subscribe( hero => this.hero = hero );
  }

  save() {

    // minimal validation just for superhero property
    if (this.hero.superhero.trim().length === 0)
      return;
    
    
    if (this.hero.id){ // Update existing hero
      this.heroesService.updateHero( this.hero )
        .subscribe( resp => {
          console.log('PUT result:', resp);
          this.showSnackBar('Updated!!');
        });
    } else { // add new hero
      this.heroesService.addHero( this.hero )
      .subscribe( hero => {
        console.log('POST result:', hero);
        this.router.navigate(['/heroes/edit', hero.id]);
        this.showSnackBar('Created!!');
      });
    }

    
  }

  delete() {

    const dialog = this.dialog.open( ConfirmDialogComponent, {
      width: '250px',
      data: {...this.hero}
    });

    dialog.afterClosed().subscribe( result => {
      if (result) {
        this.heroesService.deleteHero(this.hero.id!)
        .subscribe( resp => {
          this.router.navigate(['/heroes']);
        });
      }
    })

    /*
    this.heroesService.deleteHero(this.hero.id!)
      .subscribe( resp => {
        this.router.navigate(['/heroes']);
      });
      */

  }

  showSnackBar( message: string ) {
    this._snackBar.open( message, 'Ok!!', { duration: 2000 });
  }

}
