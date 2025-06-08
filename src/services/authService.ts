import axios from 'axios';
import Config from '../Config/config';
import useAuthRequest from '@/hooks/useAuthRequest';

const useAuthService = () => {
    const { authGet, authPost, authPut } = useAuthRequest();

    // ✅ Login user
    const handlelogin = async (credentials: { emailOrPhone: string; password: string }) => {
        return await authPost(`${Config.API_GATEWAY}${Config.ENDPOINTS.AUTH}/login`, credentials);
    };

    // ✅ Register user
    const register = async (userData: object) => {
        return await authPost(`${Config.API_GATEWAY}${Config.ENDPOINTS.AUTH}/register`, userData);
    };

    // ✅ OTP Verification
    const verifyOtp = async (otp: string, purpose: string, token: any) => {
        axios.defaults.headers.common["Authorization"] = token;
        return await authPost(`${Config.API_GATEWAY}${Config.ENDPOINTS.AUTH}/otpverify`, { otp, purpose });
    };


    // ✅ Set/reset password
    const setPassword = async (passwordData: { password: string; token: string }) => {
        return await authPut(`${Config.API_GATEWAY}${Config.ENDPOINTS.AUTH}/setpassword`, passwordData);
    };

    // ✅ OTP Verification
    const forgetpassword = async (userData: object) => {
        return await authPost(`${Config.API_GATEWAY}${Config.ENDPOINTS.AUTH}/handleForget`, userData);
    };


    // ✅ Reset-Password
    const resetPassword = async (reserData: object, token: any) => {
        axios.defaults.headers.common["Authorization"] = token;
        return await authPost(`${Config.API_GATEWAY}${Config.ENDPOINTS.AUTH}/resetPassword`, reserData);
    };



    return { handlelogin, register, verifyOtp, setPassword, forgetpassword, resetPassword };
};

export default useAuthService;
