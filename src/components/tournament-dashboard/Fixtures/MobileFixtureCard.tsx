import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin } from "lucide-react";
import { Link } from "react-router-dom";

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
    status: 'upcoming' | 'live' | 'completed' | 'in_progress';
    result?: string;
}

interface MobileFixtureCardProps {
    match: MatchFixture;
    tournament: any;
    handleStartMatch: (id: string, teamA: string, teamB: String) => void;

}


export const MobileFixtureCard: React.FC<MobileFixtureCardProps> = ({ match, tournament, handleStartMatch }) => {
    return (
        <>
            <Card key={match.id} className="mb-4 overflow-hidden">
                <div className="bg-muted p-3 flex justify-between items-center">
                    <div className="text-xs font-medium">{match.dateTime}</div>
                    <Badge variant={
                        match.status === 'live' ? 'destructive' :
                            match.status === 'completed' ? 'secondary' : 'outline'
                    }>
                        {match.status === 'live' ? 'LIVE' :
                            match.status === 'completed' ? 'Completed' : 'Upcoming'}
                    </Badge>
                </div>
                <CardContent className="p-4">
                    <div className="flex flex-col gap-3">
                        <div className="flex items-center gap-3">
                            <Avatar className="h-8 w-8">
                                <AvatarImage src={match.team1.logo} alt={match.team1.name} />
                                <AvatarFallback>{match.team1.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div className="font-medium">{match.team1.name}</div>
                            {match.team1.score && <div className="ml-auto font-bold">{match.team1.score}</div>}
                        </div>

                        <div className="flex items-center justify-center my-1">
                            <div className="text-sm px-3 py-1 rounded-full bg-muted font-medium">VS</div>
                        </div>

                        <div className="flex items-center gap-3">
                            <Avatar className="h-8 w-8">
                                <AvatarImage src={match.team2.logo} alt={match.team2.name} />
                                <AvatarFallback>{match.team2.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div className="font-medium">{match.team2.name}</div>
                            {match.team2.score && <div className="ml-auto font-bold">{match.team2.score}</div>}
                        </div>
                    </div>

                    <div className="mt-4 pt-3 border-t flex flex-col gap-2">
                        <div className="flex items-center justify-between gap-1 text-sm text-muted-foreground">
                            <div className="flex items-center gap-1 text-sm text-muted-foreground">
                                <MapPin className="h-4 w-4" />
                                <span>{match.venue}</span>
                            </div>

                            {match?.status === "upcoming" && <Button size="sm" onClick={() => handleStartMatch(match?.id, match?.team1?.id, match?.team2?.id)}>Start Scoreing</Button>}
                            {match?.status === "in_progress" && (
                                <Button variant="destructive" size="sm">
                                    <Link to={`/scorecard/${tournament?.sport}/${match?.id}`}>Resume</Link>
                                </Button>
                            )}

                            {match?.status === "completed" && (
                                <Button size="sm">
                                    <Link to={`/result/${match?.id}`}>Results</Link>
                                </Button>
                            )}

                        </div>

                        <div className="flex gap-2 mt-2">
                            <Button size="sm" className="w-full" variant="outline">Edit Match</Button>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </>
    )
}