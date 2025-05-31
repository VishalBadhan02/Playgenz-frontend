
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Player } from '@/components/types/scorecard';
import { useScorecard } from '@/contexts/ScorecardContext';

interface AddPlayerFormProps {
    onClose: () => void;
}

const AddPlayerForm: React.FC<AddPlayerFormProps> = ({ onClose }) => {
    const { selectedSport, addPlayerToTeam } = useScorecard();
    const [playerData, setPlayerData] = useState<Partial<Player>>({
        name: '',
        jerseyNumber: undefined,
        position: '',
        isCaptain: false,
        isWicketKeeper: false,
        isSubstitute: false
    });
    const [team, setTeam] = useState<'home' | 'away'>('home');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!playerData.name) return;

        const newPlayer: Player = {
            id: `player-${Date.now()}`,
            name: playerData.name,
            jerseyNumber: playerData.jerseyNumber,
            position: playerData.position,
            isCaptain: !!playerData.isCaptain,
            isWicketKeeper: !!playerData.isWicketKeeper,
            isSubstitute: !!playerData.isSubstitute
        };

        addPlayerToTeam(team, newPlayer);
        onClose();
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <Label htmlFor="player-name">Player Name</Label>
                <Input
                    id="player-name"
                    value={playerData.name}
                    onChange={(e) => setPlayerData({ ...playerData, name: e.target.value })}
                    placeholder="Enter player name"
                    required
                />
            </div>

            <div>
                <Label htmlFor="jersey-number">Jersey Number</Label>
                <Input
                    id="jersey-number"
                    type="number"
                    value={playerData.jerseyNumber || ''}
                    onChange={(e) => setPlayerData({ ...playerData, jerseyNumber: parseInt(e.target.value) })}
                    placeholder="Enter jersey number"
                />
            </div>

            <div>
                <Label htmlFor="position">Position</Label>
                {selectedSport === 'cricket' ? (
                    <Select
                        onValueChange={(value) => setPlayerData({ ...playerData, position: value })}
                    >
                        <SelectTrigger>
                            <SelectValue placeholder="Select position" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="Batsman">Batsman</SelectItem>
                            <SelectItem value="Bowler">Bowler</SelectItem>
                            <SelectItem value="All-rounder">All-rounder</SelectItem>
                            <SelectItem value="Wicket-keeper">Wicket-keeper</SelectItem>
                        </SelectContent>
                    </Select>
                ) : (
                    <Input
                        id="position"
                        value={playerData.position}
                        onChange={(e) => setPlayerData({ ...playerData, position: e.target.value })}
                        placeholder="Enter player position"
                    />
                )}
            </div>

            <div>
                <Label htmlFor="team">Team</Label>
                <Select
                    onValueChange={(value: 'home' | 'away') => setTeam(value)}
                    defaultValue="home"
                >
                    <SelectTrigger>
                        <SelectValue placeholder="Select team" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="home">Home Team</SelectItem>
                        <SelectItem value="away">Away Team</SelectItem>
                    </SelectContent>
                </Select>
            </div>

            <div className="flex items-center space-x-2">
                <Checkbox
                    id="is-captain"
                    checked={playerData.isCaptain}
                    onCheckedChange={(checked) =>
                        setPlayerData({ ...playerData, isCaptain: checked === true })
                    }
                />
                <Label htmlFor="is-captain">Captain</Label>
            </div>

            {selectedSport === 'cricket' && (
                <div className="flex items-center space-x-2">
                    <Checkbox
                        id="is-wicket-keeper"
                        checked={playerData.isWicketKeeper}
                        onCheckedChange={(checked) =>
                            setPlayerData({ ...playerData, isWicketKeeper: checked === true })
                        }
                    />
                    <Label htmlFor="is-wicket-keeper">Wicket Keeper</Label>
                </div>
            )}

            <div className="flex items-center space-x-2">
                <Checkbox
                    id="is-substitute"
                    checked={playerData.isSubstitute}
                    onCheckedChange={(checked) =>
                        setPlayerData({ ...playerData, isSubstitute: checked === true })
                    }
                />
                <Label htmlFor="is-substitute">Substitute</Label>
            </div>

            <div className="flex justify-end space-x-2">
                <Button type="button" variant="outline" onClick={onClose}>
                    Cancel
                </Button>
                <Button type="submit">Add Player</Button>
            </div>
        </form>
    );
};

export default AddPlayerForm;
