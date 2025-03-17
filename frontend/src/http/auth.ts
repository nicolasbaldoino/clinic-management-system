import { api } from './api-client'

interface AdminLoginRequest {
  email: string
  password: string
}

interface PatientLoginRequest {
  cpf: string
}

interface LoginResponse {
  token: string
  user: {
    id: string
    email: string
    name: string
    role: string
  }
}

export async function adminLogin({
  email,
  password,
}: AdminLoginRequest): Promise<LoginResponse> {
  return api
    .post('auth/admin/login', {
      json: { email, password },
    })
    .json()
}

export async function patientLogin({
  cpf,
}: PatientLoginRequest): Promise<LoginResponse> {
  return api
    .post('auth/patient/login', {
      json: { cpf },
    })
    .json()
}

export async function logout(): Promise<void> {
  await api.post('auth/logout')
}

export async function getCurrentUser(): Promise<LoginResponse['user']> {
  return api.get('auth/me').json()
}

interface RegisterRequest {
  email: string
  password: string
  name: string
}

type RegisterResponse = void

export async function register({
  email,
  password,
  name,
}: RegisterRequest): Promise<RegisterResponse> {
  await api.post('auth/register', {
    json: { email, password, name },
  })
}
