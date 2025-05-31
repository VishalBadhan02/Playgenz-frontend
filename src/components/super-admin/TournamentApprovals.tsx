
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
  Search, MoreHorizontal, Check, X, Eye, Filter, Pencil
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

type TournamentStatus = 'pending' | 'approved' | 'rejected' | 'completed' | 'in_progress' | 'cancelled';

interface Tournament {
  id: string;
  name: string;
  organizer: string;
  sport: string;
  startDate: string;
  endDate: string;
  location: string;
  status: TournamentStatus;
  teamsCount: number;
  imageUrl?: string;
}

// Mock data for tournaments
const mockTournaments: Tournament[] = [
  {
    id: '1',
    name: 'Summer Basketball Championship',
    organizer: 'John Smith',
    sport: 'Basketball',
    startDate: '2023-07-10',
    endDate: '2023-07-15',
    location: 'Downtown Sports Complex',
    status: 'pending',
    teamsCount: 16,
    imageUrl: 'https://images.unsplash.com/photo-1568287556346-8c70d3d3746c',
  },
  {
    id: '2',
    name: 'City Soccer League',
    organizer: 'Sarah Johnson',
    sport: 'Soccer',
    startDate: '2023-08-05',
    endDate: '2023-09-20',
    location: 'Central Fields',
    status: 'approved',
    teamsCount: 12,
    imageUrl: 'https://images.unsplash.com/photo-1546519638-68e109498ffc',
  },
  {
    id: '3',
    name: 'Tennis Open Tournament',
    organizer: 'Michael Wong',
    sport: 'Tennis',
    startDate: '2023-06-15',
    endDate: '2023-06-20',
    location: 'Riverside Courts',
    status: 'completed',
    teamsCount: 32,
    imageUrl: 'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e',
  },
  {
    id: '4',
    name: 'Volleyball Beach Championship',
    organizer: 'Emma Garcia',
    sport: 'Volleyball',
    startDate: '2023-07-25',
    endDate: '2023-07-30',
    location: 'Sunset Beach',
    status: 'in_progress',
    teamsCount: 24,
    imageUrl: 'https://images.unsplash.com/photo-1635211646344-98b7ca3ffe62',
  },
  {
    id: '5',
    name: 'Winter Basketball Tournament',
    organizer: 'James Wilson',
    sport: 'Basketball',
    startDate: '2023-12-10',
    endDate: '2023-12-15',
    location: 'Central Sports Arena',
    status: 'pending',
    teamsCount: 16,
    imageUrl: 'https://images.unsplash.com/photo-1574361440868-1260ae643df0',
  },
  {
    id: '6',
    name: 'Regional Swimming Competition',
    organizer: 'Olivia Taylor',
    sport: 'Swimming',
    startDate: '2023-08-10',
    endDate: '2023-08-12',
    location: 'Olympian Sports Center',
    status: 'rejected',
    teamsCount: 20,
    imageUrl: 'https://images.unsplash.com/photo-1565992441121-4367c2967103',
  }
];

const getStatusBadge = (status: TournamentStatus) => {
  switch (status) {
    case 'pending':
      return <Badge className="bg-yellow-500">Pending Review</Badge>;
    case 'approved':
      return <Badge className="bg-green-500">Approved</Badge>;
    case 'rejected':
      return <Badge className="bg-red-500">Rejected</Badge>;
    case 'completed':
      return <Badge className="bg-blue-500">Completed</Badge>;
    case 'in_progress':
      return <Badge className="bg-purple-500">In Progress</Badge>;
    case 'cancelled':
      return <Badge className="bg-gray-500">Cancelled</Badge>;
    default:
      return <Badge variant="outline">Unknown</Badge>;
  }
};

const TournamentApprovals = () => {
  const isMobile = useIsMobile();
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTournament, setSelectedTournament] = useState<Tournament | null>(null);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [statusFilterValue, setStatusFilterValue] = useState<string>('all-statuses');
  const [sportFilterValue, setSportFilterValue] = useState<string>('all-sports');

  // Filter tournaments based on search query and filters
  const filteredTournaments = mockTournaments.filter(tournament => {
    const matchesSearch = tournament.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                           tournament.organizer.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatusFilter = statusFilterValue === 'all-statuses' ? true : tournament.status === statusFilterValue;
    const matchesSportFilter = sportFilterValue === 'all-sports' ? true : tournament.sport === sportFilterValue;
    
    return matchesSearch && matchesStatusFilter && matchesSportFilter;
  });

  const handleActionClick = (action: string, tournament: Tournament) => {
    switch (action) {
      case 'view':
        setSelectedTournament(tournament);
        setDetailsOpen(true);
        break;
      case 'approve':
        toast({
          title: "Tournament Approved",
          description: `${tournament.name} has been approved and is now live.`
        });
        break;
      case 'reject':
        toast({
          title: "Tournament Rejected",
          description: `${tournament.name} has been rejected.`
        });
        break;
      case 'edit':
        // In a real app, this would navigate to an edit page or open an edit modal
        toast({
          title: "Edit Tournament",
          description: `Edit functionality for ${tournament.name} would open here.`
        });
        break;
      default:
        break;
    }
  };

  const TournamentCard = ({ tournament }: { tournament: Tournament }) => (
    <Card className="mb-4">
      <CardContent className="pt-6">
        <div className="flex flex-col gap-4">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="font-semibold text-lg">{tournament.name}</h3>
              <p className="text-sm text-muted-foreground">Organizer: {tournament.organizer}</p>
            </div>
            <div>{getStatusBadge(tournament.status)}</div>
          </div>
          
          <div className="grid grid-cols-2 gap-2 text-sm">
            <div>
              <span className="text-muted-foreground">Sport: </span>
              <span>{tournament.sport}</span>
            </div>
            <div>
              <span className="text-muted-foreground">Teams: </span>
              <span>{tournament.teamsCount}</span>
            </div>
            <div>
              <span className="text-muted-foreground">Start: </span>
              <span>{tournament.startDate}</span>
            </div>
            <div>
              <span className="text-muted-foreground">End: </span>
              <span>{tournament.endDate}</span>
            </div>
          </div>
          
          <div className="flex justify-between">
            <Button size="sm" onClick={() => handleActionClick('view', tournament)}>
              <Eye className="mr-2 h-4 w-4" />
              View Details
            </Button>
            
            {tournament.status === 'pending' && (
              <div className="flex gap-2">
                <Button 
                  size="sm" 
                  variant="outline" 
                  className="text-red-500 border-red-500 hover:bg-red-50"
                  onClick={() => handleActionClick('reject', tournament)}
                >
                  <X className="mr-2 h-4 w-4" />
                  Reject
                </Button>
                <Button 
                  size="sm" 
                  variant="outline" 
                  className="text-green-500 border-green-500 hover:bg-green-50"
                  onClick={() => handleActionClick('approve', tournament)}
                >
                  <Check className="mr-2 h-4 w-4" />
                  Approve
                </Button>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="w-full p-4 md:p-6">
      <div className="flex flex-col gap-4 mb-6">
        <h2 className="text-xl font-semibold">Tournament Management</h2>
        <p className="text-muted-foreground">
          Review, approve, and manage tournaments
        </p>
        
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search tournaments..."
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
                <SelectItem value="approved">Approved</SelectItem>
                <SelectItem value="rejected">Rejected</SelectItem>
                <SelectItem value="in_progress">In Progress</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="cancelled">Cancelled</SelectItem>
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
                <SelectItem value="Volleyball">Volleyball</SelectItem>
                <SelectItem value="Swimming">Swimming</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Mobile view */}
      {isMobile ? (
        <div>
          {filteredTournaments.map(tournament => (
            <TournamentCard key={tournament.id} tournament={tournament} />
          ))}
        </div>
      ) : (
        /* Desktop view */
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[300px]">Tournament</TableHead>
                <TableHead>Sport</TableHead>
                <TableHead>Dates</TableHead>
                <TableHead>Teams</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredTournaments.map(tournament => (
                <TableRow key={tournament.id}>
                  <TableCell>
                    <div>
                      <div className="font-medium">{tournament.name}</div>
                      <div className="text-sm text-muted-foreground">By {tournament.organizer}</div>
                    </div>
                  </TableCell>
                  <TableCell>{tournament.sport}</TableCell>
                  <TableCell>
                    <div className="text-sm">
                      <div>Start: {tournament.startDate}</div>
                      <div>End: {tournament.endDate}</div>
                    </div>
                  </TableCell>
                  <TableCell>{tournament.teamsCount}</TableCell>
                  <TableCell>{getStatusBadge(tournament.status)}</TableCell>
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
                        <DropdownMenuItem onClick={() => handleActionClick('view', tournament)}>
                          <Eye className="mr-2 h-4 w-4" />
                          View Details
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleActionClick('edit', tournament)}>
                          <Pencil className="mr-2 h-4 w-4" />
                          Edit Tournament
                        </DropdownMenuItem>
                        
                        {tournament.status === 'pending' && (
                          <>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem 
                              className="text-green-600"
                              onClick={() => handleActionClick('approve', tournament)}
                            >
                              <Check className="mr-2 h-4 w-4" />
                              Approve
                            </DropdownMenuItem>
                            <DropdownMenuItem 
                              className="text-red-600"
                              onClick={() => handleActionClick('reject', tournament)}
                            >
                              <X className="mr-2 h-4 w-4" />
                              Reject
                            </DropdownMenuItem>
                          </>
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

      {/* Tournament details dialog */}
      {selectedTournament && (
        <Dialog open={detailsOpen} onOpenChange={setDetailsOpen}>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Tournament Details</DialogTitle>
              <DialogDescription>
                Review tournament information
              </DialogDescription>
            </DialogHeader>
            <div className="flex flex-col gap-4 py-4">
              <div className="aspect-video w-full overflow-hidden rounded-md">
                <img 
                  src={selectedTournament.imageUrl || 'https://images.unsplash.com/photo-1568287556346-8c70d3d3746c'} 
                  alt={selectedTournament.name}
                  className="h-full w-full object-cover"
                />
              </div>
              
              <div>
                <h3 className="text-xl font-semibold">{selectedTournament.name}</h3>
                <p className="text-muted-foreground">Organized by {selectedTournament.organizer}</p>
              </div>
              
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <p className="text-sm text-muted-foreground">Sport</p>
                  <p className="font-medium">{selectedTournament.sport}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Location</p>
                  <p className="font-medium">{selectedTournament.location}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Start Date</p>
                  <p className="font-medium">{selectedTournament.startDate}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">End Date</p>
                  <p className="font-medium">{selectedTournament.endDate}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Teams</p>
                  <p className="font-medium">{selectedTournament.teamsCount}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Status</p>
                  <div>{getStatusBadge(selectedTournament.status)}</div>
                </div>
              </div>
            </div>
            <DialogFooter className="flex gap-2">
              {selectedTournament.status === 'pending' && (
                <>
                  <Button 
                    variant="outline" 
                    className="text-red-500 border-red-500 hover:bg-red-50"
                    onClick={() => {
                      handleActionClick('reject', selectedTournament);
                      setDetailsOpen(false);
                    }}
                  >
                    <X className="mr-2 h-4 w-4" />
                    Reject
                  </Button>
                  <Button 
                    variant="outline" 
                    className="text-green-500 border-green-500 hover:bg-green-50"
                    onClick={() => {
                      handleActionClick('approve', selectedTournament);
                      setDetailsOpen(false);
                    }}
                  >
                    <Check className="mr-2 h-4 w-4" />
                    Approve
                  </Button>
                </>
              )}
              <Button onClick={() => setDetailsOpen(false)}>Close</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default TournamentApprovals;
