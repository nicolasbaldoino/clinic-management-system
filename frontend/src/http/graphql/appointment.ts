import { gql } from '@apollo/client'

export const GET_APPOINTMENTS = gql`
  query GetAppointments {
    appointments {
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

export const GET_APPOINTMENT = gql`
  query GetAppointment($id: ID!) {
    appointment(id: $id) {
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

export const GET_APPOINTMENTS_BY_CLINIC = gql`
  query GetAppointmentsByClinic($clinicId: ID!) {
    appointmentsByClinic(clinicId: $clinicId) {
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

export const GET_APPOINTMENTS_BY_PATIENT = gql`
  query GetAppointmentsByPatient($patientId: ID!) {
    appointmentsByPatient(patientId: $patientId) {
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

export const GET_APPOINTMENTS_BY_PROFESSIONAL = gql`
  query GetAppointmentsByProfessional($clinicId: ID!, $professionalId: ID!) {
    appointmentsByProfessional(clinicId: $clinicId, professionalId: $professionalId) {
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

export const GET_APPOINTMENTS_BY_STATUS = gql`
  query GetAppointmentsByStatus($clinicId: ID!, $status: AppointmentStatus!) {
    appointmentsByStatus(clinicId: $clinicId, status: $status) {
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