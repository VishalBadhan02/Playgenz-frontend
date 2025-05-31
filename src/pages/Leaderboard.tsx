
import React, { useState } from 'react';
import { Trophy, Medal, ArrowUp, ArrowDown, Minus, Search, Filter } from 'lucide-react';

interface TeamRanking {
  id: string;
  rank: number;
  previousRank: number;
  name: string;
  played: number;
  won: number;
  lost: number;
  points: number;
  imageUrl?: string;
}

const teamRankings: TeamRanking[] = [
  {
    id: '1',
    rank: 1,
    previousRank: 2,
    name: 'Thunder Strikers',
    played: 15,
    won: 12,
    lost: 3,
    points: 36,
    imageUrl: 'https://via.placeholder.com/40'
  },
  {
    id: '2',
    rank: 2,
    previousRank: 1,
    name: 'Phoenix Rising',
    played: 15,
    won: 11,
    lost: 4,
    points: 33,
    imageUrl: 'https://via.placeholder.com/40'
  },
  {
    id: '3',
    rank: 3,
    previousRank: 3,
    name: 'Golden Eagles',
    played: 15,
    won: 10,
    lost: 5,
    points: 30,
    imageUrl: 'https://via.placeholder.com/40'
  },
  {
    id: '4',
    rank: 4,
    previousRank: 6,
    name: 'Blue Hawks',
    played: 15,
    won: 8,
    lost: 7,
    points: 24,
    imageUrl: 'https://via.placeholder.com/40'
  },
  {
    id: '5',
    rank: 5,
    previousRank: 4,
    name: 'Red Dragons',
    played: 15,
    won: 7,
    lost: 8,
    points: 21,
    imageUrl: 'https://via.placeholder.com/40'
  }
];

const Leaderboard = () => {
  const [activeTab, setActiveTab] = useState<'teams' | 'players'>('teams');
  
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Leaderboard</h1>
        <p className="text-muted-foreground">Track team and player rankings</p>
      </div>
      
      <div className="flex space-x-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search teams or players..."
            className="w-full rounded-md border px-9 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-primary"
          />
        </div>
        
        <button className="flex items-center gap-2 rounded-md border px-3 py-2 text-sm hover:bg-secondary transition-colors">
          <Filter className="h-4 w-4" />
          <span>Filter</span>
        </button>
      </div>
      
      <div className="flex border-b">
        <button
          className={`px-4 py-2 text-sm font-medium ${
            activeTab === 'teams'
              ? 'border-b-2 border-primary text-primary'
              : 'text-muted-foreground hover:text-foreground'
          }`}
          onClick={() => setActiveTab('teams')}
        >
          Teams
        </button>
        
        <button
          className={`px-4 py-2 text-sm font-medium ${
            activeTab === 'players'
              ? 'border-b-2 border-primary text-primary'
              : 'text-muted-foreground hover:text-foreground'
          }`}
          onClick={() => setActiveTab('players')}
        >
          Players
        </button>
      </div>
      
      <div className="overflow-hidden rounded-lg border">
        <div className="grid grid-cols-12 gap-4 bg-muted p-4 text-sm font-medium">
          <div className="col-span-1 text-center">Rank</div>
          <div className="col-span-5">Team</div>
          <div className="col-span-1 text-center">P</div>
          <div className="col-span-1 text-center">W</div>
          <div className="col-span-1 text-center">L</div>
          <div className="col-span-3 text-center">Points</div>
        </div>
        
        {teamRankings.map((team, index) => (
          <div 
            key={team.id} 
            className={`grid grid-cols-12 gap-4 p-4 text-sm ${
              index % 2 === 0 ? 'bg-background' : 'bg-muted/30'
            } hover:bg-muted/50 transition-colors`}
          >
            <div className="col-span-1 flex items-center justify-center">
              <div className="relative flex items-center justify-center">
                <span className="font-semibold">{team.rank}</span>
                <span className="absolute -right-4 text-xs">
                  {team.previousRank < team.rank ? (
                    <ArrowDown className="h-3 w-3 text-red-500" />
                  ) : team.previousRank > team.rank ? (
                    <ArrowUp className="h-3 w-3 text-green-500" />
                  ) : (
                    <Minus className="h-3 w-3 text-muted-foreground" />
                  )}
                </span>
              </div>
            </div>
            
            <div className="col-span-5 flex items-center gap-3">
              <div className="relative flex h-8 w-8 items-center justify-center overflow-hidden rounded-full bg-muted">
                {team.imageUrl ? (
                  <img src={team.imageUrl} alt={team.name} className="h-full w-full object-cover" />
                ) : (
                  <Trophy className="h-4 w-4 text-muted-foreground" />
                )}
                {team.rank <= 3 && (
                  <div 
                    className={`absolute -bottom-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full 
                      ${team.rank === 1 ? 'bg-yellow-500' : team.rank === 2 ? 'bg-gray-400' : 'bg-amber-800'}`}
                  >
                    <Medal className="h-2 w-2 text-white" />
                  </div>
                )}
              </div>
              <span className="font-medium">{team.name}</span>
            </div>
            
            <div className="col-span-1 flex items-center justify-center">
              {team.played}
            </div>
            
            <div className="col-span-1 flex items-center justify-center text-green-600">
              {team.won}
            </div>
            
            <div className="col-span-1 flex items-center justify-center text-red-600">
              {team.lost}
            </div>
            
            <div className="col-span-3 flex items-center justify-center">
              <div className="w-full max-w-[120px]">
                <div className="flex items-center justify-between">
                  <span className="font-semibold">{team.points}</span>
                  <div className="h-2 w-full max-w-[80px] overflow-hidden rounded-full bg-muted">
                    <div 
                      className="h-full rounded-full bg-primary" 
                      style={{ width: `${(team.points / 36) * 100}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="rounded-lg border p-4">
        <h3 className="mb-4 text-lg font-medium">Leaderboard Stats</h3>
        
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-lg bg-muted p-4">
            <div className="text-sm text-muted-foreground">Total Teams</div>
            <div className="text-3xl font-semibold">24</div>
          </div>
          
          <div className="rounded-lg bg-muted p-4">
            <div className="text-sm text-muted-foreground">Matches Played</div>
            <div className="text-3xl font-semibold">156</div>
          </div>
          
          <div className="rounded-lg bg-muted p-4">
            <div className="text-sm text-muted-foreground">Top Scorer</div>
            <div className="text-xl font-semibold">Michael Johnson</div>
            <div className="text-sm text-muted-foreground">286 Points</div>
          </div>
          
          <div className="rounded-lg bg-muted p-4">
            <div className="text-sm text-muted-foreground">Last Updated</div>
            <div className="text-xl font-semibold">Today</div>
            <div className="text-sm text-muted-foreground">2:30 PM</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;
