import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
    Trophy, Clock, Info, Shield, Clipboard, ChevronRight,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '../ui/button';

export const TournamentOverview = ({ tournamentData }) => {
    return (
        <>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-4 md:mt-6">
                <div className="lg:col-span-2">
                    <Card>
                        <CardHeader>
                            <CardTitle>Tournament Information</CardTitle>
                            <CardDescription>Complete details about the tournament</CardDescription>
                        </CardHeader>
                        <CardContent className="grid gap-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <h4 className="text-sm font-medium text-muted-foreground mb-2">Tournament Format</h4>
                                    <p className="text-sm md:text-base">{tournamentData.format} format with group stages followed by knockout rounds</p>
                                </div>
                                <div>
                                    <h4 className="text-sm font-medium text-muted-foreground mb-2">Entry Fee</h4>
                                    <p className="text-sm md:text-base">{tournamentData.entryFee}</p>
                                </div>
                                <div>
                                    <h4 className="text-sm font-medium text-muted-foreground mb-2">Organizer</h4>
                                    <p className="text-sm md:text-base">{tournamentData.organizer}</p>
                                </div>
                                <div>
                                    <h4 className="text-sm font-medium text-muted-foreground mb-2">Registration Deadline</h4>
                                    <p className="text-sm md:text-base">June 10, 2025</p>
                                </div>
                            </div>

                            <div>
                                <h4 className="text-sm font-medium text-muted-foreground mb-2">Tournament Rules</h4>
                                <ul className="list-disc pl-5 space-y-1 text-sm md:text-base">
                                    <li>Each team must have at least 11 players and maximum 15 players</li>
                                    <li>Matches will be played in T20 format with standard ICC rules</li>
                                    <li>Teams must arrive 30 minutes before match time</li>
                                    <li>Teams must wear proper cricket uniforms</li>
                                    <li>Tournament committee decisions will be final</li>
                                </ul>
                            </div>

                            <div>
                                <h4 className="text-sm font-medium text-muted-foreground mb-2">Prize Breakdown</h4>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                                    <div className="flex flex-col items-center justify-center p-3 bg-muted rounded-lg">
                                        <Trophy className="h-8 w-8 text-yellow-500 mb-2" />
                                        <span className="text-sm font-medium">Winner</span>
                                        <span className="text-xs text-muted-foreground">$5,000</span>
                                    </div>
                                    <div className="flex flex-col items-center justify-center p-3 bg-muted rounded-lg">
                                        <Trophy className="h-7 w-7 text-gray-400 mb-2" />
                                        <span className="text-sm font-medium">Runner-up</span>
                                        <span className="text-xs text-muted-foreground">$2,000</span>
                                    </div>
                                    <div className="flex flex-col items-center justify-center p-3 bg-muted rounded-lg">
                                        <Trophy className="h-6 w-6 text-amber-700 mb-2" />
                                        <span className="text-sm font-medium">Third Place</span>
                                        <span className="text-xs text-muted-foreground">$1,000</span>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="mt-6">
                        <CardHeader>
                            <CardTitle>Recent Updates</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                <div className="flex gap-4 items-start border-l-2 border-primary pl-4 py-1">
                                    <Clock className="h-4 w-4 text-muted-foreground" />
                                    <div>
                                        <p className="text-sm font-medium">5 days ago</p>
                                        <p className="text-sm">Registration is now open for the Summer Cricket Championship 2025!</p>
                                    </div>
                                </div>
                                <div className="flex gap-4 items-start border-l-2 border-muted pl-4 py-1">
                                    <Clock className="h-4 w-4 text-muted-foreground" />
                                    <div>
                                        <p className="text-sm font-medium">1 week ago</p>
                                        <p className="text-sm">Venue confirmed: All matches will be played at Central Sports Complex.</p>
                                    </div>
                                </div>
                                <div className="flex gap-4 items-start border-l-2 border-muted pl-4 py-1">
                                    <Clock className="h-4 w-4 text-muted-foreground" />
                                    <div>
                                        <p className="text-sm font-medium">2 weeks ago</p>
                                        <p className="text-sm">Tournament dates announced: June 15 to July 10, 2025.</p>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                <div>
                    <Card>
                        <CardHeader>
                            <CardTitle>Quick Registration</CardTitle>
                            <CardDescription>Register your team now</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-4">
                                <Button className="w-full">
                                    <Shield className="mr-2 h-4 w-4" />
                                    Register My Team
                                </Button>
                                <Link
                                    to="/register-tournament"
                                    className="block w-full text-center py-2 text-sm text-primary hover:underline"
                                >
                                    View detailed registration
                                </Link>
                            </div>

                            <div className="rounded-lg border p-4">
                                <h4 className="text-sm font-medium mb-2 flex items-center gap-2">
                                    <Info className="h-4 w-4 text-muted-foreground" />
                                    Important Dates
                                </h4>
                                <div className="space-y-2 text-sm">
                                    <div className="flex justify-between">
                                        <span className="text-muted-foreground">Registration Opens:</span>
                                        <span>May 1, 2025</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-muted-foreground">Registration Closes:</span>
                                        <span>June 10, 2025</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-muted-foreground">Tournament Start:</span>
                                        <span>June 15, 2025</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-muted-foreground">Finals:</span>
                                        <span>July 10, 2025</span>
                                    </div>
                                </div>
                            </div>

                            <div className="rounded-lg border p-4">
                                <h4 className="text-sm font-medium mb-2 flex items-center gap-2">
                                    <Clipboard className="h-4 w-4 text-muted-foreground" />
                                    Contact Organizer
                                </h4>
                                <div className="space-y-2 text-sm">
                                    <div className="flex justify-between">
                                        <span className="text-muted-foreground">Email:</span>
                                        <span className="break-all">info@citysports.com</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-muted-foreground">Phone:</span>
                                        <span>(555) 123-4567</span>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                </div>
            </div>
        </>
    )
}