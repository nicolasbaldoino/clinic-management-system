import { gql } from '@apollo/client'


export const CREATE_CLINIC = gql`
  mutation CreateClinic($createClinicInput: CreateClinicInput!) {
    createClinic(createClinicInput: $createClinicInput) {
      id
      name
      appointments {
        id
        date
        startTime
        endTime
        status
      }
      professionals {
        id
        name
        speciality
      }
      users {
        id
        name
        email
        role
      }
      createdAt
      updatedAt
    }
  }
`

export const GET_CLINICS = gql`
  query GetClinics {
    clinics {
      id
      name
      appointments {
        id
        date
        startTime
        endTime
        status
      }
      professionals {
        id
        name
        speciality
      }
      users {
        id
        name
        email
        role
      }
      createdAt
      updatedAt
    }
  }
`

export const GET_CLINIC = gql`
  query GetClinic($id: ID!) {
    clinic(id: $id) {
      id
      name
      appointments {
        id
        date
        startTime
        endTime
        status
      }
      professionals {
        id
        name
        speciality
      }
      users {
        id
        name
        email
        role
      }
      createdAt
      updatedAt
    }
  }
`

export const UPDATE_CLINIC = gql`
  mutation UpdateClinic($id: ID!, $updateClinicInput: UpdateClinicInput!) {
    updateClinic(id: $id, updateClinicInput: $updateClinicInput) {
      id
      name
      appointments {
        id
        date
        startTime
        endTime
        status
      }
      professionals {
        id
        name
        speciality
      }
      users {
        id
        name
        email
        role
      }
      createdAt
      updatedAt
    }
  }
`

export const REMOVE_CLINIC = gql`
  mutation RemoveClinic($id: ID!) {
    removeClinic(id: $id) {
      id
      name
      appointments {
        id
        date
        startTime
        endTime
        status
      }
      professionals {
        id
        name
        speciality
      }
      users {
        id
        name
        email
        role
      }
      createdAt
      updatedAt
    }
  }
`
