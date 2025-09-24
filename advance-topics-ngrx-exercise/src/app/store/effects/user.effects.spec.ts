import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable, of, throwError } from 'rxjs';
import { UserEffects } from './user.effects';
import * as UserActions from '../actions/user.actions';
import { UserService } from '../../services/user.service';
import { UserApiService } from '../../services/user-api.service';

describe('UserEffects', () => {
  let actions$: Observable<any>;
  let effects: UserEffects;
  let userServiceMock: jasmine.SpyObj<UserService>;
  let userApiServiceMock: jasmine.SpyObj<UserApiService>;

  beforeEach(() => {
    userServiceMock = jasmine.createSpyObj('UserService', ['getUsers']);
    userApiServiceMock = jasmine.createSpyObj('UserApiService', ['fetchUsers']);

    TestBed.configureTestingModule({
      providers: [
        UserEffects,
        provideMockActions(() => actions$),
        { provide: UserService, useValue: userServiceMock },
        { provide: UserApiService, useValue: userApiServiceMock }
      ]
    });

    effects = TestBed.inject(UserEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });

  describe('loadUsers$', () => {
    it('should return loadUsersSuccess with users on success', (done) => {
      const users = [{ id: 1, name: 'Test User', email: 'test@example.com' }];
      userServiceMock.getUsers.and.returnValue(of(users));
      
      actions$ = of(UserActions.loadUsers());
      
      effects.loadUsers$.subscribe(action => {
        expect(action).toEqual(UserActions.loadUsersSuccess({ users }));
        done();
      });
    });

    it('should return loadUsersFailure on error', (done) => {
      const error = new Error('Test error');
      userServiceMock.getUsers.and.returnValue(throwError(() => error));
      
      actions$ = of(UserActions.loadUsers());
      
      effects.loadUsers$.subscribe(action => {
        expect(action).toEqual(UserActions.loadUsersFailure({ error }));
        done();
      });
    });
  });

  describe('fetchUsers$', () => {
    it('should return fetchUsersSuccess with users on success', (done) => {
      const users = [{ id: 1, name: 'API User', email: 'api@example.com' }];
      userApiServiceMock.fetchUsers.and.returnValue(of(users));
      
      actions$ = of(UserActions.fetchUsers());
      
      effects.fetchUsers$.subscribe(action => {
        expect(action).toEqual(UserActions.fetchUsersSuccess({ users }));
        done();
      });
    });

    it('should return fetchUsersFailure on error', (done) => {
      const error = new Error('API error');
      userApiServiceMock.fetchUsers.and.returnValue(throwError(() => error));
      
      actions$ = of(UserActions.fetchUsers());
      
      effects.fetchUsers$.subscribe(action => {
        expect(action).toEqual(UserActions.fetchUsersFailure({ error }));
        done();
      });
    });
  });
});