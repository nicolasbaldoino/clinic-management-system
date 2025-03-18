import {
  GET_APPOINTMENT,
  GET_APPOINTMENTS,
  GET_APPOINTMENTS_BY_CLINIC,
  GET_APPOINTMENTS_BY_PATIENT,
  GET_APPOINTMENTS_BY_PROFESSIONAL,
  GET_APPOINTMENTS_BY_STATUS,
} from '@/http/graphql/appointment'
import { Appointment, AppointmentStatus } from '@/http/graphql/types'
import { useQuery } from '@apollo/client'
import { useApollo } from './useApollo'

export const useGetAppointments = () => {
  const client = useApollo()
  return useQuery<{ appointments: Appointment[] }>(GET_APPOINTMENTS, { client })
}

export const useGetAppointment = (id: string) => {
  const client = useApollo()
  return useQuery<{ appointment: Appointment }, { id: string }>(GET_APPOINTMENT, {
    variables: { id },
    client,
  })
}

export const useGetAppointmentsByClinic = (clinicId: string) => {
  const client = useApollo()
  return useQuery<{ appointmentsByClinic: Appointment[] }, { clinicId: string }>(
    GET_APPOINTMENTS_BY_CLINIC,
    {
      variables: { clinicId },
      client,
    }
  )
}

export const useGetAppointmentsByPatient = (patientId: string) => {
  const client = useApollo()
  return useQuery<{ appointmentsByPatient: Appointment[] }, { patientId: string }>(
    GET_APPOINTMENTS_BY_PATIENT,
    {
      variables: { patientId },
      client,
    }
  )
}

export const useGetAppointmentsByProfessional = (clinicId: string, professionalId: string) => {
  const client = useApollo()
  return useQuery<
    { appointmentsByProfessional: Appointment[] },
    { clinicId: string; professionalId: string }
  >(GET_APPOINTMENTS_BY_PROFESSIONAL, {
    variables: { clinicId, professionalId },
    client,
  })
}

export const useGetAppointmentsByStatus = (clinicId: string, status: AppointmentStatus) => {
  const client = useApollo()
  return useQuery<
    { appointmentsByStatus: Appointment[] },
    { clinicId: string; status: AppointmentStatus }
  >(GET_APPOINTMENTS_BY_STATUS, {
    variables: { clinicId, status },
    client,
  })
} 