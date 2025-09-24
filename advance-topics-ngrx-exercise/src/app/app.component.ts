import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { User } from './models/user.model';
import * as UserActions from './store/actions/user.actions';
import * as UserSelectors from './store/selectors/user.selectors';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  users$: Observable<User[]>;
  loading$: Observable<boolean>;
  error$: Observable<any>;
  apiLoading$: Observable<boolean>;
  apiError$: Observable<any>;

  constructor(private store: Store<any>) {
    this.users$ = this.store.select(UserSelectors.selectAllUsers);
    this.loading$ = this.store.select(UserSelectors.selectUsersLoading);
    this.error$ = this.store.select(UserSelectors.selectUsersError);
    this.apiLoading$ = this.store.select(UserSelectors.selectApiLoading);
    this.apiError$ = this.store.select(UserSelectors.selectApiError);
  }

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.store.dispatch(UserActions.loadUsers());
  }

  fetchUsersFromApi(): void {
    this.store.dispatch(UserActions.fetchUsers());
  }
}
