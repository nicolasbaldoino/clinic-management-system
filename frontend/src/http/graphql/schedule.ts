import { gql } from '@apollo/client'


export const CREATE_SCHEDULE = gql`
  mutation CreateSchedule($createScheduleInput: CreateScheduleInput!) {
    createSchedule(createScheduleInput: $createScheduleInput) {
      id
      date
      startTime
      endTime
      status
      clinicId
      clinic {
        id
        name
      }
      professionalId
      professional {
        id
        name
        speciality
      }
      appointment {
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

export const GET_SCHEDULES = gql`
  query GetSchedules {
    schedules {
      id
      date
      startTime
      endTime
      status
      clinicId
      clinic {
        id
        name
      }
      professionalId
      professional {
        id
        name
        speciality
      }
      appointment {
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

export const GET_SCHEDULE = gql`
  query GetSchedule($id: ID!) {
    schedule(id: $id) {
      id
      date
      startTime
      endTime
      status
      clinicId
      clinic {
        id
        name
      }
      professionalId
      professional {
        id
        name
        speciality
      }
      appointment {
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

export const GET_SCHEDULES_BY_CLINIC = gql`
  query GetSchedulesByClinic($clinicId: ID!) {
    schedulesByClinic(clinicId: $clinicId) {
      id
      date
      startTime
      endTime
      status
      clinicId
      clinic {
        id
        name
      }
      professionalId
      professional {
        id
        name
        speciality
      }
      appointment {
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

export const GET_SCHEDULES_BY_PROFESSIONAL = gql`
  query GetSchedulesByProfessional($clinicId: ID!, $professionalId: ID!) {
    schedulesByProfessional(
      clinicId: $clinicId
      professionalId: $professionalId
    ) {
      id
      date
      startTime
      endTime
      status
      clinicId
      clinic {
        id
        name
      }
      professionalId
      professional {
        id
        name
        speciality
      }
      appointment {
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

export const GET_SCHEDULES_BY_DATE = gql`
  query GetSchedulesByDate($clinicId: ID!, $date: String!) {
    schedulesByDate(clinicId: $clinicId, date: $date) {
      id
      date
      startTime
      endTime
      status
      clinicId
      clinic {
        id
        name
      }
      professionalId
      professional {
        id
        name
        speciality
      }
      appointment {
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

export const GET_SCHEDULES_BY_STATUS = gql`
  query GetSchedulesByStatus($clinicId: ID!, $status: ScheduleStatus!) {
    schedulesByStatus(clinicId: $clinicId, status: $status) {
      id
      date
      startTime
      endTime
      status
      clinicId
      clinic {
        id
        name
      }
      professionalId
      professional {
        id
        name
        speciality
      }
      appointment {
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

export const UPDATE_SCHEDULE = gql`
  mutation UpdateSchedule(
    $id: ID!
    $updateScheduleInput: UpdateScheduleInput!
  ) {
    updateSchedule(id: $id, updateScheduleInput: $updateScheduleInput) {
      id
      date
      startTime
      endTime
      status
      clinicId
      clinic {
        id
        name
      }
      professionalId
      professional {
        id
        name
        speciality
      }
      appointment {
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

export const REMOVE_SCHEDULE = gql`
  mutation RemoveSchedule($id: ID!) {
    removeSchedule(id: $id) {
      id
      date
      startTime
      endTime
      status
      clinicId
      clinic {
        id
        name
      }
      professionalId
      professional {
        id
        name
        speciality
      }
      appointment {
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
