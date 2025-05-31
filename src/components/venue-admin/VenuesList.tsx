
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { MapPin, Edit, Trash, Search, Eye } from 'lucide-react';
import { Venue } from './types';

interface VenuesListProps {
  venues: Venue[];
  onEdit: (venue: Venue) => void;
  onDelete: (id: string) => void;
}

const VenuesList: React.FC<VenuesListProps> = ({ 
  venues, 
  onEdit, 
  onDelete 
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [venueToDelete, setVenueToDelete] = useState<Venue | null>(null);

  const filteredVenues = venues.filter(venue => 
    venue.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    venue.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
    venue.sports.some(sport => sport.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const handleDeleteClick = (venue: Venue) => {
    setVenueToDelete(venue);
    setDeleteConfirmOpen(true);
  };

  const confirmDelete = () => {
    if (venueToDelete) {
      onDelete(venueToDelete.id);
      setDeleteConfirmOpen(false);
      setVenueToDelete(null);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-2">
        <div className="relative flex-grow">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search venues..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Venue</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>Sports</TableHead>
              <TableHead>Price/Hour</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredVenues.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="h-24 text-center">
                  No venues found.
                </TableCell>
              </TableRow>
            ) : (
              filteredVenues.map((venue) => (
                <TableRow key={venue.id}>
                  <TableCell className="font-medium">{venue.name}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <MapPin className="h-3.5 w-3.5 text-muted-foreground" />
                      <span>{venue.address}</span>
                    </div>
                  </TableCell>
                  <TableCell>{venue.sports.join(', ')}</TableCell>
                  <TableCell>${venue.pricePerHour}</TableCell>
                  <TableCell>
                    <span className={`inline-flex rounded-full px-2 py-1 text-xs font-medium ${
                      venue.available 
                        ? 'bg-green-100 text-green-700' 
                        : 'bg-red-100 text-red-700'
                    }`}>
                      {venue.available ? 'Available' : 'Unavailable'}
                    </span>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button 
                        variant="outline" 
                        size="icon" 
                        asChild
                      >
                        <Link to={`/venue/${venue.id}`}>
                          <Eye className="h-4 w-4" />
                          <span className="sr-only">View venue</span>
                        </Link>
                      </Button>
                      <Button 
                        variant="outline" 
                        size="icon"
                        onClick={() => onEdit(venue)}
                      >
                        <Edit className="h-4 w-4" />
                        <span className="sr-only">Edit venue</span>
                      </Button>
                      <Button 
                        variant="outline" 
                        size="icon"
                        onClick={() => handleDeleteClick(venue)}
                      >
                        <Trash className="h-4 w-4" />
                        <span className="sr-only">Delete venue</span>
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      <Dialog open={deleteConfirmOpen} onOpenChange={setDeleteConfirmOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete "{venueToDelete?.name}"? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteConfirmOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={confirmDelete}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default VenuesList;
