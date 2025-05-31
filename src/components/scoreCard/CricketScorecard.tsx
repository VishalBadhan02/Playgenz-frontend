import React, { useState } from 'react';
import { useScorecard } from '@/contexts/ScorecardContext';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { User, Undo } from "lucide-react";
import AddPlayerForm from './AddPlayerForm';
import CricketMatchControls from './CricketMatchController';
import CricketMatchSetup from './CricketMatchSetup';
import { useParams } from 'react-router-dom';
import { Spinner } from '../Spinner';

const CricketScorecard: React.FC = () => {
    const { sport, id } = useParams<{ sport: string, id: string }>();
    const { cricketScorecard, updateCricketScore, undoLastAction } = useScorecard() || {};
    const { match, format, currentInnings, totalInnings, score, battingOrder, bowlingStats, currentBatsmen, currentBowler, recentOvers, partnership, currentRunRate, target, lastWicket } = cricketScorecard || {};
    const [isAddPlayerDialogOpen, setIsAddPlayerDialogOpen] = useState(false);

    // it cricketScorecard dosen't exit load sinner 
    if (!cricketScorecard) {
        return <Spinner />; // Or handle the absence of data as needed
    }

    const battingTeamId = score?.batting?.team?.id;
    const bowlingTeamId = score?.bowling.team?.id;
    const showScorecard = !!match?.toss; // Only show scorecard if toss info exists (setup completed)

    const formatOvers = (overs: number) => {
        const fullOvers = Math.floor(overs);
        const balls = Math.round((overs - fullOvers) * 10);
        return `${fullOvers}.${balls}`;
    };

    const getBatsmanStatusClass = (batter: any, isStriker: boolean = false) => {
        if (isStriker) return "bg-sport-cricket/20 font-semibold";
        if (currentBatsmen?.striker?.player?.id === batter?.player?.id ||
            currentBatsmen?.nonStriker?.player?.id === batter?.player?.id) {
            return "bg-sport-cricket/10";
        }
        if (batter?.dismissal) return "text-slate-500";
        return "";
    };

    console.log(currentBowler)

    return (
        <div className="max-w-6xl mx-auto">
            {/* Match Setup Component - will show only before match setup is completed */}
            <CricketMatchSetup />

            {/* Only show the scorecard if the match setup is completed */}
            {showScorecard && (
                <div className="grid grid-cols-1 xl:grid-cols-4 gap-6 mb-6">
                    {/* Match Controls - Moved to top for better visibility */}
                    <div className="order-1 xl:col-span-1">
                        <div className="sticky top-4">
                            <CricketMatchControls />

                            <div className="mt-6">
                                <Card>
                                    <CardHeader>
                                        <CardTitle>Player Management</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <Dialog open={isAddPlayerDialogOpen} onOpenChange={setIsAddPlayerDialogOpen}>
                                            <DialogTrigger asChild>
                                                <Button className="w-full">
                                                    <User className="mr-2 h-4 w-4" /> Add Player
                                                </Button>
                                            </DialogTrigger>
                                            <DialogContent>
                                                <DialogHeader>
                                                    <DialogTitle>Add New Player</DialogTitle>
                                                </DialogHeader>
                                                <AddPlayerForm onClose={() => setIsAddPlayerDialogOpen(false)} />
                                            </DialogContent>
                                        </Dialog>
                                    </CardContent>
                                </Card>
                            </div>
                        </div>
                    </div>

                    {/* Scorecard Main Content */}
                    <div className="order-2 xl:col-span-3">
                        <Card className="mb-6 overflow-hidden shadow-lg relative">
                            {match?.status === 'live' && (
                                <div className="absolute top-4 right-4 flex items-center">
                                    <span className="h-2 w-2 bg-red-500 rounded-full mr-2 animate-pulse"></span>
                                    <span className="text-xs font-medium bg-red-500 text-white px-2 py-1 rounded">LIVE</span>
                                </div>
                            )}

                            <CardHeader className="bg-gradient-to-r from-sport-cricket to-sport-blue text-white">
                                <CardTitle className="text-center text-2xl md:text-3xl">
                                    {match?.teams?.home?.name} vs {match?.teams?.away?.name}
                                </CardTitle>
                                <CardDescription className="text-slate-200 text-center">
                                    {match?.venue} | {format} | {new Date(match?.date).toLocaleDateString()}
                                    {match?.toss && (
                                        <div className="mt-1 text-sm">
                                            {match?.toss?.winner?.name} won the toss and elected to {match?.toss?.decision} first
                                        </div>
                                    )}
                                </CardDescription>
                            </CardHeader>

                            <CardContent className="p-0">
                                <div className="p-6 bg-white">
                                    <div className="flex flex-col md:flex-row items-center md:items-start justify-between">
                                        <div className="flex items-center mb-4 md:mb-0">
                                            <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center mr-4">
                                                <img
                                                    src={score?.batting?.team?.logo || '/placeholder.svg'}
                                                    alt={score?.batting?.team?.name}
                                                    className="w-10 h-10 object-contain"
                                                />
                                            </div>
                                            <div>
                                                <h3 className="text-lg font-semibold">{score?.batting?.team?.name}</h3>
                                                <div className="text-sm text-slate-500">Batting</div>
                                            </div>
                                        </div>

                                        <div className="text-center">
                                            <div className="flex items-center justify-center space-x-4">
                                                <div className="flex flex-col items-center">
                                                    <div className="text-4xl md:text-6xl font-bold text-sport-blue">
                                                        {score?.batting?.runs}/{score?.batting?.wickets}
                                                    </div>
                                                    <div className="text-sm text-slate-500">
                                                        ({formatOvers(score?.batting?.overs)})
                                                    </div>
                                                </div>

                                                {target && (
                                                    <div className="flex flex-col items-center">
                                                        <div className="text-sm font-medium bg-slate-100 px-3 py-1 rounded-full">
                                                            Target: {target}
                                                        </div>
                                                        <div className="text-xs text-slate-500 mt-1">
                                                            Need {target - score?.batting?.runs} runs
                                                        </div>
                                                    </div>
                                                )}
                                            </div>

                                            <div className="mt-2 text-sm">
                                                CRR: <span className="font-medium">{currentRunRate}</span>
                                                {target && (
                                                    <span className="ml-2">
                                                        REQ: <span className="font-medium">{((target - score?.batting?.runs) / (20 - score?.batting?.overs))?.toFixed(2)}</span>
                                                    </span>
                                                )}
                                            </div>
                                        </div>

                                        <div className="flex items-center mt-4 md:mt-0">
                                            <div>
                                                <h3 className="text-lg font-semibold">{score?.bowling?.team?.name}</h3>
                                                <div className="text-sm text-slate-500">Bowling</div>
                                            </div>
                                            <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center ml-4">
                                                <img
                                                    src={score?.bowling?.team?.logo || '/placeholder.svg'}
                                                    alt={score?.bowling?.team?.name}
                                                    className="w-10 h-10 object-contain"
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    {lastWicket && (
                                        <div className="bg-slate-50 p-3 mt-4 rounded-md">
                                            <div className="text-sm font-medium">Last Wicket:</div>
                                            <div className="text-sm">{lastWicket}</div>
                                        </div>
                                    )}

                                    <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-3">
                                        <Button
                                            onClick={() => updateCricketScore(0)}
                                            variant="outline"
                                            className="bg-slate-100 border-slate-200"
                                        >
                                            0
                                        </Button>
                                        <Button
                                            onClick={() => updateCricketScore(1)}
                                            variant="outline"
                                            className="bg-slate-100 border-slate-200"
                                        >
                                            1
                                        </Button>
                                        <Button
                                            onClick={() => updateCricketScore(2)}
                                            variant="outline"
                                            className="bg-slate-100 border-slate-200"
                                        >
                                            2
                                        </Button>
                                        <Button
                                            onClick={() => updateCricketScore(3)}
                                            variant="outline"
                                            className="bg-slate-100 border-slate-200"
                                        >
                                            3
                                        </Button>
                                        <Button
                                            onClick={() => updateCricketScore(4)}
                                            className="bg-blue-100 text-blue-700 border-blue-200 hover:bg-blue-200"
                                        >
                                            4
                                        </Button>
                                        <Button
                                            onClick={() => updateCricketScore(6)}
                                            className="bg-purple-100 text-purple-700 border-purple-200 hover:bg-purple-200"
                                        >
                                            6
                                        </Button>
                                        <Button
                                            onClick={() => undoLastAction()}
                                            className="bg-orange-100 text-orange-700 border-orange-200 hover:bg-orange-200"
                                        >
                                            <Undo className="h-4 w-4 mr-2" /> Undo
                                        </Button>
                                        <Button
                                            onClick={() => { }}
                                            variant="outline"
                                            className="bg-red-100 text-red-700 border-red-200 hover:bg-red-200"
                                        >
                                            Wicket
                                        </Button>
                                    </div>
                                </div>

                                <div className="bg-slate-100 p-4">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <h3 className="text-md font-semibold mb-2">Current Partnership</h3>
                                            <div className="bg-white rounded-md p-3 flex justify-between">
                                                <div>
                                                    <div className="font-medium">
                                                        {currentBatsmen?.striker?.player?.name || 'Striker'} * & {currentBatsmen?.nonStriker?.player?.name || 'Non-striker'}
                                                    </div>
                                                    <div className="text-sm text-slate-500">
                                                        {partnership?.runs} runs ({partnership?.balls} balls)
                                                    </div>
                                                </div>
                                                <div className="text-right">
                                                    <div className="text-lg font-semibold">
                                                        {partnership?.balls > 0 ? (partnership?.runs / partnership?.balls * 100)?.toFixed(1) : '0.0'}
                                                    </div>
                                                    <div className="text-xs text-slate-500">SR</div>
                                                </div>
                                            </div>
                                        </div>

                                        <div>
                                            <h3 className="text-md font-semibold mb-2">Current Bowler</h3>
                                            <div className="bg-white rounded-md p-3 flex justify-between">
                                                <div>
                                                    <div className="font-medium">
                                                        {currentBowler?.player?.name || 'Current bowler'}
                                                    </div>
                                                    <div className="text-sm text-slate-500">
                                                        {currentBowler ? `${currentBowler?.wickets}/${currentBowler?.runs} (${currentBowler?.overs} overs)` : ''}
                                                    </div>
                                                </div>
                                                <div className="text-right">
                                                    <div className="text-lg font-semibold">
                                                        {currentBowler?.economy || '0.0'}
                                                    </div>
                                                    <div className="text-xs text-slate-500">ECON</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="p-4 border-t">
                                    <h3 className="text-md font-semibold mb-2">Recent Overs</h3>
                                    <div className="flex overflow-x-auto space-x-2 py-2">
                                        {recentOvers?.slice(-6).map((over) => (
                                            <div key={over.number} className="flex-shrink-0 min-w-[120px] bg-slate-50 rounded p-2 border border-slate-100">
                                                <div className="flex justify-between items-center mb-1">
                                                    <div className="text-xs font-medium">Over {over?.number}</div>
                                                    <div className="text-xs text-slate-500">{over.runs} runs</div>
                                                </div>
                                                <div className="flex flex-wrap gap-1">
                                                    {over?.deliveries.map((delivery, idx) => (
                                                        <div
                                                            key={idx}
                                                            className={`w-5 h-5 flex items-center justify-center rounded-full text-xs font-medium
                            ${delivery.isWicket ? 'bg-red-500 text-white' :
                                                                    delivery.isExtra ? 'bg-yellow-100 text-yellow-800' :
                                                                        delivery.runs === 4 ? 'bg-blue-100 text-blue-800' :
                                                                            delivery.runs === 6 ? 'bg-purple-100 text-purple-800' :
                                                                                delivery.runs === 0 ? 'bg-slate-200 text-slate-800' :
                                                                                    'bg-green-100 text-green-800'
                                                                }`}
                                                        >
                                                            {delivery.isWicket ? 'W' :
                                                                delivery.isExtra ? (delivery.extraType === 'wide' ? 'Wd' : 'Nb') :
                                                                    delivery.runs}
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </CardContent>

                            <CardFooter className="p-4 bg-white border-t flex justify-between">
                                <div className="text-sm text-slate-500">
                                    {format === 'T20' ? '20-over match' : format === 'ODI' ? '50-over match' : 'Test match'}
                                </div>
                                <div className="text-sm">
                                    Innings {currentInnings}/{totalInnings}
                                </div>
                            </CardFooter>
                        </Card>

                        <Tabs defaultValue="batting">
                            <TabsList className="w-full mb-4">
                                <TabsTrigger value="batting" className="flex-1">Batting</TabsTrigger>
                                <TabsTrigger value="bowling" className="flex-1">Bowling</TabsTrigger>
                                <TabsTrigger value="teams" className="flex-1">Teams</TabsTrigger>
                            </TabsList>

                            <TabsContent value="batting">
                                <Card>
                                    <CardHeader>
                                        <CardTitle>{score?.batting?.team?.name} - Batting</CardTitle>
                                    </CardHeader>
                                    <CardContent className="p-0">
                                        <div className="overflow-x-auto">
                                            <table className="w-full">
                                                <thead>
                                                    <tr className="text-left text-sm text-slate-500 border-b">
                                                        <th className="px-4 py-2 font-medium">Batter</th>
                                                        <th className="px-4 py-2 font-medium text-center">R</th>
                                                        <th className="px-4 py-2 font-medium text-center">B</th>
                                                        <th className="px-4 py-2 font-medium text-center">4s</th>
                                                        <th className="px-4 py-2 font-medium text-center">6s</th>
                                                        <th className="px-4 py-2 font-medium text-center">SR</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {battingOrder[battingTeamId]?.map((batter) => (
                                                        <tr
                                                            key={batter?.player?.id}
                                                            className={`border-b last:border-b-0 hover:bg-slate-50 ${getBatsmanStatusClass(
                                                                batter,
                                                                currentBatsmen?.striker?.player?.id === batter?.player?.id
                                                            )
                                                                }`}
                                                        >
                                                            <td className="px-4 py-3">
                                                                <div className="flex items-center">
                                                                    <div>
                                                                        {batter?.player?.name}
                                                                        {batter?.player?.isCaptain && <span className="ml-1 text-xs font-bold">(C)</span>}
                                                                        {batter?.player?.isWicketKeeper && <span className="ml-1 text-xs font-bold">(WK)</span>}
                                                                        {currentBatsmen.striker?.player?.id === batter?.player?.id && <span className="ml-2 text-xs">*</span>}
                                                                        {currentBatsmen.nonStriker?.player?.id === batter?.player?.id && <span className="ml-2 text-xs">†</span>}
                                                                    </div>
                                                                </div>
                                                                {batter?.dismissal && (
                                                                    <div className="text-xs text-slate-500 mt-1">
                                                                        {batter?.dismissal?.description}
                                                                    </div>
                                                                )}
                                                            </td>
                                                            <td className="px-4 py-3 text-center font-medium">
                                                                {batter?.runs}
                                                            </td>
                                                            <td className="px-4 py-3 text-center">
                                                                {batter?.balls}
                                                            </td>
                                                            <td className="px-4 py-3 text-center">
                                                                {batter?.fours}
                                                            </td>
                                                            <td className="px-4 py-3 text-center">
                                                                {batter?.sixes}
                                                            </td>
                                                            <td className="px-4 py-3 text-center">
                                                                {batter?.balls > 0 ? batter?.strikeRate?.toFixed(1) : '0.0'}
                                                            </td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                                <tfoot>
                                                    <tr className="bg-slate-50">
                                                        <td className="px-4 py-3 font-medium">Extras</td>
                                                        <td className="px-4 py-3 text-center" colSpan={5}>
                                                            {score?.batting?.extras.wide + score?.batting?.extras.noBall +
                                                                score?.batting?.extras.byes + score?.batting?.extras.legByes +
                                                                score?.batting?.extras.penalty}
                                                            (WD: {score?.batting?.extras.wide},
                                                            NB: {score?.batting?.extras.noBall},
                                                            B: {score?.batting?.extras.byes},
                                                            LB: {score?.batting?.extras.legByes},
                                                            P: {score?.batting?.extras.penalty})
                                                        </td>
                                                    </tr>
                                                    <tr className="font-semibold">
                                                        <td className="px-4 py-3">Total</td>
                                                        <td className="px-4 py-3 text-center" colSpan={5}>
                                                            {score?.batting?.runs}/{score?.batting?.wickets}
                                                            ({formatOvers(score?.batting?.overs)} Overs, RR: {currentRunRate?.toFixed(2)})
                                                        </td>
                                                    </tr>
                                                </tfoot>
                                            </table>
                                        </div>
                                    </CardContent>
                                </Card>
                            </TabsContent>

                            <TabsContent value="bowling">
                                <Card>
                                    <CardHeader>
                                        <CardTitle>{score?.bowling.team.name} - Bowling</CardTitle>
                                    </CardHeader>
                                    <CardContent className="p-0">
                                        <div className="overflow-x-auto">
                                            <table className="w-full">
                                                <thead>
                                                    <tr className="text-left text-sm text-slate-500 border-b">
                                                        <th className="px-4 py-2 font-medium">Bowler</th>
                                                        <th className="px-4 py-2 font-medium text-center">O</th>
                                                        <th className="px-4 py-2 font-medium text-center">M</th>
                                                        <th className="px-4 py-2 font-medium text-center">R</th>
                                                        <th className="px-4 py-2 font-medium text-center">W</th>
                                                        <th className="px-4 py-2 font-medium text-center">ECON</th>
                                                        <th className="px-4 py-2 font-medium text-center">0s</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {bowlingStats[bowlingTeamId]?.filter(bowler => bowler?.overs > 0).map((bowler) => (
                                                        <tr
                                                            key={bowler?.player?.id}
                                                            className={`border-b last:border-b-0 hover:bg-slate-50 ${currentBowler?.player?.id === bowler?.player?.id ? 'bg-sport-cricket/10 font-medium' : ''
                                                                }`}
                                                        >
                                                            <td className="px-4 py-3">
                                                                {bowler?.player.name}
                                                                {bowler?.player.isCaptain && <span className="ml-1 text-xs font-bold">(C)</span>}
                                                            </td>
                                                            <td className="px-4 py-3 text-center">
                                                                {bowler?.overs}
                                                            </td>
                                                            <td className="px-4 py-3 text-center">
                                                                {bowler?.maidens}
                                                            </td>
                                                            <td className="px-4 py-3 text-center">
                                                                {bowler?.runs}
                                                            </td>
                                                            <td className="px-4 py-3 text-center font-medium">
                                                                {bowler?.wickets}
                                                            </td>
                                                            <td className="px-4 py-3 text-center">
                                                                {bowler?.economy?.toFixed(1)}
                                                            </td>
                                                            <td className="px-4 py-3 text-center">
                                                                {bowler?.dots}
                                                            </td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>
                                    </CardContent>
                                </Card>
                            </TabsContent>

                            <TabsContent value="teams">
                                <Card>
                                    <CardHeader>
                                        <CardTitle>Teams</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div>
                                                <h3 className="font-semibold text-lg mb-2">{match?.teams?.home?.name}</h3>
                                                <ul className="space-y-1">
                                                    {match?.teams?.home?.players?.map((player) => (
                                                        <li key={player?.id} className="flex items-center py-1">
                                                            <span className="w-8 text-center text-sm text-slate-500">{player.jerseyNumber}</span>
                                                            <span className="flex-1">{player.name}</span>
                                                            <span className="text-xs">
                                                                {player.isCaptain && <span className="bg-blue-100 text-blue-800 px-2 py-0.5 rounded mr-1">C</span>}
                                                                {player.isWicketKeeper && <span className="bg-green-100 text-green-800 px-2 py-0.5 rounded mr-1">WK</span>}
                                                                {player.isSubstitute && <span className="bg-yellow-100 text-yellow-800 px-2 py-0.5 rounded">SUB</span>}
                                                            </span>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>

                                            <div>
                                                <h3 className="font-semibold text-lg mb-2">{match?.teams?.away?.name}</h3>
                                                <ul className="space-y-1">
                                                    {match?.teams?.away?.players?.map((player) => (
                                                        <li key={player?.id} className="flex items-center py-1">
                                                            <span className="w-8 text-center text-sm text-slate-500">{player.jerseyNumber}</span>
                                                            <span className="flex-1">{player.name}</span>
                                                            <span className="text-xs">
                                                                {player.isCaptain && <span className="bg-blue-100 text-blue-800 px-2 py-0.5 rounded mr-1">C</span>}
                                                                {player.isWicketKeeper && <span className="bg-green-100 text-green-800 px-2 py-0.5 rounded mr-1">WK</span>}
                                                                {player.isSubstitute && <span className="bg-yellow-100 text-yellow-800 px-2 py-0.5 rounded">SUB</span>}
                                                            </span>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            </TabsContent>
                        </Tabs>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CricketScorecard;
