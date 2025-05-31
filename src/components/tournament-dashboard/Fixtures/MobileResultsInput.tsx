import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";


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

export const MobileResultInputs: React.FC<MatchFixture> = ({ match, handleUpdateScore }) => {
    return (
        <>
            <Card key={match.id} className="mb-4 overflow-hidden">
                <div className="bg-muted p-3">
                    <div className="text-xs font-medium">{match.dateTime}</div>
                </div>
                <CardContent className="p-4">
                    <div className="flex flex-col gap-4">
                        <div className="flex items-center gap-3">
                            <Avatar className="h-8 w-8">
                                <AvatarImage src={match.team1.avatar} alt={match.team1.name} />
                                <AvatarFallback>{match.team1.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div className="flex-1 font-medium truncate">{match.team1.name}</div>
                            <Input
                                className="w-16 text-center"
                                placeholder="0"
                                aria-label={`Score for ${match.team1.name}`}
                            />
                        </div>

                        <div className="flex items-center gap-3">
                            <Avatar className="h-8 w-8">
                                <AvatarImage src={match.team2.avatar} alt={match.team2.name} />
                                <AvatarFallback>{match.team2.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div className="flex-1 font-medium truncate">{match.team2.name}</div>
                            <Input
                                className="w-16 text-center"
                                placeholder="0"
                                aria-label={`Score for ${match.team2.name}`}
                            />
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