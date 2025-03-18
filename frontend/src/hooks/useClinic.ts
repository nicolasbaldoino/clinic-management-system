import {
  CREATE_CLINIC,
  GET_CLINIC,
  GET_CLINICS,
  REMOVE_CLINIC,
  UPDATE_CLINIC,
} from '@/http/graphql/clinic'
import { Clinic, CreateClinicInput, UpdateClinicInput } from '@/http/graphql/types'
import { useMutation, useQuery } from '@apollo/client'
import { useApollo } from './useApollo'

export const useCreateClinic = () => {
  const client = useApollo()
  return useMutation<{ createClinic: Clinic }, { createClinicInput: CreateClinicInput }>(
    CREATE_CLINIC,
    { client }
  )
}

export const useGetClinics = () => {
  const client = useApollo()
  return useQuery<{ clinics: Clinic[] }>(GET_CLINICS, { client })
}

export const useGetClinic = (id: string) => {
  const client = useApollo()
  return useQuery<{ clinic: Clinic }, { id: string }>(GET_CLINIC, {
    variables: { id },
    client,
  })
}

export const useUpdateClinic = () => {
  const client = useApollo()
  return useMutation<
    { updateClinic: Clinic },
    { id: string; updateClinicInput: UpdateClinicInput }
  >(UPDATE_CLINIC, { client })
}

export const useRemoveClinic = () => {
  const client = useApollo()
  return useMutation<{ removeClinic: Clinic }, { id: string }>(REMOVE_CLINIC, {
    client,
  })
} 