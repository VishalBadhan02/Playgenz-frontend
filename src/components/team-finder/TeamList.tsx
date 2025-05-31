import React from "react";
import TeamCard from "./TeamCard";

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

interface TeamListProps {
    teams: Team[];
    actionLabel: string;
}

const TeamList: React.FC<TeamListProps> = ({ teams, actionLabel }) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {teams?.map((team) => (
                <TeamCard key={team?.id} team={team} actionLabel={actionLabel} />
            ))}
        </div>
    );
};

export default TeamList;