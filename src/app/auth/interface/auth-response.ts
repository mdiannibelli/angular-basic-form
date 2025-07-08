import { User } from './user.interface';

export interface AuthResponse {
  user: User;
  accessToken: string;
  refreshToken: string;
}
