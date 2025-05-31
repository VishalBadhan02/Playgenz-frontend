
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dumbbell, Gamepad2, Trophy, Activity } from 'lucide-react';

type GameType = "cricket" | "football" | "badminton" | "volleyball" | "tennis" | "basketball" | "online";

interface GameCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  type: "outdoor" | "online";
  games: Array<{ name: string; value: GameType }>;
  onSelect: (game: GameType) => void;
}

const GameCard: React.FC<GameCardProps> = ({ title, description, icon, type, games, onSelect }) => {
  return (
    <Card className="hover:shadow-md transition-all duration-200">
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle className="text-xl font-bold">{title}</CardTitle>
          <Badge variant={type === "outdoor" ? "default" : "secondary"}>
            {type === "outdoor" ? "Outdoor" : "Online"}
          </Badge>
        </div>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex justify-center py-4">
          <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center text-primary">
            {icon}
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2 w-full">
          {games.map((game) => (
            <button
              key={game.value}
              onClick={() => onSelect(game.value)}
              className="rounded-md bg-secondary/50 hover:bg-primary hover:text-white px-3 py-2 text-sm font-medium transition-colors"
            >
              {game.name}
            </button>
          ))}
        </div>
      </CardFooter>
    </Card>
  );
};

interface GameSelectionProps {
  onSelectGame: (game: GameType) => void;
}

export const GameSelection: React.FC<GameSelectionProps> = ({ onSelectGame }) => {
  const outdoorGames = [
    { name: "Cricket", value: "cricket" as GameType },
    { name: "Football", value: "football" as GameType },
    { name: "Badminton", value: "badminton" as GameType },
    { name: "Volleyball", value: "volleyball" as GameType },
    { name: "Tennis", value: "tennis" as GameType },
    { name: "Basketball", value: "basketball" as GameType },
  ];

  const onlineGames = [
    { name: "Online Games", value: "online" as GameType },
  ];

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Create Your Team</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Start by selecting the type of game you want to create a team for. Choose from outdoor sports like cricket and football, or online gaming.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <GameCard
          title="Outdoor Sports"
          description="Create a team for physical sports played in the real world"
          icon={<Dumbbell size={32} />}
          type="outdoor"
          games={outdoorGames}
          onSelect={onSelectGame}
        />

        <GameCard
          title="Online Gaming"
          description="Create a team for competitive online gaming"
          icon={<Gamepad2 size={32} />}
          type="online"
          games={onlineGames}
          onSelect={onSelectGame}
        />
      </div>
    </div>
  );
};
