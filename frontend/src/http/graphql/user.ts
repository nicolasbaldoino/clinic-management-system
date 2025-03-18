import { gql } from '@apollo/client'


export const CREATE_USER = gql`
  mutation CreateUser($createUserInput: CreateUserInput!) {
    createUser(createUserInput: $createUserInput) {
      id
      name
      email
      role
      clinicId
      clinic {
        id
        name
      }
      createdAt
      updatedAt
    }
  }
`

export const GET_USERS = gql`
  query GetUsers {
    users {
      id
      name
      email
      role
      clinicId
      clinic {
        id
        name
      }
      createdAt
      updatedAt
    }
  }
`

export const GET_USER = gql`
  query GetUser($id: ID!) {
    user(id: $id) {
      id
      name
      email
      role
      clinicId
      clinic {
        id
        name
      }
      createdAt
      updatedAt
    }
  }
`

export const GET_USERS_BY_CLINIC = gql`
  query GetUsersByClinic($clinicId: ID!) {
    usersByClinic(clinicId: $clinicId) {
      id
      name
      email
      role
      clinicId
      clinic {
        id
        name
      }
      createdAt
      updatedAt
    }
  }
`

export const UPDATE_USER = gql`
  mutation UpdateUser($id: ID!, $updateUserInput: UpdateUserInput!) {
    updateUser(id: $id, updateUserInput: $updateUserInput) {
      id
      name
      email
      role
      clinicId
      clinic {
        id
        name
      }
      createdAt
      updatedAt
    }
  }
`

export const REMOVE_USER = gql`
  mutation RemoveUser($id: ID!) {
    removeUser(id: $id) {
      id
      name
      email
      role
      clinicId
      clinic {
        id
        name
      }
      createdAt
      updatedAt
    }
  }
`
