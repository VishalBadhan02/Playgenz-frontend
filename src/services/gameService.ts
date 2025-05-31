import axios from 'axios';
import Config from '../Config/config';
import useAuthRequest from '@/hooks/useAuthRequest';

const useLinkService = () => {
    const { authGet } = useAuthRequest();

    // ✅ GET Requests
    const getSidebar = async () => {
        return await authGet(`http://${Config.HOST}:${Config.PORT}/links/sideBar`);
    };

    const setIncrement = async () => {
        return await authGet(`http://${Config.HOST}:${Config.PORT}/links/setIncriment`);
    };

    const getCollege = async (code: string) => {
        return await authGet(`http://${Config.HOST}:${Config.PORT}/links/college/${code}`);
    };

    return {
        getSidebar,
        setIncrement,
        getCollege
    };
};

export default useLinkService;
