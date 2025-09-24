import { createAction, props } from '@ngrx/store';
import { User } from '../../models/user.model';

export const loadUsers = createAction('[User] Load Users');
export const loadUsersSuccess = createAction(
  '[User] Load Users Success',
  props<{ users: User[] }>()
);
export const loadUsersFailure = createAction(
  '[User] Load Users Failure',
  props<{ error: any }>()
);

// Fetch users from API actions
export const fetchUsers = createAction('[User API] Fetch Users');
export const fetchUsersSuccess = createAction(
  '[User API] Fetch Users Success',
  props<{ users: User[] }>()
);
export const fetchUsersFailure = createAction(
  '[User API] Fetch Users Failure',
  props<{ error: any }>()
);