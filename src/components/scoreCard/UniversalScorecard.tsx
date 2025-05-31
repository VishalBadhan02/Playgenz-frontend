
import React, { useState } from 'react';
import { useScorecard } from '@/contexts/ScorecardContext';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Plus, Minus, Clock, User, AlertCircle } from "lucide-react";
import AddPlayerForm from './AddPlayerForm';

const UniversalScorecard: React.FC = () => {
    const { universalScorecard, updateUniversalScore, addEvent } = useScorecard();
    const { match, currentPeriod, totalPeriods, score, timeElapsed, events } = universalScorecard;
    const [isAddPlayerDialogOpen, setIsAddPlayerDialogOpen] = useState(false);

    const formatTime = (minutes: number) => {
        const mins = Math.floor(minutes);
        const secs = Math.floor((minutes - mins) * 60);
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    return (
        <div className="max-w-4xl mx-auto">
            <Card className="mb-6 overflow-hidden shadow-lg">
                <CardHeader className="bg-gradient-to-r from-sport-gray to-sport-blue text-white">
                    <CardTitle className="text-center text-2xl md:text-3xl">
                        {match?.teams.home.name} vs {match?.teams.away.name}
                    </CardTitle>
                    <CardDescription className="text-slate-200 text-center">
                        {match?.venue} | {new Date(match?.date).toLocaleDateString()}
                    </CardDescription>
                </CardHeader>

                <CardContent className="p-0">
                    <div className="flex flex-col md:flex-row items-center justify-between p-6 bg-white">
                        <div className="flex flex-col items-center mb-4 md:mb-0">
                            <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mb-2">
                                <img
                                    src={match?.teams.home.logo || '/placeholder.svg'}
                                    alt={match?.teams.home.name}
                                    className="w-12 h-12 object-contain"
                                />
                            </div>
                            <h3 className="text-lg font-semibold">{match?.teams.home.name}</h3>
                        </div>

                        <div className="flex items-center">
                            <Button
                                variant="outline"
                                size="icon"
                                className="rounded-full"
                                onClick={() => updateUniversalScore('home', -1)}
                            >
                                <Minus className="h-4 w-4" />
                            </Button>

                            <div className="flex items-center justify-center mx-4 bg-slate-100 rounded-lg p-4 min-w-[200px]">
                                <div className="text-4xl md:text-6xl font-bold text-sport-blue">
                                    {score?.home}
                                </div>
                                <div className="mx-4 text-4xl md:text-6xl font-bold text-slate-400">-</div>
                                <div className="text-4xl md:text-6xl font-bold text-sport-blue">
                                    {score?.away}
                                </div>
                            </div>

                            <Button
                                variant="outline"
                                size="icon"
                                className="rounded-full"
                                onClick={() => updateUniversalScore('away', -1)}
                            >
                                <Minus className="h-4 w-4" />
                            </Button>
                        </div>

                        <div className="flex flex-col items-center">
                            <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mb-2">
                                <img
                                    src={match?.teams.away.logo || '/placeholder.svg'}
                                    alt={match?.teams.away.name}
                                    className="w-12 h-12 object-contain"
                                />
                            </div>
                            <h3 className="text-lg font-semibold">{match?.teams.away.name}</h3>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2 bg-slate-100 p-4">
                        <Button
                            className="bg-sport-blue hover:bg-sport-blue/90 text-white"
                            onClick={() => updateUniversalScore('home', 1)}
                        >
                            <Plus className="mr-2 h-4 w-4" /> Goal Home
                        </Button>
                        <Button
                            className="bg-sport-blue hover:bg-sport-blue/90 text-white"
                            onClick={() => updateUniversalScore('away', 1)}
                        >
                            <Plus className="mr-2 h-4 w-4" /> Goal Away
                        </Button>
                    </div>

                    <div className="flex justify-between items-center p-4 border-t border-slate-200">
                        <div className="flex items-center">
                            <Clock className="h-5 w-5 mr-2 text-slate-500" />
                            <span className="text-lg font-medium">{formatTime(timeElapsed)}</span>
                        </div>
                        <div className="bg-slate-200 px-4 py-1 rounded-full">
                            <span className="font-medium">Period {currentPeriod}/{totalPeriods}</span>
                        </div>
                        <div className="text-sm font-medium text-slate-500">
                            {match?.status === 'live' ? (
                                <span className="flex items-center">
                                    <span className="h-2 w-2 bg-red-500 rounded-full mr-2 animate-pulse"></span>
                                    LIVE
                                </span>
                            ) : match?.status}
                        </div>
                    </div>
                </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <Card className="md:col-span-2">
                    <CardHeader>
                        <CardTitle>Match Events</CardTitle>
                    </CardHeader>
                    <CardContent className="max-h-64 overflow-y-auto">
                        <ul className="space-y-2">
                            {events.length > 0 ? events.map((event) => (
                                <li
                                    key={event.id}
                                    className="flex items-start p-2 rounded-md hover:bg-slate-50"
                                >
                                    <div className={`w-8 text-right mr-2 font-semibold ${event.team === 'home' ? 'text-sport-blue' : 'text-sport-green'}`}>
                                        {event.minute}'
                                    </div>
                                    <div className="flex-1">
                                        <div className="font-medium">
                                            {event.type === 'goal' && '⚽ '}
                                            {event.type === 'card' && '🟨 '}
                                            {event.type === 'substitution' && '🔄 '}
                                            {event.player?.name || `${match?.teams[event.team].name}`}
                                        </div>
                                        <div className="text-sm text-slate-500">{event.description}</div>
                                    </div>
                                </li>
                            )) : (
                                <div className="text-center py-4 text-slate-400">
                                    <AlertCircle className="mx-auto h-8 w-8 mb-2" />
                                    <p>No events recorded yet</p>
                                </div>
                            )}
                        </ul>
                    </CardContent>
                    <CardFooter className="border-t pt-4 flex justify-between">
                        <Button
                            variant="outline"
                            onClick={() => addEvent('card', 'home')}
                        >
                            Add Card
                        </Button>
                        <Button
                            variant="outline"
                            onClick={() => addEvent('substitution', 'home')}
                        >
                            Add Substitution
                        </Button>
                    </CardFooter>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Manage Team</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                        <Dialog open={isAddPlayerDialogOpen} onOpenChange={setIsAddPlayerDialogOpen}>
                            <DialogTrigger asChild>
                                <Button className="w-full">
                                    <User className="mr-2 h-4 w-4" /> Add Player
                                </Button>
                            </DialogTrigger>
                            <DialogContent className="sm:max-w-[425px]">
                                <AddPlayerForm onClose={() => setIsAddPlayerDialogOpen(false)} />
                            </DialogContent>
                        </Dialog>
                    </CardContent>
                </Card>
            </div>

            <Tabs defaultValue="home-team">
                <TabsList className="w-full mb-4">
                    <TabsTrigger value="home-team" className="flex-1">Home Team</TabsTrigger>
                    <TabsTrigger value="away-team" className="flex-1">Away Team</TabsTrigger>
                </TabsList>

                <TabsContent value="home-team">
                    <Card>
                        <CardHeader>
                            <CardTitle>{match?.teams.home.name} - Players</CardTitle>
                        </CardHeader>
                        <CardContent className="max-h-96 overflow-y-auto">
                            <table className="w-full">
                                <thead>
                                    <tr className="text-left text-sm text-slate-500 border-b">
                                        <th className="pb-2 font-medium">#</th>
                                        <th className="pb-2 font-medium">Name</th>
                                        <th className="pb-2 font-medium">Position</th>
                                        <th className="pb-2 font-medium">Role</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {match?.teams.home.players.map((player) => (
                                        <tr key={player.id} className="border-b last:border-b-0 hover:bg-slate-50">
                                            <td className="py-3">{player.jerseyNumber}</td>
                                            <td className="py-3">
                                                {player.name}
                                                {player.isCaptain && <span className="ml-1 text-xs font-bold">(C)</span>}
                                            </td>
                                            <td className="py-3">{player.position}</td>
                                            <td className="py-3">
                                                {player.isSubstitute && <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded">Sub</span>}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="away-team">
                    <Card>
                        <CardHeader>
                            <CardTitle>{match?.teams.away.name} - Players</CardTitle>
                        </CardHeader>
                        <CardContent className="max-h-96 overflow-y-auto">
                            <table className="w-full">
                                <thead>
                                    <tr className="text-left text-sm text-slate-500 border-b">
                                        <th className="pb-2 font-medium">#</th>
                                        <th className="pb-2 font-medium">Name</th>
                                        <th className="pb-2 font-medium">Position</th>
                                        <th className="pb-2 font-medium">Role</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {match?.teams.away.players.map((player) => (
                                        <tr key={player.id} className="border-b last:border-b-0 hover:bg-slate-50">
                                            <td className="py-3">{player.jerseyNumber}</td>
                                            <td className="py-3">
                                                {player.name}
                                                {player.isCaptain && <span className="ml-1 text-xs font-bold">(C)</span>}
                                            </td>
                                            <td className="py-3">{player.position}</td>
                                            <td className="py-3">
                                                {player.isSubstitute && <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded">Sub</span>}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    );
};

export default UniversalScorecard;
