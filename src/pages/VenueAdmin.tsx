
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import VenuesList from '@/components/venue-admin/VenuesList';
import VenueForm from '@/components/venue-admin/VenueForm';
import BookingManagement from '@/components/venue-admin/BookingManagement';
import { Venue, Booking } from '@/components/venue-admin/types';

// Mock initial data - in a real app, this would come from an API
const initialVenues: Venue[] = [
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
  }
];

// Mock bookings
const initialBookings: Booking[] = [
  {
    id: '1',
    venueId: '1',
    venueName: 'Central Sports Arena',
    userName: 'John Doe',
    email: 'john.doe@example.com',
    phone: '123-456-7890',
    date: '2023-11-22',
    timeSlot: '10:00 - 11:00',
    status: 'confirmed',
    personCount: 8,
  },
  {
    id: '2',
    venueId: '2',
    venueName: 'Riverside Courts',
    userName: 'Jane Smith',
    email: 'jane.smith@example.com',
    phone: '234-567-8901',
    date: '2023-11-23',
    timeSlot: '15:00 - 16:00',
    status: 'pending',
    personCount: 4,
  },
  {
    id: '3',
    venueId: '3',
    venueName: 'Downtown Sports Complex',
    userName: 'Mike Johnson',
    email: 'mike.johnson@example.com',
    phone: '345-678-9012',
    date: '2023-11-24',
    timeSlot: '18:00 - 19:00',
    status: 'cancelled',
    personCount: 12,
  }
];

const VenueAdmin = () => {
  const [venues, setVenues] = useState<Venue[]>(initialVenues);
  const [bookings, setBookings] = useState<Booking[]>(initialBookings);
  const [selectedVenue, setSelectedVenue] = useState<Venue | null>(null);
  const { toast } = useToast();

  // Handler for adding a new venue
  const handleAddVenue = (venue: Omit<Venue, 'id'>) => {
    const newVenue = {
      ...venue,
      id: `${venues.length + 1}`,
      rating: 0,
    };
    setVenues([...venues, newVenue as Venue]);
    toast({
      title: 'Venue Added',
      description: `${venue.name} has been successfully added.`
    });
  };

  // Handler for updating a venue
  const handleUpdateVenue = (updatedVenue: Venue) => {
    setVenues(venues.map(venue => 
      venue.id === updatedVenue.id ? updatedVenue : venue
    ));
    setSelectedVenue(null);
    toast({
      title: 'Venue Updated',
      description: `${updatedVenue.name} has been successfully updated.`
    });
  };

  // Handler for deleting a venue
  const handleDeleteVenue = (id: string) => {
    setVenues(venues.filter(venue => venue.id !== id));
    // Also remove any bookings associated with this venue
    setBookings(bookings.filter(booking => booking.venueId !== id));
    toast({
      title: 'Venue Deleted',
      description: `The venue has been successfully removed.`
    });
  };

  // Handler for managing bookings
  const handleUpdateBooking = (updatedBooking: Booking) => {
    setBookings(bookings.map(booking => 
      booking.id === updatedBooking.id ? updatedBooking : booking
    ));
    toast({
      title: 'Booking Updated',
      description: `Booking #${updatedBooking.id} has been updated to ${updatedBooking.status}.`
    });
  };

  const handleDeleteBooking = (id: string) => {
    setBookings(bookings.filter(booking => booking.id !== id));
    toast({
      title: 'Booking Deleted',
      description: `Booking #${id} has been removed.`
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Venue Management</h1>
          <p className="text-muted-foreground">Manage venues, bookings, and availability</p>
        </div>
        <div>
          <Link 
            to="/venues" 
            className="text-sm font-medium text-primary hover:underline"
          >
            View Public Venues Page
          </Link>
        </div>
      </div>

      <Tabs defaultValue="venues" className="space-y-4">
        <TabsList>
          <TabsTrigger value="venues">Venues</TabsTrigger>
          <TabsTrigger value="add-venue">Add New Venue</TabsTrigger>
          <TabsTrigger value="bookings">Bookings</TabsTrigger>
        </TabsList>

        <TabsContent value="venues" className="space-y-4">
          <VenuesList 
            venues={venues} 
            onEdit={setSelectedVenue} 
            onDelete={handleDeleteVenue} 
          />
          
          {selectedVenue && (
            <VenueForm 
              initialData={selectedVenue}
              onSubmit={handleUpdateVenue}
              onCancel={() => setSelectedVenue(null)}
              isEditing
            />
          )}
        </TabsContent>

        <TabsContent value="add-venue">
          <VenueForm 
            onSubmit={handleAddVenue}
            onCancel={() => {}}
          />
        </TabsContent>

        <TabsContent value="bookings">
          <BookingManagement 
            bookings={bookings}
            venues={venues}
            onUpdateStatus={handleUpdateBooking}
            onDelete={handleDeleteBooking}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default VenueAdmin;
