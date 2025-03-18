import { api } from './api-client'

export interface LoginDto {
  email: string
  password: string
}

export interface PatientLoginDto {
  cpf: string
}

export interface AuthResponse {
  access_token: string
  user: {
    id: string
    email: string
    name: string
    role: string
  }
}

export interface PatientResponse {
  patient: {
    id: string
    cpf: string
    name: string
    email: string
    phone: string
  }
}

export const authApi = {
  login: async (data: LoginDto): Promise<AuthResponse> => {
    return api.post('auth/login', { json: data }).json()
  },

  patientLogin: async (data: PatientLoginDto): Promise<PatientResponse> => {
    return api.post('auth/patient/login', { json: data }).json()
  },

  me: async (): Promise<AuthResponse['user']> => {
    return api.get('auth/me').json()
  },
}
