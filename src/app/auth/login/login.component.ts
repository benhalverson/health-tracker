import { Component, OnInit, OnDestroy } from '@angular/core';
import { UntypedFormGroup, UntypedFormControl, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth.service';
import { UIService } from '../../shared/ui.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  loginForm: UntypedFormGroup;
  isLoading = false;
  private loadingSubscriptions: Subscription;

  constructor(private authService: AuthService, private uiService: UIService) {}
  onSubmit(): void {
    this.authService.login({
      email: this.loginForm.value.email,
      password: this.loginForm.value.password
    });
  }
  ngOnInit(): void {
    this.loadingSubscriptions = this.uiService.loadingStateChanged.subscribe(
      isLoading => {
        this.isLoading = isLoading;
      }
    );
    this.loginForm = new UntypedFormGroup({
      email: new UntypedFormControl('', {
        validators: [Validators.required, Validators.email]
      }),
      password: new UntypedFormControl('', { validators: [Validators.required] })
    });
  }

  ngOnDestroy(): void {
    this.loadingSubscriptions.unsubscribe();
  }
}
