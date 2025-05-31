import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '../ui/badge';


interface TeamEntry {
    id: string;
    name: string;
    logo?: string;
    players: number;
    joinedDate: string;
    status: 'confirmed' | 'pending';
}

const registeredTeams: TeamEntry[] = [
    {
        id: 't1',
        name: 'Royal Strikers',
        logo: '/placeholder.svg',
        players: 15,
        joinedDate: 'May 5, 2025',
        status: 'confirmed',
    },
    {
        id: 't2',
        name: 'Thunder Kings',
        logo: '/placeholder.svg',
        players: 16,
        joinedDate: 'May 7, 2025',
        status: 'confirmed',
    },
    {
        id: 't3',
        name: 'Golden Eagles',
        logo: '/placeholder.svg',
        players: 14,
        joinedDate: 'May 10, 2025',
        status: 'confirmed',
    },
    {
        id: 't4',
        name: 'Metro Warriors',
        logo: '/placeholder.svg',
        players: 15,
        joinedDate: 'May 12, 2025',
        status: 'confirmed',
    },
    {
        id: 't5',
        name: 'Lightning Bolts',
        logo: '/placeholder.svg',
        players: 16,
        joinedDate: 'May 15, 2025',
        status: 'confirmed',
    },
    {
        id: 't6',
        name: 'City Titans',
        logo: '/placeholder.svg',
        players: 14,
        joinedDate: 'May 17, 2025',
        status: 'confirmed',
    },
    {
        id: 't7',
        name: 'Eastern Falcons',
        logo: '/placeholder.svg',
        players: 15,
        joinedDate: 'May 20, 2025',
        status: 'confirmed',
    },
    {
        id: 't8',
        name: 'Western Hawks',
        logo: '/placeholder.svg',
        players: 16,
        joinedDate: 'May 22, 2025',
        status: 'confirmed',
    },
    {
        id: 't9',
        name: 'Northern Lions',
        logo: '/placeholder.svg',
        players: 14,
        joinedDate: 'May 25, 2025',
        status: 'confirmed',
    },
    {
        id: 't10',
        name: 'Southern Tigers',
        logo: '/placeholder.svg',
        players: 15,
        joinedDate: 'May 27, 2025',
        status: 'confirmed',
    },
];

export const TournamentTeams = ({ tournamentData }) => {
    return (
        <>
            <div className="mt-4 md:mt-6">
                <Card>
                    <CardHeader>
                        <CardTitle>Registered Teams</CardTitle>
                        <CardDescription>
                            {tournamentData.registeredTeams} out of {tournamentData.maxTeams} teams have registered
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                            {registeredTeams.map((team) => (
                                <div
                                    key={team.id}
                                    className="flex items-center gap-3 p-3 rounded-lg border hover:bg-accent/5 transition-colors"
                                >
                                    <Avatar className="h-10 w-10 flex-shrink-0">
                                        <AvatarImage src={team.logo} alt={team.name} />
                                        <AvatarFallback>{team.name.charAt(0)}</AvatarFallback>
                                    </Avatar>
                                    <div className="flex-1 min-w-0">
                                        <p className="font-medium truncate">{team.name}</p>
                                        <p className="text-xs text-muted-foreground">{team.players} players</p>
                                    </div>
                                    <Badge variant="outline" className="ml-auto flex-shrink-0">
                                        {team.status}
                                    </Badge>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </>
    )
}