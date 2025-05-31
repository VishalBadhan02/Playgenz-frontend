import React, { useEffect, useState } from "react";
import { format } from "date-fns";
import { Calendar, Clock, Users, Info } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import {
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { useGamesAndFixtures } from "@/hooks/gamesAndFixtures";
import { Spinner } from "../Spinner";
import { ErrorModal } from "../ErrorModal";
import useTeamService from "@/services/teamService";
import { useMutation } from "@tanstack/react-query";

interface TeamMatchRequestProps {
  team: any;
  onClose: () => void;
}

const TeamMatchRequest: React.FC<TeamMatchRequestProps> = ({ team, onClose }) => {
  const { toast } = useToast();
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [time, setTime] = useState("18:00");
  const [venue, setVenue] = useState("");
  const [notes, setNotes] = useState("");
  const [playersPerTeam, setPlayersPerTeam] = useState(5);
  const [gameUnits, setGameUnits] = useState(30);
  const [unitLabel, setUnitLabel] = useState("units");
  const { handleChallenge } = useTeamService();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    data: gfData,
    isLoading,
    isError,
    error,
    refetch,
  } = useGamesAndFixtures();

  const {
    mutate: makeChallenge,
    isPending: isSendingInvite,
  } = useMutation({
    mutationFn: (matchData: object) =>
      handleChallenge(matchData),
    onSuccess: (data) => {
      console.log("data", data)
      if (data?.status === false) {
        < ErrorModal
          open={isError}
          onClose={() => refetch()}
          error={error}
          header="Can't place match"
          description={`Oops! You don’t have a ${team?.sport} team registered yet.`}
        />
      }
      onClose();
      setIsSubmitting(false);

      toast({
        title: "Invitation sent",
        description: `An invitation has been sent to `
      });
    },
    onError: (error) => {
      console.log(error);
      < ErrorModal
        open={isError}
        onClose={() => refetch()}
        error={error}
        header="Server Error"
        description="We're experiencing some issues with our server. Please try again later."

      />
    }
  });

  useEffect(() => {
    if (isLoading || isError || !gfData) return;

    const gamesList = gfData.games_link;
    const sportInfo = gamesList.find(
      (game: any) => game.name.toLowerCase() === team.sport.toLowerCase()
    );

    if (sportInfo) {
      setPlayersPerTeam(parseInt(sportInfo.player));
      setGameUnits(sportInfo.default);
      setUnitLabel(sportInfo.label);
    }
  }, [gfData, team.sport, isLoading]);

  if (isLoading) return <Spinner />;
  if (isError)
    return (
      <ErrorModal open={isError} onClose={refetch} error={error} header="Server Error"
        description="We're experiencing some issues with our server. Please try again later."
      />
    );

  const handleSubmit = async () => {
    if (!date) {
      toast({
        title: "Missing information",
        description: "Please select a date for the match.",
        variant: "destructive",
      });
      return;
    }

    if (!venue) {
      toast({
        title: "Missing information",
        description: "Please specify a venue for the match.",
        variant: "destructive",
      });
      return;
    }

    const challengeData = {
      teamId: team?.id,
      sport: team?.sport,
      userId: team?.userId,
      date,
      time,
      venue,
      notes,
      playersPerTeam
    };

    setIsSubmitting(true);

    try {
      makeChallenge(challengeData); // 👈 get the response here

    } catch (error) {
      // optional: custom error handling here
      console.error("Error sending challenge:", error);
    }

  };



  return (
    <>
      <DialogHeader>
        <DialogTitle>Challenge Team</DialogTitle>
        <DialogDescription>
          Send a match request to play against {team.name}
        </DialogDescription>
      </DialogHeader>

      <div className="flex items-center gap-3 my-4">
        <Avatar className="h-12 w-12">
          <AvatarImage src={team.logo} alt={team.name} />
          <AvatarFallback>{team.name.substring(0, 2).toUpperCase()}</AvatarFallback>
        </Avatar>
        <div>
          <h3 className="font-semibold">{team.name}</h3>
          <p className="text-sm text-muted-foreground">
            {team.sport} • {team.level}
          </p>
        </div>
      </div>

      <Separator className="my-4" />

      <ScrollArea className="max-h-[60vh] pr-4">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="date">Match Date</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full justify-start text-left font-normal"
                >
                  <Calendar className="mr-2 h-4 w-4" />
                  {date ? format(date, "PPP") : "Select a date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <CalendarComponent
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  initialFocus
                  disabled={(date) => date < new Date()}
                />
              </PopoverContent>
            </Popover>
          </div>

          <div className="space-y-2">
            <Label htmlFor="time">Match Time</Label>
            <div className="flex items-center">
              <Clock className="mr-2 h-4 w-4 text-muted-foreground" />
              <Input
                id="time"
                type="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="venue">Venue</Label>
            <Input
              id="venue"
              placeholder="Enter match venue"
              value={venue}
              onChange={(e) => setVenue(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="playersPerTeam">Players per Team</Label>
            <div className="flex items-center">
              <Users className="mr-2 h-4 w-4 text-muted-foreground" />
              <Select
                value={playersPerTeam.toString()}
                onValueChange={(value) =>
                  setPlayersPerTeam(parseInt(value))
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select number of players" />
                </SelectTrigger>
                <SelectContent>
                  {Array.from({ length: 11 }, (_, i) => i + 2).map((num) => (
                    <SelectItem key={num} value={num.toString()}>
                      {num} players
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="gameUnits">
              {`Game Duration (${unitLabel})`}
            </Label>
            <div className="flex items-center gap-2">
              <Input
                id="gameUnits"
                type="number"
                min={1}
                value={gameUnits}
                onChange={(e) =>
                  setGameUnits(parseInt(e.target.value) || 1)
                }
              />
              <Badge variant="outline" className="text-sm">
                {unitLabel}
              </Badge>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes">Additional Notes</Label>
            <Textarea
              id="notes"
              placeholder="Any specific requests or information for the team captain..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="min-h-[100px]"
            />
          </div>

          <div className="flex items-start gap-2 rounded-md bg-muted p-3 text-sm">
            <Info className="h-4 w-4 text-muted-foreground mt-0.5" />
            <p className="text-muted-foreground">
              The team captain will receive your request and can accept, suggest
              changes, or decline. You'll be notified of their response.
            </p>
          </div>
        </div>
      </ScrollArea>

      <DialogFooter className="mt-6">
        <Button variant="outline" onClick={onClose}>
          Cancel
        </Button>
        <Button onClick={handleSubmit} disabled={isSubmitting}>
          {isSubmitting ? "Sending..." : "Send Challenge"}
        </Button>
      </DialogFooter>
    </>
  );
};

export default TeamMatchRequest;
