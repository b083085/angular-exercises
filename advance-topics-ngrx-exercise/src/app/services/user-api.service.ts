import { Injectable } from '@angular/core';
import { Observable, of, delay } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserApiService {
  private mockUsers: User[] = [
    { id: 1, name: 'John Doe', email: 'john@example.com', username: 'johndoe' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', username: 'janesmith' },
    { id: 3, name: 'Bob Johnson', email: 'bob@example.com', username: 'bobjohnson' },
    { id: 4, name: 'Alice Williams', email: 'alice@example.com', username: 'alicew' },
    { id: 5, name: 'Charlie Brown', email: 'charlie@example.com', username: 'charlieb' }
  ];

  fetchUsers(): Observable<User[]> {
    // Simulate API delay of 1 second
    return of(this.mockUsers).pipe(delay(1000));
  }

  fetchUserById(id: number): Observable<User | undefined> {
    const user = this.mockUsers.find(user => user.id === id);
    // Simulate API delay of 500ms
    return of(user).pipe(delay(500));
  }
}