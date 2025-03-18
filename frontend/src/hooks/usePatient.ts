import {
  CREATE_PATIENT,
  GET_PATIENT,
  GET_PATIENT_BY_CPF,
  GET_PATIENTS,
  REMOVE_PATIENT,
  UPDATE_PATIENT,
} from '@/http/graphql/patient'
import { CreatePatientInput, Patient, UpdatePatientInput } from '@/http/graphql/types'
import { useMutation, useQuery } from '@apollo/client'
import { useApollo } from './useApollo'

export const useCreatePatient = () => {
  const client = useApollo()
  return useMutation<{ createPatient: Patient }, { createPatientInput: CreatePatientInput }>(
    CREATE_PATIENT,
    { client }
  )
}

export const useGetPatients = () => {
  const client = useApollo()
  return useQuery<{ patients: Patient[] }>(GET_PATIENTS, { client })
}

export const useGetPatient = (id: string) => {
  const client = useApollo()
  return useQuery<{ patient: Patient }, { id: string }>(GET_PATIENT, {
    variables: { id },
    client,
  })
}

export const useGetPatientByCpf = (cpf: string) => {
  const client = useApollo()
  return useQuery<{ patientByCpf: Patient }, { cpf: string }>(GET_PATIENT_BY_CPF, {
    variables: { cpf },
    client,
  })
}

export const useUpdatePatient = () => {
  const client = useApollo()
  return useMutation<
    { updatePatient: Patient },
    { id: string; updatePatientInput: UpdatePatientInput }
  >(UPDATE_PATIENT, { client })
}

export const useRemovePatient = () => {
  const client = useApollo()
  return useMutation<{ removePatient: Patient }, { id: string }>(REMOVE_PATIENT, {
    client,
  })
} 