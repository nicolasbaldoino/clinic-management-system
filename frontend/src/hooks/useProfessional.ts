import {
  CREATE_PROFESSIONAL,
  GET_PROFESSIONAL,
  GET_PROFESSIONALS,
  GET_PROFESSIONALS_BY_CLINIC,
  GET_PROFESSIONALS_BY_SPECIALITY,
  REMOVE_PROFESSIONAL,
  UPDATE_PROFESSIONAL,
} from '@/http/graphql/professional'
import {
  CreateProfessionalInput,
  Professional,
  UpdateProfessionalInput,
} from '@/http/graphql/types'
import { useMutation, useQuery } from '@apollo/client'
import { useApollo } from './useApollo'

export const useCreateProfessional = () => {
  const client = useApollo()
  return useMutation<
    { createProfessional: Professional },
    { createProfessionalInput: CreateProfessionalInput }
  >(CREATE_PROFESSIONAL, { client })
}

export const useGetProfessionals = () => {
  const client = useApollo()
  return useQuery<{ professionals: Professional[] }>(GET_PROFESSIONALS, { client })
}

export const useGetProfessional = (id: string) => {
  const client = useApollo()
  return useQuery<{ professional: Professional }, { id: string }>(GET_PROFESSIONAL, {
    variables: { id },
    client,
  })
}

export const useGetProfessionalsByClinic = (clinicId: string) => {
  const client = useApollo()
  return useQuery<{ professionalsByClinic: Professional[] }, { clinicId: string }>(
    GET_PROFESSIONALS_BY_CLINIC,
    {
      variables: { clinicId },
      client,
    }
  )
}

export const useGetProfessionalsBySpeciality = (clinicId: string, speciality: string) => {
  const client = useApollo()
  return useQuery<
    { professionalsBySpeciality: Professional[] },
    { clinicId: string; speciality: string }
  >(GET_PROFESSIONALS_BY_SPECIALITY, {
    variables: { clinicId, speciality },
    client,
  })
}

export const useUpdateProfessional = () => {
  const client = useApollo()
  return useMutation<
    { updateProfessional: Professional },
    { id: string; updateProfessionalInput: UpdateProfessionalInput }
  >(UPDATE_PROFESSIONAL, { client })
}

export const useRemoveProfessional = () => {
  const client = useApollo()
  return useMutation<{ removeProfessional: Professional }, { id: string }>(
    REMOVE_PROFESSIONAL,
    { client }
  )
} 