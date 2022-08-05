import { Component, OnInit, EventEmitter, Output, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../../auth/auth.service';

@Component({
	selector: 'app-header',
	templateUrl: './header.component.html',
	styleUrls: [ './header.component.scss' ]
})
export class HeaderComponent implements OnInit, OnDestroy {
	@Output() sidenavToggle = new EventEmitter<void>();
	isAuth;
	authSubscription: Subscription;

	constructor(private authService: AuthService) {}
	onToggleSideNav(): void {
		this.sidenavToggle.emit();
	}

	onLogout(): void {
		this.authService.logout();
	}

	ngOnInit(): void {
		console.log('isAuth', this.isAuth);
		this.authSubscription = this.authService.authChange.subscribe((authStatus) => {
			console.log('authstatus', authStatus);
			// this.isAuth = authStatus;
			this.isAuth = true;
		});
	}

	ngOnDestroy(): void {
		this.authSubscription.unsubscribe();
	}
}
