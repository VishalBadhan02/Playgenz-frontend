import { ScrollArea } from "../ui/scroll-area"
import { TabsList, TabsTrigger } from "../ui/tabs"

export const TournamentTabSelection = ({ activeTab }) => {
    return (
        <ScrollArea className="w-full pb-1 ">
            <TabsList className="w-max whitespace-nowrap flex p-0 bg-transparent">
                {["overview", "teams", "matches", "photos", "leaderboard"].map((tab) => (
                    <TabsTrigger
                        key={tab}
                        value={tab}
                        className={`rounded-none border-b-2 capitalize ${activeTab === tab ? "border-primary" : "border-transparent"
                            }`}
                    >
                        {tab}
                    </TabsTrigger>
                ))}
            </TabsList>
        </ScrollArea>
    )
}
