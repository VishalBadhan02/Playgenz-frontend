import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Trophy, Medal, ArrowUp, ArrowDown, Minus, Search,
  Filter, Award, CircleUser, Star
} from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

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

interface PlayerStatsCricket {
  id: string;
  rank: number;
  previousRank: number;
  name: string;
  teamName: string;
  teamId: string;
  matchesPlayed: number;
  battingStats: {
    runsScored: number;
    highestScore: number;
    battingAverage: number;
    strikeRate: number;
    fifties: number;
    hundreds: number;
  };
  bowlingStats: {
    wickets: number;
    economy: number;
    bestFigures: string;
  };
  imageUrl?: string;
}

const teamRankings: TeamRanking[] = [
  {
    id: '1',
    rank: 1,
    previousRank: 2,
    name: 'Royal Strikers',
    played: 4,
    won: 4,
    lost: 0,
    points: 8,
    imageUrl: '/placeholder.svg'
  },
  {
    id: '2',
    rank: 2,
    previousRank: 1,
    name: 'Thunder Kings',
    played: 4,
    won: 3,
    lost: 1,
    points: 6,
    imageUrl: '/placeholder.svg'
  },
  {
    id: '3',
    rank: 3,
    previousRank: 3,
    name: 'Golden Eagles',
    played: 4,
    won: 2,
    lost: 2,
    points: 4,
    imageUrl: '/placeholder.svg'
  },
  {
    id: '4',
    rank: 4,
    previousRank: 6,
    name: 'Metro Warriors',
    played: 4,
    won: 2,
    lost: 2,
    points: 4,
    imageUrl: '/placeholder.svg'
  },
  {
    id: '5',
    rank: 5,
    previousRank: 4,
    name: 'Lightning Bolts',
    played: 4,
    won: 1,
    lost: 3,
    points: 2,
    imageUrl: '/placeholder.svg'
  },
  {
    id: '6',
    rank: 6,
    previousRank: 5,
    name: 'City Titans',
    played: 4,
    won: 0,
    lost: 4,
    points: 0,
    imageUrl: '/placeholder.svg'
  }
];

const playerStatsCricket: PlayerStatsCricket[] = [
  {
    id: 'p1',
    rank: 1,
    previousRank: 1,
    name: 'Aiden Williams',
    teamName: 'Royal Strikers',
    teamId: '1',
    matchesPlayed: 4,
    battingStats: {
      runsScored: 186,
      highestScore: 87,
      battingAverage: 46.5,
      strikeRate: 142.7,
      fifties: 2,
      hundreds: 0
    },
    bowlingStats: {
      wickets: 3,
      economy: 8.2,
      bestFigures: '2/24'
    },
    imageUrl: '/placeholder.svg'
  },
  {
    id: 'p2',
    rank: 2,
    previousRank: 3,
    name: 'Rahul Sharma',
    teamName: 'Thunder Kings',
    teamId: '2',
    matchesPlayed: 4,
    battingStats: {
      runsScored: 165,
      highestScore: 62,
      battingAverage: 41.25,
      strikeRate: 138.6,
      fifties: 2,
      hundreds: 0
    },
    bowlingStats: {
      wickets: 5,
      economy: 7.4,
      bestFigures: '3/18'
    },
    imageUrl: '/placeholder.svg'
  },
  {
    id: 'p3',
    rank: 3,
    previousRank: 2,
    name: 'James Anderson',
    teamName: 'Golden Eagles',
    teamId: '3',
    matchesPlayed: 4,
    battingStats: {
      runsScored: 112,
      highestScore: 45,
      battingAverage: 28.0,
      strikeRate: 132.5,
      fifties: 0,
      hundreds: 0
    },
    bowlingStats: {
      wickets: 8,
      economy: 6.8,
      bestFigures: '4/22'
    },
    imageUrl: '/placeholder.svg'
  },
  {
    id: 'p4',
    rank: 4,
    previousRank: 5,
    name: 'Michael Chen',
    teamName: 'Metro Warriors',
    teamId: '4',
    matchesPlayed: 4,
    battingStats: {
      runsScored: 145,
      highestScore: 72,
      battingAverage: 36.25,
      strikeRate: 145.0,
      fifties: 1,
      hundreds: 0
    },
    bowlingStats: {
      wickets: 2,
      economy: 9.3,
      bestFigures: '1/24'
    },
    imageUrl: '/placeholder.svg'
  },
  {
    id: 'p5',
    rank: 5,
    previousRank: 4,
    name: 'David Wilson',
    teamName: 'Lightning Bolts',
    teamId: '5',
    matchesPlayed: 4,
    battingStats: {
      runsScored: 132,
      highestScore: 56,
      battingAverage: 33.0,
      strikeRate: 128.2,
      fifties: 1,
      hundreds: 0
    },
    bowlingStats: {
      wickets: 6,
      economy: 7.2,
      bestFigures: '3/28'
    },
    imageUrl: '/placeholder.svg'
  },
  {
    id: 'p6',
    rank: 6,
    previousRank: 7,
    name: 'Carlos Rodriguez',
    teamName: 'City Titans',
    teamId: '6',
    matchesPlayed: 4,
    battingStats: {
      runsScored: 98,
      highestScore: 42,
      battingAverage: 24.5,
      strikeRate: 115.3,
      fifties: 0,
      hundreds: 0
    },
    bowlingStats: {
      wickets: 7,
      economy: 6.5,
      bestFigures: '3/15'
    },
    imageUrl: '/placeholder.svg'
  },
];

const TournamentLeaderboard = () => {
  const [activeLeaderboard, setActiveLeaderboard] = useState<'teams' | 'players'>('teams');
  const [playerStatsView, setPlayerStatsView] = useState<'batting' | 'bowling'>('batting');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredTeams = teamRankings.filter(team =>
    team.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredPlayers = playerStatsCricket.filter(player =>
    player.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    player.teamName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Tournament Leaderboard</CardTitle>
          <CardDescription>
            Track team and player statistics throughout the tournament
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search teams or players..."
                className="w-full pl-9"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <div className="flex gap-2">
              <Button
                variant="outline"
                className="flex items-center gap-2"
              >
                <Filter className="h-4 w-4" />
                <span>Filter</span>
              </Button>
            </div>
          </div>

          <Tabs defaultValue="teams" onValueChange={(value) => setActiveLeaderboard(value as 'teams' | 'players')}>
            <TabsList className="mb-4">
              <TabsTrigger value="teams" className="flex items-center gap-2">
                <Trophy className="h-4 w-4" />
                Teams
              </TabsTrigger>
              <TabsTrigger value="players" className="flex items-center gap-2">
                <CircleUser className="h-4 w-4" />
                Players
              </TabsTrigger>
            </TabsList>

            <TabsContent value="teams">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-16 text-center">Rank</TableHead>
                    <TableHead>Team</TableHead>
                    <TableHead className="text-center">P</TableHead>
                    <TableHead className="text-center">W</TableHead>
                    <TableHead className="text-center">L</TableHead>
                    <TableHead className="text-right">Points</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredTeams.map((team) => (
                    <TableRow key={team.id} className="hover:bg-muted/50">
                      <TableCell className="text-center font-medium relative">
                        {team.rank}
                        <span className="absolute -right-1 bottom-1/2 translate-y-1/2 text-xs">
                          {team.previousRank < team.rank ? (
                            <ArrowDown className="h-3 w-3 text-red-500" />
                          ) : team.previousRank > team.rank ? (
                            <ArrowUp className="h-3 w-3 text-green-500" />
                          ) : (
                            <Minus className="h-3 w-3 text-muted-foreground" />
                          )}
                        </span>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-3">
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
                      </TableCell>
                      <TableCell className="text-center">{team.played}</TableCell>
                      <TableCell className="text-center text-green-600">{team.won}</TableCell>
                      <TableCell className="text-center text-red-600">{team.lost}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-2">
                          <span className="font-semibold">{team.points}</span>
                          <div className="h-2 w-16 overflow-hidden rounded-full bg-muted">
                            <div
                              className="h-full rounded-full bg-primary"
                              style={{ width: `${(team.points / 8) * 100}%` }}
                            />
                          </div>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TabsContent>

            <TabsContent value="players">
              <div className="mb-4">
                <div className="inline-flex items-center rounded-md border p-1 mb-4">
                  <Button
                    variant={playerStatsView === 'batting' ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => setPlayerStatsView('batting')}
                    className="flex items-center gap-2"
                  >
                    <Star className="h-4 w-4" />
                    Batting
                  </Button>
                  <Button
                    variant={playerStatsView === 'bowling' ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => setPlayerStatsView('bowling')}
                    className="flex items-center gap-2"
                  >
                    <Award className="h-4 w-4" />
                    Bowling
                  </Button>
                </div>

                {playerStatsView === 'batting' ? (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-16 text-center">Rank</TableHead>
                        <TableHead>Player</TableHead>
                        <TableHead className="text-center">Matches</TableHead>
                        <TableHead className="text-center">Runs</TableHead>
                        <TableHead className="text-center">Avg</TableHead>
                        <TableHead className="text-center">SR</TableHead>
                        <TableHead className="text-center">HS</TableHead>
                        <TableHead className="text-center">50s/100s</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredPlayers
                        .sort((a, b) => b.battingStats.runsScored - a.battingStats.runsScored)
                        .map((player, index) => (
                          <TableRow key={player.id} className="hover:bg-muted/50">
                            <TableCell className="text-center font-medium relative">
                              {index + 1}
                              <span className="absolute -right-1 bottom-1/2 translate-y-1/2 text-xs">
                                {player.previousRank < player.rank ? (
                                  <ArrowDown className="h-3 w-3 text-red-500" />
                                ) : player.previousRank > player.rank ? (
                                  <ArrowUp className="h-3 w-3 text-green-500" />
                                ) : (
                                  <Minus className="h-3 w-3 text-muted-foreground" />
                                )}
                              </span>
                            </TableCell>
                            <TableCell>
                              <div className="flex items-center gap-3">
                                <Avatar className="h-8 w-8">
                                  <AvatarImage src={player.imageUrl} alt={player.name} />
                                  <AvatarFallback>{player.name.charAt(0)}</AvatarFallback>
                                </Avatar>
                                <div>
                                  <div className="font-medium">{player.name}</div>
                                  <div className="text-xs text-muted-foreground">{player.teamName}</div>
                                </div>
                              </div>
                            </TableCell>
                            <TableCell className="text-center">{player.matchesPlayed}</TableCell>
                            <TableCell className="text-center font-medium">{player.battingStats.runsScored}</TableCell>
                            <TableCell className="text-center">{player.battingStats.battingAverage.toFixed(2)}</TableCell>
                            <TableCell className="text-center">{player.battingStats.strikeRate.toFixed(1)}</TableCell>
                            <TableCell className="text-center">{player.battingStats.highestScore}</TableCell>
                            <TableCell className="text-center">
                              {player.battingStats.fifties}/{player.battingStats.hundreds}
                            </TableCell>
                          </TableRow>
                        ))}
                    </TableBody>
                  </Table>
                ) : (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-16 text-center">Rank</TableHead>
                        <TableHead>Player</TableHead>
                        <TableHead className="text-center">Matches</TableHead>
                        <TableHead className="text-center">Wickets</TableHead>
                        <TableHead className="text-center">Economy</TableHead>
                        <TableHead className="text-center">Best</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredPlayers
                        .sort((a, b) => b.bowlingStats.wickets - a.bowlingStats.wickets)
                        .map((player, index) => (
                          <TableRow key={player.id} className="hover:bg-muted/50">
                            <TableCell className="text-center font-medium relative">
                              {index + 1}
                            </TableCell>
                            <TableCell>
                              <div className="flex items-center gap-3">
                                <Avatar className="h-8 w-8">
                                  <AvatarImage src={player.imageUrl} alt={player.name} />
                                  <AvatarFallback>{player.name.charAt(0)}</AvatarFallback>
                                </Avatar>
                                <div>
                                  <div className="font-medium">{player.name}</div>
                                  <div className="text-xs text-muted-foreground">{player.teamName}</div>
                                </div>
                              </div>
                            </TableCell>
                            <TableCell className="text-center">{player.matchesPlayed}</TableCell>
                            <TableCell className="text-center font-medium">{player.bowlingStats.wickets}</TableCell>
                            <TableCell className="text-center">{player.bowlingStats.economy.toFixed(1)}</TableCell>
                            <TableCell className="text-center">{player.bowlingStats.bestFigures}</TableCell>
                          </TableRow>
                        ))}
                    </TableBody>
                  </Table>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Top Batsman</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-3">
              <Avatar className="h-10 w-10 border-2 border-primary">
                <AvatarImage src={playerStatsCricket[0].imageUrl} alt={playerStatsCricket[0].name} />
                <AvatarFallback>{playerStatsCricket[0].name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div>
                <div className="font-medium">{playerStatsCricket[0].name}</div>
                <div className="text-xs text-muted-foreground flex items-center gap-1">
                  <Star className="h-3 w-3" />
                  <span>{playerStatsCricket[0].battingStats.runsScored} runs</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Top Bowler</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-3">
              <Avatar className="h-10 w-10 border-2 border-primary">
                <AvatarImage src={playerStatsCricket[2].imageUrl} alt={playerStatsCricket[2].name} />
                <AvatarFallback>{playerStatsCricket[2].name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div>
                <div className="font-medium">{playerStatsCricket[2].name}</div>
                <div className="text-xs text-muted-foreground flex items-center gap-1">
                  <Award className="h-3 w-3" />
                  <span>{playerStatsCricket[2].bowlingStats.wickets} wickets</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Highest Team Score</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center">
                <Trophy className="h-5 w-5 text-primary" />
              </div>
              <div>
                <div className="font-medium">Royal Strikers</div>
                <div className="text-xs text-muted-foreground flex items-center gap-1">
                  <span>187/4 vs City Titans</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Tournament Stats</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-xs text-muted-foreground">Total Matches</span>
                <Badge variant="outline">12/32</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-xs text-muted-foreground">Total Runs</span>
                <Badge variant="outline">1,876</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-xs text-muted-foreground">Total Wickets</span>
                <Badge variant="outline">89</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default TournamentLeaderboard;
