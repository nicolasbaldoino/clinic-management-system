import { api } from './api-client'

export interface CreateAppointmentDto {
  clinicId: string
  professionalId: string
  patientId: string
  date: string
  time: string
}

export interface Appointment {
  id: string
  date: string
  time: string
  status: string
  clinic: {
    id: string
    name: string
  }
  professional: {
    id: string
    name: string
  }
  patient: {
    id: string
    name: string
    cpf: string
  }
}

export interface AvailableSchedule {
  date: string
  time: string
}

export const appointmentApi = {
  findAvailableSchedules: async (
    clinicId: string,
    professionalId: string,
    date: string,
  ): Promise<AvailableSchedule[]> => {
    return api
      .get('public/appointments/available-schedules', {
        searchParams: { clinicId, professionalId, date },
      })
      .json()
  },

  createAppointment: async (
    data: CreateAppointmentDto,
  ): Promise<Appointment> => {
    return api.post('public/appointments', { json: data }).json()
  },

  findPatientAppointments: async (cpf: string): Promise<Appointment[]> => {
    return api.get(`public/appointments/patient/${cpf}`).json()
  },

  cancelAppointment: async (
    cpf: string,
    appointmentId: string,
  ): Promise<Appointment> => {
    return api
      .post(`public/appointments/patient/${cpf}/cancel/${appointmentId}`)
      .json()
  },
}
