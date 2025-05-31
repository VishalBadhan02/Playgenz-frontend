export interface Player {
  id: string;
  name: string;
  jerseyNumber?: number;
  position?: string;
  isCaptain?: boolean;
  isWicketKeeper?: boolean;
  isSubstitute?: boolean;
}

export interface Team {
  id: string;
  name: string;
  logo?: string;
  players: Player[];
}

export interface Match {
  id: string;
  tournamentId: string;
  sportType: SportType;
  teams: {
    home: Team;
    away: Team;
  };
  venue: string;
  date: string;
  status: 'upcoming' | 'live' | 'completed';
  result?: string;
  toss?: {
    winner: Team;
    decision: 'bat' | 'bowl';
  };
}

export type SportType = any;

// Football, Hockey, etc. scorecard types
export interface UniversalScorecardData {
  match: Match;
  currentPeriod: number;
  totalPeriods: number;
  score: {
    home: number;
    away: number;
  };
  timeElapsed: number; // in minutes
  events: ScorecardEvent[];
}

export interface ScorecardEvent {
  id: string;
  type: 'goal' | 'penalty' | 'card' | 'substitution' | 'timeout' | 'other';
  team: 'home' | 'away';
  player?: Player;
  playerIn?: Player; // for substitutions
  playerOut?: Player; // for substitutions
  minute: number;
  periodNumber: number;
  description?: string;
}

// Cricket specific scorecard types
export interface CricketScorecardData {
  match: Match;
  format: 'T20' | 'ODI' | 'Test';
  currentInnings: number;
  totalInnings: number;
  score: {
    batting: {
      team: Team;
      runs: number;
      wickets: number;
      overs: number;
      extras: {
        wide: number;
        noBall: number;
        byes: number;
        legByes: number;
        penalty: number;
      };
    };
    bowling: {
      team: Team;
    };
  };
  battingOrder: {
    [teamId: string]: BattingCard[];
  };
  bowlingStats: {
    [teamId: string]: BowlingCard[];
  };
  currentBatsmen: {
    striker?: BattingCard;
    nonStriker?: BattingCard;
  };
  currentBowler?: BowlingCard;
  recentOvers: Over[];
  partnership: {
    runs: number;
    balls: number;
  };
  requiredRunRate?: number;
  currentRunRate: number;
  target?: number;
  lastWicket?: string;
}

export interface BattingCard {
  player: Player;
  runs: number;
  balls: number;
  fours: number;
  sixes: number;
  strikeRate: number;
  dismissal?: {
    type: DismissalType;
    bowler?: Player;
    fielder?: Player;
    description: string;
  };
}

export interface BowlingCard {
  player: Player;
  overs: number;
  maidens: number;
  runs: number;
  wickets: number;
  economy: number;
  dots: number;
  wides: number;
  noBalls: number;
}

export interface Over {
  number: number;
  deliveries: Delivery[];
  runs: number;
  wickets: number;
}

export interface Delivery {
  runs: number;
  isExtra: boolean;
  extraType?: 'wide' | 'noBall' | 'bye' | 'legBye' | 'penalty';
  isWicket: boolean;
  isLegal: boolean;
  description?: string;
}

export type DismissalType =
  'bowled' |
  'caught' |
  'lbw' |
  'runOut' |
  'stumped' |
  'hitWicket' |
  'obstructingField' |
  'handledBall' |
  'timedOut' |
  'retiredHurt' |
  'retiredOut';
