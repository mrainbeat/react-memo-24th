import type { LoginRequest, LoginResponse, SignupRequest, SignupResponse } from "../types/auth";
import { request } from "./client";

export function signup(body: SignupRequest) {
  return request<SignupResponse>("/api/auth/signup", { method: "POST", body });
}

export function login(body: LoginRequest) {
  return request<LoginResponse>("/api/auth/login", { method: "POST", body });
}
