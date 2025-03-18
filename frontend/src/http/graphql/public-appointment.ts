import { gql } from '@apollo/client'

export const GET_AVAILABLE_SCHEDULES = gql`
  query GetAvailableSchedules($clinicId: ID!, $professionalId: ID!, $date: DateTime!) {
    availableSchedules(clinicId: $clinicId, professionalId: $professionalId, date: $date) {
      id
      date
      startTime
      endTime
      status
      clinicId
      clinic {
        id
        name
      }
      professionalId
      professional {
        id
        name
        speciality
      }
      createdAt
      updatedAt
    }
  }
`

export const CREATE_APPOINTMENT = gql`
  mutation CreateAppointment($input: CreateAppointmentInput!) {
    createAppointment(input: $input) {
      id
      date
      startTime
      endTime
      status
      clinicId
      clinic {
        id
        name
      }
      professionalId
      professional {
        id
        name
        speciality
      }
      patientId
      patient {
        id
        name
        email
        phone
        cpf
      }
      createdAt
      updatedAt
    }
  }
`

export const GET_PATIENT_APPOINTMENTS = gql`
  query GetPatientAppointments($cpf: String!) {
    patientAppointments(cpf: $cpf) {
      id
      date
      startTime
      endTime
      status
      clinicId
      clinic {
        id
        name
      }
      professionalId
      professional {
        id
        name
        speciality
      }
      patientId
      patient {
        id
        name
        email
        phone
        cpf
      }
      createdAt
      updatedAt
    }
  }
`

export const CANCEL_APPOINTMENT = gql`
  mutation CancelAppointment($cpf: String!, $appointmentId: ID!) {
    cancelAppointment(cpf: $cpf, appointmentId: $appointmentId) {
      id
      date
      startTime
      endTime
      status
      clinicId
      clinic {
        id
        name
      }
      professionalId
      professional {
        id
        name
        speciality
      }
      patientId
      patient {
        id
        name
        email
        phone
        cpf
      }
      createdAt
      updatedAt
    }
  }
` 