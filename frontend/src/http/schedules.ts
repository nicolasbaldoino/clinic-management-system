import { api } from './api-client'

interface Schedule {
  id: string
  professionalId: string
  clinicId: string
  dayOfWeek: number
  startTime: string
  endTime: string
  createdAt: string
  updatedAt: string
}

interface CreateScheduleRequest {
  professionalId: string
  clinicId: string
  dayOfWeek: number
  startTime: string
  endTime: string
}

interface UpdateScheduleRequest extends Partial<CreateScheduleRequest> {
  id: string
}

export async function createSchedule(
  data: CreateScheduleRequest,
): Promise<Schedule> {
  return api
    .post('schedules', {
      json: data,
    })
    .json()
}

export async function updateSchedule(
  data: UpdateScheduleRequest,
): Promise<Schedule> {
  return api
    .patch(`schedules/${data.id}`, {
      json: data,
    })
    .json()
}

export async function deleteSchedule(id: string): Promise<void> {
  await api.delete(`schedules/${id}`)
}

export async function getSchedule(id: string): Promise<Schedule> {
  return api.get(`schedules/${id}`).json()
}

export async function listSchedules(): Promise<Schedule[]> {
  return api.get('schedules').json()
}
