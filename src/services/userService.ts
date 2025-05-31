import Config from '../Config/config';
import useAuthRequest from '@/hooks/useAuthRequest';

const useUserService = () => {
    const { authGet, authPost, authPut, authDelete } = useAuthRequest();

    // ✅ GET Requests
    const getProfile = async (id: string) => {
        return await authGet(`${Config.API_GATEWAY}${Config.ENDPOINTS.USER}/getProfile/${id}`);
    };

    const getFriends = async (query: string) => {
        return await authGet(`${Config.API_GATEWAY}${Config.ENDPOINTS.USER}/searching?q=${query}`);
    };

    const getCountry = async () => {
        return await authGet(`${Config.API_GATEWAY}${Config.ENDPOINTS.USER}/getcountry`);
    };

    const getState = async (country: string) => {
        return await authGet(`${Config.API_GATEWAY}${Config.ENDPOINTS.USER}/getstate/${country}`);
    };

    const getCity = async (state: string) => {
        return await authGet(`${Config.API_GATEWAY}${Config.ENDPOINTS.USER}/getcity/${state}`);
    };

    const getUserFriends = async (t: string, id: string) => {
        return await authGet(`${Config.API_GATEWAY}${Config.ENDPOINTS.USER}/userFriends/${t}/${id}`);
    };

    const getPlayingFriends = async () => {
        return await authGet(`${Config.API_GATEWAY}${Config.ENDPOINTS.USER}/playingOnes`);
    };

    const getChat = async (conversationId: string) => {
        return await authGet(`${Config.API_GATEWAY}${Config.ENDPOINTS.USER}/getChat/${conversationId}`);
    };


    // ✅ POST Requests
    const sendFriendRequest = async (friendId: any) => {
        return await authPost(`${Config.API_GATEWAY}${Config.ENDPOINTS.USER}/friendRequest`, { request: friendId });
    };

    const postMessage = async (messageData: object) => {
        return await authPost(`${Config.API_GATEWAY}${Config.ENDPOINTS.USER}/postMessage`, messageData);
    };


    // ✅ DELETE Requests
    const handleDelete = async (_id: any) => {
        return await authDelete(`${Config.API_GATEWAY}${Config.ENDPOINTS.USER}/deleteFriendRequest`, { _id });
    };


    // ✅ PUT Requests
    const handleApproval = async (approvalData: any) => {
        return await authPut(`${Config.API_GATEWAY}${Config.ENDPOINTS.USER}/approvalRequest`, { approvalData });
    };

    const updateProfile = async (profileData: FormData) => {
        return await authPut(`${Config.API_GATEWAY}${Config.ENDPOINTS.USER}/updateProfile`, profileData);
    };

    return {
        getProfile,
        getCountry,
        getState,
        getCity,
        getFriends,
        getUserFriends,
        getPlayingFriends,
        getChat,
        sendFriendRequest,
        postMessage,
        handleDelete,
        handleApproval,
        updateProfile
    };
};

export default useUserService;

