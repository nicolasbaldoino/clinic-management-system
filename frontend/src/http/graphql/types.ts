export enum UserRole {
  ADMIN = 'ADMIN',
  PROFESSIONAL = 'PROFESSIONAL',
}

export enum AppointmentStatus {
  SCHEDULED = 'SCHEDULED',
  CONFIRMED = 'CONFIRMED',
  CANCELLED = 'CANCELLED',
  COMPLETED = 'COMPLETED',
}

export enum ScheduleStatus {
  AVAILABLE = 'AVAILABLE',
  BOOKED = 'BOOKED',
}

type BaseAppointment = {
  id: string
  date: string
  startTime: string
  endTime: string
  status: AppointmentStatus
  clinicId: string
  professionalId: string
  patientId: string
  createdAt: string
  updatedAt: string
}

type BaseClinic = {
  id: string
  name: string
  createdAt: string
  updatedAt: string
}

type BaseProfessional = {
  id: string
  name: string
  email: string
  speciality: string
  clinicId: string
  createdAt: string
  updatedAt: string
}

type BasePatient = {
  id: string
  name: string
  email: string
  phone: string
  cpf: string
  createdAt: string
  updatedAt: string
}

type BaseSchedule = {
  id: string
  date: string
  startTime: string
  endTime: string
  status: ScheduleStatus
  clinicId: string
  professionalId: string
  createdAt: string
  updatedAt: string
}

type BaseUser = {
  id: string
  name: string
  email: string
  password: string
  role: UserRole
  clinicId?: string
  createdAt: string
  updatedAt: string
}

export interface User {
  id: string
  name: string
  email: string
  role: string
  clinicId?: string
  clinic?: Clinic
  createdAt: string
  updatedAt: string
}

export interface Clinic {
  id: string
  name: string
  address: string
  phone: string
  email: string
  professionals?: Professional[]
  users?: User[]
  createdAt: string
  updatedAt: string
}

export interface Professional {
  id: string
  name: string
  speciality: string
  clinicId: string
  clinic?: Clinic
  schedules?: Schedule[]
  appointments?: Appointment[]
  createdAt: string
  updatedAt: string
}

export interface Patient {
  id: string
  name: string
  email: string
  phone: string
  cpf: string
  appointments?: Appointment[]
  createdAt: string
  updatedAt: string
}

export interface Schedule {
  id: string
  date: string
  startTime: string
  endTime: string
  status: string
  clinicId: string
  clinic?: Clinic
  professionalId: string
  professional?: Professional
  createdAt: string
  updatedAt: string
}

export interface Appointment {
  id: string
  date: string
  startTime: string
  endTime: string
  status: string
  clinicId: string
  clinic?: Clinic
  professionalId: string
  professional?: Professional
  patientId: string
  patient?: Patient
  createdAt: string
  updatedAt: string
}

export interface CreateUserInput {
  name: string
  email: string
  password: string
  role: string
  clinicId?: string
}

export interface UpdateUserInput {
  name?: string
  email?: string
  password?: string
  role?: UserRole
  clinicId?: string
}

export interface CreateClinicInput {
  name: string
  address: string
  phone: string
  email: string
}

export interface UpdateClinicInput {
  name?: string
}

export interface CreateProfessionalInput {
  name: string
  speciality: string
  clinicId: string
}

export interface UpdateProfessionalInput {
  name?: string
  email?: string
  speciality?: string
}

export interface CreatePatientInput {
  name: string
  email: string
  phone: string
  cpf: string
}

export interface UpdatePatientInput {
  name?: string
  email?: string
  phone?: string
}

export interface CreateScheduleInput {
  date: string
  startTime: string
  endTime: string
  clinicId: string
  professionalId: string
}

export interface UpdateScheduleInput {
  date?: string
  startTime?: string
  endTime?: string
}

export interface CreateAppointmentInput {
  date: string
  startTime: string
  endTime: string
  clinicId: string
  professionalId: string
  patientId: string
}
