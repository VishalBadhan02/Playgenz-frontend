import { useScorecard } from "@/contexts/ScorecardContext";
import { useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/score-ui/tabs";
import { Card, CardContent, CardDescription } from "@/components/score-ui/card";
import ScorecardSelector from "./ScorcardSelector";
import { ScorecardContainer } from "./ScorecardContainer";


export const ScorecardContent = ({ activeTab, setActiveTab, sport, id }: { activeTab: string, setActiveTab: (tab: string) => void, sport: string, id: string }) => {
    const { selectedSport, cricketScorecard, setSelectedSport } = useScorecard();
    // console.log('Selected Sport:', sport);

    // ✅ Auto-switch to scorecard tab if sport param is present in URL
    useEffect(() => {
        if (sport) {
            setActiveTab('scorecard');
        }
    }, [sport, setActiveTab]);

    // ✅ Update selectedSport in context based on URL param
    useEffect(() => {
        if (sport && selectedSport !== sport) {
            setSelectedSport("cricket");
        }
    }, [sport, selectedSport, setSelectedSport]);
    // Auto-switch to scorecard tab when cricket match setup is completed
    // useEffect(() => {
    //     if (selectedSport === 'cricket' && cricketScorecard.match.toss) {
    //         setActiveTab('scorecard');
    //     }
    // }, [cricketScorecard.match.toss, selectedSport, setActiveTab]);

    return (
        <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
        >
            <TabsList className="mb-6 max-w-md mx-auto">
                <TabsTrigger value="selector" className="flex-1">Select Type</TabsTrigger>
                <TabsTrigger value="scorecard" className="flex-1">Scorecard</TabsTrigger>
            </TabsList>

            <TabsContent value="selector">
                <Card className="mb-6">
                    <CardContent className="pt-6">
                        <CardDescription className="text-center mb-6">
                            First, select the type of sport for your scorecard
                        </CardDescription>
                        <ScorecardSelector onComplete={() => setActiveTab('scorecard')} />
                    </CardContent>
                </Card>
            </TabsContent>

            <TabsContent value="scorecard">
                <ScorecardContainer />
            </TabsContent>
        </Tabs>
    );
};