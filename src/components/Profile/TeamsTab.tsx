import React from 'react';
import { Users } from 'lucide-react';

const TeamsTab = ({ userData }) => {
    return (
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
        </div>
    );
};

export default TeamsTab;