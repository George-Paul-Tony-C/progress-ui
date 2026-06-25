import api from "../../api/axios";

import type { ApiResponse } from "../../types/api";

import type {
  User,
  UserProfile,
  UpdateProfileRequest,
  ChangePasswordRequest,
} from "../../types/user";

export async function getCurrentUser(): Promise<User> {

  const response =
    await api.get<ApiResponse<User>>(
      "/auth/me"
    );

  return response.data.data;
}

export async function getUser(
  userId: string
): Promise<UserProfile> {

  const response =
    await api.get<ApiResponse<UserProfile>>(
      `/users/${userId}`
    );

  return response.data.data;
}

export async function updateProfile(
  request: UpdateProfileRequest
): Promise<UserProfile> {

  const response =
    await api.patch<ApiResponse<UserProfile>>(
      "/users/me",
      request
    );

  return response.data.data;
}

export async function changePassword(
  request: ChangePasswordRequest
): Promise<void> {

  await api.patch(
    "/users/me/password",
    request
  );
}

export async function deleteAccount(): Promise<void> {

  await api.delete(
    "/users/me"
  );
}

export async function uploadAvatar(
  file: File
): Promise<UserProfile> {

  const formData =
    new FormData();

  formData.append(
    "file",
    file
  );

  const response =
    await api.post<
      ApiResponse<UserProfile>
    >(
      "/users/me/avatar",
      formData,
      {
        headers: {
          "Content-Type":
            "multipart/form-data",
        },
      }
    );

  return response.data.data;
}