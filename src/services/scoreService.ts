import Config from '../Config/config';
import useAuthRequest from '@/hooks/useAuthRequest';

const useScoreService = () => {
    const { authGet, authPost, authPut } = useAuthRequest();

    // ✅ POST Requests
    const setScoring = async (scoreData: object) => {
        return await authPost(`${Config.API_GATEWAY}${Config.ENDPOINTS.SCORING}/setScoring`, scoreData);
    };

    const startScoring = async (scoreData: object) => {
        return await authPost(`${Config.API_GATEWAY}${Config.ENDPOINTS.SCORING}/startScoring`, scoreData);
    };

    const handlePlayerSelection = async (playerData: object) => {
        return await authPost(`${Config.API_GATEWAY}${Config.ENDPOINTS.SCORING}/handlePlayerSelection`, playerData);
    };

    const updateScore = async (scoreData: object) => {
        return await authPost(`${Config.API_GATEWAY}${Config.ENDPOINTS.SCORING}/score_update`, scoreData);
    };

    // ✅ PUT Requests
    const updateInning = async (id?: string, inningData?: object) => {
        return await authPut(`${Config.API_GATEWAY}${Config.ENDPOINTS.SCORING}/inning_update/${id || ''}`, inningData);
    };

    // ✅ GET Requests
    const getScore = async (id?: string) => {
        return await authGet(`${Config.API_GATEWAY}${Config.ENDPOINTS.SCORING}/getScore/${id || ''}`);
    };

    return {
        setScoring,
        startScoring,
        handlePlayerSelection,
        updateScore,
        updateInning,
        getScore
    };
};

export default useScoreService;
