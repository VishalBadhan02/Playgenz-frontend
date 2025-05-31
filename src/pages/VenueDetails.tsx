
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Calendar } from '@/components/ui/calendar';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';
import { format } from 'date-fns';
import {
  MapPin,
  DollarSign,
  Users,
  ChevronLeft,
  Check,
  Star,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { Spinner } from '@/components/Spinner';
import { ErrorModal } from '@/components/ErrorModal';
import useVenueService from '@/services/venueService';
import { BookingForm } from '@/components/venue-details/BookingForm';

// Mock venue data - in a real app this would come from an API or context
const venues = [
  {
    id: '1',
    name: 'Central Sports Arena',
    address: '123 Main St, Downtown',
    description: 'A modern sports facility with multiple courts and excellent amenities. Perfect for basketball, volleyball, and other indoor sports.',
    sports: ['Basketball', 'Volleyball'],
    pricePerHour: 50,
    rating: 4.5,
    available: true,
    imageUrl: 'https://images.unsplash.com/photo-1568287556346-8c70d3d3746c',
    facilities: ['Changing Rooms', 'Parking', 'Cafeteria', 'Scoreboard'],
    reviews: [
      { id: '1', name: 'John Doe', rating: 5, comment: 'Great venue, clean and spacious courts.', date: '2023-10-15' },
      { id: '2', name: 'Jane Smith', rating: 4, comment: 'Good facilities but parking can be limited on weekends.', date: '2023-09-22' },
    ]
  },
  {
    id: '2',
    name: 'Riverside Courts',
    address: '456 River Rd, Westside',
    description: 'Located by the river with beautiful outdoor and indoor courts. Great option for basketball and tennis enthusiasts.',
    sports: ['Basketball', 'Tennis'],
    pricePerHour: 40,
    rating: 4.2,
    available: true,
    imageUrl: 'https://images.unsplash.com/photo-1546519638-68e109498ffc',
    facilities: ['Changing Rooms', 'Parking', 'Lighting'],
    reviews: [
      { id: '1', name: 'Alex Johnson', rating: 4, comment: 'Courts are well maintained. Good price for the quality.', date: '2023-11-05' },
      { id: '2', name: 'Sarah Williams', rating: 5, comment: 'Excellent court setup and the view of the river is amazing.', date: '2023-10-18' },
    ]
  },
  {
    id: '3',
    name: 'Downtown Sports Complex',
    address: '789 Center Ave, Downtown',
    description: 'A comprehensive sports complex with a variety of facilities including football fields, basketball courts, and a swimming pool.',
    sports: ['Football', 'Basketball', 'Swimming'],
    pricePerHour: 75,
    rating: 4.8,
    available: false,
    imageUrl: 'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e',
    facilities: ['Changing Rooms', 'Parking', 'Cafeteria', 'Gym', 'Scoreboard', 'Seating Area'],
    reviews: [
      { id: '1', name: 'Mike Brown', rating: 5, comment: 'Top notch facility with professional staff.', date: '2023-11-12' },
      { id: '2', name: 'Emma Davis', rating: 4, comment: 'Great amenities but a bit pricey.', date: '2023-10-30' },
    ]
  }
];

// Mock time slots data - this would normally come from an API
const generateTimeSlots = (date: Date, venueId: string) => {
  // For demo, we'll use the venue ID as a seed to generate different availability
  const dateStr = format(date, 'yyyy-MM-dd');
  const baseSlots = [
    { id: `${dateStr}-1`, time: '09:00 - 10:00', available: true },
    { id: `${dateStr}-2`, time: '10:00 - 11:00', available: true },
    { id: `${dateStr}-3`, time: '11:00 - 12:00', available: true },
    { id: `${dateStr}-4`, time: '12:00 - 13:00', available: true },
    { id: `${dateStr}-5`, time: '13:00 - 14:00', available: true },
    { id: `${dateStr}-6`, time: '14:00 - 15:00', available: true },
    { id: `${dateStr}-7`, time: '15:00 - 16:00', available: true },
    { id: `${dateStr}-8`, time: '16:00 - 17:00', available: true },
    { id: `${dateStr}-9`, time: '17:00 - 18:00', available: true },
    { id: `${dateStr}-10`, time: '18:00 - 19:00', available: true },
    { id: `${dateStr}-11`, time: '19:00 - 20:00', available: true },
    { id: `${dateStr}-12`, time: '20:00 - 21:00', available: true },
  ];

  // Make some slots unavailable based on date and venue
  if (venueId === '1') {
    // Make morning slots unavailable on Mondays (1)
    if (date.getDay() === 1) {
      baseSlots.slice(0, 4).forEach(slot => slot.available = false);
    }
  } else if (venueId === '2') {
    // Make afternoon slots unavailable on Wednesdays (3)
    if (date.getDay() === 3) {
      baseSlots.slice(4, 8).forEach(slot => slot.available = false);
    }
  } else {
    // Make evening slots unavailable on Fridays (5)
    if (date.getDay() === 5) {
      baseSlots.slice(8, 12).forEach(slot => slot.available = false);
    }
  }

  return baseSlots;
};



const VenueDetails = () => {
  const { id } = useParams<{ id: string }>();
  // const venue = venues.find(v => v?.id === id);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [timeSlots, setTimeSlots] = useState(generateTimeSlots(new Date(), id || '1'));
  const { getSingleVenue } = useVenueService();


  const {
    data: venueData,
    isLoading,
    isError,
    error,
    refetch
  } = useQuery({
    queryKey: ['fetchVenues'],
    queryFn: () => getSingleVenue(id),
  });

  console.log('Venue Data:', venueData?.data);
  const venue = venueData?.data?.venue;

  if (isLoading) return <Spinner />;
  if (isError) return <ErrorModal
    open={isError}
    onClose={() => refetch()}
    error={error}
    header="Server Error"
    description="We're experiencing some issues with our server. Please try again later."
  />;

  // Update time slots when date changes
  const handleDateChange = (date: Date | undefined) => {
    if (date) {
      setSelectedDate(date);
      setTimeSlots(generateTimeSlots(date, id || '1'));
    }
  };

  if (!venue) {
    return <div className="container py-8">Venue not found</div>;
  }

  return (
    <div className="space-y-8">
      {/* Back button */}
      <div>
        <Link
          to="/venues"
          className="inline-flex items-center text-sm font-medium text-primary hover:underline"
        >
          <ChevronLeft className="mr-1 h-4 w-4" />
          Back to venues
        </Link>
      </div>

      {/* Hero section */}
      <div className="relative w-full h-64 md:h-96 overflow-hidden rounded-lg">
        <img
          src={venue?.imageUrl}
          alt={venue?.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
        <div className="absolute bottom-0 left-0 p-6">
          <h1 className="text-3xl font-bold text-white mb-2">{venue?.name}</h1>
          <div className="flex items-center gap-2 text-white/80">
            <MapPin className="h-4 w-4" />
            <span>{venue?.address}</span>
          </div>
          <div className="flex items-center mt-2 bg-black/40 text-white rounded-full px-3 py-1 w-fit text-sm">
            <Star className="h-3 w-3 fill-yellow-400 text-yellow-400 mr-1" />
            <span>{venue?.rating} rating</span>
          </div>
        </div>
      </div>

      <div className="grid gap-8 md:grid-cols-3">
        {/* Left sidebar with venue details */}
        <div className="md:col-span-2">
          <Tabs defaultValue="details">
            <TabsList>
              <TabsTrigger value="details">Details</TabsTrigger>
              <TabsTrigger value="amenities">Amenities</TabsTrigger>
              <TabsTrigger value="reviews">Reviews</TabsTrigger>
            </TabsList>

            <TabsContent value="details" className="space-y-4">
              <div>
                <h2 className="text-2xl font-semibold mb-2">About this venue</h2>
                <p className="text-muted-foreground">{venue?.description}</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-start gap-2">
                  <DollarSign className="h-5 w-5 text-muted-foreground mt-0.5" />
                  <div>
                    <h3 className="font-semibold">Price</h3>
                    <p className="text-muted-foreground">${venue?.pricePerHour} per hour</p>
                  </div>
                </div>

                <div className="flex items-start gap-2">
                  <Users className="h-5 w-5 text-muted-foreground mt-0.5" />
                  <div>
                    <h3 className="font-semibold">Sports</h3>
                    {/* <p className="text-muted-foreground">{venue?.sports.join(', ')}</p> */}
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="amenities">
              <h2 className="text-xl font-semibold mb-4">Facilities & Amenities</h2>
              <div className="grid grid-cols-2 gap-y-2">
                {/* {venue?.facilities.map((facility) => (
                  <div key={facility} className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-primary" />
                    <span>{facility}</span>
                  </div>
                ))} */}
              </div>
            </TabsContent>

            <TabsContent value="reviews">
              <h2 className="text-xl font-semibold mb-4">Reviews</h2>
              <div className="space-y-4">
                {/* {venue?.reviews.map((review) => (
                  <div key={review?._id} className="border-b pb-4">
                    <div className="flex justify-between items-center mb-2">
                      <h3 className="font-medium">{review.name}</h3>
                      <div className="flex items-center">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span className="ml-1">{review.rating}</span>
                      </div>
                    </div>
                    <p className="text-muted-foreground mb-1">{review.comment}</p>
                    <p className="text-xs text-muted-foreground">{review.date}</p>
                  </div>
                ))} */}
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* Right column with booking form */}
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Book this venue</CardTitle>
              <CardDescription>Select a date and time to make your booking</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="text-lg font-medium mb-2">Select a date</h3>
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={handleDateChange}
                  className="border rounded-md p-3"
                  disabled={date => date < new Date()}
                />
              </div>

              <BookingForm
                // venue={venue}
                selectedDate={selectedDate}
                timeSlots={timeSlots}
                onBookingComplete={() => { }}
              />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default VenueDetails;
