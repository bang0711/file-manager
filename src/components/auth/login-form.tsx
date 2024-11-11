"use client";

import { Button } from "../ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "../ui/card";
import { Input } from "../ui/input";
import { useToast } from "@/hooks/use-toast";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Icons } from "../shared/icons";

import Link from "next/link";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { login } from "@/lib/auth";
import { useRouter } from "next/navigation";

// Improved schema with additional validation rules
const formSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(5, { message: "Password must be at least 5 characters long" }),
});

function LoginForm() {
  const { toast } = useToast();

  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    const { email, password } = data;

    const res = await login({ email, password });

    toast({
      title: res.message,
      variant: res.statusCode === 200 ? "default" : "destructive",
      duration: 1000,
    });

    if (res.statusCode === 200) {
      router.push("/");
    }
  };

  return (
    <div className="flex h-full min-h-[50vh] w-full flex-col items-center justify-center px-4">
      <Card className="mx-auto min-w-80 md:min-w-96">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl">Login</CardTitle>
        </CardHeader>

        <CardContent className="grid gap-4">
          <div className="grid grid-cols-2 gap-6">
            <Button variant="outline">
              <Icons.gitHub className="mr-2 h-4 w-4" />
              Github
            </Button>

            <Button variant="outline">
              <Icons.google className="mr-2 h-4 w-4" />
              Google
            </Button>
          </div>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>

            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">
                Or continue with
              </span>
            </div>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <div className="grid gap-4">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem className="grid gap-2">
                      <FormLabel htmlFor="email">Email</FormLabel>
                      <FormControl>
                        <Input
                          id="email"
                          placeholder="johndoe@mail.com"
                          type="email"
                          autoComplete="email"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className="text-sm" />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem className="grid gap-2">
                      <div className="flex items-center justify-between">
                        <FormLabel htmlFor="password">Password</FormLabel>
                        <Link
                          href="#"
                          className="ml-auto inline-block text-sm underline"
                        >
                          Forgot your password?
                        </Link>
                      </div>
                      <FormControl>
                        <Input
                          id="password"
                          placeholder="******"
                          autoComplete="current-password"
                          type="password"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className="text-sm" />
                    </FormItem>
                  )}
                />
                <Button type="submit" className="w-full">
                  Login
                </Button>
              </div>
            </form>
          </Form>

          <div className="mt-4 text-center text-sm">
            Don&apos;t have an account?{" "}
            <Link href="/register" className="underline">
              Register
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default LoginForm;
