import {
  CREATE_SCHEDULE,
  GET_SCHEDULE,
  GET_SCHEDULES,
  GET_SCHEDULES_BY_CLINIC,
  GET_SCHEDULES_BY_DATE,
  GET_SCHEDULES_BY_PROFESSIONAL,
  GET_SCHEDULES_BY_STATUS,
  REMOVE_SCHEDULE,
  UPDATE_SCHEDULE,
} from '@/http/graphql/schedule'
import { CreateScheduleInput, Schedule, ScheduleStatus, UpdateScheduleInput } from '@/http/graphql/types'
import { useMutation, useQuery } from '@apollo/client'
import { useApollo } from './useApollo'

export const useCreateSchedule = () => {
  const client = useApollo()
  return useMutation<{ createSchedule: Schedule }, { createScheduleInput: CreateScheduleInput }>(
    CREATE_SCHEDULE,
    { client }
  )
}

export const useGetSchedules = () => {
  const client = useApollo()
  return useQuery<{ schedules: Schedule[] }>(GET_SCHEDULES, { client })
}

export const useGetSchedule = (id: string) => {
  const client = useApollo()
  return useQuery<{ schedule: Schedule }, { id: string }>(GET_SCHEDULE, {
    variables: { id },
    client,
  })
}

export const useGetSchedulesByClinic = (clinicId: string) => {
  const client = useApollo()
  return useQuery<{ schedulesByClinic: Schedule[] }, { clinicId: string }>(
    GET_SCHEDULES_BY_CLINIC,
    {
      variables: { clinicId },
      client,
    }
  )
}

export const useGetSchedulesByProfessional = (clinicId: string, professionalId: string) => {
  const client = useApollo()
  return useQuery<
    { schedulesByProfessional: Schedule[] },
    { clinicId: string; professionalId: string }
  >(GET_SCHEDULES_BY_PROFESSIONAL, {
    variables: { clinicId, professionalId },
    client,
  })
}

export const useGetSchedulesByDate = (clinicId: string, date: string) => {
  const client = useApollo()
  return useQuery<{ schedulesByDate: Schedule[] }, { clinicId: string; date: string }>(
    GET_SCHEDULES_BY_DATE,
    {
      variables: { clinicId, date },
      client,
    }
  )
}

export const useGetSchedulesByStatus = (clinicId: string, status: ScheduleStatus) => {
  const client = useApollo()
  return useQuery<
    { schedulesByStatus: Schedule[] },
    { clinicId: string; status: ScheduleStatus }
  >(GET_SCHEDULES_BY_STATUS, {
    variables: { clinicId, status },
    client,
  })
}

export const useUpdateSchedule = () => {
  const client = useApollo()
  return useMutation<
    { updateSchedule: Schedule },
    { id: string; updateScheduleInput: UpdateScheduleInput }
  >(UPDATE_SCHEDULE, { client })
}

export const useRemoveSchedule = () => {
  const client = useApollo()
  return useMutation<{ removeSchedule: Schedule }, { id: string }>(REMOVE_SCHEDULE, {
    client,
  })
} 