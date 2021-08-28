import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { AuthData } from './auth-data.model';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { TrainingService } from '../training/training.service';
import { UIService } from '../shared/ui.service';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isAuthenticated = false;
  authChange = new Subject<boolean>();

  constructor(
    private router: Router,
    private afAuth: AngularFireAuth,
    private trainingService: TrainingService,
    private uiService: UIService
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
    this.uiService.loadingStateChanged.next(true);
   this.afAuth.createUserWithEmailAndPassword(authData.email, authData.password)
      .then(() => {
        this.uiService.loadingStateChanged.next(false);
        this.authSuccessfully();
      })
      .catch(error => {
        this.uiService.loadingStateChanged.next(false);
        this.uiService.showSnackbar(error.message, null, 3000);
      });
  }

  /**
   * Existing user login method.
   * @param authData an object with an existing user email and password.
   */
  login(authData: AuthData) {
    this.uiService.loadingStateChanged.next(true);
    this.afAuth.signInWithEmailAndPassword(authData.email, authData.password)
      .then(() => {
        this.uiService.loadingStateChanged.next(false);
        this.authSuccessfully();
      })
      .catch((error: Error) => {
        this.uiService.loadingStateChanged.next(false);
        this.uiService.showSnackbar(error.message, null, 3000);
      });

  }

  /**
   * Method to logout a user
   */
  logout() {
     this.afAuth.signOut();
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
