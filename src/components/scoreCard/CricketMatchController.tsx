
import React, { useState } from 'react';
import { useScorecard } from '@/contexts/ScorecardContext';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { DismissalType } from '../types/scorecard';
import { Pause, Play, User, Undo, Clock } from 'lucide-react';

const CricketMatchControls: React.FC = () => {
    const {
        cricketScorecard,
        dismissBatsman,
        selectBowler,
        selectBatsman,
        pauseMatch,
        undoLastAction,
        addExtras
    } = useScorecard();

    const [isPaused, setIsPaused] = useState(false);
    const [isWicketDialogOpen, setIsWicketDialogOpen] = useState(false);
    const [isSelectBatsmanDialogOpen, setIsSelectBatsmanDialogOpen] = useState(false);
    const [isSelectBowlerDialogOpen, setIsSelectBowlerDialogOpen] = useState(false);
    const [isExtrasDialogOpen, setIsExtrasDialogOpen] = useState(false);
    const [isBreakDialogOpen, setIsBreakDialogOpen] = useState(false);

    // Wicket dialog state
    const [wicketType, setWicketType] = useState<DismissalType>('bowled');
    const [dismissedPlayerIndex, setDismissedPlayerIndex] = useState(0);
    const [bowlerIndex, setBowlerIndex] = useState(0);
    const [fielderIndex, setFielderIndex] = useState(0);

    // Batsman dialog state
    const [selectedBatsmanIndex, setSelectedBatsmanIndex] = useState(0);
    const [asStriker, setAsStriker] = useState(true);

    // Extras dialog state
    const [extraType, setExtraType] = useState('byes');
    const [extraRuns, setExtraRuns] = useState(1);

    // Break dialog state
    const [breakType, setBreakType] = useState('drinks');
    const [breakDuration, setBreakDuration] = useState(5);

    const battingTeamId = cricketScorecard?.score.batting.team.id;
    const bowlingTeamId = cricketScorecard?.score.bowling.team.id;
    const batsmen = cricketScorecard?.battingOrder[battingTeamId] || [];
    const bowlers = cricketScorecard?.bowlingStats[bowlingTeamId] || [];

    const availableBatsmen = batsmen.filter(batsman => !batsman.dismissal);

    const handlePauseToggle = () => {
        const newPauseState = !isPaused;
        setIsPaused(newPauseState);
        pauseMatch(newPauseState);
    };

    const handleWicketSubmit = () => {
        dismissBatsman(
            dismissedPlayerIndex,
            wicketType,
            wicketType !== 'runOut' ? bowlerIndex : undefined,
            (wicketType === 'caught' || wicketType === 'stumped' || wicketType === 'runOut') ? fielderIndex : undefined
        );
        setIsWicketDialogOpen(false);
    };

    const handleSelectBatsmanSubmit = () => {
        selectBatsman(selectedBatsmanIndex, asStriker);
        setIsSelectBatsmanDialogOpen(false);
    };

    const handleSelectBowlerSubmit = () => {
        selectBowler(bowlerIndex);
        setIsSelectBowlerDialogOpen(false);
    };

    const handleExtrasSubmit = () => {
        addExtras(extraType, extraRuns);
        setIsExtrasDialogOpen(false);
    };

    const dismissalTypes: { value: DismissalType, label: string }[] = [
        { value: 'bowled', label: 'Bowled' },
        { value: 'caught', label: 'Caught' },
        { value: 'lbw', label: 'LBW' },
        { value: 'runOut', label: 'Run Out' },
        { value: 'stumped', label: 'Stumped' },
        { value: 'hitWicket', label: 'Hit Wicket' },
        { value: 'obstructingField', label: 'Obstructing Field' },
        { value: 'handledBall', label: 'Handled Ball' },
        { value: 'timedOut', label: 'Timed Out' },
        { value: 'retiredHurt', label: 'Retired Hurt' },
        { value: 'retiredOut', label: 'Retired Out' },
    ];

    return (
        <Card>
            <CardHeader>
                <CardTitle>Match Controls</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-2">
                    <Button
                        variant="outline"
                        className="flex-1"
                        onClick={() => undoLastAction()}
                    >
                        <Undo className="mr-2 h-4 w-4" /> Undo
                    </Button>
                    <Button
                        variant={isPaused ? "default" : "outline"}
                        className="flex-1"
                        onClick={handlePauseToggle}
                    >
                        {isPaused ? (
                            <><Play className="mr-2 h-4 w-4" /> Resume</>
                        ) : (
                            <><Pause className="mr-2 h-4 w-4" /> Pause</>
                        )}
                    </Button>
                </div>

                <Separator />

                <div className="space-y-2">
                    <Button
                        variant="destructive"
                        className="w-full"
                        onClick={() => setIsWicketDialogOpen(true)}
                    >
                        Wicket!
                    </Button>

                    <div className="grid grid-cols-2 gap-2">
                        <Button
                            variant="secondary"
                            onClick={() => setIsSelectBatsmanDialogOpen(true)}
                        >
                            <User className="mr-2 h-4 w-4" /> Select Batsman
                        </Button>
                        <Button
                            variant="secondary"
                            onClick={() => setIsSelectBowlerDialogOpen(true)}
                        >
                            Select Bowler
                        </Button>
                    </div>
                </div>

                <Separator />

                <div className="space-y-2">
                    <Button
                        variant="outline"
                        className="w-full"
                        onClick={() => setIsExtrasDialogOpen(true)}
                    >
                        Add Extras
                    </Button>
                    <Button
                        variant="outline"
                        className="w-full"
                        onClick={() => setIsBreakDialogOpen(true)}
                    >
                        <Clock className="mr-2 h-4 w-4" /> Break Time
                    </Button>
                </div>

                {/* Wicket Dialog */}
                <Dialog open={isWicketDialogOpen} onOpenChange={setIsWicketDialogOpen}>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Record Wicket</DialogTitle>
                            <DialogDescription>
                                Select the dismissal type and the players involved
                            </DialogDescription>
                        </DialogHeader>
                        <div className="space-y-4 py-4">
                            <div className="space-y-2">
                                <Label htmlFor="dismissed-player">Dismissed Player</Label>
                                <Select
                                    defaultValue={dismissedPlayerIndex.toString()}
                                    onValueChange={(value) => setDismissedPlayerIndex(Number(value))}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select player" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {batsmen.map((player, index) => (
                                            <SelectItem key={player.player.id} value={index.toString()}>
                                                {player.player.name}
                                                {player.dismissal ? ' (already out)' :
                                                    cricketScorecard?.currentBatsmen.striker?.player.id === player.player.id ? ' (striker)' :
                                                        cricketScorecard?.currentBatsmen.nonStriker?.player.id === player.player.id ? ' (non-striker)' : ''}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="dismissal-type">Dismissal Type</Label>
                                <Select
                                    defaultValue={wicketType}
                                    onValueChange={(value) => setWicketType(value as DismissalType)}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select dismissal type" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {dismissalTypes.map(type => (
                                            <SelectItem key={type.value} value={type.value}>{type.label}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>

                            {(wicketType === 'bowled' ||
                                wicketType === 'caught' ||
                                wicketType === 'lbw' ||
                                wicketType === 'stumped' ||
                                wicketType === 'hitWicket') && (
                                    <div className="space-y-2">
                                        <Label htmlFor="bowler">Bowler</Label>
                                        <Select
                                            defaultValue={bowlerIndex.toString()}
                                            onValueChange={(value) => setBowlerIndex(Number(value))}
                                        >
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select bowler" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {bowlers.map((bowler, index) => (
                                                    <SelectItem key={bowler.player.id} value={index.toString()}>
                                                        {bowler.player.name} {cricketScorecard?.currentBowler?.player.id === bowler.player.id ? '(current)' : ''}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </div>
                                )}

                            {(wicketType === 'caught' || wicketType === 'stumped' || wicketType === 'runOut') && (
                                <div className="space-y-2">
                                    <Label htmlFor="fielder">Fielder</Label>
                                    <Select
                                        defaultValue={fielderIndex.toString()}
                                        onValueChange={(value) => setFielderIndex(Number(value))}
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select fielder" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {cricketScorecard?.match?.teams.away.players.map((player, index) => (
                                                <SelectItem key={player.id} value={index.toString()}>{player.name}</SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>
                            )}

                            <Button className="w-full" onClick={handleWicketSubmit}>
                                Record Wicket
                            </Button>
                        </div>
                    </DialogContent>
                </Dialog>

                {/* Select Batsman Dialog */}
                <Dialog open={isSelectBatsmanDialogOpen} onOpenChange={setIsSelectBatsmanDialogOpen}>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Select Batsman</DialogTitle>
                            <DialogDescription>
                                Choose the next batsman to come to the crease
                            </DialogDescription>
                        </DialogHeader>
                        <div className="space-y-4 py-4">
                            <div className="space-y-2">
                                <Label htmlFor="batsman">Batsman</Label>
                                <Select
                                    defaultValue={selectedBatsmanIndex.toString()}
                                    onValueChange={(value) => setSelectedBatsmanIndex(Number(value))}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select batsman" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {availableBatsmen.map((player, index) => (
                                            <SelectItem key={player.player.id} value={index.toString()}>
                                                {player.player.name}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="flex items-center space-x-2">
                                <Label htmlFor="striker">As Striker</Label>
                                <Switch
                                    id="striker"
                                    checked={asStriker}
                                    onCheckedChange={setAsStriker}
                                />
                            </div>

                            <Button className="w-full" onClick={handleSelectBatsmanSubmit}>
                                Send to Crease
                            </Button>
                        </div>
                    </DialogContent>
                </Dialog>

                {/* Select Bowler Dialog */}
                <Dialog open={isSelectBowlerDialogOpen} onOpenChange={setIsSelectBowlerDialogOpen}>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Select Bowler</DialogTitle>
                            <DialogDescription>
                                Choose the bowler for the next over
                            </DialogDescription>
                        </DialogHeader>
                        <div className="space-y-4 py-4">
                            <div className="space-y-2">
                                <Label htmlFor="bowler">Bowler</Label>
                                <Select
                                    defaultValue={bowlerIndex.toString()}
                                    onValueChange={(value) => setBowlerIndex(Number(value))}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select bowler" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {bowlers.map((bowler, index) => (
                                            <SelectItem key={bowler.player.id} value={index.toString()}>
                                                {bowler.player.name} ({bowler.overs} overs, {bowler.wickets}-{bowler.runs})
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>

                            <Button className="w-full" onClick={handleSelectBowlerSubmit}>
                                Start Bowling
                            </Button>
                        </div>
                    </DialogContent>
                </Dialog>

                {/* Extras Dialog */}
                <Dialog open={isExtrasDialogOpen} onOpenChange={setIsExtrasDialogOpen}>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Add Extras</DialogTitle>
                            <DialogDescription>
                                Record extras runs (byes, leg byes, penalties)
                            </DialogDescription>
                        </DialogHeader>
                        <div className="space-y-4 py-4">
                            <div className="space-y-2">
                                <Label htmlFor="extra-type">Type of Extra</Label>
                                <Select
                                    defaultValue={extraType}
                                    onValueChange={(value) => setExtraType(value)}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select extra type" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="byes">Byes</SelectItem>
                                        <SelectItem value="legByes">Leg Byes</SelectItem>
                                        <SelectItem value="noBall">No Ball</SelectItem>
                                        <SelectItem value="wide">Wide</SelectItem>
                                        <SelectItem value="penalty">Penalty</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="extra-runs">Runs</Label>
                                <Select
                                    defaultValue={extraRuns.toString()}
                                    onValueChange={(value) => setExtraRuns(Number(value))}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select runs" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {[1, 2, 3, 4, 5].map(runs => (
                                            <SelectItem key={runs} value={runs.toString()}>{runs}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>

                            <Button className="w-full" onClick={handleExtrasSubmit}>
                                Add Extras
                            </Button>
                        </div>
                    </DialogContent>
                </Dialog>

                {/* Break Time Dialog */}
                <Dialog open={isBreakDialogOpen} onOpenChange={setIsBreakDialogOpen}>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Match Break</DialogTitle>
                            <DialogDescription>
                                Record a break in play
                            </DialogDescription>
                        </DialogHeader>
                        <div className="space-y-4 py-4">
                            <div className="space-y-2">
                                <Label htmlFor="break-type">Type of Break</Label>
                                <Select
                                    defaultValue={breakType}
                                    onValueChange={(value) => setBreakType(value)}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select break type" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="drinks">Drinks Break</SelectItem>
                                        <SelectItem value="lunch">Lunch Break</SelectItem>
                                        <SelectItem value="tea">Tea Break</SelectItem>
                                        <SelectItem value="innings">Innings Break</SelectItem>
                                        <SelectItem value="rain">Rain Delay</SelectItem>
                                        <SelectItem value="badLight">Bad Light</SelectItem>
                                        <SelectItem value="other">Other</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="break-duration">Duration (minutes)</Label>
                                <Select
                                    defaultValue={breakDuration.toString()}
                                    onValueChange={(value) => setBreakDuration(Number(value))}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select duration" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {[5, 10, 15, 20, 30, 40].map(duration => (
                                            <SelectItem key={duration} value={duration.toString()}>{duration} minutes</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>

                            <Button className="w-full" onClick={() => {
                                pauseMatch(true);
                                setIsPaused(true);
                                setIsBreakDialogOpen(false);
                            }}>
                                Start Break
                            </Button>
                        </div>
                    </DialogContent>
                </Dialog>
            </CardContent>
        </Card>
    );
};

export default CricketMatchControls;
