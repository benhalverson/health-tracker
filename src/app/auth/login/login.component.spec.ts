import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import 'zone.js/testing';
import { LoginComponent } from './login.component';
import { AuthService } from '../auth.service';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
class MockAuthService extends AuthService {}
describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let authService: AuthService;
  let angularFireAuth: AngularFireAuth;
  let router: Router;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes([]),
        AuthService,
        AngularFireDatabaseModule,
        AngularFireAuth
      ],
      declarations: [LoginComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    authService = TestBed.inject(AuthService);
    router = TestBed.inject(Router);
    angularFireAuth = TestBed.inject(AngularFireAuth);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // it('needs to return false when the user is not authenticated', () => {
  //   // spyOn(authService, 'isAuthenticated').and.returnValue(false);
  //   expect(component.loginForm).not.toHaveBeenCalled();
  // });
});
