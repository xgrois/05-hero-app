import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, of, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Auth } from '../interfaces/auth.interfaces';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl: string = environment.baseUrl;
  private _auth: Auth | undefined;

  get auth() {
    return { ...this._auth };
  }

  constructor(private http: HttpClient) { }

  login(): Observable<Auth> {
    return this.http.get<Auth>(`${this.baseUrl}/usuarios/1`)
      .pipe(
        tap( auth => this._auth = auth ),
        tap( auth => localStorage.setItem('token', auth.id) )
      );
  }

  logout() {
    this._auth = undefined;
  }

  // Use to keep user's session once logged
  verifyToken(): Observable<boolean> {

    if ( !localStorage.getItem('token') ) {
      return of(false);
    }

    // User token not in local storage
    // and
    // user info is also not present in service's memory (this._auth)
    // due to refresh or logout
    //
    // We re-assign this._auth with user info and return true
    return this.http.get<Auth>(`${this.baseUrl}/usuarios/1`)
      .pipe(
        map( auth => {
          console.log('[VERIFY_TOKEN.map]: ', auth);
          this._auth = auth;
          return true;
        })
      );

  }

}
