import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [
  ]
})
export class LoginComponent implements OnInit {

  constructor(private router: Router,
              private authService: AuthService) { }

  ngOnInit(): void {
  }

  login() {
    // ask bnk if user exists
    this.authService.login()
      .subscribe( r => {
        console.log(r);

        if (r.id) {
          this.router.navigate(['/heroes']);
        }

      });

  }

  nologin() {
    this.authService.logout();
    this.router.navigate(['/heroes']);
  }

}
