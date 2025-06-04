import React from 'react';
import { Link } from 'react-router-dom';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import useAuthService from '@/services/authService';
import { useLoginMutation } from '@/hooks/useAuthMutation';
import LoginForm from '@/components/forms/loginForm';
import { formSchema } from '@/validationSchemas/login.schema';


type FormValues = z.infer<typeof formSchema>;

const Login = () => {
  const [showPassword, setShowPassword] = React.useState(false);
  const { handlelogin } = useAuthService();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const { loginUser, isPending } = useLoginMutation({ handlelogin, form });


  const onSubmit = (values: FormValues) => {
    if (isPending) return; // Prevent multiple submissions
    loginUser({
      emailOrPhone: values.email,
      password: values.password,
    });
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <Link to="/" className="mb-6 flex items-center justify-center">
          <span className="font-display text-2xl font-bold tracking-tight bg-gradient-to-br from-primary to-accent bg-clip-text text-transparent">
            PlayGenzz
          </span>
        </Link>

        <Card className="w-full">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold text-center">Welcome back</CardTitle>
            <CardDescription className="text-center">
              Enter your credentials to login to your account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <LoginForm
              form={form}
              onSubmit={onSubmit}
              isPending={isPending}
              showPassword={showPassword}
              setShowPassword={setShowPassword}
            />
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
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
            <div className="grid grid-cols-2 gap-4">
              <Button variant="outline" className="w-full" disabled={isPending}>Google</Button>
              <Button variant="outline" className="w-full" disabled={isPending}>Facebook</Button>
            </div>
            <div className="text-center text-sm">
              Don't have an account?{" "}
              <Link to="/register" className="underline underline-offset-4 hover:text-primary">
                Register
              </Link>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};


export default Login;