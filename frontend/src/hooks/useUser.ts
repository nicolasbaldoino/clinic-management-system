import { CreateUserInput, UpdateUserInput, User } from '@/http/graphql/types'
import {
    CREATE_USER,
    GET_USER,
    GET_USERS,
    GET_USERS_BY_CLINIC,
    REMOVE_USER,
    UPDATE_USER,
} from '@/http/graphql/user'
import { useMutation, useQuery } from '@apollo/client'
import { useApollo } from './useApollo'

export const useCreateUser = () => {
  const client = useApollo()
  return useMutation<{ createUser: User }, { createUserInput: CreateUserInput }>(
    CREATE_USER,
    { client }
  )
}

export const useGetUsers = () => {
  const client = useApollo()
  return useQuery<{ users: User[] }>(GET_USERS, { client })
}

export const useGetUser = (id: string) => {
  const client = useApollo()
  return useQuery<{ user: User }, { id: string }>(GET_USER, {
    variables: { id },
    client,
  })
}

export const useGetUsersByClinic = (clinicId: string) => {
  const client = useApollo()
  return useQuery<{ usersByClinic: User[] }, { clinicId: string }>(
    GET_USERS_BY_CLINIC,
    {
      variables: { clinicId },
      client,
    }
  )
}

export const useUpdateUser = () => {
  const client = useApollo()
  return useMutation<
    { updateUser: User },
    { id: string; updateUserInput: UpdateUserInput }
  >(UPDATE_USER, { client })
}

export const useRemoveUser = () => {
  const client = useApollo()
  return useMutation<{ removeUser: User }, { id: string }>(REMOVE_USER, {
    client,
  })
} 