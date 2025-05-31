
// Updating only the relevant parts of this file to fix Select.Item values

import React, { useState } from 'react';
import { 
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow 
} from '@/components/ui/table';
import { 
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, 
  DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { 
  Search, MoreHorizontal, CheckCircle, XCircle, Eye, Calendar, User, MapPin, Clock, AlertTriangle
} from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import { useToast } from '@/hooks/use-toast';
import { 
  Dialog, DialogContent, DialogDescription, DialogFooter, 
  DialogHeader, DialogTitle 
} from '@/components/ui/dialog';
import { Card, CardContent } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type MatchStatus = 'pending' | 'verified' | 'disputed' | 'cancelled' | 'completed';

interface Team {
  id: string;
  name: string;
  logo?: string;
}

interface MatchScore {
  teamA: number;
  teamB: number;
}

interface Match {
  id: string;
  teamA: Team;
  teamB: Team;
  date: string;
  time: string;
  venue: string;
  sport: string;
  status: MatchStatus;
  score?: MatchScore;
  submitted_by: string;
  tournament_id?: string;
  tournament_name?: string;
  dispute_reason?: string;
}

// Mock data for matches
const mockMatches: Match[] = [
  {
    id: '1',
    teamA: { id: 't1', name: 'Thunderbolts', logo: 'https://i.pravatar.cc/150?img=1' },
    teamB: { id: 't2', name: 'Storm Chasers', logo: 'https://i.pravatar.cc/150?img=2' },
    date: '2023-06-15',
    time: '18:00 - 20:00',
    venue: 'Central Sports Arena',
    sport: 'Basketball',
    status: 'pending',
    score: { teamA: 85, teamB: 77 },
    submitted_by: 'John Smith',
    tournament_id: '1',
    tournament_name: 'Summer Basketball Championship'
  },
  {
    id: '2',
    teamA: { id: 't3', name: 'Tigers', logo: 'https://i.pravatar.cc/150?img=3' },
    teamB: { id: 't4', name: 'Lions', logo: 'https://i.pravatar.cc/150?img=4' },
    date: '2023-06-16',
    time: '16:00 - 18:00',
    venue: 'Downtown Sports Complex',
    sport: 'Basketball',
    status: 'verified',
    score: { teamA: 92, teamB: 88 },
    submitted_by: 'Sarah Johnson',
    tournament_id: '1',
    tournament_name: 'Summer Basketball Championship'
  },
  {
    id: '3',
    teamA: { id: 't5', name: 'Red Hawks', logo: 'https://i.pravatar.cc/150?img=5' },
    teamB: { id: 't6', name: 'Blue Eagles', logo: 'https://i.pravatar.cc/150?img=6' },
    date: '2023-06-17',
    time: '19:00 - 21:00',
    venue: 'Riverside Courts',
    sport: 'Basketball',
    status: 'disputed',
    score: { teamA: 76, teamB: 78 },
    submitted_by: 'Michael Wong',
    tournament_id: '1',
    tournament_name: 'Summer Basketball Championship',
    dispute_reason: 'Score inaccuracy reported by Red Hawks team captain. Claims score was 78-76 in their favor.'
  },
  {
    id: '4',
    teamA: { id: 't7', name: 'Wolves', logo: 'https://i.pravatar.cc/150?img=7' },
    teamB: { id: 't8', name: 'Foxes', logo: 'https://i.pravatar.cc/150?img=8' },
    date: '2023-06-18',
    time: '15:00 - 17:00',
    venue: 'Central Sports Arena',
    sport: 'Basketball',
    status: 'cancelled',
    submitted_by: 'Emma Garcia',
    tournament_id: '1',
    tournament_name: 'Summer Basketball Championship'
  },
  {
    id: '5',
    teamA: { id: 't9', name: 'United FC', logo: 'https://i.pravatar.cc/150?img=9' },
    teamB: { id: 't10', name: 'City FC', logo: 'https://i.pravatar.cc/150?img=10' },
    date: '2023-06-20',
    time: '18:00 - 20:00',
    venue: 'Central Fields',
    sport: 'Soccer',
    status: 'pending',
    score: { teamA: 2, teamB: 2 },
    submitted_by: 'James Wilson',
  },
  {
    id: '6',
    teamA: { id: 't11', name: 'Dolphins', logo: 'https://i.pravatar.cc/150?img=11' },
    teamB: { id: 't12', name: 'Sharks', logo: 'https://i.pravatar.cc/150?img=12' },
    date: '2023-06-21',
    time: '14:00 - 16:00',
    venue: 'Olympian Sports Center',
    sport: 'Swimming',
    status: 'completed',
    score: { teamA: 72, teamB: 68 },
    submitted_by: 'Olivia Taylor',
  }
];

const getStatusBadge = (status: MatchStatus) => {
  switch (status) {
    case 'pending':
      return <Badge className="bg-yellow-500">Pending Verification</Badge>;
    case 'verified':
      return <Badge className="bg-green-500">Verified</Badge>;
    case 'disputed':
      return <Badge className="bg-red-500">Disputed</Badge>;
    case 'cancelled':
      return <Badge className="bg-gray-500">Cancelled</Badge>;
    case 'completed':
      return <Badge className="bg-blue-500">Completed</Badge>;
    default:
      return <Badge variant="outline">Unknown</Badge>;
  }
};

const MatchVerification = () => {
  const isMobile = useIsMobile();
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedMatch, setSelectedMatch] = useState<Match | null>(null);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [statusFilterValue, setStatusFilterValue] = useState<string>('all-statuses');
  const [sportFilterValue, setSportFilterValue] = useState<string>('all-sports');

  // Filter matches based on search query and filters
  const filteredMatches = mockMatches.filter(match => {
    const matchesSearch = 
      match.teamA.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
      match.teamB.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      match.venue.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatusFilter = statusFilterValue === 'all-statuses' ? true : match.status === statusFilterValue;
    const matchesSportFilter = sportFilterValue === 'all-sports' ? true : match.sport === sportFilterValue;
    
    return matchesSearch && matchesStatusFilter && matchesSportFilter;
  });

  const handleActionClick = (action: string, match: Match) => {
    switch (action) {
      case 'view':
        setSelectedMatch(match);
        setDetailsOpen(true);
        break;
      case 'verify':
        toast({
          title: "Match Verified",
          description: `The match between ${match.teamA.name} and ${match.teamB.name} has been verified.`
        });
        break;
      case 'dispute':
        toast({
          title: "Match Disputed",
          description: `The match between ${match.teamA.name} and ${match.teamB.name} has been marked as disputed.`
        });
        break;
      case 'resolve':
        toast({
          title: "Dispute Resolved",
          description: `The dispute for the match between ${match.teamA.name} and ${match.teamB.name} has been resolved.`
        });
        break;
      default:
        break;
    }
  };

  const MatchCard = ({ match }: { match: Match }) => (
    <Card className="mb-4">
      <CardContent className="pt-6">
        <div className="flex flex-col gap-4">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="font-semibold text-lg">{match.teamA.name} vs {match.teamB.name}</h3>
              <p className="text-sm text-muted-foreground flex items-center gap-1">
                <MapPin className="h-3 w-3" />
                {match.venue}
              </p>
            </div>
            <div>{getStatusBadge(match.status)}</div>
          </div>
          
          <div className="grid grid-cols-2 gap-2 text-sm">
            <div className="flex items-center gap-1">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <span>{match.date}</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4 text-muted-foreground" />
              <span>{match.time}</span>
            </div>
            <div className="flex items-center gap-1">
              <User className="h-4 w-4 text-muted-foreground" />
              <span>Submitted by: {match.submitted_by}</span>
            </div>
            <div>
              <Badge variant="outline">{match.sport}</Badge>
            </div>
          </div>
          
          {match.score && (
            <div className="border rounded-md p-2 flex justify-around items-center">
              <div className="text-center">
                <div className="font-semibold">{match.teamA.name}</div>
                <div className="text-2xl font-bold">{match.score.teamA}</div>
              </div>
              <div className="text-center text-xl font-bold">:</div>
              <div className="text-center">
                <div className="font-semibold">{match.teamB.name}</div>
                <div className="text-2xl font-bold">{match.score.teamB}</div>
              </div>
            </div>
          )}
          
          {match.dispute_reason && (
            <div className="bg-red-50 text-red-800 p-3 rounded-md text-sm flex gap-2">
              <AlertTriangle className="h-4 w-4 flex-shrink-0 mt-0.5" />
              <div>{match.dispute_reason}</div>
            </div>
          )}
          
          <div className="flex justify-between">
            <Button size="sm" onClick={() => handleActionClick('view', match)}>
              <Eye className="mr-2 h-4 w-4" />
              View Details
            </Button>
            
            {match.status === 'pending' && (
              <div className="flex gap-2">
                <Button 
                  size="sm" 
                  variant="outline" 
                  className="text-red-500 border-red-500 hover:bg-red-50"
                  onClick={() => handleActionClick('dispute', match)}
                >
                  <XCircle className="mr-2 h-4 w-4" />
                  Dispute
                </Button>
                <Button 
                  size="sm" 
                  variant="outline" 
                  className="text-green-500 border-green-500 hover:bg-green-50"
                  onClick={() => handleActionClick('verify', match)}
                >
                  <CheckCircle className="mr-2 h-4 w-4" />
                  Verify
                </Button>
              </div>
            )}
            
            {match.status === 'disputed' && (
              <Button 
                size="sm" 
                variant="outline" 
                className="text-blue-500 border-blue-500 hover:bg-blue-50"
                onClick={() => handleActionClick('resolve', match)}
              >
                <CheckCircle className="mr-2 h-4 w-4" />
                Resolve Dispute
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="w-full p-4 md:p-6">
      <div className="flex flex-col gap-4 mb-6">
        <h2 className="text-xl font-semibold">Match Verification</h2>
        <p className="text-muted-foreground">
          Verify, dispute, and manage match results
        </p>
        
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search matches..."
              className="pl-9"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <div className="flex gap-2">
            <Select
              value={statusFilterValue}
              onValueChange={setStatusFilterValue}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all-statuses">All Statuses</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="verified">Verified</SelectItem>
                <SelectItem value="disputed">Disputed</SelectItem>
                <SelectItem value="cancelled">Cancelled</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
              </SelectContent>
            </Select>
            
            <Select
              value={sportFilterValue}
              onValueChange={setSportFilterValue}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by sport" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all-sports">All Sports</SelectItem>
                <SelectItem value="Basketball">Basketball</SelectItem>
                <SelectItem value="Soccer">Soccer</SelectItem>
                <SelectItem value="Tennis">Tennis</SelectItem>
                <SelectItem value="Swimming">Swimming</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Mobile view */}
      {isMobile ? (
        <div>
          {filteredMatches.map(match => (
            <MatchCard key={match.id} match={match} />
          ))}
        </div>
      ) : (
        /* Desktop view */
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[280px]">Match</TableHead>
                <TableHead>Date & Time</TableHead>
                <TableHead>Venue</TableHead>
                <TableHead>Score</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredMatches.map(match => (
                <TableRow key={match.id}>
                  <TableCell>
                    <div>
                      <div className="font-medium">{match.teamA.name} vs {match.teamB.name}</div>
                      <div className="text-sm text-muted-foreground flex items-center gap-1">
                        <Badge variant="outline" className="text-xs">{match.sport}</Badge>
                        {match.tournament_name && (
                          <span className="text-xs ml-1">
                            in {match.tournament_name}
                          </span>
                        )}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-3 w-3 text-muted-foreground" />
                        {match.date}
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-3 w-3 text-muted-foreground" />
                        {match.time}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{match.venue}</TableCell>
                  <TableCell>
                    {match.score ? (
                      <div className="font-medium">
                        {match.score.teamA} - {match.score.teamB}
                      </div>
                    ) : (
                      <span className="text-muted-foreground">Not played</span>
                    )}
                  </TableCell>
                  <TableCell>{getStatusBadge(match.status)}</TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={() => handleActionClick('view', match)}>
                          <Eye className="mr-2 h-4 w-4" />
                          View Details
                        </DropdownMenuItem>
                        
                        {match.status === 'pending' && (
                          <>
                            <DropdownMenuItem onClick={() => handleActionClick('verify', match)}>
                              <CheckCircle className="mr-2 h-4 w-4 text-green-600" />
                              Verify Match
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleActionClick('dispute', match)}>
                              <XCircle className="mr-2 h-4 w-4 text-red-600" />
                              Dispute Result
                            </DropdownMenuItem>
                          </>
                        )}
                        
                        {match.status === 'disputed' && (
                          <DropdownMenuItem onClick={() => handleActionClick('resolve', match)}>
                            <CheckCircle className="mr-2 h-4 w-4 text-blue-600" />
                            Resolve Dispute
                          </DropdownMenuItem>
                        )}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}

      {/* Match details dialog */}
      {selectedMatch && (
        <Dialog open={detailsOpen} onOpenChange={setDetailsOpen}>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Match Details</DialogTitle>
              <DialogDescription>
                Review match information and verification status
              </DialogDescription>
            </DialogHeader>
            <div className="flex flex-col gap-4 py-4">
              <div>
                <h3 className="text-xl font-semibold">{selectedMatch.teamA.name} vs {selectedMatch.teamB.name}</h3>
                <div className="flex items-center gap-2 mt-1 text-sm">
                  <Badge variant="outline">{selectedMatch.sport}</Badge>
                  {selectedMatch.tournament_name && (
                    <span className="text-muted-foreground">
                      in {selectedMatch.tournament_name}
                    </span>
                  )}
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <p className="text-sm text-muted-foreground">Date</p>
                  <p className="font-medium">{selectedMatch.date}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Time</p>
                  <p className="font-medium">{selectedMatch.time}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Venue</p>
                  <p className="font-medium">{selectedMatch.venue}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Status</p>
                  <div>{getStatusBadge(selectedMatch.status)}</div>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Submitted By</p>
                  <p className="font-medium">{selectedMatch.submitted_by}</p>
                </div>
              </div>
              
              {selectedMatch.score && (
                <div className="border rounded-md p-4 mt-2">
                  <p className="text-sm text-muted-foreground mb-2">Final Score</p>
                  <div className="flex justify-around items-center">
                    <div className="text-center">
                      <div className="font-semibold">{selectedMatch.teamA.name}</div>
                      <div className="text-3xl font-bold">{selectedMatch.score.teamA}</div>
                    </div>
                    <div className="text-center text-2xl font-bold">:</div>
                    <div className="text-center">
                      <div className="font-semibold">{selectedMatch.teamB.name}</div>
                      <div className="text-3xl font-bold">{selectedMatch.score.teamB}</div>
                    </div>
                  </div>
                </div>
              )}
              
              {selectedMatch.dispute_reason && (
                <div className="bg-red-50 text-red-800 p-4 rounded-md mt-2">
                  <p className="font-medium flex items-center gap-2">
                    <AlertTriangle className="h-4 w-4" />
                    Dispute Information
                  </p>
                  <p className="mt-1 text-sm">{selectedMatch.dispute_reason}</p>
                </div>
              )}
            </div>
            <DialogFooter className="flex gap-2">
              {selectedMatch.status === 'pending' && (
                <>
                  <Button 
                    variant="outline" 
                    className="text-red-500 border-red-500 hover:bg-red-50"
                    onClick={() => {
                      handleActionClick('dispute', selectedMatch);
                      setDetailsOpen(false);
                    }}
                  >
                    <XCircle className="mr-2 h-4 w-4" />
                    Dispute
                  </Button>
                  <Button 
                    variant="outline" 
                    className="text-green-500 border-green-500 hover:bg-green-50"
                    onClick={() => {
                      handleActionClick('verify', selectedMatch);
                      setDetailsOpen(false);
                    }}
                  >
                    <CheckCircle className="mr-2 h-4 w-4" />
                    Verify
                  </Button>
                </>
              )}
              
              {selectedMatch.status === 'disputed' && (
                <Button 
                  variant="outline" 
                  className="text-blue-500 border-blue-500 hover:bg-blue-50"
                  onClick={() => {
                    handleActionClick('resolve', selectedMatch);
                    setDetailsOpen(false);
                  }}
                >
                  <CheckCircle className="mr-2 h-4 w-4" />
                  Resolve Dispute
                </Button>
              )}
              
              <Button onClick={() => setDetailsOpen(false)}>Close</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default MatchVerification;
