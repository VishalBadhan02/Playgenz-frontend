import { useMutation } from "@tanstack/react-query";
import { useToast } from "../hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { ForgotPasswordMutationProps, LoginMutationProps, OTPVerifyProps, RegisterMutationProps, ResetPasswordMutationProps } from "../hooks/types";
import { useState } from "react";



export const useRegisterMutation = ({
    setRegistration,
    form,
    setRegistrationValues,
    setShowOTPModal,
}: RegisterMutationProps) => {
    const { toast } = useToast();

    const {
        mutate: registerData,
        isPending: isPending,
    } = useMutation({
        mutationFn: (values: object) => setRegistration(values),
        onSuccess: (res: any) => {

            const { status, message } = res;

            if (!res.status) {

                if (res?.message?.type === 'email') {
                    form.setError('email', {
                        type: 'manual',
                        message: message.message,
                    });
                } else if (res?.message?.type === 'phone') {
                    form.setError('phoneNumber', {
                        type: 'manual',
                        message: message.message,
                    });
                } else if (res?.message?.type === 'userName') {
                    form.setError('userName', {
                        type: 'manual',
                        message: message.message,
                    });
                } else {
                    toast({
                        variant: 'destructive',
                        title: 'Registration failed',
                        description: 'Please try again.',
                    });
                }
                return;
            }

            // Success logic
            setRegistrationValues(res.data);
            setShowOTPModal(true);

            toast({
                title: 'Registration Successful!',
                description: 'Please verify OTP.',
            });
        },
        onError: (error) => {
            toast({
                variant: 'destructive',
                title: 'Something went wrong.',
                description: 'Registration failed. Please check your input.',
            });
        },
    });

    return {
        registerData,
        isPending,
    };
};



export const useLoginMutation = ({ handlelogin, form }: LoginMutationProps) => {
    const { toast } = useToast();
    const { login } = useAuth();

    const {
        mutate: loginUser,
        isPending,
    } = useMutation({
        mutationFn: (values: any) => handlelogin(values),
        onSuccess: (res: any) => {
            const { status, message, data } = res;

            if (status === false) {
                // console.log("sfjkdnd")
                // console.log(message)
                if (message?.type === "email" || message?.type === "userName" || message?.type === "phoneNumber") {
                    // console.log("s")

                    form.setError("email", {
                        type: "manual",
                        message: message?.message,
                    });
                } else if (message?.type === "password") {
                    form.setError("password", {
                        type: "manual",
                        message: message?.message,
                    });
                } else {
                    toast({
                        variant: "destructive",
                        title: "Login Failed",
                        description: message?.message || "Invalid credentials.",
                    });
                }
                return;
            }

            // success
            login(data?.token);
            toast({
                title: "Login Successful!",
                description: "You are now logged in.",
            });
        },
        onError: () => {
            toast({
                variant: "destructive",
                title: "Something went wrong.",
                description: "Login failed. Please try again.",
            });
        },
    });

    return {
        loginUser,
        isPending,
    };
};



export const useForgotPasswordMutation = ({
    handleForgotPassword,
    form,
    onSuccessCallback,
}: ForgotPasswordMutationProps) => {
    const { toast } = useToast();
    const [responseData, setResponseData] = useState<any>(null); // <- NEW

    const {
        mutate: sendForgotPasswordRequest,
        isPending,
    } = useMutation({
        mutationFn: (values: any) => handleForgotPassword(values),
        onSuccess: (res: any) => {
            const { status, message, data } = res;

            if (!status) {
                if (message?.type === 'email' || message?.type === 'phone') {
                    form.setError('email', {
                        type: 'manual',
                        message: message?.message,
                    });
                } else {
                    toast({
                        variant: 'destructive',
                        title: 'Reset Failed',
                        description: message?.message || 'Unable to send reset instructions.',
                    });
                }
                return;
            }

            setResponseData(data); // <- SAVE TOKEN

            toast({
                title: 'Reset Link Sent!',
                description: 'Please check your inbox or SMS for the OTP or reset link.',
            });

            onSuccessCallback?.(); // optional callback, e.g., open OTP modal
        },
        onError: () => {
            toast({
                variant: 'destructive',
                title: 'Something went wrong.',
                description: 'Failed to send reset instructions. Please try again.',
            });
        },
    });

    return {
        sendForgotPasswordRequest,
        isPending,
        responseData, // <- RETURN IT
    };
};



export const useOTPVerificationMutation = ({
    handleVerifyOTP,
    form,
    onSuccessCallback,
}: OTPVerifyProps) => {
    const { toast } = useToast();

    const {
        mutate: verifyOTP,
        isPending,
    } = useMutation({
        mutationFn: (values: any) => handleVerifyOTP(values),
        onSuccess: (res: any) => {
            const { status, message } = res;

            if (!status) {
                if (message?.type === 'code') {
                    form.setError('code', {
                        type: 'manual',
                        message: message?.message,
                    });
                } else {
                    toast({
                        variant: 'destructive',
                        title: 'OTP Verification Failed',
                        description: message?.message || 'Invalid OTP or expired.',
                    });
                }
                return;
            }

            // ✅ OTP verified successfully
            toast({
                title: 'OTP Verified!',
                description: 'Your account has been verified.',
            });

            onSuccessCallback?.(); // Open next form, proceed to login, etc.
        },
        onError: () => {
            toast({
                variant: 'destructive',
                title: 'Something went wrong.',
                description: 'Failed to verify OTP. Please try again.',
            });
        },
    });

    return {
        verifyOTP,
        isPending,
    };
};




export const useResetPasswordMutation = ({
    handleResetPassword,
    form,
    onSuccessCallback,
}: ResetPasswordMutationProps) => {
    const { toast } = useToast();
    const [forgetResponseData, setForgetResponseData] = useState<any>(null);
    const { login } = useAuth();

    const {
        mutate: handleresetPassword,
        isPending,
    } = useMutation({
        mutationFn: ({ values, token }: { values: any; token: any }) =>
            handleResetPassword(values, token),
        onSuccess: (res: any) => {
            const { status, message, data } = res;

            if (!status) {
                if (message?.type === 'password') {
                    form.setError('password', {
                        type: 'manual',
                        message: message?.message,
                    });
                } else {
                    toast({
                        variant: 'destructive',
                        title: 'Reset Failed',
                        description: message?.message || 'Password reset failed.',
                    });
                }
                return;
            }

            setForgetResponseData(data);

            toast({
                title: 'Password Reset Successful!',
                description: 'You can now log in with your new password.',
            });
            login(data?.token);
            onSuccessCallback?.(); // e.g., redirect to login
        },
        onError: () => {
            toast({
                variant: 'destructive',
                title: 'Something went wrong.',
                description: 'Failed to reset password. Please try again.',
            });
        },
    });

    return {
        handleresetPassword,
        isPending,
        forgetResponseData,
    };
};

