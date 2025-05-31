import { useScorecard } from "@/contexts/ScorecardContext";
import CricketScorecard from "./CricketScorecard";
import UniversalScorecard from "./UniversalScorecard";

export const ScorecardContainer = () => {
    const { selectedSport, cricketScorecard } = useScorecard();
    const matchSetupCompleted = !!cricketScorecard?.match?.toss;

    return (
        <div className="py-4">
            {selectedSport === 'cricket' ? (
                <CricketScorecard />
            ) : (
                <UniversalScorecard />
            )}
        </div>
    );
};