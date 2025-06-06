
import React, { useState, useEffect } from 'react';
import { Check, Loader2, Mail, Timer, RefreshCcw } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { useAsync } from '@/hooks/use-async';
import useAuthService from '@/services/authService';

interface OTPVerificationModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  email: string;
  token: any;
  onVerificationSuccess: (authToken: any) => void;
  onResendOTP: () => void;
  purpose: 'registration' | 'password-reset';
}

const OTPVerificationModal: React.FC<OTPVerificationModalProps> = ({
  isOpen,
  onOpenChange,
  email,
  token,
  onVerificationSuccess,
  onResendOTP,
  purpose
}) => {
  const [otp, setOtp] = useState<string>('');
  const [timeLeft, setTimeLeft] = useState<number>(60);
  const [canResend, setCanResend] = useState<boolean>(false);
  const { loading, execute, error } = useAsync();
  const [verificationStatus, setVerificationStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const { verifyOtp } = useAuthService();

  // Start countdown timer when modal opens
  useEffect(() => {
    if (isOpen && timeLeft > 0) {
      const timerId = setTimeout(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);

      return () => clearTimeout(timerId);
    } else if (timeLeft === 0) {
      setCanResend(true);
    }
  }, [timeLeft, isOpen]);

  // Reset states when modal is opened
  useEffect(() => {
    if (isOpen) {
      setOtp('');
      setVerificationStatus('idle');
    }
  }, [isOpen]);

  const handleVerifyOTP = () => {
    if (otp.length !== 4) return;


    execute(
      verifyOtp(otp, purpose, token).then((res) => {
        console.log("OTP verification response:", res);
        if (res.status === 401) {
          setVerificationStatus('error');
          throw new Error('Invalid OTP. Please try again.');
        }
        if (res.status === 403) {
          setVerificationStatus('error');
          throw new Error('OTP expired. Please request a new one.');
        }
        if (res.status === 500) {
          setVerificationStatus('error');
          throw new Error('Server error. Please try again later.');
        }
        if (res.status === 502) {
          setVerificationStatus('error');
          throw new Error('Bad Gateway. Please try again later.');
        }
        if (!res.status) {
          setVerificationStatus('error');
          throw new Error('OTP verification failed. Please try again.');
        }

        // Success logic
        setVerificationStatus('success');
        onVerificationSuccess(res.data.token);
        return res.data.token;
      }),
      {
        successMessage: "OTP verified successfully!",
        errorMessage: "OTP verification failed. Please try again.",
        showErrorModal: true,
      }
    )
  };

  const handleResendOTP = () => {
    setCanResend(false);
    setTimeLeft(60);
    onResendOTP();
  };

  const getDialogTitle = () => {
    if (purpose === 'registration') {
      return "Verify Your Email";
    }
    return "Verify OTP";
  };

  const getDialogDescription = () => {
    if (purpose === 'registration') {
      return `We've sent a verification code to ${email}. Please enter it below to verify your account.`;
    }
    return `Enter the 6-digit OTP sent to ${email} to reset your password.`;
  };

  const renderFooter = () => {
    if (verificationStatus === 'success') {
      return (
        <div className="mt-6 flex items-center justify-center">
          <div className="flex items-center gap-2 text-sm font-medium text-green-600">
            <Check className="h-5 w-5" />
            {purpose === 'registration' ? 'Email verified successfully!' : 'OTP verified successfully!'}
          </div>
        </div>
      );
    }

    return (
      <div className="mt-6 space-y-4">
        <Button
          className="w-full"
          onClick={handleVerifyOTP}
          disabled={otp.length !== 4 || loading}
        >
          {loading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Verifying...
            </>
          ) : (
            'Verify OTP'
          )}
        </Button>

        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <div className="flex items-center gap-1">
            <Timer className="h-3 w-3" />
            {canResend ? (
              <span>Time expired</span>
            ) : (
              <span>{timeLeft} seconds remaining</span>
            )}
          </div>

          <Button
            variant="ghost"
            size="sm"
            className="h-auto p-0 text-xs font-medium"
            disabled={!canResend || loading}
            onClick={handleResendOTP}
          >
            <RefreshCcw className="mr-1 h-3 w-3" />
            Resend OTP
          </Button>
        </div>
      </div>
    );
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[400px]">
        <DialogHeader>
          <DialogTitle>{getDialogTitle()}</DialogTitle>
          <DialogDescription>{getDialogDescription()}</DialogDescription>
        </DialogHeader>

        <div className="flex flex-col items-center justify-center py-4">
          <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-primary/10">
            <Mail className="h-10 w-10 text-primary" />
          </div>

          <InputOTP
            maxLength={4}
            value={otp}
            onChange={(value) => setOtp(value)}
            disabled={loading || verificationStatus === 'success'}
          >
            <InputOTPGroup>
              <InputOTPSlot index={0} />
              <InputOTPSlot index={1} />
              <InputOTPSlot index={2} />
              <InputOTPSlot index={3} />
              {/* <InputOTPSlot index={4} />
              <InputOTPSlot index={5} /> */}
            </InputOTPGroup>
          </InputOTP>

          {error && (
            <p className="mt-2 text-sm text-destructive">{error.message}</p>
          )}
        </div>

        {renderFooter()}
      </DialogContent>
    </Dialog>
  );
};

export default OTPVerificationModal;
