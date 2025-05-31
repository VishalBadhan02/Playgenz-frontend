import React from 'react';
import { MatchCard } from './MatchCard';

const MatchList = ({ matches, activeTab }: { matches: any[]; activeTab: string }) => {
    const filteredMatches = matches.filter((match) => match.status === activeTab);

    return (
        <div className="space-y-4">
            {matches.map((match) => (
                <MatchCard key={match?.id} match={match} />
            ))}
        </div>
    );
};

export default MatchList;