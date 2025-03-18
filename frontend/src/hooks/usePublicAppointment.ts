import {
  CANCEL_APPOINTMENT,
  CREATE_APPOINTMENT,
  GET_AVAILABLE_SCHEDULES,
  GET_PATIENT_APPOINTMENTS,
} from '@/http/graphql/public-appointment'
import { Appointment, CreateAppointmentInput, Schedule } from '@/http/graphql/types'
import { useMutation, useQuery } from '@apollo/client'
import { useApollo } from './useApollo'

export const useGetAvailableSchedules = (clinicId: string, professionalId: string, date: string) => {
  const client = useApollo()
  return useQuery<
    { availableSchedules: Schedule[] },
    { clinicId: string; professionalId: string; date: string }
  >(GET_AVAILABLE_SCHEDULES, {
    variables: { clinicId, professionalId, date },
    client,
  })
}

export const useCreatePublicAppointment = () => {
  const client = useApollo()
  return useMutation<{ createAppointment: Appointment }, { input: CreateAppointmentInput }>(
    CREATE_APPOINTMENT,
    { client }
  )
}

export const useGetPatientAppointments = (cpf: string) => {
  const client = useApollo()
  return useQuery<{ patientAppointments: Appointment[] }, { cpf: string }>(
    GET_PATIENT_APPOINTMENTS,
    {
      variables: { cpf },
      client,
    }
  )
}

export const useCancelAppointment = () => {
  const client = useApollo()
  return useMutation<
    { cancelAppointment: Appointment },
    { cpf: string; appointmentId: string }
  >(CANCEL_APPOINTMENT, { client })
} 