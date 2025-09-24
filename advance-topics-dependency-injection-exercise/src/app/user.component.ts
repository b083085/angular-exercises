import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserService, User } from './user.service';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  private userService = inject(UserService);
  users: User[] = [];
  loading = false;
  error: string | null = null;

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.loading = true;
    this.error = null;
    this.userService.getUsers().subscribe({
      next: (data) => {
        this.users = data;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Failed to load users: ' + err.message;
        this.loading = false;
      }
    });
  }

  loadUserById(id: number): void {
    this.loading = true;
    this.error = null;
    this.userService.getUserById(id).subscribe({
      next: (data) => {
        this.users = [data];
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Failed to load user: ' + err.message;
        this.loading = false;
      }
    });
  }
}
