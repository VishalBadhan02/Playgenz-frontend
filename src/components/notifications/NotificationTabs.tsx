// components/notifications/NotificationTabs.tsx

import React from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";

interface Props {
    activeTab: 'all' | 'unread';
    setActiveTab: (value: 'all' | 'unread') => void;
    activeCategory: string;
    setActiveCategory: (value: any) => void;
    getCategoryCount: (category: any) => number;
}

const NotificationTabs: React.FC<Props> = ({
    activeTab,
    setActiveTab,
    activeCategory,
    setActiveCategory,
    getCategoryCount
}) => {
    return (
        <>
            <Tabs defaultValue={activeTab} className="w-full" onValueChange={(value) => setActiveTab(value as 'all' | 'unread')}>
                <div className="flex justify-between items-center border-b">
                    <TabsList>
                        <TabsTrigger value="all">All</TabsTrigger>
                        <TabsTrigger value="unread">Unread</TabsTrigger>
                    </TabsList>
                </div>
            </Tabs>

            <div className="mt-4 flex flex-wrap gap-2">
                {['all', 'requests', 'team', 'tournament', 'achievement'].map((category) => (
                    <Badge
                        key={category}
                        className={`cursor-pointer px-3 py-1 ${activeCategory === category ? 'bg-primary' : 'bg-secondary hover:bg-secondary/80'}`}
                        onClick={() => setActiveCategory(category as any)}
                    >
                        {category.charAt(0).toUpperCase() + category.slice(1)} ({getCategoryCount(category as any)})
                    </Badge>
                ))}
            </div>
        </>
    );
};

export default NotificationTabs;
