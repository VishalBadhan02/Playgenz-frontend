import React from 'react';
import { MapPin, Calendar, Image, LogOut, Users, Trophy, Award } from 'lucide-react';

const OverviewTab = ({ userData }) => {
    return (
        <div className="grid gap-6 md:grid-cols-3">
            <div className="md:col-span-2 space-y-6">
                <div className="rounded-lg border p-6">
                    <h2 className="mb-4 text-xl font-semibold">About</h2>
                    {/* <p className="text-muted-foreground">{userData?.about || "Sd"}</p> */}
                    <div className="mt-6 grid gap-4 md:grid-cols-2">
                        <div className="flex items-center gap-2">
                            <MapPin className="h-4 w-4 text-muted-foreground" />
                            <span>{userData?.address || "sd"}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4 text-muted-foreground" />
                            <span>Joined {new Date(userData?.createdAt).toLocaleDateString() || "sdjhb"}</span>
                        </div>
                    </div>
                </div>
                <div className="rounded-lg border p-6">
                    <h2 className="mb-4 text-xl font-semibold">Photos</h2>
                    {/* <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                        {userData.photos.map((photo, index) => (
                            <div key={index} className="aspect-square rounded-md overflow-hidden border bg-muted relative group">
                                <img
                                    src={photo}
                                    alt={`User photo ${index + 1}`}
                                    className="object-cover w-full h-full"
                                />
                                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                                    <button className="p-1 bg-white/10 rounded-full">
                                        <Image className="h-5 w-5 text-white" />
                                    </button>
                                </div>
                            </div>
                        ))}
                        <div className="aspect-square rounded-md overflow-hidden border border-dashed flex items-center justify-center bg-muted/50 cursor-pointer hover:bg-muted transition-colors">
                            <div className="flex flex-col items-center text-muted-foreground">
                                <Image className="h-6 w-6 mb-1" />
                                <span className="text-xs">Add Photo</span>
                            </div>
                        </div>
                    </div> */}
                </div>
                <div className="rounded-lg border p-6">
                    <h2 className="mb-4 text-xl font-semibold">Stats</h2>
                    <div className="grid gap-4 md:grid-cols-3">
                        <div className="space-y-2">
                            <div className="text-sm text-muted-foreground">Total Points</div>
                            <div className="text-3xl font-semibold">{userData.stats.totalPoints}</div>
                            <div className="text-xs text-green-600">+{userData.stats.pointsThisMonth} this month</div>
                        </div>
                        <div className="space-y-2">
                            <div className="text-sm text-muted-foreground">Win Rate</div>
                            <div className="text-3xl font-semibold">{userData.stats.winRate}%</div>
                            <div className="text-xs text-green-600">+{userData.stats.winRateChange} this month</div>
                        </div>
                        <div className="space-y-2">
                            <div className="text-sm text-muted-foreground">MVPs</div>
                            <div className="text-3xl font-semibold">{userData.stats.mvps}</div>
                            <div className="text-xs text-muted-foreground">Last: {new Date(userData.stats.lastMvp).toLocaleDateString()}</div>
                        </div>
                    </div>
                </div>
                <div className="rounded-lg border p-6">
                    <div className="mb-4 flex items-center justify-between">
                        <h2 className="text-xl font-semibold">Upcoming Matches</h2>
                        <button className="text-sm font-medium text-primary hover:text-primary/80 transition-colors">
                            View All
                        </button>
                    </div>
                    <div className="space-y-4">
                        {/* {userData.upcomingMatches.map((match, index) => (
                            <div key={index} className="rounded-lg border p-4">
                                <div className="flex items-center justify-between">
                                    <div className="text-sm text-muted-foreground">{new Date(match.date).toLocaleString()}</div>
                                    <div className="rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary">
                                        Upcoming
                                    </div>
                                </div>
                                <div className="mt-2 flex items-center justify-between">
                                    <div>
                                        <div className="font-medium">{match.team1}</div>
                                        <div className="text-sm text-muted-foreground">vs {match.team2}</div>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <MapPin className="h-4 w-4 text-muted-foreground" />
                                        <span className="text-sm">{match.location}</span>
                                    </div>
                                </div>
                            </div>
                        ))} */}
                    </div>
                </div>
            </div>
            <div className="space-y-6">
                <div className="rounded-lg border p-6">
                    <h2 className="mb-4 text-xl font-semibold">Teams</h2>
                    <div className="space-y-3">
                        {userData.teams.map((team, index) => (
                            <div key={index} className="flex items-center justify-between rounded-lg p-2 hover:bg-muted/50 transition-colors">
                                <div className="flex items-center gap-3">
                                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                                        <Users className="h-5 w-5 text-primary" />
                                    </div>
                                    <div>
                                        <div className="font-medium">{team.name}</div>
                                        <div className="text-xs text-muted-foreground">{team.role}</div>
                                    </div>
                                </div>
                                <button className="rounded-md bg-primary/10 px-2 py-1 text-xs font-medium text-primary hover:bg-primary/20 transition-colors">
                                    View
                                </button>
                            </div>
                        ))}
                    </div>
                    <button className="mt-4 w-full rounded-md border px-4 py-2 text-sm font-medium hover:bg-secondary transition-colors">
                        Create New Team
                    </button>
                </div>
                <div className="rounded-lg border p-6">
                    <h2 className="mb-4 text-xl font-semibold">Top Achievements</h2>
                    <div className="space-y-3">
                        {userData.achievements.map((achievement, index) => (
                            <div key={index} className="flex gap-3">
                                <div className={`flex h-10 w-10 items-center justify-center rounded-full ${achievement.color}`}>
                                    {achievement.type === 'trophy' ? (
                                        <Trophy className={`h-5 w-5 ${achievement.iconColor}`} />
                                    ) : (
                                        <Award className={`h-5 w-5 ${achievement.iconColor}`} />
                                    )}
                                </div>
                                <div>
                                    <div className="font-medium">{achievement.title}</div>
                                    <div className="text-xs text-muted-foreground">{achievement.description}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <button className="mt-4 w-full rounded-md border px-4 py-2 text-sm font-medium hover:bg-secondary transition-colors">
                        View All Achievements
                    </button>
                </div>
                <div className="rounded-lg bg-muted p-6 text-center">
                    <LogOut className="mx-auto h-6 w-6 text-muted-foreground" />
                    <h3 className="mt-2 font-medium">Sign Out</h3>
                    <p className="mt-1 text-xs text-muted-foreground">Sign out from all devices</p>
                    <button className="mt-4 w-full rounded-md border border-destructive/30 bg-destructive/10 px-4 py-2 text-sm font-medium text-destructive hover:bg-destructive/20 transition-colors">
                        Sign Out
                    </button>
                </div>
            </div>
        </div>
    );
};

export default OverviewTab;