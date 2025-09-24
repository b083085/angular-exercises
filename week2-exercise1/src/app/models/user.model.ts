export interface User {
  id?: number;
  name: string;
  email: string;
  password: string;
  role: string;
}

export const USER_ROLES = [
  { id: 'user', name: 'Regular User' },
  { id: 'admin', name: 'Administrator' },
  { id: 'editor', name: 'Editor' },
  { id: 'viewer', name: 'Viewer' }
];
