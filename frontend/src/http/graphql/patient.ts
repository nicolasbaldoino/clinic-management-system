import { gql } from '@apollo/client'


export const CREATE_PATIENT = gql`
  mutation CreatePatient($createPatientInput: CreatePatientInput!) {
    createPatient(createPatientInput: $createPatientInput) {
      id
      name
      email
      phone
      cpf
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

export const GET_PATIENTS = gql`
  query GetPatients {
    patients {
      id
      name
      email
      phone
      cpf
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

export const GET_PATIENT = gql`
  query GetPatient($id: ID!) {
    patient(id: $id) {
      id
      name
      email
      phone
      cpf
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

export const GET_PATIENT_BY_CPF = gql`
  query GetPatientByCpf($cpf: String!) {
    patientByCpf(cpf: $cpf) {
      id
      name
      email
      phone
      cpf
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

export const UPDATE_PATIENT = gql`
  mutation UpdatePatient($id: ID!, $updatePatientInput: UpdatePatientInput!) {
    updatePatient(id: $id, updatePatientInput: $updatePatientInput) {
      id
      name
      email
      phone
      cpf
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

export const REMOVE_PATIENT = gql`
  mutation RemovePatient($id: ID!) {
    removePatient(id: $id) {
      id
      name
      email
      phone
      cpf
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
