import React from 'react';
import { Trophy, Award } from 'lucide-react';

const AchievementsTab = ({ userData }) => {
    return (
        <div className="space-y-6">
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
        </div>
    );
};

export default AchievementsTab;