import React, { useState } from "react";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
    CardDescription,
} from "@/components/ui/card";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, Users, Trophy, ArrowRight } from "lucide-react";
import TeamMatchRequest from "./TeamMatchRequest";
import JoinTeamRequest from "./JoinTeamRequest";

interface Team {
    id: string;
    name: string;
    sport: string;
    location: string;
    members: number;
    wins: number;
    losses: number;
    draws: number;
    logo?: string;
    level: string;
}

interface TeamCardProps {
    team: Team;
    actionLabel: string;
}

const TeamCard: React.FC<TeamCardProps> = ({ team, actionLabel }) => {
    const [selectedTeam, setSelectedTeam] = useState<Team | null>(null);
    return (
        <Card className="overflow-hidden hover:shadow-md transition-shadow hover-scale">
            <CardHeader className="bg-gradient-to-r from-primary to-primary/70 text-white p-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <Avatar>
                            <AvatarImage src={team?.logo} alt={team?.name} />
                            <AvatarFallback>{team?.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                        </Avatar>
                        <div>
                            <CardTitle className="text-lg">{team?.name}</CardTitle>
                            <CardDescription className="text-white/80">{team?.sport}</CardDescription>
                        </div>
                    </div>
                    <Badge variant="secondary" className="bg-white/20 text-white hover:bg-white/30">
                        {team?.level}
                    </Badge>
                </div>
            </CardHeader>
            <CardContent className="p-4">
                <div className="space-y-2">
                    <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">{team?.location}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <Users className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">{team?.members} Members</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <Trophy className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">{team?.wins}W - {team?.losses}L - {team?.draws}D</span>
                    </div>
                </div>
            </CardContent>
            <CardFooter className="p-4 pt-0 flex gap-2">
                <Dialog>
                    <DialogTrigger asChild>
                        <Button
                            className="flex-1"
                            onClick={() => setSelectedTeam(team)}
                        >
                            {actionLabel}
                            <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-auto">
                        {selectedTeam && (
                            actionLabel === "Challenge" ?
                                <TeamMatchRequest
                                    team={selectedTeam}
                                    onClose={() => setSelectedTeam(null)}
                                />
                                :
                                <JoinTeamRequest
                                    team={selectedTeam}
                                    onClose={() => setSelectedTeam(null)}
                                />
                        )}
                    </DialogContent>
                </Dialog>
            </CardFooter>
        </Card>
    );
};

export default TeamCard;