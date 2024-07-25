import { Component } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { StorageService } from './_services/storage.service';
import { AuthService } from './_services/auth.service';
import { EventBusService } from './_shared/event-bus.service';

import { getAuth, onAuthStateChanged } from 'firebase/auth';
// import { Store } from '@ngrx/store';
import { User } from './store/models/user.model';
// import { AppState } from './store/reducers/user.reducer';
// import { updateUser } from './store/actions/user.action';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  private roles: string[] = [];
  isLoggedIn = false;
  showAdminBoard = false;
  showModeratorBoard = false;
  username?: string;
  // user: Observable<User>;
  eventBusSub?: Subscription;
  curUser: any;

  constructor(
    private storageService: StorageService,
    private authService: AuthService,
    private eventBusService: EventBusService,
    // private store: Store<{ user: User }>
  ) {
    // this.user = store.select('user');
    const auth = getAuth();
    onAuthStateChanged(auth, (user: any) => {
      if (user) {
        // const curUser = {
        //   id: user.i
        // }
        console.info('onAuthStateChanged signed in::', user);
        this.storageService.saveUser(user);
        // this.store.dispatch(updateUser({ user }));
        // this.curUser = JSON.stringify(this.user);
      } else {
        // User is signed out
        // ...
        console.info('onAuthStateChanged signed out');
        this.storageService.clean();
        // this.store.dispatch(
        //   updateUser({
        //     user: { id: '', userName: '', email: '', password: '' },
        //   })
        // );
      }
      this.isLoggedIn = this.storageService.isLoggedIn();
    });
  }

  ngOnInit(): void {
    this.isLoggedIn = this.storageService.isLoggedIn();

    if (this.isLoggedIn) {
      const user = this.storageService.getUser();
      this.roles = user.roles;

      this.showAdminBoard = this.roles.includes('ROLE_ADMIN');
      this.showModeratorBoard = this.roles.includes('ROLE_MODERATOR');

      this.username = user.username;
    }

    this.eventBusSub = this.eventBusService.on('logout', () => {
      this.logout();
    });
  }

  logout(): void {
    this.authService.logout().subscribe({
      next: (res) => {
        console.log('Successfully logged out the user::', res);
        this.storageService.clean();

        // window.location.reload();
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
