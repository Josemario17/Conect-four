"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";

const formSchema = z.object({
  email: z.string().email(),
  password: z.string().min(4),
});

export function SignInForm() {
  const form = useForm({
    resolver: zodResolver(formSchema), 
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = form.handleSubmit((data) => {
    console.log(data);
  });

  return (
    <Form {...form}>
      <form onSubmit={onSubmit} className="space-y-8">
        {/* Campo para o Email */}
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className="space-y-4">
              <FormLabel>Seu Email</FormLabel>
              <FormControl>
                <Input type="email" placeholder="email@email.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem className="space-y-4">
              <FormLabel>Sua Senha</FormLabel>
              <FormControl>
                <Input type="password" placeholder="*********" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormDescription>
          Adicione um Email e uma Senha Válida{" "}
          <Link to={"create"}>
            <span className="text-blue-900">ou Criar Conta</span>
          </Link>
        </FormDescription>
        <div className="w-full flex items-center justify-center">
          <Button type="submit" variant={"secondary"} size={"lg"} className="w-80">
            Entrar
          </Button>
        </div>
      </form>
    </Form>
  );
}
