import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/contexts/AuthContext';
import { useAsync } from '@/hooks/use-async';
import OTPVerificationModal from '@/components/OTPVerificationModal';
import useAuthService from '@/services/authService';
import { useRegisterMutation } from '@/mutations/useAuthMutation';
import RegistrationForm from '@/components/forms/registrationForm';
import { registrationSchema } from '@/validationSchemas/registration.schema';


type FormValues = z.infer<typeof registrationSchema>;

const Registration = () => {
  const [showPassword, setShowPassword] = React.useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);
  const { login } = useAuth();
  const { register, verifyOtp } = useAuthService();
  const { execute, ServerErrorModal } = useAsync();

  // State for address auto-detection
  const [isLoadingLocation, setIsLoadingLocation] = useState(false);

  // State for OTP verification
  const [showOTPModal, setShowOTPModal] = useState(false);
  const [registrationValues, setRegistrationValues] = useState<FormValues | null>(null);

  const form = useForm<FormValues>({
    resolver: zodResolver(registrationSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      userName: '',
      email: '',
      phoneNumber: '',
      address: '',
      password: '',
      confirmPassword: '',
    },
  });

  const { registerData, isPending } = useRegisterMutation({
    setRegistration: register, // the API call function
    form,
    setRegistrationValues,
    setShowOTPModal,
  });

  const onSubmit = (values: FormValues) => {
    registerData(values);
  };



  const handleVerificationSuccess = (authToken: any) => {
    // Close the OTP modal
    setShowOTPModal(false);

    if (!registrationValues) return;

    // Now proceed with the actual registration
    execute(
      // This is a mock promise that would typically be an API call
      new Promise((resolve, reject) => {
        // Simulate random success/failure for demo
        setTimeout(() => {
          if (Math.random() > 0.2) { // 80% success rate
            resolve(authToken);
          } else {
            // reject(new Error('Failed to register. Server error.'));
          }
        }, 1500); // Simulate network delay
      }).then((token) => {
        login(authToken);
        return token;
      }),
      {
        successMessage: "Account created successfully!",
        errorMessage: "Failed to create account. Please try again.",
        showErrorModal: true,
      }
    );
  };

  const handleResendOTP = () => {
    // In a real app, you would call your API to resend the OTP
    console.log("Resending OTP...");
  }

  const detectLocation = () => {
    setIsLoadingLocation(true);

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;

          // Use a reverse geocoding API to get the address (simulated here)
          // In a real app, you would make an API call to a geocoding service
          setTimeout(() => {
            const mockAddress = "123 Main St, Anytown, CA 94321";
            form.setValue('address', mockAddress);
            setIsLoadingLocation(false);
          }, 1000);
        },
        (error) => {
          console.error("Error getting location:", error);
          setIsLoadingLocation(false);
          // Show an error toast
        }
      );
    } else {
      setIsLoadingLocation(false);
      console.error("Geolocation is not supported by this browser");
      // Show an error toast
    }
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
            <CardTitle className="text-2xl font-bold text-center">Create an account</CardTitle>
            <CardDescription className="text-center">
              Enter your information to create an account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <RegistrationForm
              form={form}
              onSubmit={onSubmit}
              isPending={isPending}
              detectLocation={detectLocation}
              isLoadingLocation={isLoadingLocation}
              showPassword={showPassword}
              setShowPassword={setShowPassword}
              showConfirmPassword={showConfirmPassword}
              setShowConfirmPassword={setShowConfirmPassword}
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
              Already have an account?{" "}
              <Link to="/login" className="underline underline-offset-4 hover:text-primary">
                Login
              </Link>
            </div>
          </CardFooter>
        </Card>
      </div>
      <ServerErrorModal />

      {registrationValues && (
        <OTPVerificationModal
          isOpen={showOTPModal}
          onOpenChange={setShowOTPModal}
          email={registrationValues.email}
          token={registrationValues.token}
          onVerificationSuccess={handleVerificationSuccess}
          onResendOTP={handleResendOTP}
          purpose="registration"
        />
      )}
    </div>
  );
};

export default Registration;
