import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Filter } from "lucide-react";
import { useGamesAndFixtures } from "@/hooks/gamesAndFixtures";
import { Spinner } from "../Spinner";
import { ErrorModal } from "../ErrorModal";


interface TeamFilterProps {
    showFilters: boolean;
    setShowFilters: (value: boolean) => void;
    selectedSport: string;
    setSelectedSport: (value: string) => void;
    selectedLevel: string;
    setSelectedLevel: (value: string) => void;
}

const TeamFilter: React.FC<TeamFilterProps> = ({
    showFilters,
    setShowFilters,
    selectedSport,
    setSelectedSport,
    selectedLevel,
    setSelectedLevel,
}) => {
    const [sportData, setSportData] = useState<any>()

    const {
        data: gfData,
        isLoading: gfl,
        isError: gfe,
        error,
        refetch
    } = useGamesAndFixtures();

    useEffect(() => {
        if (gfl) {
            <Spinner />
        } else if (gfe) {
            <ErrorModal
                open={gfe}
                onClose={() => refetch()}
                error={error}
            />;
        } else if (gfData) {
            setSportData(gfData[1])
        } else {
            refetch();
        }
    }, [])

    if (gfData) {
        console.log(gfData[1]?.game_link)
    }
    return (
        <Popover open={showFilters} onOpenChange={setShowFilters}>
            <PopoverTrigger asChild>
                <Button variant="outline" className="flex gap-2">
                    <Filter className="h-4 w-4" />
                    <span>Filters</span>
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80">
                <div className="space-y-4">
                    <h4 className="font-medium">Filter Teams</h4>
                    <Separator />
                    <div className="space-y-2">
                        <h5 className="text-sm font-medium">Sport</h5>
                        <Select value={selectedSport} onValueChange={setSelectedSport}>
                            <SelectTrigger>
                                <SelectValue placeholder="Select sport" />
                            </SelectTrigger>
                            <SelectContent>
                                {sportData ? sportData?.game_link?.map((sport: any) => (
                                    <SelectItem key={sport} value={sport?.value}>
                                        {sport?.name}
                                    </SelectItem>
                                )) : <Spinner />}
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="space-y-2">
                        <h5 className="text-sm font-medium">Level</h5>
                        <Select value={selectedLevel} onValueChange={setSelectedLevel}>
                            <SelectTrigger>
                                <SelectValue placeholder="Select level" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="All Levels">All Levels</SelectItem>
                                <SelectItem value="Beginner">Beginner</SelectItem>
                                <SelectItem value="Intermediate">Intermediate</SelectItem>
                                <SelectItem value="Advanced">Advanced</SelectItem>
                                <SelectItem value="Professional">Professional</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <Button className="w-full" onClick={() => setShowFilters(false)}>
                        Apply Filters
                    </Button>
                </div>
            </PopoverContent>
        </Popover>
    );
};

export default TeamFilter;