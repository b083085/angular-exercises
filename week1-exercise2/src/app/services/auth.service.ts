import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export type UserType = 'guest' | 'member' | 'admin';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private userTypeSubject = new BehaviorSubject<UserType>('guest');
  readonly userType$ = this.userTypeSubject.asObservable();

  get userType(): UserType {
    return this.userTypeSubject.value;
  }

  setUserType(type: UserType): void {
    this.userTypeSubject.next(type);
  }
}
