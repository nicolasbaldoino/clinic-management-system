'use server'

import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

import { authApi } from '@/http/auth'

export async function currentUser() {
  const cookieStore = await cookies()

  const token = cookieStore.get('token')
  const user = cookieStore.get('user')

  if (!token || !user) {
    return null
  }

  return JSON.parse(user.value)
}

export async function login(formData: FormData) {
  const email = formData.get('email') as string
  const password = formData.get('password') as string

  if (!email || !password) {
    return {
      error: 'Email and password are required',
    }
  }

  const cookieStore = await cookies()

  try {
    const response = await authApi.login({ email, password })

    cookieStore.set('token', response.access_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24, // 1 day
    })

    cookieStore.set('user', JSON.stringify(response.user), {
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24, // 1 day
    })

    redirect('/dashboard')
  } catch (error) {
    return {
      error: 'Invalid email or password',
    }
  }
}

export async function patientLogin(formData: FormData) {
  const cpf = formData.get('cpf') as string
  const password = formData.get('password') as string

  if (!cpf || !password) {
    return {
      error: 'CPF and password are required',
    }
  }

  const cookieStore = await cookies()

  try {
    const response = await authApi.patientLogin({ cpf, password })

    cookieStore.set('token', response.access_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24, // 1 day
    })

    cookieStore.set('user', JSON.stringify(response.user), {
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24, // 1 day
    })

    redirect('/patient/dashboard')
  } catch (error) {
    return {
      error: 'Invalid CPF or password',
    }
  }
}

export async function logout() {
  const cookieStore = await cookies()

  cookieStore.delete('token')
  cookieStore.delete('user')

  redirect('/login')
}
