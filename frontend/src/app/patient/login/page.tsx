"use client"

import { zodResolver } from '@hookform/resolvers/zod'
import { Loader2 } from 'lucide-react'
import { useRouter } from "next/navigation"
import { useForm } from 'react-hook-form'
import { toast } from "sonner"
import { z } from "zod"

import { patientLogin } from "@/actions/auth"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from "@/components/ui/input"
import { cn, extractNumber } from '@/lib/utils'
import { validCPF } from '@/lib/validators'

const loginSchema = z.object({
  cpf: z
  .string()
  .trim()
  .transform(extractNumber)
  .refine(({ length }) => !length || length === 11, {
    message: 'O CPF deve ter exatamente 11 dígitos',
  })
  .refine(validCPF, { message: 'O CPF deve ser válido' }),
})

export default function PatientLogin() {
  const router = useRouter()

  const form = useForm<z.infer<typeof loginSchema>>({
    defaultValues: { cpf: "" },
    resolver: zodResolver(loginSchema),
  })


  const onSubmit = async (values: z.infer<typeof loginSchema>) => {
    if (!validCPF(values.cpf)) {
      toast("CPF inválido", {
        description: "Por favor, digite um CPF válido.",
      })
      return
    }

    try {
      const res = await patientLogin({ cpf: values.cpf.replace(/\D/g, "") })

      if (res?.error) {
        toast(res.error)
        return
      }

      toast("Acesso concedido", {
        description: "Redirecionando para a área de agendamento...",
      })

      router.push("/patient/dashboard")
    } catch (error) {
      toast("Erro ao acessar", {
        description: "Ocorreu um erro ao tentar acessar. Tente novamente.",
      })
    }
  }


  return (
    <div className="container flex h-screen items-center justify-center">
      <Card className="mx-auto w-full max-w-md">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <CardHeader className="space-y-1">
              <CardTitle className="text-2xl font-bold">Área do Paciente</CardTitle>
              <CardDescription>Acesse com seu CPF para agendar consultas</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <FormField
                control={form.control}
                name="cpf"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>CPF</FormLabel>
                    <FormControl>
                      <Input placeholder="000.000.000-00" {...field} />
                    </FormControl>
                    <FormMessage />
                    <FormDescription>Digite apenas os números do seu CPF</FormDescription>
                  </FormItem>
                )}
              />
            </CardContent>
            <CardFooter className='mt-8'>
              <Button
                className="w-full"
                disabled={form.formState.isSubmitting}
                type="submit"
              >
                <Loader2
                  className={cn(
                    'mr-2 size-4 animate-spin',
                    !form.formState.isSubmitting && 'sr-only',
                  )}
                />
                Login
              </Button>
            </CardFooter>
          </form>
        </Form>
      </Card>
    </div>
  )
}
