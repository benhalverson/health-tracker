import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Mock } from 'protractor/built/driverProviders';
// import { TestBed, ComponentFixture } from '@angular/core/testing';

class MockRouter extends Router {}

class MockAuthService {
  isAuthenticated = false;

  isAuth(): boolean {
    return this.isAuthenticated;
  }
}
describe('Service: Auth', () => {
  // tslint:disable-next-line: prefer-const
  let router: MockRouter;
  // tslint:disable-next-line: prefer-const
  let afAuth: AngularFireAuth;
  let service: MockAuthService;

  beforeEach(() => {
    service = new MockAuthService();
  });

  it('should set true from isAuthenticated when there is a token', () => {
    service.isAuthenticated = true;
    expect(service.isAuthenticated).toBeTruthy();
  });

  it('should set false from isAuthenticated when there is not a token', () => {
    expect(service.isAuthenticated).toBeFalsy();
  });
});
