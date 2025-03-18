import { currentPatient } from "@/actions/auth";
import { appointmentApi } from "@/http/appointments";
import { Appointment } from "@/http/graphql/types";

import Dashboard from "./dashboard";

export default async function Page() {
  const patient = await currentPatient();

  const appointments = await appointmentApi.findPatientAppointments(patient!.cpf)

  return (
    <Dashboard 
      patient={patient!}
      initialAppointments={appointments as unknown as Appointment[]}
    />
  );
}
