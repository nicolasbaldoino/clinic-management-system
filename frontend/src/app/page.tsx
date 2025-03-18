import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col justify-center items-center">
      <header className="bg-primary p-6 w-full flex justify-center items-center">
        <div className="container flex items-center justify-between">
          <h1 className="text-2xl font-bold text-primary-foreground">MedClinic</h1>
          <nav className="flex gap-4">
            <Link href="/admin/login">
              <Button variant="outline">Área Administrativa</Button>
            </Link>
            <Link href="/patient/login">
              <Button>Área do Paciente</Button>
            </Link>
          </nav>
        </div>
      </header>
      <main className="container flex-1 py-12">
        <div className="grid gap-8 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Área Administrativa</CardTitle>
              <CardDescription>Acesso restrito para administradores de clínicas</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Gerencie profissionais, agendas e visualize consultas marcadas. Acesso exclusivo para administradores
                autenticados.
              </p>
            </CardContent>
            <CardFooter>
              <Link href="/admin/login" className="w-full">
                <Button className="w-full">Acessar como Administrador</Button>
              </Link>
            </CardFooter>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Área do Paciente</CardTitle>
              <CardDescription>Agendamento de consultas para pacientes</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Visualize horários disponíveis e agende consultas com os profissionais da sua clínica. Acesso
                simplificado via CPF.
              </p>
            </CardContent>
            <CardFooter>
              <Link href="/patient/login" className="w-full">
                <Button className="w-full" variant="outline">
                  Acessar como Paciente
                </Button>
              </Link>
            </CardFooter>
          </Card>
        </div>
      </main>
      <footer className="border-t py-6 w-full">
        <div className="container text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} MedClinic - Sistema de Gestão de Clínicas Médicas
        </div>
      </footer>
    </div>
  )
}

