
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { BarChart as BarChartIcon, Trophy, Users, Calendar, PieChart } from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart as RPieChart,
  Pie,
  Cell
} from 'recharts';

interface TournamentStatisticsProps {
  tournamentId: string;
}

const TournamentStatistics: React.FC<TournamentStatisticsProps> = ({ tournamentId }) => {
  // Mock data for stats
  const teamPerformance = [
    { name: 'Royal Strikers', matches: 5, wins: 4, losses: 1, points: 8 },
    { name: 'Thunder Kings', matches: 5, wins: 3, losses: 2, points: 6 },
    { name: 'Golden Eagles', matches: 5, wins: 2, losses: 3, points: 4 },
    { name: 'Metro Warriors', matches: 5, wins: 1, losses: 4, points: 2 },
  ];
  
  const playerStats = [
    { name: 'P. Smith', team: 'Royal Strikers', runs: 245, wickets: 3 },
    { name: 'J. Wilson', team: 'Thunder Kings', runs: 210, wickets: 2 },
    { name: 'R. Johnson', team: 'Golden Eagles', runs: 198, wickets: 5 },
    { name: 'M. Taylor', team: 'Metro Warriors', runs: 180, wickets: 8 },
    { name: 'A. Brown', team: 'Royal Strikers', runs: 175, wickets: 6 },
  ];
  
  const matchTypeData = [
    { name: 'Group Stage', value: 10 },
    { name: 'Quarter-Finals', value: 4 },
    { name: 'Semi-Finals', value: 2 },
    { name: 'Final', value: 1 }
  ];
  
  const COLORS = ['#8884d8', '#83a6ed', '#8dd1e1', '#82ca9d'];
  
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Matches</p>
                <p className="text-2xl font-bold">17</p>
              </div>
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                <Calendar className="h-6 w-6 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Registered Teams</p>
                <p className="text-2xl font-bold">10</p>
              </div>
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                <Users className="h-6 w-6 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Matches Played</p>
                <p className="text-2xl font-bold">12</p>
              </div>
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                <BarChartIcon className="h-6 w-6 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Matches Remaining</p>
                <p className="text-2xl font-bold">5</p>
              </div>
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                <Trophy className="h-6 w-6 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Team Performance</CardTitle>
            <CardDescription>Points table for all teams</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={teamPerformance}
                  margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="points" fill="#8884d8" name="Points" />
                  <Bar dataKey="wins" fill="#82ca9d" name="Wins" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Match Distribution</CardTitle>
            <CardDescription>Matches by tournament stage</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] w-full flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <RPieChart>
                  <Pie
                    data={matchTypeData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {matchTypeData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </RPieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Top Performers</CardTitle>
          <CardDescription>Best players in the tournament</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-base font-medium">Top Run Scorers</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {playerStats.sort((a, b) => b.runs - a.runs).slice(0, 3).map((player, index) => (
                      <div key={player.name} className="flex items-center gap-2">
                        <div className="flex-shrink-0 w-6 text-muted-foreground font-medium">{index + 1}.</div>
                        <Avatar className="h-8 w-8">
                          <AvatarFallback>{player.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div className="min-w-0 flex-1">
                          <p className="text-sm font-medium truncate">{player.name}</p>
                          <p className="text-xs text-muted-foreground truncate">{player.team}</p>
                        </div>
                        <div className="text-sm font-bold">{player.runs}</div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-base font-medium">Top Wicket Takers</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {playerStats.sort((a, b) => b.wickets - a.wickets).slice(0, 3).map((player, index) => (
                      <div key={player.name} className="flex items-center gap-2">
                        <div className="flex-shrink-0 w-6 text-muted-foreground font-medium">{index + 1}.</div>
                        <Avatar className="h-8 w-8">
                          <AvatarFallback>{player.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div className="min-w-0 flex-1">
                          <p className="text-sm font-medium truncate">{player.name}</p>
                          <p className="text-xs text-muted-foreground truncate">{player.team}</p>
                        </div>
                        <div className="text-sm font-bold">{player.wickets}</div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TournamentStatistics;
