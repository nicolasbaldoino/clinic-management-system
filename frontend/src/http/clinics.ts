import { api } from './api-client'

interface Clinic {
  id: string
  name: string
  address: string
  phone: string
  email: string
  createdAt: string
  updatedAt: string
}

interface CreateClinicRequest {
  name: string
  address: string
  phone: string
  email: string
}

interface UpdateClinicRequest extends Partial<CreateClinicRequest> {
  id: string
}

export async function createClinic(data: CreateClinicRequest): Promise<Clinic> {
  return api
    .post('clinics', {
      json: data,
    })
    .json()
}

export async function updateClinic(data: UpdateClinicRequest): Promise<Clinic> {
  return api
    .patch(`clinics/${data.id}`, {
      json: data,
    })
    .json()
}

export async function deleteClinic(id: string): Promise<void> {
  await api.delete(`clinics/${id}`)
}

export async function getClinic(id: string): Promise<Clinic> {
  return api.get(`clinics/${id}`).json()
}

export async function listClinics(): Promise<Clinic[]> {
  return api.get('clinics').json()
}
