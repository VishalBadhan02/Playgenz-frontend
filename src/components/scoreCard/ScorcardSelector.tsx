import React from 'react';
import { useScorecard } from '@/contexts/ScorecardContext';
import { Card, CardContent } from "@/components/score-ui/card";
import { Button } from "@/components/score-ui/button";
import { toast } from "@/hooks/use-toast";

interface ScorecardSelectorProps {
    onComplete?: () => void;
}

const sports = [
    {
        id: 'cricket',
        name: 'Cricket',
        description: 'Full-featured cricket scorecard with support for overs, wickets, and detailed statistics.',
        gradient: 'from-sport-cricket to-sport-blue',
        emoji: '🏏',
        hoverBorder: 'hover:border-sport-cricket/40',
    },
    {
        id: 'football',
        name: 'Football',
        description: 'Track goals, cards, and substitutions with the football scorecard.',
        gradient: 'from-sport-blue to-blue-600',
        emoji: '⚽',
        hoverBorder: 'hover:border-sport-blue/40',
    },
    {
        id: 'basketball',
        name: 'Basketball',
        description: 'Keep track of points, fouls, and quarters with the basketball scorecard.',
        gradient: 'from-orange-400 to-orange-600',
        emoji: '🏀',
        hoverBorder: 'hover:border-orange-400/40',
    },
    {
        id: 'hockey',
        name: 'Hockey',
        description: 'Track goals, penalties, and periods with the hockey scorecard.',
        gradient: 'from-sky-400 to-sky-600',
        emoji: '🏒',
        hoverBorder: 'hover:border-sky-400/40',
    },
    {
        id: 'volleyball',
        name: 'Volleyball',
        description: 'Keep score of sets and points with the volleyball scorecard.',
        gradient: 'from-yellow-400 to-yellow-600',
        emoji: '🏐',
        hoverBorder: 'hover:border-yellow-400/40',
    },
];

const ScorecardSelector: React.FC<ScorecardSelectorProps> = ({ onComplete }) => {
    const { setSelectedSport } = useScorecard();

    const handleSelectSport = (sport: string) => {
        setSelectedSport(sport);
        toast({
            title: "Sport Selected",
            description: `${sport.charAt(0).toUpperCase() + sport.slice(1)} scorecard is now active.`,
            duration: 3000,
        });
        if (onComplete) {
            onComplete();
        }
    };

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {sports.map(({ id, name, description, gradient, emoji, hoverBorder }) => (
                <Card
                    key={id}
                    className={`overflow-hidden hover:shadow-lg transition-shadow cursor-pointer border-2 border-transparent ${hoverBorder}`}
                    onClick={() => handleSelectSport(id)}
                >
                    <div className={`h-40 bg-gradient-to-br ${gradient} flex items-center justify-center`}>
                        <span className="text-white text-5xl">{emoji}</span>
                    </div>
                    <CardContent className="p-6">
                        <h3 className="text-xl font-semibold mb-2">{name}</h3>
                        <p className="text-slate-600 text-sm">{description}</p>
                        <Button variant="outline" className="w-full mt-4" onClick={() => handleSelectSport(id)}>
                            Select {name}
                        </Button>
                    </CardContent>
                </Card>
            ))}
        </div>
    );
};

export default ScorecardSelector;