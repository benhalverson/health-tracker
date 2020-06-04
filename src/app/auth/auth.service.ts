import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { AuthData } from './auth-data.model';
import { AngularFireAuth } from '@angular/fire/auth';
import { TrainingService } from '../training/training.service';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isAuthenticated = false;
  authChange = new Subject<boolean>();

  constructor(
    private router: Router,
    private afAuth: AngularFireAuth,
    private trainingService: TrainingService
  ) {}

  initAuthListener() {
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.authSuccessfully();
      } else {
        this.logout();
        this.trainingService.cancelSubscriptions();
        this.authChange.next(false);
        this.authSuccessfully();
        this.isAuthenticated = false;
      }
    });
  }
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
      .then(() => {
        this.authSuccessfully();
      })
      .catch(error => {
        console.error(error);
      });
  }

  /**
   * Method to logout a user
   */
  logout() {
    this.afAuth.auth.signOut();
  }

  /**
   * A check to see if the user is authenticated.
   */
  isAuth(): boolean {
    return this.isAuthenticated;
  }
  private authSuccessfully() {
    this.isAuthenticated = true;
    this.router.navigate(['/training']);
  }
}
