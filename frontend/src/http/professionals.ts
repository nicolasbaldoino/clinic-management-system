import { api } from './api-client'

interface Professional {
  id: string
  name: string
  email: string
  phone: string
  specialty: string
  clinicId: string
  createdAt: string
  updatedAt: string
}

interface CreateProfessionalRequest {
  name: string
  email: string
  phone: string
  specialty: string
  clinicId: string
}

interface UpdateProfessionalRequest extends Partial<CreateProfessionalRequest> {
  id: string
}

export async function createProfessional(
  data: CreateProfessionalRequest,
): Promise<Professional> {
  return api
    .post('professionals', {
      json: data,
    })
    .json()
}

export async function updateProfessional(
  data: UpdateProfessionalRequest,
): Promise<Professional> {
  return api
    .patch(`professionals/${data.id}`, {
      json: data,
    })
    .json()
}

export async function deleteProfessional(id: string): Promise<void> {
  await api.delete(`professionals/${id}`)
}

export async function getProfessional(id: string): Promise<Professional> {
  return api.get(`professionals/${id}`).json()
}

export async function listProfessionals(): Promise<Professional[]> {
  return api.get('professionals').json()
}
