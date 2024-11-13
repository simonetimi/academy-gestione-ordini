export interface User {
  id: string;
  username: string;
  email: string;
  token: string;
  tokenType: string;
  tokenExpireDate: number; // ms
  role: 'ROLE_OPERATOR' | 'ROLE_ADMIN';
}
