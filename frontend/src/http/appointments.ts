import { api } from './api-client'

interface Appointment {
  id: string
  patientId: string
  professionalId: string
  clinicId: string
  date: string
  status: 'scheduled' | 'completed' | 'cancelled'
  notes?: string
  createdAt: string
  updatedAt: string
}

interface CreateAppointmentRequest {
  patientId: string
  professionalId: string
  clinicId: string
  date: string
  notes?: string
}

interface UpdateAppointmentRequest extends Partial<CreateAppointmentRequest> {
  id: string
  status?: Appointment['status']
}

interface GetAvailableAppointmentsRequest {
  professionalId: string
  date: string
}

interface BookAppointmentRequest {
  scheduleId: string
  patientCpf: string
}

export async function createAppointment(
  data: CreateAppointmentRequest,
): Promise<Appointment> {
  return api
    .post('appointments', {
      json: data,
    })
    .json()
}

export async function updateAppointment(
  data: UpdateAppointmentRequest,
): Promise<Appointment> {
  return api
    .patch(`appointments/${data.id}`, {
      json: data,
    })
    .json()
}

export async function deleteAppointment(id: string): Promise<void> {
  await api.delete(`appointments/${id}`)
}

export async function getAppointment(id: string): Promise<Appointment> {
  return api.get(`appointments/${id}`).json()
}

export async function listAppointments(): Promise<Appointment[]> {
  return api.get('appointments').json()
}

export async function getAvailableAppointments(
  data: GetAvailableAppointmentsRequest,
): Promise<{ time: string }[]> {
  return api
    .get('appointments/available', {
      searchParams: {
        professionalId: data.professionalId,
        date: data.date,
      },
    })
    .json()
}

export async function bookAppointment(
  data: BookAppointmentRequest,
): Promise<Appointment> {
  return api
    .post('appointments/book', {
      json: data,
    })
    .json()
}

export async function getPatientAppointments(
  cpf: string,
): Promise<Appointment[]> {
  return api.get(`appointments/${cpf}`).json()
}
