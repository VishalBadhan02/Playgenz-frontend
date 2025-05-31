
import React from 'react';

interface TeamTabsProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const TeamTabs: React.FC<TeamTabsProps> = ({ activeTab, onTabChange }) => {
  return (
    <div className="flex border-b overflow-x-auto scrollbar-none">
      <TabButton 
        isActive={activeTab === 'overview'} 
        onClick={() => onTabChange('overview')}
        label="Overview"
      />
      
      <TabButton 
        isActive={activeTab === 'members'} 
        onClick={() => onTabChange('members')}
        label="Members"
      />
      
      <TabButton 
        isActive={activeTab === 'matches'} 
        onClick={() => onTabChange('matches')}
        label="Matches"
      />
      
      <TabButton 
        isActive={activeTab === 'achievements'} 
        onClick={() => onTabChange('achievements')}
        label="Achievements"
      />
    </div>
  );
};

interface TabButtonProps {
  isActive: boolean;
  onClick: () => void;
  label: string;
}

const TabButton: React.FC<TabButtonProps> = ({ isActive, onClick, label }) => (
  <button
    className={`px-3 py-2 text-xs md:text-sm font-medium ${
      isActive
        ? 'border-b-2 border-primary text-primary'
        : 'text-muted-foreground hover:text-foreground'
    }`}
    onClick={onClick}
  >
    {label}
  </button>
);

export default TeamTabs;
