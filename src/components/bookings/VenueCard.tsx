import { MapPin, Calendar, DollarSign, Clock, Users, Search, Filter, Star, Settings, IndianRupee } from 'lucide-react';
import { Link } from 'react-router-dom';

interface VenueCardProps {
    venue: Venue;
}

interface Venue {
    _id: string;
    name: string;
    address: string;
    sports: any[];
    price: number;
    rating: number;
    available: boolean;
    imageUrl: string;
    facilities: any[];
}

export const VenueCard: React.FC<VenueCardProps> = ({ venue }) => {
    return (
        <div className="overflow-hidden rounded-lg border shadow-sm hover:border-accent/40 transition-colors hover-scale">
            <div className="relative h-48 overflow-hidden">
                <img
                    src={venue?.imageUrl}
                    alt={venue?.name}
                    className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                <div className="absolute bottom-0 left-0 p-4">
                    <h3 className="text-lg font-semibold text-white">{venue?.name}</h3>
                    <div className="flex items-center gap-2 text-white/80">
                        <MapPin className="h-3 w-3" />
                        <span className="text-sm">{venue?.address}</span>
                    </div>
                </div>

                <div className="absolute right-3 top-3 flex items-center gap-1 rounded-full bg-black/50 px-2 py-1 text-xs text-white backdrop-blur-sm">
                    <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                    <span>{venue?.rating}</span>
                </div>

                {!venue?.available && (
                    <div className="absolute left-0 right-0 top-0 bg-black/50 px-3 py-1 text-center text-sm font-medium text-white backdrop-blur-sm">
                        Fully Booked Today
                    </div>
                )}
            </div>

            <div className="space-y-4 p-4">
                <div className="flex flex-wrap gap-2">
                    {venue?.sports?.map((sport) => (
                        <span
                            key={sport}
                            className="inline-flex rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary"
                        >
                            {sport?.name}
                        </span>
                    ))}
                </div>

                <div className="flex flex-wrap justify-between text-sm">
                    <div className="flex items-center gap-1">
                        <IndianRupee className="h-4 w-4 text-muted-foreground" />
                        <span className="font-medium">₹{venue?.price}</span>
                        <span className="text-muted-foreground">/hour</span>
                    </div>

                    <div className="flex items-center gap-1">
                        <Users className="h-4 w-4 text-muted-foreground" />
                        <span>Multiple Courts</span>
                    </div>
                </div>

                {/* <div className="flex flex-wrap gap-2 text-xs">
                    {venue?.facilities.slice(0, 4).map((facility) => (
                        <span
                            key={facility}
                            className="inline-flex rounded-full bg-muted px-2 py-0.5 font-medium text-muted-foreground"
                        >
                            {facility}
                        </span>
                    ))}
                    {venue?.facilities.length > 4 && (
                        <span className="inline-flex rounded-full bg-muted px-2 py-0.5 font-medium text-muted-foreground">
                            +{venue?.facilities.length - 4} more
                        </span>
                    )}
                </div> */}

                <div className="grid grid-cols-2 gap-2">
                    <Link
                        to={`/venue/${venue?._id}`}
                        className="rounded-md bg-primary px-3 py-1.5 text-sm text-white hover:bg-primary/90 transition-colors text-center"
                    >
                        View Details
                    </Link>
                    <Link
                        to={`/venue/${venue?._id}`}
                        className={`rounded-md border px-3 py-1.5 text-sm text-center ${venue?.available
                            ? 'hover:bg-secondary transition-colors'
                            : 'cursor-not-allowed opacity-50'
                            }`}
                        aria-disabled={!venue?.available}
                        tabIndex={venue?.available ? undefined : -1}
                    >
                        {venue?.available ? 'Book Now' : 'Unavailable'}
                    </Link>
                </div>
            </div>
        </div>
    );
};