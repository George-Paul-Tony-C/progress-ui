import api from "../../api/axios";
import type {
  LoginRequest,
  SignupRequest,
  AuthResponse,
} from "../../types/auth";

export async function login(
  request: LoginRequest
): Promise<AuthResponse> {

  const response = await api.post(
    "/auth/login",
    request
  );

  return response.data.data;
}

export async function signup(
  request: SignupRequest
): Promise<AuthResponse> {

  const response = await api.post(
    "/auth/signup",
    request
  );

  return response.data.data;
}