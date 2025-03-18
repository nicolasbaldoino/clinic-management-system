'use server'

import { cookies } from 'next/headers'

import { authApi } from '@/http/auth'

export async function currentUser() {
  const cookieStore = await cookies()

  const user = cookieStore.get('user')

  if (!user) {
    return null
  }

  return JSON.parse(user.value)
}

export async function currentPatient() {
  const cookieStore = await cookies()

  const patient = cookieStore.get('patient')

  if (!patient) {
    return null
  }

  return JSON.parse(patient.value)
}

export async function login({ email, password }: { email: string, password: string }) {
  if (!email || !password) {
    return {
      error: 'Email e senha são obrigatórios',
    }
  }

  const cookieStore = await cookies()

  try {
    const response = await authApi.login({ email, password })

    cookieStore.set('token', response.access_token, {
      path: '/',
      maxAge: 60 * 60 * 24 * 7, // 7 days
    })

    cookieStore.set('user', JSON.stringify(response.user), {
      path: '/',
      maxAge: 60 * 60 * 24 * 7, // 7 days
    })
  } catch (error) {
    return {
      error: 'Email ou senha inválidos',
    }
  }
}

export async function patientLogin({ cpf }: { cpf?: string }) {
  if (!cpf) {
    return {
      error: 'CPF é obrigatório',
    }
  }

  const cookieStore = await cookies()

  try {
    const response = await authApi.patientLogin({ cpf })

    cookieStore.set('patient', JSON.stringify(response.patient), {
      path: '/',
      maxAge: 60 * 60 * 24 * 7, // 7 days
    })
  } catch (error) {
    return {
      error: 'Paciente não encontrado',
    }
  }
}

export async function logout() {
  const cookieStore = await cookies()

  cookieStore.delete('token')
  cookieStore.delete('user')
  cookieStore.delete('patient')
}
