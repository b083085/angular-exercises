import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private mockUsers: User[] = [
    { id: 1, name: 'John Doe', email: 'john@gmail.com' },
    { id: 2, name: 'Jane Smith', email: 'jane@yahoo.com' },
    { id: 3, name: 'Adam Jones', email: 'adam@outlook.com' }
  ];

  getUsers(): Observable<User[]> {
    return of(this.mockUsers);
  }
}