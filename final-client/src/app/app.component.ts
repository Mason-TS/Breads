import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { UserService } from './services/user.service';
import { Router, NavigationEnd } from '@angular/router';
import { timeout } from 'rxjs';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'final-client';

  constructor(
    private userService: UserService,
    private changeDetectorRef: ChangeDetectorRef,
    private router: Router
  ) {
    // Subscribe to router events to detect navigation changes
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.updateLoginStatus();
      }
    });
  }

  loggedInUser?: string = undefined;
  isUserLoggedIn: boolean = false;
  darkMode: boolean = false;

  ngOnInit(): void {
    this.updateLoginStatus();

    this.darkMode = localStorage.getItem('darkMode') === 'true';
    this.applyDarkMode(this.darkMode);

    
  }

  private updateLoginStatus() {

    this.isUserLoggedIn = this.userService.isLoggedIn();

    if (this.isUserLoggedIn) {

      this.loggedInUser = this.userService.getUser();
    } else {
      this.loggedInUser = undefined;
    }

    this.changeDetectorRef.detectChanges();
  }

  logOut() {
    this.userService.logOut();

    this.updateLoginStatus();

    this.router.navigateByUrl('/home');
  }

  toggleDarkMode() {
    this.darkMode = !this.darkMode;
    this.applyDarkMode(this.darkMode);
   localStorage.setItem('darkMode', this.darkMode.toString());
  }

  private applyDarkMode(darkMode: boolean) {
    if (darkMode) {
      
      var root = document.documentElement;

      root.style.setProperty('--darkmode-backgroundcolor', 'rgb(8, 31, 42)');
      root.style.setProperty('--darkmode-color', 'rgb(3, 255, 255)');
      
       document.body.classList.add('dark-mode');
       

    } else {
      var root = document.documentElement;

      root.style.setProperty('--darkmode-backgroundcolor', '');
      root.style.setProperty('--darkmode-color', '');

      document.body.classList.remove('dark-mode');
    }
  }


}
