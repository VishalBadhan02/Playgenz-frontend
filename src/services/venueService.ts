import axios from 'axios';
import Config from '../Config/config';
import useAuthRequest from '@/hooks/useAuthRequest';

const useVenueService = () => {
    const { authGet, authPost } = useAuthRequest();

    // ✅ GET Requests
    const fetchVenues = async () => {
        return await authGet(`${Config.API_GATEWAY}${Config.ENDPOINTS.VENUE}/getVenue`);
    };

    const getBookingDetails = async (bookingId: string) => {
        return await authGet(`${Config.API_GATEWAY}${Config.ENDPOINTS.VENUE}/booking/${bookingId}`);
    };

    const getSingleVenue = async (id: string) => {
        return await authGet(`${Config.API_GATEWAY}${Config.ENDPOINTS.VENUE}/setSingleVenue/${id}`);
    };

    // ✅ POST Requests
    const registerVenue = async (venueData: object) => {
        return await authPost(`${Config.API_GATEWAY}${Config.ENDPOINTS.VENUE}/register`, venueData);
    };

    return {
        fetchVenues,
        getBookingDetails,
        getSingleVenue,
        registerVenue
    };
};

export default useVenueService;
