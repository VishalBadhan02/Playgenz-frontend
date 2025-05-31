import axios from 'axios';
import Config from '../Config/config';
import useAuthRequest from '@/hooks/useAuthRequest';


const useNotificationService = () => {
    const { authGet, authPost, authPut, authDelete } = useAuthRequest();

    // Fetch all notifications
    const getNotifications = async () => {
        return await authGet(`${Config.API_GATEWAY}${Config.ENDPOINTS.NOTIFICATION}/getNotification`);
    };

    // Approve or decline a request
    const handleRequest = async (_id: string, action: string) => {
        return await authPut(`${Config.API_GATEWAY}${Config.ENDPOINTS.NOTIFICATION}/handleRequest`, {
            _id, action
        });
    };

    // Delete a notification
    const deleteNotification = async (_id: string, type: string) => {
        return await authDelete(`http://${Config.HOST}:${Config.PORT}/user/deleteRequest`, {
            _id,
            type,
        });
    };



    return { getNotifications, handleRequest, deleteNotification };
};

export default useNotificationService;
