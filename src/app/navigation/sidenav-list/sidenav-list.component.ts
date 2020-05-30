import {
  Component,
  OnInit,
  EventEmitter,
  Output,
  OnDestroy
} from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-sidenav-list',
  templateUrl: './sidenav-list.component.html',
  styleUrls: ['./sidenav-list.component.scss']
})
export class SidenavListComponent implements OnInit, OnDestroy {
  @Output() closeSidenav = new EventEmitter<void>();
  isAuth = false;
  authSubscription: Subscription;
  constructor(private authService: AuthService) {}
  onClose(): void {
    this.closeSidenav.emit();
  }

  onLogout(): void {
    this.onClose();
    this.authService.logout();
  }
  ngOnInit(): void {
    this.authService.authChange.subscribe(authStatus => {
      this.isAuth = authStatus;
    });
  }
  ngOnDestroy(): void {
    this.authSubscription.unsubscribe();
  }
}
