import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "../ui/button";
import { ChevronRight } from "lucide-react";
import { Step1TossWinnerProps, Step2TossDecision } from "./types";

export const TossDecision: React.FC<Step2TossDecision> = ({ tossWinner, setTossChoice, homeTeam, awayTeam, goToNextStep, tossChoice, goToPreviousStep }) => (
    <div className="space-y-4 animate-fade-in">
        <h3 className="text-lg font-semibold mb-4">
            {tossWinner === 'home' ? homeTeam.name : awayTeam.name} won the toss and elected to:
        </h3>

        <Select
            value={tossChoice}
            onValueChange={(value) => setTossChoice(value as 'bat' | 'bowl')}
        >
            <SelectTrigger id="toss-choice" className="w-full">
                <SelectValue placeholder="Select choice" />
            </SelectTrigger>
            <SelectContent>
                <SelectItem value="bat">Bat First</SelectItem>
                <SelectItem value="bowl">Bowl First</SelectItem>
            </SelectContent>
        </Select>

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
