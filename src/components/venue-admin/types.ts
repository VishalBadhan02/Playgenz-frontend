
export interface Venue {
  id: string;
  name: string;
  address: string;
  description: string;
  sports: string[];
  pricePerHour: number;
  rating: number;
  available: boolean;
  imageUrl: string;
  facilities: string[];
}

export interface Booking {
  id: string;
  venueId: string;
  venueName: string;
  userName: string;
  email: string;
  phone: string;
  date: string;
  timeSlot: string;
  status: 'confirmed' | 'pending' | 'cancelled';
  personCount: number;
}

export interface TimeSlot {
  id: string;
  date: string;
  time: string;
  available: boolean;
  venueId: string;
}
