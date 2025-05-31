import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '../ui/badge';
import { MapPin } from 'lucide-react';

interface MatchFixture {
    id: string;
    team1: {
        id: string;
        name: string;
        logo?: string;
        score?: string;
    };
    team2: {
        id: string;
        name: string;
        logo?: string;
        score?: string;
    };
    dateTime: string;
    venue: string;
    status: 'upcoming' | 'live' | 'completed';
    result?: string;
}


const matchFixtures: MatchFixture[] = [
    {
        id: 'm1',
        team1: { id: 't1', name: 'Royal Strikers', logo: '/placeholder.svg' },
        team2: { id: 't2', name: 'Thunder Kings', logo: '/placeholder.svg' },
        dateTime: 'June 15, 2025 - 2:00 PM',
        venue: 'Main Stadium',
        status: 'upcoming',
    },
    {
        id: 'm2',
        team1: { id: 't3', name: 'Golden Eagles', logo: '/placeholder.svg' },
        team2: { id: 't4', name: 'Metro Warriors', logo: '/placeholder.svg' },
        dateTime: 'June 15, 2025 - 5:00 PM',
        venue: 'Main Stadium',
        status: 'upcoming',
    },
    {
        id: 'm3',
        team1: { id: 't5', name: 'Lightning Bolts', logo: '/placeholder.svg' },
        team2: { id: 't6', name: 'City Titans', logo: '/placeholder.svg' },
        dateTime: 'June 16, 2025 - 2:00 PM',
        venue: 'Secondary Field',
        status: 'upcoming',
    },
    {
        id: 'm4',
        team1: { id: 't7', name: 'Eastern Falcons', logo: '/placeholder.svg' },
        team2: { id: 't8', name: 'Western Hawks', logo: '/placeholder.svg' },
        dateTime: 'June 16, 2025 - 5:00 PM',
        venue: 'Secondary Field',
        status: 'upcoming',
    },
    {
        id: 'm5',
        team1: { id: 't9', name: 'Northern Lions', logo: '/placeholder.svg' },
        team2: { id: 't10', name: 'Southern Tigers', logo: '/placeholder.svg' },
        dateTime: 'June 17, 2025 - 2:00 PM',
        venue: 'Main Stadium',
        status: 'upcoming',
    },
];


export const TournamentMatches = () => {
    return (
        <>
            <div className="mt-4 md:mt-6">
                <Card>
                    <CardHeader>
                        <CardTitle>Match Schedule</CardTitle>
                        <CardDescription>All scheduled matches for the tournament</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-6">
                            <div>
                                <h3 className="text-lg font-medium mb-3">June 15, 2025</h3>
                                <div className="space-y-4">
                                    {matchFixtures.slice(0, 2).map((match) => (
                                        <div
                                            key={match.id}
                                            className="rounded-lg border overflow-hidden"
                                        >
                                            <div className="bg-muted p-3 flex justify-between items-center">
                                                <span className="text-sm font-medium">{match.dateTime.split('-')[1]}</span>
                                                <Badge variant={
                                                    match.status === 'live' ? 'destructive' :
                                                        match.status === 'completed' ? 'secondary' : 'outline'
                                                }>
                                                    {match.status === 'live' ? 'LIVE' :
                                                        match.status === 'completed' ? 'Completed' : 'Upcoming'}
                                                </Badge>
                                            </div>
                                            <div className="p-4">
                                                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
                                                    <div className="flex items-center gap-3">
                                                        <Avatar className="h-10 w-10 flex-shrink-0">
                                                            <AvatarImage src={match.team1.logo} alt={match.team1.name} />
                                                            <AvatarFallback>{match.team1.name.charAt(0)}</AvatarFallback>
                                                        </Avatar>
                                                        <div className="min-w-0">
                                                            <p className="font-medium truncate">{match.team1.name}</p>
                                                            {match.team1.score && (
                                                                <p className="text-sm text-muted-foreground">{match.team1.score}</p>
                                                            )}
                                                        </div>
                                                    </div>
                                                    <span className="text-lg font-bold hidden sm:block">vs</span>
                                                    <div className="flex items-center gap-3">
                                                        <div className="text-right min-w-0">
                                                            <p className="font-medium truncate">{match.team2.name}</p>
                                                            {match.team2.score && (
                                                                <p className="text-sm text-muted-foreground">{match.team2.score}</p>
                                                            )}
                                                        </div>
                                                        <Avatar className="h-10 w-10 flex-shrink-0">
                                                            <AvatarImage src={match.team2.logo} alt={match.team2.name} />
                                                            <AvatarFallback>{match.team2.name.charAt(0)}</AvatarFallback>
                                                        </Avatar>
                                                    </div>
                                                </div>
                                                <div className="flex items-center justify-between text-sm text-muted-foreground">
                                                    <div className="flex items-center gap-1 overflow-hidden">
                                                        <MapPin className="h-4 w-4 flex-shrink-0" />
                                                        <span className="truncate">{match.venue}</span>
                                                    </div>
                                                    {match.result && (
                                                        <div className="ml-2">{match.result}</div>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <h3 className="text-lg font-medium mb-3">June 16, 2025</h3>
                                <div className="space-y-4">
                                    {matchFixtures.slice(2, 4).map((match) => (
                                        <div
                                            key={match.id}
                                            className="rounded-lg border overflow-hidden"
                                        >
                                            <div className="bg-muted p-3 flex justify-between items-center">
                                                <span className="text-sm font-medium">{match.dateTime.split('-')[1]}</span>
                                                <Badge variant="outline">Upcoming</Badge>
                                            </div>
                                            <div className="p-4">
                                                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
                                                    <div className="flex items-center gap-3">
                                                        <Avatar className="h-10 w-10 flex-shrink-0">
                                                            <AvatarImage src={match.team1.logo} alt={match.team1.name} />
                                                            <AvatarFallback>{match.team1.name.charAt(0)}</AvatarFallback>
                                                        </Avatar>
                                                        <p className="font-medium truncate max-w-[120px]">{match.team1.name}</p>
                                                    </div>
                                                    <span className="text-lg font-bold hidden sm:block">vs</span>
                                                    <div className="flex items-center gap-3">
                                                        <p className="font-medium truncate max-w-[120px]">{match.team2.name}</p>
                                                        <Avatar className="h-10 w-10 flex-shrink-0">
                                                            <AvatarImage src={match.team2.logo} alt={match.team2.name} />
                                                            <AvatarFallback>{match.team2.name.charAt(0)}</AvatarFallback>
                                                        </Avatar>
                                                    </div>
                                                </div>
                                                <div className="flex items-center text-sm text-muted-foreground overflow-hidden">
                                                    <MapPin className="h-4 w-4 flex-shrink-0 mr-1" />
                                                    <span className="truncate">{match.venue}</span>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <h3 className="text-lg font-medium mb-3">June 17, 2025</h3>
                                <div className="space-y-4">
                                    {matchFixtures.slice(4).map((match) => (
                                        <div
                                            key={match.id}
                                            className="rounded-lg border overflow-hidden"
                                        >
                                            <div className="bg-muted p-3 flex justify-between items-center">
                                                <span className="text-sm font-medium">{match.dateTime.split('-')[1]}</span>
                                                <Badge variant="outline">Upcoming</Badge>
                                            </div>
                                            <div className="p-4">
                                                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
                                                    <div className="flex items-center gap-3">
                                                        <Avatar className="h-10 w-10 flex-shrink-0">
                                                            <AvatarImage src={match.team1.logo} alt={match.team1.name} />
                                                            <AvatarFallback>{match.team1.name.charAt(0)}</AvatarFallback>
                                                        </Avatar>
                                                        <p className="font-medium truncate max-w-[120px]">{match.team1.name}</p>
                                                    </div>
                                                    <span className="text-lg font-bold hidden sm:block">vs</span>
                                                    <div className="flex items-center gap-3">
                                                        <p className="font-medium truncate max-w-[120px]">{match.team2.name}</p>
                                                        <Avatar className="h-10 w-10 flex-shrink-0">
                                                            <AvatarImage src={match.team2.logo} alt={match.team2.name} />
                                                            <AvatarFallback>{match.team2.name.charAt(0)}</AvatarFallback>
                                                        </Avatar>
                                                    </div>
                                                </div>
                                                <div className="flex items-center text-sm text-muted-foreground overflow-hidden">
                                                    <MapPin className="h-4 w-4 flex-shrink-0 mr-1" />
                                                    <span className="truncate">{match.venue}</span>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </>
    )
}