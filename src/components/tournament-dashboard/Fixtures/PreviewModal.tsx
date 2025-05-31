import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MapPin } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

export const PreviewFixtureCard = ({ match }) => {
    return (
        <>
            <Card key={match?.id} className="mb-4 overflow-hidden">
                <div className="bg-muted p-3 flex justify-between items-center">
                    <div className="text-xs font-medium">{match?.dateTime}</div>
                    <Badge variant={
                        match?.status === 'live' ? 'destructive' :
                            match?.status === 'completed' ? 'secondary' : 'outline'
                    }>
                        {match?.status === 'live' ? 'LIVE' :
                            match?.status === 'completed' ? 'Completed' : 'Upcoming'}
                    </Badge>
                </div>

                <CardContent className="p-4">
                    <div className="flex flex-col gap-3">
                        {/* Team 1 */}
                        <div className="flex items-center gap-3">
                            <Avatar className="h-8 w-8">
                                <AvatarImage src={match?.team1?.logo} alt={match?.team1?.name} />
                                <AvatarFallback>{match?.team1?.name?.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div className="font-medium">{match?.team1?.name || "Team 1"}</div>
                            {match?.team1?.score && <div className="ml-auto font-bold">{match?.team1?.score}</div>}
                        </div>

                        {/* VS */}
                        <div className="flex items-center justify-center my-1">
                            <div className="text-sm px-3 py-1 rounded-full bg-muted font-medium">VS</div>
                        </div>

                        {/* Team 2 */}
                        <div className="flex items-center gap-3">
                            <Avatar className="h-8 w-8">
                                <AvatarImage src={match?.team2?.logo} alt={match?.team2?.name} />
                                <AvatarFallback>{match?.team2?.name?.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div className="font-medium">{match?.team2?.name || "Team 2"}</div>
                            {match?.team2?.score && <div className="ml-auto font-bold">{match?.team2?.score}</div>}
                        </div>
                    </div>

                    {/* Venue */}
                    <div className="mt-4 pt-3 border-t flex flex-col gap-2">
                        <div className="flex items-center gap-1 text-sm text-muted-foreground">
                            <MapPin className="h-4 w-4" />
                            <span>{match?.venue}</span>
                        </div>


                    </div>
                </CardContent>
            </Card>
        </>
    );
};


{/* <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                    <div>
                        <CardTitle className="text-lg">{editableMatch?.team1?.name || "nsjknjk"} vs {editableMatch?.team2?.name}</CardTitle>
                        <CardDescription className="flex items-center gap-2 mt-1 text-sm text-muted-foreground">
                            <MapPin size={14} />
                            {editMode ? (
                                <Input
                                    name="venue"
                                    value={editableMatch?.venue}
                                    onChange={handleInputChange}
                                    className="max-w-xs"
                                />
                            ) : (
                                editableMatch?.venue
                            )}
                        </CardDescription>
                    </div>
                    {editMode ? (
                        <Button variant="outline" size="icon" onClick={handleSave}>
                            <Save size={18} />
                        </Button>
                    ) : (
                        <Button variant="outline" size="icon" onClick={() => setEditMode(true)}>
                            <Edit2 size={18} />
                        </Button>
                    )}
                </CardHeader>

                <CardContent className="space-y-4">
                    <div className="flex items-center gap-6">
                        <Avatar>
                            <AvatarImage src={editableMatch?.team1?.avatar} />
                            <AvatarFallback>{editableMatch?.team1?.name.charAt(0) || "dshbhj"}</AvatarFallback>
                        </Avatar>
                        {editMode ? (
                            <Input
                                name="team1Name"
                                value={editableMatch?.team1?.name}
                                onChange={(e) =>
                                    setEditableMatch((prev) => ({
                                        ...prev,
                                        team1: { ...prev.team1, name: e.target.value }
                                    }))
                                }
                            />
                        ) : (
                            <p>{editableMatch?.team1?.name}</p>
                        )}
                    </div>

                    <div className="flex items-center gap-6">
                        <Avatar>
                            <AvatarImage src={editableMatch?.team2?.avatar} />
                            <AvatarFallback>{editableMatch?.team2?.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        {editMode ? (
                            <Input
                                name="team2Name"
                                value={editableMatch?.team2?.name}
                                onChange={(e) =>
                                    setEditableMatch((prev) => ({
                                        ...prev,
                                        team2: { ...prev.team2, name: e.target.value }
                                    }))
                                }
                            />
                        ) : (
                            <p>{editableMatch?.team2?.name}</p>
                        )}
                    </div>

                    <div>
                        <label className="text-sm text-muted-foreground">Match Date & Time</label>
                        {editMode ? (
                            <Input
                                name="dateTime"
                                value={editableMatch?.dateTime}
                                onChange={handleInputChange}
                            />
                        ) : (
                            <p>{editableMatch?.dateTime}</p>
                        )}
                    </div>

                    {editMode && (
                        <Button variant="destructive" onClick={() => onDeleteMatch(match?.id)}>
                            Delete Match
                        </Button>
                    )}
                </CardContent>
            </Card>  */}