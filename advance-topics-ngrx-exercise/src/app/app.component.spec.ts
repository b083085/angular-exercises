import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { Store } from '@ngrx/store';
import * as UserActions from './store/actions/user.actions';
import * as UserSelectors from './store/selectors/user.selectors';
import { By } from '@angular/platform-browser';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let store: MockStore;
  const initialState = {
    users: {
      users: [],
      loading: false,
      error: null,
      apiLoading: false,
      apiError: null
    }
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent],
      providers: [
        provideMockStore({ initialState })
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(Store) as MockStore;
    spyOn(store, 'dispatch').and.callThrough();
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it('should dispatch loadUsers action on init', () => {
    component.ngOnInit();
    expect(store.dispatch).toHaveBeenCalledWith(UserActions.loadUsers());
  });

  it('should dispatch loadUsers action when loadUsers method is called', () => {
    component.loadUsers();
    expect(store.dispatch).toHaveBeenCalledWith(UserActions.loadUsers());
  });

  it('should dispatch fetchUsers action when fetchUsersFromApi method is called', () => {
    component.fetchUsersFromApi();
    expect(store.dispatch).toHaveBeenCalledWith(UserActions.fetchUsers());
  });

  it('should show loading indicator when loading$ is true', () => {
    store.overrideSelector(UserSelectors.selectUsersLoading, true);
    store.refreshState();
    fixture.detectChanges();
    
    const loadingElement = fixture.debugElement.query(By.css('.section div:first-of-type'));
    expect(loadingElement.nativeElement.textContent).toContain('Loading users');
  });

  it('should show user list when users are loaded', () => {
    const mockUsers = [
      { id: 1, name: 'Test User', email: 'test@example.com' }
    ];
    store.overrideSelector(UserSelectors.selectAllUsers, mockUsers);
    store.refreshState();
    fixture.detectChanges();
    
    const userElements = fixture.debugElement.queryAll(By.css('.user-list li'));
    expect(userElements.length).toBe(1);
    expect(userElements[0].nativeElement.textContent).toContain('Test User');
  });
});
