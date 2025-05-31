import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "../ui/button";
import { ChevronRight } from "lucide-react";
import { Step1TossWinnerProps } from "./types";

export const TossWinner: React.FC<Step1TossWinnerProps> = ({ tossWinner, setTossWinner, homeTeam, awayTeam, goToNextStep }) => {
    return (
        <div className="space-y-4 animate-fade-in">
            <h3 className="text-lg font-semibold mb-4">Who won the toss?</h3>
            <Select
                value={tossWinner}
                onValueChange={(value) => setTossWinner(value as 'home' | 'away')}
            >
                <SelectTrigger id="toss-winner" className="w-full">
                    <SelectValue placeholder="Select team" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="home">{homeTeam.name}</SelectItem>
                    <SelectItem value="away">{awayTeam.name}</SelectItem>
                </SelectContent>
            </Select>

            <div className="flex justify-end pt-4">
                <Button
                    className="bg-sport-cricket hover:bg-sport-cricket/80"
                    onClick={goToNextStep}
                >
                    Next <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
            </div>
        </div>
    )
};
