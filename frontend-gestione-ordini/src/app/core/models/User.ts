export interface User {
  id: string;
  username: string;
  email: string;
  password: string | null;
  token: string;
  tokenExpireDate: number; // ms
  role: 'ROLE_OPERATOR' | 'ROLE_ADMIN';
}
