import React, { createContext, useContext, useEffect, useRef, useState } from 'react';
import {
    SportType,
    Match,
    UniversalScorecardData,
    CricketScorecardData,
    Player,
    ScorecardEvent,
    BattingCard,
    BowlingCard,
    DismissalType
} from '../components/types/scorecard';
import {
    mockUniversalScorecard,
    mockCricketScorecard,
    getMatchData,
} from '../components/data/mockData';
import { toast } from '../hooks/use-toast';
import WebSocketManager from '@/webSocketServices/scoringService';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import useScoreService from '@/services/scoreService';
import { applyNestedUpdates } from '@/util/applyNestedUpdates';

interface ScorecardContextType {
    selectedSport: SportType;
    setSelectedSport: (sport: SportType) => void;
    universalScorecard: UniversalScorecardData;
    cricketScorecard: CricketScorecardData;
    updateUniversalScore: (team: 'home' | 'away', increment: number) => void;
    updateCricketScore: (runs: number, isExtra?: boolean, extraType?: string) => void;
    addPlayerToTeam: (team: 'home' | 'away', player: Player) => void;
    addEvent: (type: string, team: 'home' | 'away', player?: Player, description?: string) => void;
    setCustomMatch: (match: Match) => void;
    dismissBatsman: (batterIndex: number, dismissalType: DismissalType, bowlerIndex?: number, fielderIndex?: number) => void;
    selectBowler: (bowlerIndex: number) => void;
    selectBatsman: (playerIndex: number, asStriker: boolean) => void;
    pauseMatch: (isPaused: boolean) => void;
    undoLastAction: () => void;
    addExtras: (extraType: string, runs: number) => void;
    setCricketTossWinner: (team: 'home' | 'away', choice: 'bat' | 'bowl', playerSettigns: object) => void;
    isLoading: any;
    isError: any,   // Added here
    error: any,
}

const ScorecardContext = createContext<ScorecardContextType | undefined>(undefined);

export const ScorecardProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [selectedSport, setSelectedSport] = useState<SportType>('football');
    const [universalScorecard, setUniversalScorecard] = useState<UniversalScorecardData>(mockUniversalScorecard);
    const [cricketScorecard, setCricketScorecard] = useState<CricketScorecardData>();
    // const [cricketScorecard, setCricketScorecard] = useState<CricketScorecardData>(mockCricketScorecard);
    const [actionsHistory, setActionsHistory] = useState<Array<{ action: string, data: any }>>([]);
    const [matchPaused, setMatchPaused] = useState(false);
    const socketRef = useRef<WebSocketManager | null>(null);
    const { id } = useParams<{ id: string }>();
    const { getScore } = useScoreService();

    useEffect(() => {
        fetchScorecard();
        ScoketConnection();
        return () => {
            if (socketRef.current) {
                socketRef.current.disconnect();
                socketRef.current = null;
            }
        };
    }, [id])


    const ScoketConnection = () => {
        try {
            if (socketRef.current) {
                socketRef.current.disconnect();
            }
            socketRef.current = new WebSocketManager(id);
            socketRef.current.connect();

            socketRef.current.subscribeToUpdates = (data: any) => {
                handleScoreUpdate(data?.scorecard)
            };
        } catch (error) {
            throw error;
        }
    }

    const {
        data: scoredata,
        isLoading: scoreloading,
        isError: scoreisError,
        error: scoreError,
        refetch
    } = useQuery({
        queryKey: ['scoring-data', id],
        queryFn: () => getScore(id),
        enabled: !!id,
    });

    const fetchScorecard = async () => {
        if (!scoredata) {
            refetch();
        }
        // console.log(scoredata?.data)
        setCricketScorecard(scoredata?.data)
    }

    const handleScorecardUpdates = async (scoreData: object, route: string) => {
        try {
            socketRef.current.sendScoreUpdate(scoreData, route)
        } catch (error) {
            throw error;
        }
    }

    // Update universal scorecard (football, hockey, etc.)
    const updateUniversalScore = (team: 'home' | 'away', increment: number) => {
        setUniversalScorecard(prev => {
            const newScore = { ...prev.score };
            newScore[team] += increment;

            // Ensure score doesn't go negative
            if (newScore[team] < 0) newScore[team] = 0;

            // Add an event for scoring
            const newEvent: ScorecardEvent = {
                id: `event-${Date.now()}`,
                type: 'goal',
                team,
                minute: prev.timeElapsed,
                periodNumber: prev.currentPeriod,
                description: `Goal for ${team === 'home' ? prev.match.teams.home.name : prev.match.teams.away.name}`,
            };

            return {
                ...prev,
                score: newScore,
                events: increment > 0 ? [...prev.events, newEvent] : prev.events
            };
        });

        if (increment > 0) {
            toast({
                title: "Score Updated",
                description: `Goal added for the ${team} team!`,
                duration: 3000,
            });
        }
    };

    const handleScoreUpdate = (scoreData: CricketScorecardData) => {
        console.log("scoreData", scoreData)
        // Update the scorecard with the new data
        setCricketScorecard(prev => applyNestedUpdates(prev, scoreData));
    }


    // Update cricket scorecard
    const updateCricketScore = (runs: number, isExtra: boolean = false, extraType: string = '') => {
        if (matchPaused) {
            toast({
                title: "Match Paused",
                description: "Cannot update score while match is paused",
                variant: "destructive"
            });
            return;
        }

        const scoreData = {
            runs,
            isExtra,
            extraType
        }

        handleScorecardUpdates(scoreData, "scoreUpdate")

        // setCricketScorecard(prev => {
        //     // Store current state for undo functionality
        //     const currentState = { ...prev };
        //     setActionsHistory(history => [...history, {
        //         action: 'updateScore',
        //         data: currentState
        //     }]);

        //     // Calculate the new score
        //     const newRuns = prev.score.batting.runs + runs;
        //     const newOvers = isExtra && (extraType === 'wide' || extraType === 'noBall')
        //         ? prev.score.batting.overs
        //         : Math.floor(prev.score.batting.overs) + ((prev.score.batting.overs * 10) % 10 + 1) / 10;

        //     // Update extras if needed
        //     const newExtras = { ...prev.score.batting.extras };
        //     if (isExtra) {
        //         switch (extraType) {
        //             case 'wide': newExtras.wide += 1; break;
        //             case 'noBall': newExtras.noBall += 1; break;
        //             case 'byes': newExtras.byes += runs; break;
        //             case 'legByes': newExtras.legByes += runs; break;
        //             case 'penalty': newExtras.penalty += runs; break;
        //         }
        //     }

        //     // Update the current batsman's stats
        //     const striker = prev.currentBatsmen.striker;
        //     if (striker && !isExtra) {
        //         striker.runs += runs;
        //         striker.balls += 1;
        //         if (runs === 4) striker.fours += 1;
        //         if (runs === 6) striker.sixes += 1;
        //         striker.strikeRate = +(striker.runs / striker.balls * 100).toFixed(2);
        //     }

        //     // Update current run rate
        //     const newRunRate = +(newRuns / newOvers).toFixed(2);

        //     // Update the current partnership
        //     const newPartnership = {
        //         runs: prev.partnership.runs + runs,
        //         balls: prev.partnership.balls + (isExtra && (extraType === 'wide' || extraType === 'noBall') ? 0 : 1)
        //     };

        //     return {
        //         ...prev,
        //         score: {
        //             ...prev.score,
        //             batting: {
        //                 ...prev.score.batting,
        //                 runs: newRuns,
        //                 overs: +newOvers.toFixed(1),
        //                 extras: newExtras
        //             }
        //         },
        //         currentRunRate: newRunRate,
        //         partnership: newPartnership,
        //         // Update battingOrder with the updated striker
        //         battingOrder: striker ? {
        //             ...prev.battingOrder,
        //             [prev.score.batting.team.id]: prev.battingOrder[prev.score.batting.team.id].map(
        //                 batter => batter.player.id === striker.player.id ? striker : batter
        //             )
        //         } : prev.battingOrder
        //     };
        // });

        toast({
            title: "Score Updated",
            description: `${runs} run${runs !== 1 ? 's' : ''} added${isExtra ? ` (${extraType})` : ''}`,
            duration: 3000,
        });
    };

    // Add extras (byes, leg byes, penalties)
    const addExtras = (extraType: string, runs: number) => {
        if (matchPaused) {
            toast({
                title: "Match Paused",
                description: "Cannot update extras while match is paused",
                variant: "destructive"
            });
            return;
        }

        updateCricketScore(runs, true, extraType);
    };

    // Set toss winner and choice for cricket
    const setCricketTossWinner = (team: 'home' | 'away', choice: 'bat' | 'bowl', playerSettigns: object) => {
        setCricketScorecard(prev => {
            // Define which team is batting and which is bowling based on the toss result
            const battingTeamKey = choice === 'bat' ? team : (team === 'home' ? 'away' : 'home');
            const bowlingTeamKey = choice === 'bowl' ? team : (team === 'home' ? 'away' : 'home');

            // Get the actual team objects
            const battingTeam = battingTeamKey === 'home' ? prev.match.teams.home : prev.match.teams.away;
            const bowlingTeam = bowlingTeamKey === 'home' ? prev.match.teams.home : prev.match.teams.away;



            // Update the match info
            const updatedMatchInfo = {
                ...prev.match,
                toss: {
                    winner: team === 'home' ? prev.match.teams.home : prev.match.teams.away,
                    decision: choice
                }
            };

            const tossData = {
                battingTeam: battingTeamKey === 'home' ? prev.match.teams.home : prev.match.teams.away,
                bowlingTeam: bowlingTeamKey === 'home' ? prev.match.teams.home : prev.match.teams.away,
                toss: {
                    winner: team === 'home' ? prev.match.teams.home : prev.match.teams.away,
                    decision: choice
                },
                playerSettigns
            }

            handleScorecardUpdates(tossData, "matchsetup")

            // console.log("updatedMatchInfo", updatedMatchInfo)
            // Update the score object with new batting and bowling teams
            const updatedScore = {
                ...prev.score,
                batting: {
                    ...prev.score.batting,
                    team: battingTeam
                },
                bowling: {
                    ...prev.score.bowling,
                    team: bowlingTeam
                }
            };

            // console.log("updatedScore", updatedScore)
            // console.log("bowlingTeam", bowlingTeam)

            // console.log("updatedScore", updatedScore)

            // Store this action for potential undo
            const currentState = { ...prev };
            setActionsHistory(history => [...history, {
                action: 'setTossWinner',
                data: currentState
            }]);

            return {
                ...prev,
                match: updatedMatchInfo,
                score: updatedScore
            };
        });
    };

    // Dismiss a batsman
    const dismissBatsman = (batterIndex: number, dismissalType: DismissalType, bowlerIndex?: number, fielderIndex?: number) => {
        if (matchPaused) {
            toast({
                title: "Match Paused",
                description: "Cannot dismiss batsman while match is paused",
                variant: "destructive"
            });
            return;
        }

        setCricketScorecard(prev => {
            // Store current state for undo functionality
            const currentState = { ...prev };
            setActionsHistory(history => [...history, {
                action: 'dismissBatsman',
                data: currentState
            }]);

            const battingTeamId = prev.score.batting.team.id;
            const bowlingTeamId = prev.score.bowling.team.id;

            // Get the player being dismissed
            const battingOrder = [...prev.battingOrder[battingTeamId]];
            const dismissedBatter = { ...battingOrder[batterIndex] };

            // Get bowler and fielder if provided
            const bowler = bowlerIndex !== undefined ?
                prev.bowlingStats[bowlingTeamId][bowlerIndex].player : undefined;

            const fielder = fielderIndex !== undefined ?
                prev.match.teams.away.players.find(p => p.id === prev.bowlingStats[bowlingTeamId][fielderIndex]?.player.id) : undefined;

            // Create dismissal description
            let description = '';
            switch (dismissalType) {
                case 'bowled':
                    description = `b ${bowler?.name || 'Unknown'}`;
                    break;
                case 'caught':
                    description = `c ${fielder?.name || 'Unknown'} b ${bowler?.name || 'Unknown'}`;
                    break;
                case 'lbw':
                    description = `lbw b ${bowler?.name || 'Unknown'}`;
                    break;
                case 'stumped':
                    description = `st ${fielder?.name || 'Unknown'} b ${bowler?.name || 'Unknown'}`;
                    break;
                case 'runOut':
                    description = `run out (${fielder?.name || 'Unknown'})`;
                    break;
                case 'hitWicket':
                    description = `hit wicket b ${bowler?.name || 'Unknown'}`;
                    break;
                default:
                    description = dismissalType;
            }

            // Update the dismissed batter
            dismissedBatter.dismissal = {
                type: dismissalType,
                bowler: bowler,
                fielder: fielder,
                description
            };

            // Update the batting order
            battingOrder[batterIndex] = dismissedBatter;

            // Update wickets count
            const newWickets = prev.score.batting.wickets + 1;

            // Update last wicket string
            const lastWicket = `${dismissedBatter.player.name} ${dismissedBatter.runs} (${dismissedBatter.balls}b ${dismissedBatter.fours}x4 ${dismissedBatter.sixes}x6) ${description}`;

            // Update bowler stats if applicable
            let updatedBowlingStats = { ...prev.bowlingStats };
            if (bowlerIndex !== undefined && dismissalType !== 'runOut') {
                const bowlerStats = [...updatedBowlingStats[bowlingTeamId]];
                const updatedBowler = { ...bowlerStats[bowlerIndex] };
                updatedBowler.wickets += 1;
                bowlerStats[bowlerIndex] = updatedBowler;
                updatedBowlingStats[bowlingTeamId] = bowlerStats;
            }

            // Reset partnership
            const newPartnership = { runs: 0, balls: 0 };

            // Clear current striker if it was them who was dismissed
            let updatedCurrentBatsmen = { ...prev.currentBatsmen };
            if (prev.currentBatsmen.striker?.player.id === dismissedBatter.player.id) {
                updatedCurrentBatsmen.striker = undefined;
            } else if (prev.currentBatsmen.nonStriker?.player.id === dismissedBatter.player.id) {
                updatedCurrentBatsmen.nonStriker = undefined;
            }

            return {
                ...prev,
                score: {
                    ...prev.score,
                    batting: {
                        ...prev.score.batting,
                        wickets: newWickets
                    }
                },
                battingOrder: {
                    ...prev.battingOrder,
                    [battingTeamId]: battingOrder
                },
                bowlingStats: updatedBowlingStats,
                currentBatsmen: updatedCurrentBatsmen,
                partnership: newPartnership,
                lastWicket
            };
        });

        toast({
            title: "Wicket!",
            description: `Batsman dismissed (${dismissalType})`,
            variant: "destructive",
            duration: 3000,
        });
    };

    // Select bowler
    const selectBowler = (bowlerIndex: number) => {
        setCricketScorecard(prev => {
            const bowlingTeamId = prev.score.bowling.team.id;
            const bowlerStats = [...prev.bowlingStats[bowlingTeamId]];

            if (bowlerIndex < 0 || bowlerIndex >= bowlerStats.length) {
                toast({
                    title: "Error",
                    description: "Invalid bowler selection",
                    variant: "destructive"
                });
                return prev;
            }

            // Store current state for undo functionality
            const currentState = { ...prev };
            setActionsHistory(history => [...history, {
                action: 'selectBowler',
                data: currentState
            }]);

            return {
                ...prev,
                currentBowler: bowlerStats[bowlerIndex]
            };
        });

        toast({
            title: "Bowler Selected",
            description: "New bowler is now bowling",
            duration: 3000,
        });
    };

    // Select batsman (as striker or non-striker)
    const selectBatsman = (playerIndex: number, asStriker: boolean) => {
        setCricketScorecard(prev => {
            const battingTeamId = prev.score.batting.team.id;
            const allBatters = prev.battingOrder[battingTeamId];


            if (playerIndex < 0 || playerIndex >= allBatters.length) {
                toast({
                    title: "Error",
                    description: "Invalid batsman selection",
                    variant: "destructive"
                });
                return prev;
            }

            // Check if batter is already out
            if (allBatters[playerIndex].dismissal) {
                toast({
                    title: "Error",
                    description: "This batsman is already out",
                    variant: "destructive"
                });
                return prev;
            }

            // Store current state for undo functionality
            const currentState = { ...prev };
            setActionsHistory(history => [...history, {
                action: 'selectBatsman',
                data: currentState
            }]);

            // Update current batsmen
            const selectedBatter = allBatters[playerIndex];
            const updatedCurrentBatsmen = { ...prev.currentBatsmen };

            if (asStriker) {
                updatedCurrentBatsmen.striker = selectedBatter;
            } else {
                updatedCurrentBatsmen.nonStriker = selectedBatter;
            }



            return {
                ...prev,
                currentBatsmen: updatedCurrentBatsmen
            };
        });

        toast({
            title: "Batsman Selected",
            description: `New batsman is now ${asStriker ? 'on strike' : 'at non-striker end'}`,
            duration: 3000,
        });
    };

    // Pause/resume match
    const pauseMatch = (isPaused: boolean) => {
        setMatchPaused(isPaused);

        toast({
            title: isPaused ? "Match Paused" : "Match Resumed",
            description: isPaused ? "Scoring is temporarily disabled" : "Scoring is now enabled",
            duration: 3000,
        });
    };

    // Undo last action
    const undoLastAction = () => {
        if (actionsHistory.length === 0) {
            toast({
                title: "Nothing to Undo",
                description: "No previous actions found",
                variant: "destructive",
                duration: 3000,
            });
            return;
        }

        const lastAction = actionsHistory[actionsHistory.length - 1];

        if (lastAction.action.startsWith('update') ||
            lastAction.action === 'dismissBatsman' ||
            lastAction.action === 'selectBowler' ||
            lastAction.action === 'selectBatsman') {

            // Restore previous state
            setCricketScorecard(lastAction.data);

            // Remove the action from history
            setActionsHistory(prev => prev.slice(0, -1));

            toast({
                title: "Action Undone",
                description: `Last ${lastAction.action} has been reversed`,
                duration: 3000,
            });
        }
    };

    // Add a new player to a team
    const addPlayerToTeam = (teamType: 'home' | 'away', player: Player) => {
        if (selectedSport === 'cricket') {
            setCricketScorecard(prev => {
                const team = teamType === 'home' ? prev.match.teams.home : prev.match.teams.away;
                const updatedTeam = {
                    ...team,
                    players: [...team.players, player]
                };

                const updatedMatch = {
                    ...prev.match,
                    teams: {
                        ...prev.match.teams,
                        [teamType]: updatedTeam
                    }
                };

                return {
                    ...prev,
                    match: updatedMatch
                };
            });
        } else {
            setUniversalScorecard(prev => {
                const team = teamType === 'home' ? prev.match.teams.home : prev.match.teams.away;
                const updatedTeam = {
                    ...team,
                    players: [...team.players, player]
                };

                const updatedMatch = {
                    ...prev.match,
                    teams: {
                        ...prev.match.teams,
                        [teamType]: updatedTeam
                    }
                };

                return {
                    ...prev,
                    match: updatedMatch
                };
            });
        }

        toast({
            title: "Player Added",
            description: `${player.name} has been added to the ${teamType} team.`,
            duration: 3000,
        });
    };

    // Add an event (card, substitution, etc.)
    const addEvent = (type: string, team: 'home' | 'away', player?: Player, description?: string) => {
        setUniversalScorecard(prev => {
            const newEvent: ScorecardEvent = {
                id: `event-${Date.now()}`,
                type: type as "goal" | "penalty" | "card" | "substitution" | "timeout" | "other",
                team,
                player,
                minute: prev.timeElapsed,
                periodNumber: prev.currentPeriod,
                description: description || `${type} for ${team === 'home' ? prev.match.teams.home.name : prev.match.teams.away.name}`
            };

            return {
                ...prev,
                events: [...prev.events, newEvent]
            };
        });

        toast({
            title: "Event Added",
            description: `${type} recorded for ${team} team.`,
            duration: 3000,
        });
    };

    // Set a custom match
    const setCustomMatch = (match: Match) => {
        if (match.sportType === 'cricket') {
            setCricketScorecard(prev => ({
                ...prev,
                match
            }));
        } else {
            setUniversalScorecard(prev => ({
                ...prev,
                match
            }));
        }

        setSelectedSport(match.sportType);

        toast({
            title: "Match Loaded",
            description: `${match.teams.home.name} vs ${match.teams.away.name} has been loaded.`,
            duration: 3000,
        });
    };

    const value = {
        selectedSport,
        setSelectedSport,
        universalScorecard,
        cricketScorecard,
        updateUniversalScore,
        updateCricketScore,
        addPlayerToTeam,
        addEvent,
        setCustomMatch,
        dismissBatsman,
        selectBowler,
        selectBatsman,
        pauseMatch,
        undoLastAction,
        addExtras,
        setCricketTossWinner,
        isLoading: scoreloading, // Added here
        isError: scoreisError,   // Added here
        error: scoreError,
    };

    return (
        <ScorecardContext.Provider value={value}>
            {children}
        </ScorecardContext.Provider>
    );
};

export const useScorecard = () => {
    const context = useContext(ScorecardContext);
    if (context === undefined) {
        throw new Error('useScorecard must be used within a ScorecardProvider');
    }
    return context;
};


