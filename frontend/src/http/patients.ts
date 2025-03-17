import { api } from './api-client'

interface Patient {
  id: string
  name: string
  email: string
  phone: string
  birthDate: string
  cpf: string
  createdAt: string
  updatedAt: string
}

interface CreatePatientRequest {
  name: string
  email: string
  phone: string
  birthDate: string
  cpf: string
}

interface UpdatePatientRequest extends Partial<CreatePatientRequest> {
  id: string
}

export async function createPatient(
  data: CreatePatientRequest,
): Promise<Patient> {
  return api
    .post('patients', {
      json: data,
    })
    .json()
}

export async function updatePatient(
  data: UpdatePatientRequest,
): Promise<Patient> {
  return api
    .patch(`patients/${data.id}`, {
      json: data,
    })
    .json()
}

export async function deletePatient(id: string): Promise<void> {
  await api.delete(`patients/${id}`)
}

export async function getPatient(id: string): Promise<Patient> {
  return api.get(`patients/${id}`).json()
}

export async function getPatientByCpf(cpf: string): Promise<Patient> {
  return api.get(`patients/cpf/${cpf}`).json()
}

export async function listPatients(): Promise<Patient[]> {
  return api.get('patients').json()
}
