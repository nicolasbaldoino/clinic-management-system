"use client"

import { zodResolver } from '@hookform/resolvers/zod'
import { Loader2 } from 'lucide-react'
import { useRouter } from "next/navigation"
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from "zod"

import { login } from '@/actions/auth'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

const loginSchema = z.object({
  email: z.string().email({ message: "E-mail inválido" }),
  password: z.string().min(8, { message: "A senha deve ter pelo menos 8 caracteres" }),
})

export default function AdminLogin() {
  const router = useRouter()

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  const onSubmit = async (values: z.infer<typeof loginSchema>) => {
    try {
      const res = await login({ email: values.email, password: values.password })

      if (res?.error) {
        toast(res.error)
        return
      }

      toast("Login realizado com sucesso", {
        description: "Redirecionando para o painel administrativo...",
      })

      router.push("/admin/dashboard")
    } catch (error) {
      toast("Erro ao fazer login", {
        description: "Ocorreu um erro ao tentar fazer login. Tente novamente.",
      })
    }
  }

  return (
    <div className="container flex h-screen items-center justify-center">
      <Card className="mx-auto w-full max-w-md">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <CardHeader className="space-y-1">
              <CardTitle className="text-2xl font-bold">Área Administrativa</CardTitle>
              <CardDescription>Entre com suas credenciais de administrador</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>E-mail</FormLabel>
                    <FormControl>
                      <Input placeholder="seu@email.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Senha</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="********"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
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

