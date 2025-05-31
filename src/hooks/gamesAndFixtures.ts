// src/hooks/useGamesAndFixtures.ts

import useTeamService from "@/services/teamService";
import { useQuery } from "@tanstack/react-query";

export const useGamesAndFixtures = () => {
    const { fetchGamesAndFixtures } = useTeamService();

    return useQuery({
        queryKey: ['games-fixtures'],
        queryFn: () => fetchGamesAndFixtures().then(res => res.data), // assuming response has a .data
    });
};
