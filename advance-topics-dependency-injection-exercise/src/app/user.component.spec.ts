import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { UserComponent } from './user.component';
import { UserService } from './user.service';
import { of, throwError } from 'rxjs';
import { By } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';

describe('UserComponent', () => {
  let component: UserComponent;
  let fixture: ComponentFixture<UserComponent>;
  let userServiceSpy: jasmine.SpyObj<UserService>;
  
  const mockUsers = [
    {
      id: 1,
      name: 'Leanne Graham',
      username: 'Bret',
      email: 'Sincere@april.biz',
      phone: '1-770-736-8031 x56442',
      website: 'hildegard.org'
    }
  ];

  beforeEach(async () => {
    const spy = jasmine.createSpyObj('UserService', ['getUsers', 'getUserById']);
    
    await TestBed.configureTestingModule({
      imports: [UserComponent, CommonModule],
      providers: [
        { provide: UserService, useValue: spy }
      ]
    }).compileComponents();

    userServiceSpy = TestBed.inject(UserService) as jasmine.SpyObj<UserService>;
    userServiceSpy.getUsers.and.returnValue(of([...mockUsers]));
    userServiceSpy.getUserById.and.returnValue(of(mockUsers[0]));
    
    fixture = TestBed.createComponent(UserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load users on init', () => {
    expect(userServiceSpy.getUsers).toHaveBeenCalled();
    expect(component.users.length).toBe(1);
    expect(component.loading).toBeFalse();
  });

  it('should display users in the template', () => {
    fixture.detectChanges();
    const userElements = fixture.debugElement.queryAll(By.css('.user-card'));
    expect(userElements.length).toBe(1);
    expect(userElements[0].nativeElement.textContent).toContain('Leanne Graham');
  });

  it('should handle error when loading users', () => {
    const errorMessage = 'Error loading users';
    userServiceSpy.getUsers.and.returnValue(throwError(() => ({
      message: errorMessage
    })));
    
    component.loadUsers();
    fixture.detectChanges();
    
    expect(component.error).toContain('Failed to load users');
    expect(component.loading).toBeFalse();
    
    const errorElement = fixture.debugElement.query(By.css('.error'));
    expect(errorElement).toBeTruthy();
    expect(errorElement.nativeElement.textContent).toContain('Failed to load users');
  });

  it('should load a specific user when loadUserById is called', () => {
    component.loadUserById(1);
    expect(userServiceSpy.getUserById).toHaveBeenCalledWith(1);
    expect(component.users.length).toBe(1);
    expect(component.loading).toBeFalse();
  });

  it('should show loading state', () => {
    component.loading = true;
    fixture.detectChanges();
    const loadingElement = fixture.debugElement.query(By.css('.loading'));
    expect(loadingElement).toBeTruthy();
    expect(loadingElement.nativeElement.textContent).toContain('Loading...');
  });
});
