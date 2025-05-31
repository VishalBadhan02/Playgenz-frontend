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


export const FixtureCard: React.FC<MobileFixtureCardProps> = ({ match, tournament, handleStartMatch }) => {
    return (
        <>
            <Card key={match?.id} className="overflow-hidden">
                <div className="bg-muted p-3 flex justify-between items-center">
                    <span className="text-sm font-medium">{match?.dateTime}</span>
                    <Badge variant={
                        match?.status === 'live' ? 'destructive' :
                            match?.status === 'completed' ? 'secondary' : 'outline'
                    }>
                        {match?.status === 'live' ? 'LIVE' :
                            match?.status === 'completed' ? 'Completed' : 'Upcoming'}
                    </Badge>
                </div>
                <CardContent className="p-4">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
                        <div className="flex items-center gap-3">
                            <Avatar className="h-10 w-10">
                                <AvatarImage src={match?.team1?.logo} alt={match?.team1?.name} />
                                <AvatarFallback>{match?.team1?.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div>
                                <p className="font-medium">{match?.team1?.name}</p>
                                {match?.team1?.score && (
                                    <p className="text-sm text-muted-foreground">{match?.team1?.score}</p>
                                )}
                            </div>
                        </div>
                        <span className="text-lg font-bold hidden sm:block">vs</span>
                        <div className="flex items-center gap-3">
                            <div className="text-right">
                                <p className="font-medium">{match?.team2?.name}</p>
                                {match?.team2?.score && (
                                    <p className="text-sm text-muted-foreground">{match?.team2?.score}</p>
                                )}
                            </div>
                            <Avatar className="h-10 w-10">
                                <AvatarImage src={match?.team2?.logo} alt={match?.team2?.name} />
                                <AvatarFallback>{match?.team2?.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                        </div>
                    </div>
                    <div className="flex items-center justify-between">
                        <div className="flex items-center justify-between gap-1 text-sm text-muted-foreground">
                            <div className="flex items-center gap-1 text-sm text-muted-foreground">
                                <MapPin className="h-4 w-4" />
                                <span>{match?.venue}</span>
                            </div>



                        </div>

                        <div className="flex items-center gap-1 text-sm text-muted-foreground">
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
                        <Button size="sm" variant="outline">Edit Match</Button>
                    </div>
                </CardContent>
            </Card>
        </>
    )
}