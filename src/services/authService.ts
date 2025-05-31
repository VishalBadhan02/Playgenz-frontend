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
    const verifyOtp = async (otp: string, token: any) => {
        axios.defaults.headers.common["Authorization"] = token;
        return await authPost(`${Config.API_GATEWAY}${Config.ENDPOINTS.AUTH}/otpverify`, { otp });
    };

    // ✅ Set/reset password
    const setPassword = async (passwordData: { password: string; token: string }) => {
        return await authPut(`${Config.API_GATEWAY}${Config.ENDPOINTS.AUTH}/setpassword`, passwordData);
    };

    // ✅ Fetch Team Info
    const getTeam = async () => {
        return await authGet(`http://${Config.HOST}:${Config.PORT}/auth/getTeam`);
    };

    return { handlelogin, register, verifyOtp, setPassword, getTeam };
};

export default useAuthService;
