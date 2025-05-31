import { Calendar, MapPin, Users } from "lucide-react";
import { Link } from "react-router-dom";

interface Tournament {
    id: string;
    name: string;
    startDate: string;
    endDate: string;
    location: string;
    teams: number;
    maxTeams: number;
    registrationOpen: boolean;
    imageUrl?: string;
}

interface TournamentCardProps {
    tournament: Tournament;
}

export const TournamentCard: React.FC<TournamentCardProps> = ({ tournament }) => {
    return (
        <div className="overflow-hidden rounded-lg border shadow-sm hover:border-accent/40 transition-colors hover-scale">
            <div className="relative h-40 overflow-hidden">
                <img
                    src={tournament.imageUrl || 'https://via.placeholder.com/400x200'}
                    alt={tournament.name}
                    className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                <div className="absolute bottom-0 left-0 p-4">
                    <h3 className="text-lg font-semibold text-white">{tournament.name}</h3>
                </div>
            </div>

            <div className="space-y-4 p-4">
                <div className="flex flex-wrap gap-4 text-sm">
                    <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <span>{tournament.startDate}</span>
                        <span className="mx-1">-</span>
                        <span>{tournament.endDate}</span>
                    </div>

                    <div className="flex items-center gap-1">
                        <MapPin className="h-4 w-4 text-muted-foreground" />
                        <span>{tournament.location}</span>
                    </div>
                </div>

                <div className="flex justify-between text-sm">
                    <div className="flex items-center gap-1">
                        <Users className="h-4 w-4 text-muted-foreground" />
                        <span>
                            {tournament.teams}/{tournament.maxTeams} Teams
                        </span>
                    </div>

                    <div>
                        {tournament.registrationOpen ? (
                            <span className="rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium text-green-800">
                                Registration Open
                            </span>
                        ) : (
                            <span className="rounded-full bg-orange-100 px-2 py-0.5 text-xs font-medium text-orange-800">
                                Registration Closed
                            </span>
                        )}
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-2">
                    <Link to={`/tournament/${tournament.id}`} className="inline-flex h-9 items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground">
                        View Details
                    </Link>
                    <Link to={`/tournament/${tournament.id}`} className="inline-flex h-9 items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium ring-offset-background transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50" >
                        <button
                            className=""
                        >
                            {tournament.registrationOpen ? 'Register' : 'Closed'}
                        </button>
                    </Link>


                </div>
            </div>
        </div>
    );
};