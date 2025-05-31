
import { useState } from 'react';
import {
  Match,
  Team,
  Player,
  UniversalScorecardData,
  CricketScorecardData,
  BattingCard,
  BowlingCard,
  Over
} from '../types/scorecard';

export const getMatchData = (matchData: any) => {
  const data = matchData?._doc

  const cricketTeam1 = {
    id: data?.teams?.teamA?.teamId,
    name: data?.teams?.teamA?.name,
    logo: '/placeholder.svg',
    players: createPlayersxc(data?.teams?.teamA?.players)
  }
  const cricketTeam2 = {
    id: data?.teams?.teamB?.teamId,
    name: data?.teams?.teamB?.name,
    logo: '/placeholder.svg',
    players: createPlayersxc(data?.teams?.teamB?.players)
  }

  const cricketMatch = {
    id: data?._id,
    tournamentId: data?.tournamentId,
    sportType: data?.sportType,
    teams: {
      home: cricketTeam1,
      away: cricketTeam2
    },
    venue: 'National Cricket Ground',
    date: new Date(Date.now() + 7200000).toISOString(),
    status: 'live'
  }

  const mockCricketScorecard: any = {
    match: cricketMatch,
    format: 'T20',
    currentInnings: 1,
    totalInnings: 2,
    score: {
      batting: {
        team: mockTeams.cricketTeam1,
        runs: 85,
        wickets: 1,
        overs: 8.3,
        extras: {
          wide: 3,
          noBall: 1,
          byes: 2,
          legByes: 1,
          penalty: 0
        }
      },
      bowling: {
        team: mockTeams.cricketTeam2
      }
    },
    battingOrder: {
      [mockTeams.cricketTeam1.id]: battingCards1,
      [mockTeams.cricketTeam2.id]: battingCards2
    },
    bowlingStats: {
      [mockTeams.cricketTeam1.id]: createBowlingCards(mockTeams.cricketTeam1),
      [mockTeams.cricketTeam2.id]: createBowlingCards(mockTeams.cricketTeam2)
    },
    currentBatsmen: {
      striker: battingCards1[2],
      nonStriker: battingCards1[3]
    },
    currentBowler: createBowlingCards(mockTeams.cricketTeam2)[2],
    recentOvers: createRecentOvers(),
    partnership: {
      runs: 45,
      balls: 32
    },
    currentRunRate: 8.5,
    target: undefined,
    lastWicket: "P1 c P5 b P8 30(25)"
  };

  return mockCricketScorecard
}

// Mock Players
const createPlayers = (teamPrefix: string, count: number, sport: string): Player[] => {
  const players: Player[] = [];

  for (let i = 1; i <= count; i++) {
    // For cricket, assign cricket-specific roles
    const isCricket = sport === 'cricket';
    const isWicketKeeper = isCricket && i === 7;
    const isCaptain = i === 1;

    players.push({
      id: `${teamPrefix}-player-${i}`,
      name: `${teamPrefix.charAt(0).toUpperCase() + teamPrefix.slice(1)} Player hdnkjjdfn ${i}`,
      jerseyNumber: i,
      position: isCricket ?
        (i <= 6 ? 'Batsman' : i <= 10 ? 'Bowler' : 'All-rounder') :
        (i <= 4 ? 'Forward' : i <= 8 ? 'Midfielder' : 'Defender'),
      isCaptain: isCaptain,
      isWicketKeeper: isWicketKeeper,
      isSubstitute: i > (sport === 'cricket' ? 11 : 11)
    });
  }

  return players;
};

const createPlayersxc = (teamPlayers: any): any => {
  return teamPlayers?.map((value: any, index: number) => ({
    id: value?.playerId,
    name: value?.userName,
    status: value?.status,
    position: "batsman",
    jerseyNumber: index,
    isCaptain: "isCaptain",
  }))
};

// Mock Teams
export const mockTeams: Record<string, Team> = {
  footballTeam1: {
    id: 'team-football-1',
    name: 'Red Dragons FC',

    players: createPlayers('dragons', 16, 'football')
  },
  footballTeam2: {
    id: 'team-football-2',
    name: 'Blue Lions FC',
    logo: '/placeholder.svg',
    players: createPlayers('lions', 16, 'football')
  },
  cricketTeam1: {
    id: 'team-cricket-1',
    name: 'Royal Challengers',
    logo: '/placeholder.svg',
    players: createPlayers('challengers', 15, 'cricket')
  },
  cricketTeam2: {
    id: 'team-cricket-2',
    name: 'Super Kings',
    logo: '/placeholder.svg',
    players: createPlayers('kings', 15, 'cricket')
  }
};

// Mock Matches
export const mockMatches: Record<string, Match> = {
  footballMatch: {
    id: 'match-football-1',
    tournamentId: 'tournament-1',
    sportType: 'football',
    teams: {
      home: mockTeams.footballTeam1,
      away: mockTeams.footballTeam2
    },
    venue: 'City Stadium',
    date: new Date(Date.now() + 3600000).toISOString(),
    status: 'live'
  },
  cricketMatch: {
    id: 'match-cricket-1',
    tournamentId: 'tournament-2',
    sportType: 'cricket',
    teams: {
      home: mockTeams.cricketTeam1,
      away: mockTeams.cricketTeam2
    },
    venue: 'National Cricket Ground',
    date: new Date(Date.now() + 7200000).toISOString(),
    status: 'live'
  }
};

// Mock Universal Scorecard Data (Football)
export const mockUniversalScorecard: UniversalScorecardData = {
  match: mockMatches.footballMatch,
  currentPeriod: 1,
  totalPeriods: 2,
  score: {
    home: 2,
    away: 1
  },
  timeElapsed: 37,
  events: [
    {
      id: 'event-1',
      type: 'goal',
      team: 'home',
      player: mockTeams.footballTeam1.players[2],
      minute: 12,
      periodNumber: 1,
      description: 'Great strike from outside the box'
    },
    {
      id: 'event-2',
      type: 'goal',
      team: 'away',
      player: mockTeams.footballTeam2.players[9],
      minute: 24,
      periodNumber: 1,
      description: 'Header from a corner'
    },
    {
      id: 'event-3',
      type: 'card',
      team: 'away',
      player: mockTeams.footballTeam2.players[6],
      minute: 30,
      periodNumber: 1,
      description: 'Yellow card for a tactical foul'
    },
    {
      id: 'event-4',
      type: 'goal',
      team: 'home',
      player: mockTeams.footballTeam1.players[7],
      minute: 35,
      periodNumber: 1,
      description: 'Penalty kick'
    }
  ]
};

// Cricket batting cards generator
const createBattingCards = (team: Team): BattingCard[] => {
  return team.players.slice(0, 11).map((player, index) => {
    // First two batters have played
    if (index < 2) {
      return {
        player,
        runs: 30 + Math.floor(Math.random() * 40),
        balls: 25 + Math.floor(Math.random() * 30),
        fours: Math.floor(Math.random() * 5),
        sixes: Math.floor(Math.random() * 3),
        strikeRate: 0, // Will be calculated
        dismissal: index === 0 ? {
          type: 'caught',
          bowler: mockTeams.cricketTeam2.players[8],
          fielder: mockTeams.cricketTeam2.players[5],
          description: 'Caught at mid-off'
        } : undefined
      };
    }
    // Current pair of batsmen
    else if (index >= 2 && index <= 3) {
      return {
        player,
        runs: 10 + Math.floor(Math.random() * 20),
        balls: 15 + Math.floor(Math.random() * 15),
        fours: Math.floor(Math.random() * 3),
        sixes: Math.floor(Math.random() * 2),
        strikeRate: 0 // Will be calculated
      };
    }
    // Yet to bat
    else {
      return {
        player,
        runs: 0,
        balls: 0,
        fours: 0,
        sixes: 0,
        strikeRate: 0
      };
    }
  });
};

// Cricket bowling cards generator
const createBowlingCards = (team: Team): BowlingCard[] => {
  return team.players.slice(5, 11).map((player, index) => {
    if (index < 4) {
      const overs = 2 + Math.floor(Math.random() * 2);
      const runs = 15 + Math.floor(Math.random() * 20);
      const wickets = Math.floor(Math.random() * 2);

      return {
        player,
        overs: overs,
        maidens: Math.floor(Math.random() * 2),
        runs: runs,
        wickets: wickets,
        economy: +(runs / overs).toFixed(2),
        dots: Math.floor(Math.random() * 10),
        wides: Math.floor(Math.random() * 3),
        noBalls: Math.floor(Math.random() * 2)
      };
    } else {
      return {
        player,
        overs: 0,
        maidens: 0,
        runs: 0,
        wickets: 0,
        economy: 0,
        dots: 0,
        wides: 0,
        noBalls: 0
      };
    }
  });
};

// Create recent overs
const createRecentOvers = (): Over[] => {
  const overs: Over[] = [];
  for (let i = 1; i <= 8; i++) {
    const deliveries = [];
    let overRuns = 0;
    let overWickets = 0;

    for (let j = 1; j <= 6; j++) {
      const isWicket = Math.random() < 0.05;
      const isExtra = !isWicket && Math.random() < 0.1;
      const extraType = isExtra ? (['wide', 'noBall', 'bye', 'legBye'][Math.floor(Math.random() * 4)] as 'wide' | 'noBall' | 'bye' | 'legBye') : undefined;
      const runs = isExtra ? (extraType === 'wide' || extraType === 'noBall' ? 1 : 0) + Math.floor(Math.random() * 2) :
        Math.floor(Math.random() * (Math.random() < 0.7 ? 2 : (Math.random() < 0.9 ? 4 : 6)));

      overRuns += runs;
      if (isWicket) overWickets++;

      deliveries.push({
        runs,
        isExtra,
        extraType,
        isWicket,
        isLegal: !isExtra || (extraType !== 'wide' && extraType !== 'noBall'),
        description: isWicket ? 'Caught at mid-off' : undefined
      });
    }

    overs.push({
      number: i,
      deliveries,
      runs: overRuns,
      wickets: overWickets
    });
  }

  return overs;
};

// Calculate batting strike rates
const battingCards1 = createBattingCards(mockTeams.cricketTeam1);
const battingCards2 = createBattingCards(mockTeams.cricketTeam2);

battingCards1.forEach(card => {
  if (card.balls > 0) card.strikeRate = +(card.runs / card.balls * 100).toFixed(2);
});
battingCards2.forEach(card => {
  if (card.balls > 0) card.strikeRate = +(card.runs / card.balls * 100).toFixed(2);
});

// Mock Cricket Scorecard Data
export const mockCricketScorecard: CricketScorecardData = {
  match: mockMatches.cricketMatch,
  format: 'T20',
  currentInnings: 1,
  totalInnings: 2,
  score: {
    batting: {
      team: mockTeams.cricketTeam1,
      runs: 85,
      wickets: 1,
      overs: 8.3,
      extras: {
        wide: 3,
        noBall: 1,
        byes: 2,
        legByes: 1,
        penalty: 0
      }
    },
    bowling: {
      team: mockTeams.cricketTeam2
    }
  },
  battingOrder: {
    [mockTeams.cricketTeam1.id]: battingCards1,
    [mockTeams.cricketTeam2.id]: battingCards2
  },
  bowlingStats: {
    [mockTeams.cricketTeam1.id]: createBowlingCards(mockTeams.cricketTeam1),
    [mockTeams.cricketTeam2.id]: createBowlingCards(mockTeams.cricketTeam2)
  },
  currentBatsmen: {
    striker: battingCards1[2],
    nonStriker: battingCards1[3]
  },
  currentBowler: createBowlingCards(mockTeams.cricketTeam2)[2],
  recentOvers: createRecentOvers(),
  partnership: {
    runs: 45,
    balls: 32
  },
  currentRunRate: 8.5,
  target: undefined,
  lastWicket: "P1 c P5 b P8 30(25)"
};
