
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Mail, ArrowLeft, Loader2, Eye, EyeOff } from 'lucide-react'; // Added Eye and EyeOff imports
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useAsync } from '@/hooks/use-async';
import OTPVerificationModal from '@/components/OTPVerificationModal';
import useAuthService from '@/services/authService';
import { useForgotPasswordMutation, useResetPasswordMutation } from '@/mutations/useAuthMutation';
import { formSchema } from '@/validationSchemas/forgetPassword.schema';



type FormValues = z.infer<typeof formSchema>;

const ForgotPassword = () => {
  const [isSubmitted, setIsSubmitted] = React.useState(false);
  const [showOTPModal, setShowOTPModal] = useState(false);
  const [email, setEmail] = useState('');
  const { loading, execute, ServerErrorModal } = useAsync();
  const [showResetForm, setShowResetForm] = useState(false);
  const { forgetpassword, resetPassword } = useAuthService();


  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
    },
  });

  const { sendForgotPasswordRequest, isPending, responseData } = useForgotPasswordMutation({
    handleForgotPassword: forgetpassword,
    form,
    onSuccessCallback: () => { setShowOTPModal(true), setIsSubmitted(true); }, // optional
    // setShowResetForm,
  });

  const {
    handleresetPassword,
    isPending: isResetting,
    forgetResponseData,
  } = useResetPasswordMutation({
    handleResetPassword: resetPassword,
    form,
    onSuccessCallback: () => {
      // router.push("/login");
    },
  });


  const resetPasswordFormSchema = z.object({
    password: z.string().min(8, { message: 'Password must be at least 8 characters' }),
    confirmPassword: z.string().min(8, { message: 'Password must be at least 8 characters' }),
  }).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  });

  const resetPasswordForm = useForm<z.infer<typeof resetPasswordFormSchema>>({
    resolver: zodResolver(resetPasswordFormSchema),
    defaultValues: {
      password: '',
      confirmPassword: '',
    },
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const onSubmit = (values: FormValues) => {
    setEmail(values.email);
    if (isPending) return;
    sendForgotPasswordRequest(values);
  };

  const handleOTPVerificationSuccess = (data: any) => {
    // console.log("OTP verification successful:", data);
    setShowOTPModal(false);
    setShowResetForm(true);
  };

  const handleResendOTP = () => {
    // In a real app, you would call your API to resend the OTP
    console.log("Resending OTP...");
  };

  const handleResetPassword = (data: z.infer<typeof resetPasswordFormSchema>) => {
    console.log(data)
    handleresetPassword({
      values: data,
      token: responseData, // insert actual token here, maybe from URL or props
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
            <div className="flex items-center">
              <Link
                to="/login"
                className="mr-2 rounded-full p-1 hover:bg-accent/10"
                aria-label="Back to login"
              >
                <ArrowLeft className="h-4 w-4" />
              </Link>
              <CardTitle className="text-2xl font-bold">Forgot Password</CardTitle>
            </div>
            <CardDescription>
              {!isSubmitted
                ? "Enter your email address and we'll send you a verification code"
                : showResetForm
                  ? "Enter your new password"
                  : "Check your email for a verification code"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {!isSubmitted ? (
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
                              placeholder="Enter your email, phone number or username"
                              type="email"
                              className="pl-9"
                              {...field}
                              disabled={isPending}
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button type="submit" className="w-full" disabled={isPending}>
                    {isPending ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Sending Code...
                      </>
                    ) : (
                      "Send Verification Code"
                    )}
                  </Button>
                </form>
              </Form>
            ) : showResetForm ? (
              <Form {...resetPasswordForm}>
                <form onSubmit={resetPasswordForm.handleSubmit(handleResetPassword)} className="space-y-4">
                  <FormField
                    control={resetPasswordForm.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>New Password</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Input
                              placeholder="Enter new password"
                              type={showPassword ? "text" : "password"}
                              className="pl-3 pr-9"
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
                  <FormField
                    control={resetPasswordForm.control}
                    name="confirmPassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Confirm Password</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Input
                              placeholder="Confirm your password"
                              type={showConfirmPassword ? "text" : "password"}
                              className="pl-3 pr-9"
                              {...field}
                              disabled={loading}
                            />
                            <button
                              type="button"
                              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                              className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
                              aria-label={showConfirmPassword ? "Hide password" : "Show password"}
                              disabled={loading}
                            >
                              {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
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
                        Resetting Password...
                      </>
                    ) : (
                      "Reset Password"
                    )}
                  </Button>
                </form>
              </Form>
            ) : (
              <div className="space-y-4">
                <div className="rounded-lg bg-muted p-4 text-center">
                  <p className="text-sm text-muted-foreground">
                    We've sent a verification code to your email. Please check your inbox and enter the code.
                  </p>
                </div>
                <Button
                  onClick={() => setShowOTPModal(true)}
                  className="w-full"
                >
                  Enter Verification Code
                </Button>
                <Button
                  onClick={() => setIsSubmitted(false)}
                  variant="outline"
                  className="w-full"
                >
                  Try another email
                </Button>
              </div>
            )}
          </CardContent>
          <CardFooter className="flex justify-center">
            <div className="text-center text-sm">
              Remember your password?{" "}
              <Link to="/login" className="underline underline-offset-4 hover:text-primary">
                Back to login
              </Link>
            </div>
          </CardFooter>
        </Card>
      </div>

      <OTPVerificationModal
        isOpen={showOTPModal}
        onOpenChange={setShowOTPModal}
        email={email}
        token={responseData}
        onVerificationSuccess={handleOTPVerificationSuccess}
        onResendOTP={handleResendOTP}
        purpose="password-reset"
      />

      <ServerErrorModal />
    </div>
  );
};

export default ForgotPassword;