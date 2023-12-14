import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';
import { AlertifyService } from '../services/alertify.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavBarComponent implements OnInit, OnDestroy {

  isLoggedIn: boolean = false;
  private destroySubject = new Subject();
  loggedinUser!: string;

  constructor(private authService: AuthService,  private router: Router, private alertify: AlertifyService) {
    this.authService.authStatus
    .pipe(takeUntil(this.destroySubject))
    .subscribe((result: boolean) => {
      this.isLoggedIn = result;
    });
  }
  loggedin() {
    this.loggedinUser = localStorage.getItem('username') || '';
    return this.loggedinUser;
}

  onLogout() {
    this.authService.logout();
    this.alertify.success('You are logged out !');
    this.router.navigate(["/"]);
  }

  ngOnInit(): void {
    this.isLoggedIn = this.authService.isAuthenticated();
  }

  ngOnDestroy(): void {
    this.destroySubject.next(true);
    this.destroySubject.complete();
  }
}

