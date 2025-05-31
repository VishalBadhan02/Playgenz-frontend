
import React, { useState } from 'react';
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Calendar, Trash, Search, Building, User } from 'lucide-react';
import { Booking, Venue } from './types';

interface BookingManagementProps {
  bookings: Booking[];
  venues: Venue[];
  onUpdateStatus: (booking: Booking) => void;
  onDelete: (id: string) => void;
}

const statusStyles = {
  confirmed: 'bg-green-100 text-green-700',
  pending: 'bg-yellow-100 text-yellow-700',
  cancelled: 'bg-red-100 text-red-700',
};

const BookingManagement: React.FC<BookingManagementProps> = ({ 
  bookings, 
  venues,
  onUpdateStatus, 
  onDelete 
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterVenue, setFilterVenue] = useState<string>('all');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [bookingToDelete, setBookingToDelete] = useState<Booking | null>(null);
  
  const filteredBookings = bookings.filter(booking => {
    // Text search
    const matchesSearch = 
      booking.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.venueName.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Venue filter
    const matchesVenue = filterVenue === 'all' || booking.venueId === filterVenue;
    
    // Status filter
    const matchesStatus = filterStatus === 'all' || booking.status === filterStatus;
    
    return matchesSearch && matchesVenue && matchesStatus;
  });

  const handleStatusChange = (bookingId: string, newStatus: 'confirmed' | 'pending' | 'cancelled') => {
    const bookingToUpdate = bookings.find(b => b.id === bookingId);
    if (bookingToUpdate) {
      onUpdateStatus({
        ...bookingToUpdate,
        status: newStatus
      });
    }
  };

  const handleDeleteClick = (booking: Booking) => {
    setBookingToDelete(booking);
    setDeleteConfirmOpen(true);
  };

  const confirmDelete = () => {
    if (bookingToDelete) {
      onDelete(bookingToDelete.id);
      setDeleteConfirmOpen(false);
      setBookingToDelete(null);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col space-y-4 md:flex-row md:space-y-0 md:space-x-4">
        <div className="relative flex-grow">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search bookings..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <Select
          value={filterVenue}
          onValueChange={setFilterVenue}
        >
          <SelectTrigger className="w-full md:w-[200px]">
            <div className="flex items-center gap-2">
              <Building className="h-4 w-4" />
              <SelectValue placeholder="Filter by venue" />
            </div>
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Venues</SelectItem>
            {venues.map((venue) => (
              <SelectItem key={venue.id} value={venue.id}>
                {venue.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        
        <Select
          value={filterStatus}
          onValueChange={setFilterStatus}
        >
          <SelectTrigger className="w-full md:w-[200px]">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Statuses</SelectItem>
            <SelectItem value="confirmed">Confirmed</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="cancelled">Cancelled</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Booking ID</TableHead>
              <TableHead>Venue</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>Date & Time</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredBookings.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="h-24 text-center">
                  No bookings found.
                </TableCell>
              </TableRow>
            ) : (
              filteredBookings.map((booking) => (
                <TableRow key={booking.id}>
                  <TableCell className="font-medium">#{booking.id}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <Building className="h-3.5 w-3.5 text-muted-foreground" />
                      <span>{booking.venueName}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-col">
                      <div className="flex items-center gap-1">
                        <User className="h-3.5 w-3.5 text-muted-foreground" />
                        <span>{booking.userName}</span>
                      </div>
                      <span className="text-xs text-muted-foreground">{booking.email}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-col">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-3.5 w-3.5 text-muted-foreground" />
                        <span>{booking.date}</span>
                      </div>
                      <span className="text-xs text-muted-foreground">{booking.timeSlot}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Select
                      value={booking.status}
                      onValueChange={(value: 'confirmed' | 'pending' | 'cancelled') => 
                        handleStatusChange(booking.id, value)
                      }
                    >
                      <SelectTrigger className="w-32 h-8">
                        <SelectValue>
                          <Badge 
                            variant="outline" 
                            className={statusStyles[booking.status as keyof typeof statusStyles]}
                          >
                            {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                          </Badge>
                        </SelectValue>
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="confirmed">
                          <Badge variant="outline" className={statusStyles.confirmed}>
                            Confirmed
                          </Badge>
                        </SelectItem>
                        <SelectItem value="pending">
                          <Badge variant="outline" className={statusStyles.pending}>
                            Pending
                          </Badge>
                        </SelectItem>
                        <SelectItem value="cancelled">
                          <Badge variant="outline" className={statusStyles.cancelled}>
                            Cancelled
                          </Badge>
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button 
                      variant="outline" 
                      size="icon"
                      onClick={() => handleDeleteClick(booking)}
                    >
                      <Trash className="h-4 w-4" />
                      <span className="sr-only">Delete booking</span>
                    </Button>
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
              Are you sure you want to delete booking #{bookingToDelete?.id} for {bookingToDelete?.userName}? This action cannot be undone.
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

export default BookingManagement;
