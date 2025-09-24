import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap, switchMap } from 'rxjs/operators';
import { UserService } from '../../services/user.service';
import { UserApiService } from '../../services/user-api.service';
import * as UserActions from '../actions/user.actions';

@Injectable()
export class UserEffects {
  private actions$ = inject(Actions);
  private userService = inject(UserService);
  private userApiService = inject(UserApiService);

  loadUsers$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(UserActions.loadUsers),
      mergeMap(() => this.userService.getUsers().pipe(
        map(users => UserActions.loadUsersSuccess({ users })),
        catchError(error => of(UserActions.loadUsersFailure({ error })))
      ))
    );
  });

  // New effect to fetch users from API
  fetchUsers$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(UserActions.fetchUsers),
      switchMap(() => this.userApiService.fetchUsers().pipe(
        map(users => UserActions.fetchUsersSuccess({ users })),
        catchError(error => of(UserActions.fetchUsersFailure({ error })))
      ))
    );
  });
}