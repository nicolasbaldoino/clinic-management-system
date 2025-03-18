"use client"

import { CalendarIcon, ClockIcon, UserIcon } from "lucide-react"
import { useEffect, useState } from "react"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useGetClinics } from "@/hooks/useClinic"
import { useGetProfessionalsByClinic, useGetProfessionalsBySpeciality } from "@/hooks/useProfessional"
import { useCancelAppointment, useCreatePublicAppointment, useGetAvailableSchedules, useGetPatientAppointments } from "@/hooks/usePublicAppointment"
import { Appointment } from "@/http/graphql/types"

interface Patient {
  id: string
  name: string
  email: string
  cpf: string
}

interface DashboardProps {
  patient: Patient
  initialAppointments: Appointment[]
}

export default function Dashboard({ patient, initialAppointments }: DashboardProps) {
  const [selectedClinic, setSelectedClinic] = useState("")
  const [selectedSpecialty, setSelectedSpecialty] = useState("")
  const [selectedProfessional, setSelectedProfessional] = useState("")
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined)
  const [selectedTime, setSelectedTime] = useState("")
  const [showConfirmation, setShowConfirmation] = useState(false)
  const [myAppointments, setMyAppointments] = useState<Appointment[]>(initialAppointments)

  const { data: clinicsData, loading: loadingClinics } = useGetClinics()
  const { data: professionalsData, loading: loadingProfessionals } = useGetProfessionalsByClinic(selectedClinic)
  const { data: professionalsBySpecialityData, loading: loadingProfessionalsBySpeciality } = useGetProfessionalsBySpeciality(
    selectedClinic,
    selectedSpecialty
  )

  const { data: availableSchedulesData, loading: loadingSchedules } = useGetAvailableSchedules(
    selectedClinic,
    selectedProfessional,
    selectedDate?.toISOString().split('T')[0] || ""
  )

  const { data: appointmentsData, loading: loadingAppointments } = useGetPatientAppointments(patient.cpf)
  const [createAppointment] = useCreatePublicAppointment()
  const [cancelAppointment] = useCancelAppointment()

  useEffect(() => {
    if (appointmentsData?.patientAppointments) {
      setMyAppointments(appointmentsData.patientAppointments)
    }
  }, [appointmentsData])

  useEffect(() => {
    // Reset selections when clinic changes
    setSelectedSpecialty("")
    setSelectedProfessional("")
    setSelectedDate(undefined)
    setSelectedTime("")
  }, [selectedClinic])

  useEffect(() => {
    // Reset professional selection when specialty changes
    setSelectedProfessional("")
    setSelectedDate(undefined)
    setSelectedTime("")
  }, [selectedSpecialty])

  const handleScheduleAppointment = () => {
    if (!selectedClinic || !selectedProfessional || !selectedDate || !selectedTime) {
      toast.error("Informações incompletas", {
        description: "Por favor, selecione clínica, profissional, data e horário",
      })
      return
    }

    setShowConfirmation(true)
  }

  const confirmAppointment = async () => {
    try {
      await createAppointment({
        variables: {
          input: {
            clinicId: selectedClinic,
            professionalId: selectedProfessional,
            patientId: patient.id,
            date: selectedDate!.toISOString().split('T')[0],
            startTime: selectedTime,
            endTime: selectedTime, // TODO: Calculate end time based on appointment duration
          },
        },
      })

      toast.success("Consulta agendada com sucesso", {
        description: "Sua consulta foi agendada. Você receberá uma confirmação em breve.",
      })

      setShowConfirmation(false)
      setSelectedClinic("")
      setSelectedSpecialty("")
      setSelectedProfessional("")
      setSelectedDate(undefined)
      setSelectedTime("")
    } catch (error) {
      toast.error("Erro ao agendar consulta", {
        description: "Não foi possível agendar sua consulta. Tente novamente.",
      })
    }
  }

  const handleCancelAppointment = async (appointmentId: string) => {
    try {
      await cancelAppointment({
        variables: {
          cpf: patient.cpf,
          appointmentId,
        },
      })
      toast.success("Consulta cancelada com sucesso")
    } catch (error) {
      toast.error("Erro ao cancelar consulta", {
        description: "Não foi possível cancelar sua consulta. Tente novamente.",
      })
    }
  }

  const availableTimes = availableSchedulesData?.availableSchedules.map(schedule => schedule.startTime) || []
  const specialties = Array.from(new Set(professionalsData?.professionalsByClinic.map(p => p.speciality) || []))
  const professionals = selectedSpecialty ? professionalsBySpecialityData?.professionalsBySpeciality : professionalsData?.professionalsByClinic
  const selectedProfessionalData = professionals?.find(p => p.id === selectedProfessional)

  return (
    <div className="container mx-auto py-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold tracking-tight">Agendamento de Consultas</h1>
        <p className="text-muted-foreground">Agende suas consultas com os profissionais da nossa clínica</p>
      </div>

      <Tabs defaultValue="schedule">
        <TabsList>
          <TabsTrigger value="schedule">Agendar Consulta</TabsTrigger>
          <TabsTrigger value="my-appointments">Minhas Consultas</TabsTrigger>
        </TabsList>

        <TabsContent value="schedule" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Nova Consulta</CardTitle>
              <CardDescription>
                Selecione a clínica, especialidade, profissional, data e horário para sua consulta
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="clinic">Clínica</Label>
                    <Select value={selectedClinic} onValueChange={setSelectedClinic}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Selecione uma clínica" />
                      </SelectTrigger>
                      <SelectContent>
                        {loadingClinics ? (
                          <div className="text-center text-muted-foreground">Carregando clínicas...</div>
                        ) : clinicsData?.clinics.map((clinic) => (
                          <SelectItem key={clinic.id} value={clinic.id}>
                            {clinic.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="specialty">Especialidade</Label>
                    <Select 
                      value={selectedSpecialty} 
                      onValueChange={setSelectedSpecialty}
                      disabled={!selectedClinic || loadingProfessionals}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Selecione uma especialidade" />
                      </SelectTrigger>
                      <SelectContent>
                        {loadingProfessionals ? (
                          <div className="text-center text-muted-foreground">Carregando especialidades...</div>
                        ) : specialties.map((specialty) => (
                          <SelectItem key={specialty} value={specialty}>
                            {specialty}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="professional">Profissional</Label>
                    <Select
                      value={selectedProfessional}
                      onValueChange={setSelectedProfessional}
                      disabled={!selectedSpecialty || loadingProfessionalsBySpeciality}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Selecione um profissional" />
                      </SelectTrigger>
                      <SelectContent>
                        {loadingProfessionalsBySpeciality ? (
                          <div className="text-center text-muted-foreground">Carregando profissionais...</div>
                        ) : professionals?.map((professional) => (
                          <SelectItem key={professional.id} value={professional.id}>
                            {professional.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <Label>Data da Consulta</Label>
                  <div className="mt-2 rounded-md border flex justify-center items-center">
                    <Calendar
                      mode="single"
                      selected={selectedDate}
                      onSelect={setSelectedDate}
                      disabled={(date) => {
                        // Desabilita datas no passado e finais de semana
                        const today = new Date()
                        today.setHours(0, 0, 0, 0)
                        const day = date.getDay()
                        return date < today || day === 0 || day === 6
                      }}
                      className="rounded-md"
                    />
                  </div>
                </div>
              </div>

              <div>
                <Label>Horário Disponível</Label>
                <div className="mt-2 grid grid-cols-4 gap-2">
                  {loadingSchedules ? (
                    <div className="col-span-4 text-center text-muted-foreground">Carregando horários...</div>
                  ) : availableTimes.length > 0 ? (
                    availableTimes.map((time) => (
                      <Button
                        key={time}
                        variant={selectedTime === time ? "default" : "outline"}
                        className="justify-start"
                        onClick={() => setSelectedTime(time)}
                        disabled={!selectedDate}
                      >
                        <ClockIcon className="mr-2 h-4 w-4" />
                        {time}
                      </Button>
                    ))
                  ) : (
                    <div className="col-span-4 text-center text-muted-foreground">
                      Nenhum horário disponível para esta data
                    </div>
                  )}
                </div>
              </div>

              <Button
                onClick={handleScheduleAppointment}
                disabled={!selectedClinic || !selectedProfessional || !selectedDate || !selectedTime}
                className="w-full"
              >
                Agendar Consulta
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="my-appointments" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Minhas Consultas Agendadas</CardTitle>
              <CardDescription>Visualize e gerencie suas consultas agendadas</CardDescription>
            </CardHeader>
            <CardContent>
              {loadingAppointments ? (
                <div className="flex flex-col items-center justify-center py-8 text-center">
                  <div className="text-muted-foreground">Carregando consultas...</div>
                </div>
              ) : myAppointments.length > 0 ? (
                <div className="space-y-4">
                  {myAppointments.map((appointment) => (
                    <div key={appointment.id} className="flex items-center justify-between rounded-lg border p-4">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <UserIcon className="h-4 w-4 text-primary" />
                          <span className="font-medium">{appointment.professional?.name}</span>
                        </div>
                        <div className="text-sm text-muted-foreground">{appointment.clinic?.name}</div>
                        <div className="flex items-center gap-4 text-sm">
                          <div className="flex items-center gap-1">
                            <CalendarIcon className="h-3 w-3" />
                            <span>{new Date(appointment.date).toLocaleDateString("pt-BR")}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <ClockIcon className="h-3 w-3" />
                            <span>{appointment.startTime}</span>
                          </div>
                        </div>
                      </div>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleCancelAppointment(appointment.id)}
                        disabled={loadingAppointments}
                      >
                        Cancelar
                      </Button>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-8 text-center">
                  <CalendarIcon className="mb-2 h-10 w-10 text-muted-foreground" />
                  <h3 className="mb-1 text-lg font-medium">Nenhuma consulta agendada</h3>
                  <p className="text-sm text-muted-foreground">
                    Você ainda não tem consultas agendadas. Agende sua primeira consulta agora.
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <Dialog open={showConfirmation} onOpenChange={setShowConfirmation}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirmar Agendamento</DialogTitle>
            <DialogDescription>Revise os detalhes da sua consulta antes de confirmar</DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="text-muted-foreground">Clínica</Label>
                <p className="font-medium">
                  {clinicsData?.clinics.find(c => c.id === selectedClinic)?.name}
                </p>
              </div>
              <div>
                <Label className="text-muted-foreground">Profissional</Label>
                <p className="font-medium">
                  {selectedProfessionalData?.name}
                </p>
              </div>
              <div>
                <Label className="text-muted-foreground">Especialidade</Label>
                <p className="font-medium">
                  {selectedProfessionalData?.speciality}
                </p>
              </div>
              <div>
                <Label className="text-muted-foreground">Data</Label>
                <p className="font-medium">{selectedDate?.toLocaleDateString("pt-BR")}</p>
              </div>
              <div>
                <Label className="text-muted-foreground">Horário</Label>
                <p className="font-medium">{selectedTime}</p>
              </div>
            </div>

            <div>
              <Label className="text-muted-foreground">Termos e Condições</Label>
              <RadioGroup defaultValue="accept" className="mt-2">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="accept" id="accept" />
                  <Label htmlFor="accept" className="text-sm">
                    Concordo com os termos e condições da clínica
                  </Label>
                </div>
              </RadioGroup>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowConfirmation(false)}>
              Cancelar
            </Button>
            <Button onClick={confirmAppointment}>
              Confirmar Agendamento
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

