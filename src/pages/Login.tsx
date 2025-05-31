import React from 'react';
import { Link } from 'react-router-dom';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Eye, EyeOff, Mail, Lock, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/contexts/AuthContext';
import { useAsync } from '@/hooks/use-async';
import useAuthService from '@/services/authService';

const formSchema = z.object({
  email: z.string().email({ message: 'Please enter a valid email address' }),
  password: z.string().min(1, { message: 'Password is required' }),
});

type FormValues = z.infer<typeof formSchema>;

const Login = () => {
  const [showPassword, setShowPassword] = React.useState(false);
  const { login } = useAuth();
  const { handlelogin } = useAuthService(); // Assuming you have a function to handle login
  const { loading, execute, ServerErrorModal } = useAsync();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = (values: FormValues) => {
    const { email, password } = values;

    const loginData = {
      emailOrPhone: email,
      password,
    };

    execute(
      // This is a mock promise that would typically be an API call
      handlelogin(loginData)
        .then((response) => {
          const { status, data, message } = response;
          if (!status && message?.type === 'email') {
            form.setError('email', {
              type: 'manual',
              message: message.message,
            });
            throw new Error('FORM_VALIDATION_ERROR');
          }
          if (!status && message?.type === 'password') {
            form.setError('password', {
              type: 'manual',
              message: message.message,
            });
            throw new Error('FORM_VALIDATION_ERROR');
          }

          if (!status) {
            throw new Error(message || 'Login failed due to invalid credentials.');
          }

          login(data.token);
          return data.token;
        }),
      {
        successMessage: "Successfully logged in!",
        errorMessage: "Failed to log in. Please try again.",
        showErrorModal: true,
      }
    );
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
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                          <Input
                            placeholder="Enter your email"
                            type="email"
                            className="pl-9"
                            {...field}
                            disabled={loading}
                          />
                        </div>
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
                      <div className="flex items-center justify-between">
                        <FormLabel>Password</FormLabel>
                        <Link
                          to="/forgot-password"
                          className="text-xs text-muted-foreground hover:text-primary"
                        >
                          Forgot password?
                        </Link>
                      </div>
                      <FormControl>
                        <div className="relative">
                          <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                          <Input
                            placeholder="Enter your password"
                            type={showPassword ? "text" : "password"}
                            className="pl-9 pr-9"
                            {...field}
                            disabled={loading}
                          />
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
                            aria-label={showPassword ? "Hide password" : "Show password"}
                            disabled={loading}
                          >
                            {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                          </button>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Logging in...
                    </>
                  ) : (
                    'Login'
                  )}
                </Button>
              </form>
            </Form>
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
              <Button variant="outline" className="w-full" disabled={loading}>Google</Button>
              <Button variant="outline" className="w-full" disabled={loading}>Facebook</Button>
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
      <ServerErrorModal />
    </div>
  );
};

export default Login;