import { useMutation } from "@tanstack/react-query";
import { useToast } from "./use-toast";

interface RegisterMutationProps {
    setRegistration: (data: any) => Promise<any>;
    form: any;
    setRegistrationValues: (data: any) => void;
    setShowOTPModal: (show: boolean) => void;
}

export const useRegisterMutation = ({
    setRegistration,
    form,
    setRegistrationValues,
    setShowOTPModal,
}: RegisterMutationProps) => {
    const { toast } = useToast();

    const {
        mutate: registerData,
        isPending: isSendingInvite,
    } = useMutation({
        mutationFn: (values: object) => setRegistration(values),
        onSuccess: (res: any) => {
            const { status, message } = res;

            if (!status) {
                if (message?.type === 'email') {
                    form.setError('email', {
                        type: 'manual',
                        message: message.message,
                    });
                } else if (message?.type === 'phone') {
                    form.setError('phoneNumber', {
                        type: 'manual',
                        message: message.message,
                    });
                } else if (message?.type === 'username') {
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
        onError: () => {
            toast({
                variant: 'destructive',
                title: 'Something went wrong.',
                description: 'Registration failed. Please check your input.',
            });
        },
    });

    return {
        registerData,
        isSendingInvite,
    };
};
