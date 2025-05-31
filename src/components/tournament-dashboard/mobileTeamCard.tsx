// components/TeamCard.tsx
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Mail, CheckCircle, XCircle } from 'lucide-react';
import { Spinner } from '../Spinner';

interface TeamCardProps {
    team: {
        id: string;
        name: string;
        logo?: string;
        players: number;
        joinedDate: string;
        teamId: string;
        status: 'confirmed' | 'pending';
        contact: string;
    };
    onApprove: (teamId: string) => void;
    onReject: (teamId: string) => void;
    handleMessage: (teamId: string) => void;
    isLoading: boolean;
}

const TeamCard: React.FC<TeamCardProps> = ({ team, onApprove, onReject, isLoading, handleMessage }) => {
    return (
        <Card className="mb-4 sm:mb-2 w-full sm:w-[90%] lg:w-[70%] mx-auto">
            <CardContent className="p-4 space-y-3">
                <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                        <Avatar>
                            <AvatarImage src={team.logo} alt={team.name} />
                            <AvatarFallback>{team.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                            <p className="font-medium text-base">{team.name}</p>
                            <p className="text-sm text-muted-foreground">{team.contact}</p>
                        </div>
                    </div>
                    <Badge variant={team.status === 'confirmed' ? 'default' : 'secondary'}>
                        {team.status === 'confirmed' ? 'Confirmed' : 'Pending'}
                    </Badge>
                </div>

                <div className="grid grid-cols-2 gap-2 text-sm">
                    <div>
                        <span className="text-muted-foreground">Players:</span>{' '}
                        <span className="font-medium">{team.players}</span>
                    </div>
                    <div>
                        <span className="text-muted-foreground">Joined:</span>{' '}
                        <span className="font-medium">{team.joinedDate}</span>
                    </div>
                </div>

                <div className="flex justify-end gap-2 mt-2">
                    <Button variant="outline" size="sm">
                        <Mail className="h-4 w-4 mr-1" onClick={() => handleMessage(team?.teamId)} />
                        Contact
                    </Button>
                    {team.status === 'pending' && (
                        <>
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => onApprove(team.id)}
                                className="text-green-600"
                                disabled={isLoading}
                            >
                                {isLoading ? <Spinner /> : <><CheckCircle className="h-4 w-4 mr-1" /> Approve</>}
                            </Button>
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => onReject(team.id)}
                                className="text-red-600"
                            >
                                <XCircle className="h-4 w-4 mr-1" />
                                Reject
                            </Button>
                        </>
                    )}
                </div>
            </CardContent>
        </Card>
    );
};

export default TeamCard;
