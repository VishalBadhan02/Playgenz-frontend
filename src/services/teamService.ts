import useAuthRequest from '@/hooks/useAuthRequest';
import Config from '../Config/config';

const useTeamService = () => {
    const { authGet, authPost, authPut, authDelete } = useAuthRequest();

    const registerTeam = async (data: object) => {
        return await authPost(`${Config.API_GATEWAY}${Config.ENDPOINTS.TEAM}/teamRegistration`, data)
    }

    // ✅ Get a team's details by ID
    const getTeamDetails = async (id: string) => {
        return await authGet(`${Config.API_GATEWAY}${Config.ENDPOINTS.TEAM}/getTeamProfile/${id}`);
    };

    // ✅ Remove a player from the team
    const handlePlayerUpdates = async (_id: string, teamId: string, type: string) => {
        const data = { _id, teamId, type }
        return await authDelete(`${Config.API_GATEWAY}${Config.ENDPOINTS.TEAM}/removePlayer`, data);
    };

    const fetchGamesAndFixtures = async () => {
        return await authGet(`${Config.API_GATEWAY}${Config.ENDPOINTS.TEAM}/fetchGamesAndFixtures`);
    };

    const handleAddPlayer = async (data: object) => {
        return await authPut(`${Config.API_GATEWAY}${Config.ENDPOINTS.TEAM}/handleAddPlayer`,
            data
        );
    };

    // ✅ Get teams based on game type
    const fetchTeams = async (game: string) => {
        return await authGet(`${Config.API_GATEWAY}${Config.ENDPOINTS.TEAM}/fetchTeams/${game}`);
    };

    // API to update teamDetails 
    const updateTeamDetails = async (team: object) => {
        return await authPut(`${Config.API_GATEWAY}${Config.ENDPOINTS.TEAM}/updateTeam`, team);
    };

    // ✅ Handle match requests (Challenge another team)
    const handleChallenge = async (data: object) => {
        return await authPost(`${Config.API_GATEWAY}${Config.ENDPOINTS.TEAM}/handleRequest`, data);
    };

    // ✅ Fetch all matches
    const fetchMatches = async () => {
        return await authGet(`${Config.API_GATEWAY}${Config.ENDPOINTS.TEAM}/matches`);
    };

    // ✅ Get details of two teams (optional params)
    const getTeamComparison = async (teamA?: string, teamB?: string) => {
        return await authGet(`http://${Config.HOST}:${Config.PORT}/team/getTeam/${teamA || ''}/${teamB || ''}`);
    };




    // ✅ Fetch scorecards
    const getScoreCards = async () => {
        return await authGet(`http://${Config.HOST}:${Config.PORT}/team/scoreCards`);
    };

    // ✅ Update team details


    // ✅ Set an active team
    const setActiveTeam = async (teamId: string, teamName: string, logo: string, address: string) => {
        return await authPut(`http://${Config.HOST}:${Config.PORT}/team/setActiveTeam`, {
            teamId, teamName, logo, address
        });
    };



    // ✅ Handle scoring updates
    const handleScoreUpdate = async (data: object) => {
        return await authPut(`http://${Config.HOST}:${Config.PORT}/team/handleScore`, data);
    };



    return {
        getTeamDetails,
        fetchTeams,
        getTeamComparison,
        fetchMatches,
        getScoreCards,
        updateTeamDetails,
        setActiveTeam,
        handleChallenge,
        handleScoreUpdate,
        handlePlayerUpdates,
        registerTeam,
        handleAddPlayer,
        fetchGamesAndFixtures
    };
};

export default useTeamService;



