import { api } from './api-client'

interface User {
  id: string
  name: string
  email: string
  role: 'admin' | 'professional' | 'patient'
  createdAt: string
  updatedAt: string
}

interface CreateUserRequest {
  name: string
  email: string
  password: string
  role: User['role']
}

interface UpdateUserRequest
  extends Partial<Omit<CreateUserRequest, 'password'>> {
  id: string
  password?: string
}

export async function createUser(data: CreateUserRequest): Promise<User> {
  return api
    .post('users', {
      json: data,
    })
    .json()
}

export async function updateUser(data: UpdateUserRequest): Promise<User> {
  return api
    .patch(`users/${data.id}`, {
      json: data,
    })
    .json()
}

export async function deleteUser(id: string): Promise<void> {
  await api.delete(`users/${id}`)
}

export async function getUser(id: string): Promise<User> {
  return api.get(`users/${id}`).json()
}

export async function listUsers(): Promise<User[]> {
  return api.get('users').json()
}
