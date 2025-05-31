import { Calendar, MapPin, Users } from "lucide-react";

interface Match {
    id: string;
    homeTeam: {
        name: string;
        score?: number;
    };
    awayTeam: {
        name: string;
        score?: number;
    };
    date: string;
    time: string;
    venue: string;
    status: 'scheduled' | 'live' | 'completed' | 'upcoming';
}

interface MatchCardProps {
    match: Match;
}

export const MatchCard: React.FC<MatchCardProps> = ({ match }) => {
    return (
        <div className={`rounded-lg border p-4 ${match?.status === 'live' ? 'border-accent' : ''} hover-scale`}>
            <div className="flex items-center justify-between">
                <div className="rounded-full bg-muted px-2.5 py-0.5 text-xs font-medium text-muted-foreground">
                    {match?.status === 'completed' && 'Final Score'}
                    {match?.status === 'scheduled' && 'Upcoming'}
                    {match?.status === 'upcoming' && 'Upcoming'}
                    {match?.status === 'live' && (
                        <span className="flex items-center gap-1">
                            <span className="relative flex h-2 w-2">
                                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75"></span>
                                <span className="relative inline-flex h-2 w-2 rounded-full bg-accent"></span>
                            </span>
                            Live
                        </span>
                    )}
                </div>

                <div className="flex items-center text-xs text-muted-foreground">
                    <Calendar className="mr-1 h-3 w-3" />
                    {match?.date} • {match?.time}
                </div>
            </div>

            <div className="mt-4 flex items-center justify-between">
                <div className="flex flex-1 flex-col items-center text-center">
                    <span className="text-lg font-semibold">{match?.homeTeam.name}</span>
                    {match?.status !== 'scheduled' && (
                        <span className={`text-3xl font-bold ${match?.status === 'live' ? 'text-accent' : ''}`}>
                            {match?.homeTeam.score}
                        </span>
                    )}
                </div>

                <div className="px-4 text-center">
                    <span className="text-sm font-medium">VS</span>
                </div>

                <div className="flex flex-1 flex-col items-center text-center">
                    <span className="text-lg font-semibold">{match?.awayTeam.name}</span>
                    {match?.status !== 'scheduled' && (
                        <span className={`text-3xl font-bold ${match?.status === 'live' ? 'text-accent' : ''}`}>
                            {match?.awayTeam.score}
                        </span>
                    )}
                </div>
            </div>

            <div className="mt-4 flex items-center justify-between text-sm text-muted-foreground">
                <div className="flex items-center">
                    <MapPin className="mr-1 h-4 w-4" />
                    {match?.venue}
                </div>

                <div className="flex items-center">
                    <Users className="mr-1 h-4 w-4" />
                    5v5
                </div>
            </div>

            <div className="mt-4 grid grid-cols-2 gap-2">
                <button className="rounded-md bg-primary px-3 py-1.5 text-sm text-white hover:bg-primary/90 transition-colors">
                    {match?.status === 'scheduled' ? 'Edit Match' : 'View Details'}
                </button>
                <button className="rounded-md border px-3 py-1.5 text-sm hover:bg-secondary transition-colors">
                    {match?.status === 'live' ? 'Join Live' : 'Share'}
                </button>
            </div>
        </div>
    );
};