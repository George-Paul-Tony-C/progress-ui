export interface User {
  id: string;
  name: string;
  email: string;
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  avatarUrl: string | null;
  bio: string | null;
}

export interface UpdateProfileRequest {
  name?: string;
  bio?: string;
  avatarUrl?: string;
}

export interface ChangePasswordRequest {
  currentPassword: string;
  newPassword: string;
}