import { gql } from '@apollo/client'


export const CREATE_PROFESSIONAL = gql`
  mutation CreateProfessional(
    $createProfessionalInput: CreateProfessionalInput!
  ) {
    createProfessional(createProfessionalInput: $createProfessionalInput) {
      id
      name
      email
      speciality
      clinicId
      clinic {
        id
        name
      }
      schedules {
        id
        date
        startTime
        endTime
        status
      }
      appointments {
        id
        date
        startTime
        endTime
        status
      }
      createdAt
      updatedAt
    }
  }
`

export const GET_PROFESSIONALS = gql`
  query GetProfessionals {
    professionals {
      id
      name
      email
      speciality
      clinicId
      clinic {
        id
        name
      }
      schedules {
        id
        date
        startTime
        endTime
        status
      }
      appointments {
        id
        date
        startTime
        endTime
        status
      }
      createdAt
      updatedAt
    }
  }
`

export const GET_PROFESSIONAL = gql`
  query GetProfessional($id: ID!) {
    professional(id: $id) {
      id
      name
      email
      speciality
      clinicId
      clinic {
        id
        name
      }
      schedules {
        id
        date
        startTime
        endTime
        status
      }
      appointments {
        id
        date
        startTime
        endTime
        status
      }
      createdAt
      updatedAt
    }
  }
`

export const GET_PROFESSIONALS_BY_CLINIC = gql`
  query GetProfessionalsByClinic($clinicId: ID!) {
    professionalsByClinic(clinicId: $clinicId) {
      id
      name
      email
      speciality
      clinicId
      clinic {
        id
        name
      }
      schedules {
        id
        date
        startTime
        endTime
        status
      }
      appointments {
        id
        date
        startTime
        endTime
        status
      }
      createdAt
      updatedAt
    }
  }
`

export const GET_PROFESSIONALS_BY_SPECIALITY = gql`
  query GetProfessionalsBySpeciality($clinicId: ID!, $speciality: String!) {
    professionalsBySpeciality(clinicId: $clinicId, speciality: $speciality) {
      id
      name
      email
      speciality
      clinicId
      clinic {
        id
        name
      }
      schedules {
        id
        date
        startTime
        endTime
        status
      }
      appointments {
        id
        date
        startTime
        endTime
        status
      }
      createdAt
      updatedAt
    }
  }
`

export const UPDATE_PROFESSIONAL = gql`
  mutation UpdateProfessional(
    $id: ID!
    $updateProfessionalInput: UpdateProfessionalInput!
  ) {
    updateProfessional(
      id: $id
      updateProfessionalInput: $updateProfessionalInput
    ) {
      id
      name
      email
      speciality
      clinicId
      clinic {
        id
        name
      }
      schedules {
        id
        date
        startTime
        endTime
        status
      }
      appointments {
        id
        date
        startTime
        endTime
        status
      }
      createdAt
      updatedAt
    }
  }
`

export const REMOVE_PROFESSIONAL = gql`
  mutation RemoveProfessional($id: ID!) {
    removeProfessional(id: $id) {
      id
      name
      email
      speciality
      clinicId
      clinic {
        id
        name
      }
      schedules {
        id
        date
        startTime
        endTime
        status
      }
      appointments {
        id
        date
        startTime
        endTime
        status
      }
      createdAt
      updatedAt
    }
  }
`
