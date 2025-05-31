import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs";
import { useIsMobile } from "@/hooks/use-mobile";
import { Calendar, Upload, Users, Edit, Trophy, Image, Settings, Clipboard, BarChart } from 'lucide-react';
import TournamentDetailsManager from '@/components/tournament-dashboard/TournamentDetailsManager';
import TeamManagement from '@/components/tournament-dashboard/TeamManagement';
import FixtureGenerator from '@/components/tournament-dashboard/FixtureGenerator';
import TournamentGallery from '@/components/tournament-dashboard/TournamentGallery';
import TournamentStatistics from '@/components/tournament-dashboard/TournamentStatistics';
import TournamentSettings from "./TournamentSettings";

interface TournamentTabsProps {
    activeTab: string;
    setActiveTab: (value: string) => void;
    tournament: any;
}

const TournamentTabs: React.FC<TournamentTabsProps> = ({ activeTab, setActiveTab, tournament }) => {
    const isMobile = useIsMobile();

    return (
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            {isMobile ? (
                <div className="mb-4">
                    <select
                        className="w-full p-2 border rounded-md bg-background"
                        value={activeTab}
                        onChange={(e) => setActiveTab(e.target.value)}
                    >
                        <option value="details">Tournament Details</option>
                        <option value="teams">Teams</option>
                        <option value="fixtures">Fixtures</option>
                        <option value="gallery">Gallery</option>
                        <option value="stats">Statistics</option>
                        <option value="settings">Settings</option>
                    </select>
                </div>
            ) : (
                <TabsList className="w-full justify-start mb-4 bg-transparent overflow-x-auto flex">
                    <TabsTrigger value="details" className="text-sm">
                        <Edit className="h-4 w-4 mr-2" /> Tournament Details
                    </TabsTrigger>
                    <TabsTrigger value="teams" className="text-sm">
                        <Users className="h-4 w-4 mr-2" /> Teams
                    </TabsTrigger>
                    <TabsTrigger value="fixtures" className="text-sm">
                        <Calendar className="h-4 w-4 mr-2" /> Fixtures
                    </TabsTrigger>
                    <TabsTrigger value="gallery" className="text-sm">
                        <Image className="h-4 w-4 mr-2" /> Gallery
                    </TabsTrigger>
                    <TabsTrigger value="stats" className="text-sm">
                        <BarChart className="h-4 w-4 mr-2" /> Statistics
                    </TabsTrigger>
                    <TabsTrigger value="settings" className="text-sm">
                        <Settings className="h-4 w-4 mr-2" /> Settings
                    </TabsTrigger>
                </TabsList>
            )}

            <TabsContent value="details">
                <TournamentDetailsManager tournament={tournament} />
            </TabsContent>
            <TabsContent value="teams">
                <TeamManagement tournamentId={tournament} />
            </TabsContent>
            <TabsContent value="fixtures">
                <FixtureGenerator tournamentId={tournament} />
            </TabsContent>
            <TabsContent value="gallery">
                <TournamentGallery tournamentId={tournament} />
            </TabsContent>
            <TabsContent value="stats">
                <TournamentStatistics tournamentId={tournament} />
            </TabsContent>
            <TabsContent value="settings">
                <TournamentSettings />
            </TabsContent>
        </Tabs>
    );
};

export default TournamentTabs;
