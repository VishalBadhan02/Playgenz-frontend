import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "../ui/button";
import { ChevronRight } from "lucide-react";
import { Step1TossWinnerProps, Step3TossDecision } from "./types";
import { Label } from "../score-ui/label";

export const OpeningPlayers: React.FC<Step3TossDecision> = ({ tossWinner, homeTeam, awayTeam, goToNextStep, tossChoice, goToPreviousStep, getBattingTeamPlayers, selectedStriker, setSelectedStriker, selectedNonStriker, setSelectedNonStriker }) => {


    const battingTeam = tossChoice === 'bat' ?
        (tossWinner === 'home' ? homeTeam.name : awayTeam.name) :
        (tossWinner === 'home' ? awayTeam.name : homeTeam.name);

    const battingTeamPlayers = getBattingTeamPlayers();

    return (
        <div className="space-y-4 animate-fade-in">
            <h3 className="text-lg font-semibold mb-4">
                Select opening batsmen for {battingTeam}
            </h3>

            <div className="space-y-4">
                <div>
                    <Label htmlFor="striker">Striker</Label>
                    <Select
                        value={selectedStriker}
                        onValueChange={setSelectedStriker}
                    >
                        <SelectTrigger id="striker" className="w-full">
                            <SelectValue placeholder="Select striker" />
                        </SelectTrigger>
                        <SelectContent>
                            {battingTeamPlayers.map((player, index) => (
                                <SelectItem key={player.id} value={index.toString()}>
                                    {player.name} {player.isCaptain ? "(C)" : ""} {player.isWicketKeeper ? "(WK)" : ""}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>

                <div>
                    <Label htmlFor="non-striker">Non-Striker</Label>
                    <Select
                        value={selectedNonStriker}
                        onValueChange={setSelectedNonStriker}
                    >
                        <SelectTrigger id="non-striker" className="w-full">
                            <SelectValue placeholder="Select non-striker" />
                        </SelectTrigger>
                        <SelectContent>
                            {battingTeamPlayers.map((player, index) => (
                                <SelectItem key={player.id} value={index.toString()}>
                                    {player.name} {player.isCaptain ? "(C)" : ""} {player.isWicketKeeper ? "(WK)" : ""}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
            </div>

            <div className="flex justify-between pt-4">
                <Button
                    variant="outline"
                    onClick={goToPreviousStep}
                >
                    Back
                </Button>
                <Button
                    className="bg-sport-cricket hover:bg-sport-cricket/80"
                    onClick={goToNextStep}
                >
                    Next <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
            </div>
        </div>
    );
};
