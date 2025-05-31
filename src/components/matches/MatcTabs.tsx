import React from 'react';

interface MatchTabsProps {
    activeTab: 'upcoming' | 'past' | 'live';
    setActiveTab: (tab: 'upcoming' | 'past' | 'live') => void;
}

const MatchTabs: React.FC<MatchTabsProps> = ({ activeTab, setActiveTab }) => {
    return (
        <div className="flex border-b">
            {['upcoming', 'live', 'past'].map((tab) => (
                <button
                    key={tab}
                    className={`px-4 py-2 text-sm font-medium ${activeTab === tab ? 'border-b-2 border-primary text-primary' : 'text-muted-foreground hover:text-foreground'
                        }`}
                    onClick={() => setActiveTab(tab as 'upcoming' | 'past' | 'live')}
                >
                    {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
            ))}
        </div>
    );
};

export default MatchTabs;