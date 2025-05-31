import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "../ui/button";
import { ChevronRight } from "lucide-react";
import { Step1TossWinnerProps, Step4TossDecision } from "./types";
import { Label } from "../score-ui/label";

export const OpeningBowler: React.FC<Step4TossDecision> = ({ tossWinner, homeTeam, awayTeam, tossChoice, goToPreviousStep, getBowlingTeamPlayers, selectedBowler, setSelectedBowler, finalizeSetup, }) => {
    const bowlingTeam = tossChoice === 'bowl' ?
        (tossWinner === 'home' ? homeTeam.name : awayTeam.name) :
        (tossWinner === 'home' ? awayTeam.name : homeTeam.name);

    const bowlingTeamPlayers = getBowlingTeamPlayers();

    return (
        <div className="space-y-4 animate-fade-in">
            <h3 className="text-lg font-semibold mb-4">
                Select opening bowler for {bowlingTeam}
            </h3>

            <div>
                <Label htmlFor="bowler">Opening Bowler</Label>
                <Select
                    value={selectedBowler}
                    onValueChange={setSelectedBowler}
                >
                    <SelectTrigger id="bowler" className="w-full">
                        <SelectValue placeholder="Select bowler" />
                    </SelectTrigger>
                    <SelectContent>
                        {bowlingTeamPlayers.map((player, index) => (
                            <SelectItem key={player.id} value={index.toString()}>
                                {player.name} {player.isCaptain ? "(C)" : ""}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>

            <div className="flex justify-between pt-4">
                <Button
                    variant="outline"
                    onClick={goToPreviousStep}
                >
                    Back
                </Button>
                <Button
                    className="bg-sport-blue hover:bg-sport-blue/80"
                    onClick={finalizeSetup}
                >
                    Start Match
                </Button>
            </div>
        </div>
    );
};
