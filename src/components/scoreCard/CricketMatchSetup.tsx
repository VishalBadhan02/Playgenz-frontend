
import React, { useState } from 'react';
import { useScorecard } from '@/contexts/ScorecardContext';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";
import { ChevronRight } from "lucide-react";
import { Spinner } from '../Spinner';

const CricketMatchSetup: React.FC = () => {
    const { cricketScorecard, setCricketTossWinner, selectBatsman, selectBowler, isLoading, isError, error } = useScorecard();
    const { match } = cricketScorecard;

    // console.log("CricketMatchSetup: match", match);

    if (isError) {
        return (
            <div className="text-center text-red-500">
                Error loading match data: {error instanceof Error ? error.message : 'Unknown error'}
            </div>
        );
    }

    // Setup state tracking
    const [currentStep, setCurrentStep] = useState<number>(1);
    const [setupCompleted, setSetupCompleted] = useState(false);

    // Form state
    const [tossWinner, setTossWinner] = useState<'home' | 'away'>('home');
    const [tossChoice, setTossChoice] = useState<'bat' | 'bowl'>('bat');
    const [selectedStriker, setSelectedStriker] = useState<string>("0");
    const [selectedNonStriker, setSelectedNonStriker] = useState<string>("1");
    const [selectedBowler, setSelectedBowler] = useState<string>("0");

    const homeTeam = match?.teams.home;
    const awayTeam = match?.teams.away;

    // Get available players for batting team selection
    const getBattingTeamPlayers = () => {
        const battingTeam = tossChoice === 'bat' ? tossWinner : (tossWinner === 'home' ? 'away' : 'home');
        return battingTeam === 'home' ? homeTeam.players : awayTeam.players;
    };

    // Get available players for bowling team selection
    const getBowlingTeamPlayers = () => {
        const bowlingTeam = tossChoice === 'bowl' ? tossWinner : (tossWinner === 'home' ? 'away' : 'home');
        return bowlingTeam === 'home' ? homeTeam.players : awayTeam.players;
    };

    // Handle step completion
    const goToNextStep = () => {
        if (currentStep < 4) {
            setCurrentStep(currentStep + 1);
        } else {
            finalizeSetup();
        }
    };

    // Handle step back
    const goToPreviousStep = () => {
        if (currentStep > 1) {
            setCurrentStep(currentStep - 1);
        }
    };

    // Complete setup and start match
    const finalizeSetup = () => {
        // Validate that striker and non-striker are different players
        if (selectedStriker === selectedNonStriker) {
            toast({
                title: "Selection Error",
                description: "Striker and non-striker must be different players",
                variant: "destructive"
            });
            return;
        }

        const playerSettings = {
            selectedStriker,
            selectedNonStriker,
            selectedBowler
        }

        // Set toss winner and choice in the context
        setCricketTossWinner(tossWinner, tossChoice, playerSettings);


        // Select batsmen
        // selectBatsman(parseInt(selectedStriker), true); // as striker
        // selectBatsman(parseInt(selectedNonStriker), false); // as non-striker

        // Select bowler
        // selectBowler(parseInt(selectedBowler));

        // Mark setup as completed
        setSetupCompleted(true);

        toast({
            title: "Match Started",
            description: `${tossWinner === 'home' ? homeTeam.name : awayTeam.name} won the toss and elected to ${tossChoice} first`,
            duration: 5000,
        });
    };

    // If setup is already completed, don't show the setup UI
    if (setupCompleted || match?.toss) {
        return null;
    }

    // Step 1: Toss winner selection
    const renderStep1 = () => (
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
                    variant="outline"

                    className="bg-sport-cricket hover:bg-sport-cricket/80"
                    onClick={goToNextStep}
                >
                    Next <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
            </div>
        </div>
    );

    // Step 2: Toss decision (bat/bowl)
    const renderStep2 = () => (
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
                    variant="outline"
                    className="bg-sport-cricket hover:bg-sport-cricket/80"
                    onClick={goToNextStep}
                >
                    Next <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
            </div>
        </div>
    );

    // Step 3: Opening batsmen selection
    const renderStep3 = () => {
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
                                    <SelectItem key={player.id} value={player?.id}>
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
                                    <SelectItem key={player.id} value={player?.id}>
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
                        variant="outline"
                        className="bg-sport-cricket hover:bg-sport-cricket/80"
                        onClick={goToNextStep}
                    >
                        Next <ChevronRight className="ml-2 h-4 w-4" />
                    </Button>
                </div>
            </div>
        );
    };

    // Step 4: Opening bowler selection
    const renderStep4 = () => {
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
                                <SelectItem key={player.id} value={player?.id}>
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

    // Render the current step
    const renderCurrentStep = () => {
        switch (currentStep) {
            case 1: return renderStep1();
            case 2: return renderStep2();
            case 3: return renderStep3();
            case 4: return renderStep4();
            default: return null;
        }
    };

    return (
        <Card className="mb-6 bg-slate-50 border-2 border-sport-cricket animate-fade-in">
            {(isLoading || !match) ? (
                <Spinner />
            ) : (
                <>
                    <CardHeader className="bg-gradient-to-r from-sport-cricket to-sport-blue text-white">
                        <CardTitle>Match Setup</CardTitle>
                        <CardDescription className="text-slate-200">
                            Step {currentStep} of 4:{" "}
                            {
                                currentStep === 1 ? "Toss Winner" :
                                    currentStep === 2 ? "Toss Decision" :
                                        currentStep === 3 ? "Opening Batsmen" :
                                            "Opening Bowler"
                            }
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="p-6">
                        {renderCurrentStep()}
                    </CardContent>
                    <CardFooter className="bg-slate-100 border-t px-6 py-3 text-sm text-slate-500">
                        Complete all steps to start the match
                    </CardFooter>
                </>
            )}
        </Card>
    );

};

export default CricketMatchSetup;
