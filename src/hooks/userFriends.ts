import useUserService from '@/services/userService';
import { useQuery } from '@tanstack/react-query';

export const useFriends = () => {
    const { getUserFriends } = useUserService();

    return useQuery({
        queryKey: ['userFriends'],
        queryFn: () => getUserFriends("m", "").then(res => res.data),
    });
};
