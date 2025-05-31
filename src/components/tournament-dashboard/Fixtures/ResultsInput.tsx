import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";


interface MatchFixture {
    match: {
        round?: number;
        id: string;
        team1: {
            id: string;
            name: string;
            avatar?: string;
            score?: string;
        };
        team2: {
            id: string;
            name: string;
            avatar?: string;
            score?: string;
        };
        dateTime: string;
        venue: string;
        status: 'upcoming' | 'live' | 'completed';
        result?: string;
    }
    handleUpdateScore: (matchId: string) => void;
}

export const ResultInputs: React.FC<MatchFixture> = ({ match, handleUpdateScore }) => {
    return (
        <>
            <Card key={match.id} className="overflow-hidden">
                <div className="bg-muted p-3 flex justify-between items-center">
                    <span className="text-sm font-medium">{match.dateTime}</span>
                    <Badge variant="outline">Update Score</Badge>
                </div>
                <CardContent className="p-4">
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                        <div className="flex items-center gap-3">
                            <Avatar className="h-10 w-10">
                                <AvatarImage src={match.team1.avatar} alt={match.team1.name} />
                                <AvatarFallback>{match.team1.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div className="font-medium">{match.team1.name}</div>
                        </div>

                        <div className="flex items-center gap-2">
                            <Input
                                className="w-16 text-center"
                                placeholder="0"
                                aria-label={`Score for ${match.team1.name}`}
                            />
                            <span className="font-bold">-</span>
                            <Input
                                className="w-16 text-center"
                                placeholder="0"
                                aria-label={`Score for ${match.team2.name}`}
                            />
                        </div>

                        <div className="flex items-center gap-3">
                            <div className="font-medium text-right">{match.team2.name}</div>
                            <Avatar className="h-10 w-10">
                                <AvatarImage src={match.team2.avatar} alt={match.team2.name} />
                                <AvatarFallback>{match.team2.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                        </div>
                    </div>

                    <div className="mt-4 flex justify-end">
                        <Button size="sm" onClick={() => handleUpdateScore(match.id)}>
                            Save Result
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </>
    )
}