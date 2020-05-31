import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { AuthData } from './auth-data.model';
import { AngularFireAuth } from '@angular/fire/auth';
@Injectable()
export class AuthService {
  authChange = new Subject<boolean>();
  private isAuthenticated = false;

  constructor(private router: Router, private afAuth: AngularFireAuth) {}
  /**
   * Registers a new user with an email and password.
   * @param authData an object with email and password
   */
  registerUser(authData: AuthData) {
    this.afAuth.auth
      .createUserWithEmailAndPassword(authData.email, authData.password)
      .then(() => {
        this.authSuccessfully();
      })
      .catch(error => {
        console.error(error);
      });
  }

  /**
   * Existing user login method.
   * @param authData an object with an existing user email and password.
   */
  login(authData: AuthData) {
    this.afAuth.auth
      .signInWithEmailAndPassword(authData.email, authData.password)
      .then(result => {
        this.authSuccessfully();
      })
      .catch(error => {
        console.error(error);
      });
  }

  logout() {
    this.afAuth.auth.signOut();
    this.authChange.next(false);
    this.authSuccessfully();
    this.isAuthenticated = false;
  }

  isAuth() {
    console.log(this.isAuthenticated);
    return this.isAuthenticated;
  }
  private authSuccessfully() {
    this.isAuthenticated = true;
    this.router.navigate(['/training']);
  }
}
