export interface ForgotPasswordMutationProps {
    handleForgotPassword: (data: any) => Promise<any>;
    form: any;
    onSuccessCallback?: () => void; // optional, in case you want to open a modal or redirect
    // setShowOTPModal: any;
}


export interface LoginMutationProps {
    handlelogin: (data: any) => Promise<any>;
    form: any;
}


export interface RegisterMutationProps {
    setRegistration: (data: any) => Promise<any>;
    form: any;
    setRegistrationValues: (data: any) => void;
    setShowOTPModal: (show: boolean) => void;
}

export interface OTPVerifyProps {
    handleVerifyOTP: (values: any) => Promise<any>;
    form: any;
    onSuccessCallback?: () => void;
}


export interface ResetPasswordMutationProps {
    handleResetPassword: (values: any, token: any) => Promise<any>;
    form: any;
    onSuccessCallback?: () => void;
}