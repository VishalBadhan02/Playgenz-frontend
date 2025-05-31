import axios from 'axios';
import Config from '../Config/config';
import useAuthRequest from '@/hooks/useAuthRequest';

const useTournamentService = () => {
    const { authGet, authPost, authPut } = useAuthRequest();

    // ✅ POST Requests
    const registerTournament = async (tournamentData: object) => {
        return await authPost(`${Config.API_GATEWAY}${Config.ENDPOINTS.TOURNAMENT}/tournamentRegister`, tournamentData);
    };

    const setEntry = async (entryData: object) => {
        return await authPost(`${Config.API_GATEWAY}${Config.ENDPOINTS.TOURNAMENT}/setEntry`, entryData);
    };

    const setFixtures = async (fixturesData: object) => {
        return await authPost(`${Config.API_GATEWAY}${Config.ENDPOINTS.TOURNAMENT}/setFixtures`, fixturesData);
    };

    const loginTournament = async (loginData: object) => {
        return await authPost(`${Config.API_GATEWAY}${Config.ENDPOINTS.TOURNAMENT}/login`, loginData);
    };

    // ✅ PUT Requests
    const updateWinner = async (winnerData: object) => {
        return await authPut(`${Config.API_GATEWAY}${Config.ENDPOINTS.TOURNAMENT}/updateWinner`, winnerData);
    };

    const deleteTeam = async (teamData: object) => {
        return await authPut(`${Config.API_GATEWAY}${Config.ENDPOINTS.TOURNAMENT}/deleteTeam`, teamData);
    };

    const updateTournamentTeam = async (teamData: object) => {
        return await authPut(`${Config.API_GATEWAY}${Config.ENDPOINTS.TOURNAMENT}/updateTournamentTeam`, teamData);
    };

    // ✅ GET Requests
    const fetchTournamentTeams = async (id: string) => {
        return await authGet(`${Config.API_GATEWAY}${Config.ENDPOINTS.TOURNAMENT}/setTeams/${id || ''}`);
    };

    const getFixtureData = async (id?: string, round?: number) => {
        return await authGet(`${Config.API_GATEWAY}${Config.ENDPOINTS.TOURNAMENT}/setFixtureData/${id || ''}/${round}`);
    };

    const getTournaments = async (id: string) => {
        return await authGet(`${Config.API_GATEWAY}${Config.ENDPOINTS.TOURNAMENT}/getTournamnets/${id}`);
    };

    const fetchTournament = async () => {
        return await authGet(`${Config.API_GATEWAY}${Config.ENDPOINTS.TOURNAMENT}/gettournament`);
    };

    const getUserRegisteredTournament = async () => {
        return await authGet(`${Config.API_GATEWAY}${Config.ENDPOINTS.TOURNAMENT}/getUserRegisteredTournament`);
    };

    return {
        registerTournament,
        setEntry,
        setFixtures,
        loginTournament,
        updateWinner,
        deleteTeam,
        updateTournamentTeam,
        fetchTournamentTeams,
        getFixtureData,
        getTournaments,
        fetchTournament,
        getUserRegisteredTournament
    };
};

export default useTournamentService;
