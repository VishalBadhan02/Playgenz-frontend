import React from 'react';

type ProfileTabsProps = {
    activeTab: 'overview' | 'teams' | 'achievements';
    setActiveTab: (tab: 'overview' | 'teams' | 'achievements') => void;
};

const ProfileTabs: React.FC<ProfileTabsProps> = ({ activeTab, setActiveTab }) => {
    return (
        <div className="flex border-b overflow-x-auto">
            <button
                className={`px-4 py-2 text-sm font-medium ${activeTab === 'overview'
                    ? 'border-b-2 border-primary text-primary'
                    : 'text-muted-foreground hover:text-foreground'
                    }`}
                onClick={() => setActiveTab('overview')}
            >
                Overview
            </button>
            <button
                className={`px-4 py-2 text-sm font-medium ${activeTab === 'teams'
                    ? 'border-b-2 border-primary text-primary'
                    : 'text-muted-foreground hover:text-foreground'
                    }`}
                onClick={() => setActiveTab('teams')}
            >
                Teams
            </button>
            <button
                className={`px-4 py-2 text-sm font-medium ${activeTab === 'achievements'
                    ? 'border-b-2 border-primary text-primary'
                    : 'text-muted-foreground hover:text-foreground'
                    }`}
                onClick={() => setActiveTab('achievements')}
            >
                Achievements
            </button>
        </div>
    );
};

export default ProfileTabs;