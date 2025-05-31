
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
  Search, MoreHorizontal, Check, X, Eye, Filter, Pencil, MapPin, CircleDollarSign, Clock
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
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Venue } from '@/components/venue-admin/types';

// Mock data for venues
const mockVenues: Venue[] = [
  {
    id: '1',
    name: 'Central Sports Arena',
    address: '123 Main St, Downtown',
    description: 'A modern sports facility with multiple courts and excellent amenities.',
    sports: ['Basketball', 'Volleyball'],
    pricePerHour: 50,
    rating: 4.5,
    available: true,
    imageUrl: 'https://images.unsplash.com/photo-1568287556346-8c70d3d3746c',
    facilities: ['Changing Rooms', 'Parking', 'Cafeteria', 'Scoreboard'],
  },
  {
    id: '2',
    name: 'Riverside Courts',
    address: '456 River Rd, Westside',
    description: 'Located by the river with beautiful outdoor and indoor courts.',
    sports: ['Basketball', 'Tennis'],
    pricePerHour: 40,
    rating: 4.2,
    available: true,
    imageUrl: 'https://images.unsplash.com/photo-1546519638-68e109498ffc',
    facilities: ['Changing Rooms', 'Parking', 'Lighting'],
  },
  {
    id: '3',
    name: 'Downtown Sports Complex',
    address: '789 Center Ave, Downtown',
    description: 'A comprehensive sports complex with a variety of facilities.',
    sports: ['Football', 'Basketball', 'Swimming'],
    pricePerHour: 75,
    rating: 4.8,
    available: false,
    imageUrl: 'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e',
    facilities: ['Changing Rooms', 'Parking', 'Cafeteria', 'Gym', 'Scoreboard', 'Seating Area'],
  },
  {
    id: '4',
    name: 'Sunset Beach Volleyball Courts',
    address: '101 Beach Blvd, Coastside',
    description: 'Premium beach volleyball courts with amazing sunset views.',
    sports: ['Volleyball'],
    pricePerHour: 35,
    rating: 4.6,
    available: true,
    imageUrl: 'https://images.unsplash.com/photo-1635211646344-98b7ca3ffe62',
    facilities: ['Beach Showers', 'Equipment Rental', 'Snack Bar'],
  },
  {
    id: '5',
    name: 'Olympian Sports Center',
    address: '202 Olympic Way, Northside',
    description: 'Olympic-sized facilities for swimming, track, and more.',
    sports: ['Swimming', 'Track', 'Gymnastics'],
    pricePerHour: 90,
    rating: 4.9,
    available: true,
    imageUrl: 'https://images.unsplash.com/photo-1565992441121-4367c2967103',
    facilities: ['Olympic Pool', 'Track Field', 'Gym', 'Locker Rooms', 'Sauna', 'Cafe'],
  }
];

const VenueManagement = () => {
  const isMobile = useIsMobile();
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedVenue, setSelectedVenue] = useState<Venue | null>(null);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [availabilityFilter, setAvailabilityFilter] = useState<string>('all-venues');
  const [sportFilter, setSportFilter] = useState<string>('all-sports');

  // Filter venues based on search query and filters
  const filteredVenues = mockVenues.filter(venue => {
    const matchesSearch = venue.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          venue.address.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesAvailabilityFilter = availabilityFilter === 'all-venues'
      ? true
      : (availabilityFilter === 'available' ? venue.available : !venue.available);
    
    const matchesSportFilter = sportFilter === 'all-sports'
      ? true
      : venue.sports.includes(sportFilter);
    
    return matchesSearch && matchesAvailabilityFilter && matchesSportFilter;
  });

  const handleActionClick = (action: string, venue: Venue) => {
    switch (action) {
      case 'view':
        setSelectedVenue(venue);
        setDetailsOpen(true);
        break;
      case 'edit':
        // In a real app, this would navigate to an edit page or open an edit modal
        toast({
          title: "Edit Venue",
          description: `Edit functionality for ${venue.name} would open here.`
        });
        break;
      case 'toggle-availability':
        toast({
          title: venue.available ? "Venue Unavailable" : "Venue Available",
          description: `${venue.name} is now ${venue.available ? 'unavailable' : 'available'} for booking.`
        });
        break;
      case 'delete':
        toast({
          title: "Venue Deleted",
          description: `${venue.name} has been deleted.`
        });
        break;
      default:
        break;
    }
  };

  const VenueCard = ({ venue }: { venue: Venue }) => (
    <Card className="mb-4">
      <CardContent className="pt-6">
        <div className="flex flex-col gap-4">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="font-semibold text-lg">{venue.name}</h3>
              <p className="text-sm text-muted-foreground flex items-center gap-1">
                <MapPin className="h-3 w-3" />
                {venue.address}
              </p>
            </div>
            <Badge className={venue.available ? "bg-green-500" : "bg-red-500"}>
              {venue.available ? "Available" : "Unavailable"}
            </Badge>
          </div>
          
          <div className="grid grid-cols-2 gap-2 text-sm">
            <div className="flex items-center gap-1">
              <CircleDollarSign className="h-4 w-4 text-muted-foreground" />
              <span>${venue.pricePerHour}/hour</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="text-muted-foreground">Rating: </span>
              <span className="font-medium">{venue.rating}/5.0</span>
            </div>
          </div>
          
          <div className="flex flex-wrap gap-1">
            {venue.sports.map(sport => (
              <Badge key={sport} variant="outline" className="bg-primary/10">
                {sport}
              </Badge>
            ))}
          </div>
          
          <div className="flex flex-wrap gap-1">
            {venue.facilities.slice(0, 3).map(facility => (
              <Badge key={facility} variant="secondary" className="text-xs">
                {facility}
              </Badge>
            ))}
            {venue.facilities.length > 3 && (
              <Badge variant="secondary" className="text-xs">
                +{venue.facilities.length - 3} more
              </Badge>
            )}
          </div>
          
          <div className="flex justify-between">
            <Button size="sm" onClick={() => handleActionClick('view', venue)}>
              <Eye className="mr-2 h-4 w-4" />
              View Details
            </Button>
            
            <div className="flex items-center gap-2">
              <Switch 
                id={`venue-status-${venue.id}`}
                checked={venue.available}
                onCheckedChange={() => handleActionClick('toggle-availability', venue)}
              />
              <Label htmlFor={`venue-status-${venue.id}`} className="text-sm">
                {venue.available ? 'Available' : 'Unavailable'}
              </Label>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="w-full p-4 md:p-6">
      <div className="flex flex-col gap-4 mb-6">
        <h2 className="text-xl font-semibold">Venue Management</h2>
        <p className="text-muted-foreground">
          Manage all sports venues and their availability
        </p>
        
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search venues..."
              className="pl-9"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <div className="flex gap-2">
            <Select
              value={availabilityFilter}
              onValueChange={setAvailabilityFilter}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by availability" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all-venues">All Venues</SelectItem>
                <SelectItem value="available">Available</SelectItem>
                <SelectItem value="unavailable">Unavailable</SelectItem>
              </SelectContent>
            </Select>
            
            <Select
              value={sportFilter}
              onValueChange={setSportFilter}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by sport" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all-sports">All Sports</SelectItem>
                <SelectItem value="Basketball">Basketball</SelectItem>
                <SelectItem value="Volleyball">Volleyball</SelectItem>
                <SelectItem value="Tennis">Tennis</SelectItem>
                <SelectItem value="Football">Football</SelectItem>
                <SelectItem value="Swimming">Swimming</SelectItem>
                <SelectItem value="Track">Track</SelectItem>
                <SelectItem value="Gymnastics">Gymnastics</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Mobile view */}
      {isMobile ? (
        <div>
          {filteredVenues.map(venue => (
            <VenueCard key={venue.id} venue={venue} />
          ))}
        </div>
      ) : (
        /* Desktop view */
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[280px]">Venue</TableHead>
                <TableHead>Sports</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Rating</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredVenues.map(venue => (
                <TableRow key={venue.id}>
                  <TableCell>
                    <div>
                      <div className="font-medium">{venue.name}</div>
                      <div className="text-sm text-muted-foreground flex items-center gap-1">
                        <MapPin className="h-3 w-3" />
                        {venue.address}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {venue.sports.map(sport => (
                        <Badge key={sport} variant="outline" className="bg-primary/10">
                          {sport}
                        </Badge>
                      ))}
                    </div>
                  </TableCell>
                  <TableCell className="font-medium">${venue.pricePerHour}/hour</TableCell>
                  <TableCell className="font-medium">{venue.rating}/5.0</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Switch 
                        id={`venue-table-status-${venue.id}`}
                        checked={venue.available}
                        onCheckedChange={() => handleActionClick('toggle-availability', venue)}
                      />
                      <Label htmlFor={`venue-table-status-${venue.id}`}>
                        {venue.available ? 'Available' : 'Unavailable'}
                      </Label>
                    </div>
                  </TableCell>
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
                        <DropdownMenuItem onClick={() => handleActionClick('view', venue)}>
                          <Eye className="mr-2 h-4 w-4" />
                          View Details
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleActionClick('edit', venue)}>
                          <Pencil className="mr-2 h-4 w-4" />
                          Edit Venue
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem 
                          className="text-red-600"
                          onClick={() => handleActionClick('delete', venue)}
                        >
                          Delete Venue
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}

      {/* Venue details dialog */}
      {selectedVenue && (
        <Dialog open={detailsOpen} onOpenChange={setDetailsOpen}>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Venue Details</DialogTitle>
              <DialogDescription>
                Review venue information
              </DialogDescription>
            </DialogHeader>
            <div className="flex flex-col gap-4 py-4">
              <div className="aspect-video w-full overflow-hidden rounded-md">
                <img 
                  src={selectedVenue.imageUrl} 
                  alt={selectedVenue.name}
                  className="h-full w-full object-cover"
                />
              </div>
              
              <div>
                <h3 className="text-xl font-semibold">{selectedVenue.name}</h3>
                <p className="text-muted-foreground flex items-center gap-1">
                  <MapPin className="h-3 w-3" />
                  {selectedVenue.address}
                </p>
              </div>
              
              <p className="text-sm">{selectedVenue.description}</p>
              
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <p className="text-sm text-muted-foreground">Price</p>
                  <p className="font-medium">${selectedVenue.pricePerHour}/hour</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Rating</p>
                  <p className="font-medium">{selectedVenue.rating}/5.0</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Status</p>
                  <div className="flex items-center gap-2">
                    <Switch 
                      id="venue-details-status"
                      checked={selectedVenue.available}
                      onCheckedChange={() => handleActionClick('toggle-availability', selectedVenue)}
                    />
                    <Label htmlFor="venue-details-status">
                      {selectedVenue.available ? 'Available' : 'Unavailable'}
                    </Label>
                  </div>
                </div>
              </div>
              
              <div>
                <p className="text-sm text-muted-foreground mb-2">Sports</p>
                <div className="flex flex-wrap gap-2">
                  {selectedVenue.sports.map(sport => (
                    <Badge key={sport} variant="outline" className="bg-primary/10">
                      {sport}
                    </Badge>
                  ))}
                </div>
              </div>
              
              <div>
                <p className="text-sm text-muted-foreground mb-2">Facilities</p>
                <div className="flex flex-wrap gap-2">
                  {selectedVenue.facilities.map(facility => (
                    <Badge key={facility} variant="secondary">
                      {facility}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
            <DialogFooter className="flex justify-between">
              <Button 
                variant="destructive" 
                onClick={() => {
                  handleActionClick('delete', selectedVenue);
                  setDetailsOpen(false);
                }}
              >
                Delete Venue
              </Button>
              <div className="flex gap-2">
                <Button 
                  variant="outline"
                  onClick={() => {
                    handleActionClick('edit', selectedVenue);
                    setDetailsOpen(false);
                  }}
                >
                  <Pencil className="mr-2 h-4 w-4" />
                  Edit
                </Button>
                <Button onClick={() => setDetailsOpen(false)}>Close</Button>
              </div>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default VenueManagement;
