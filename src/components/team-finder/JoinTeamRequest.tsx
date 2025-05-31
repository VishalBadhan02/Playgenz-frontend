
import React, { useState } from "react";
import { Info, Users, Briefcase, Award } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

interface Team {
  id: string;
  name: string;
  sport: string;
  location: string;
  members: number;
  wins: number;
  losses: number;
  draws: number;
  logo?: string;
  captainName: string;
  captainEmail: string;
  level: "Beginner" | "Intermediate" | "Advanced" | "Professional";
}

interface JoinTeamRequestProps {
  team: any;
  onClose: () => void;
}

export const JoinTeamRequest: React.FC<JoinTeamRequestProps> = ({ team, onClose }) => {
  const { toast } = useToast();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [experience, setExperience] = useState("Beginner");
  const [position, setPosition] = useState("");
  const [motivation, setMotivation] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Sport-specific positions
  const positionsMap: Record<string, string[]> = {
    Cricket: ["Batsman", "Bowler", "All-rounder", "Wicket Keeper", "Captain"],
    Football: ["Goalkeeper", "Defender", "Midfielder", "Forward", "Winger"],
    Basketball: ["Point Guard", "Shooting Guard", "Small Forward", "Power Forward", "Center"],
    Volleyball: ["Setter", "Outside Hitter", "Middle Blocker", "Opposite Hitter", "Libero"],
    Tennis: ["Singles Player", "Doubles Player"],
    Badminton: ["Singles Player", "Doubles Player", "Mixed Doubles Player"],
    Hockey: ["Goalkeeper", "Defender", "Midfielder", "Forward"],
  };

  const positions = positionsMap[team.sport] || ["Player"];

  const handleSubmit = () => {
    if (!name || !email) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Join request sent!",
        description: `Your request to join ${team.name} has been sent to the team captain.`,
      });
      setIsSubmitting(false);
      onClose();
    }, 1000);
  };

  return (
    <>
      <DialogHeader>
        <DialogTitle>Join Team Request</DialogTitle>
        <DialogDescription>
          Send a request to join {team.name} as a player
        </DialogDescription>
      </DialogHeader>

      <div className="flex items-center gap-3 my-4">
        <Avatar className="h-12 w-12">
          <AvatarImage src={team.logo} alt={team.name} />
          <AvatarFallback>{team.name.substring(0, 2).toUpperCase()}</AvatarFallback>
        </Avatar>
        <div>
          <h3 className="font-semibold">{team.name}</h3>
          <p className="text-sm text-muted-foreground">{team.sport} • {team.level}</p>
        </div>
      </div>

      <Separator className="my-4" />

      <ScrollArea className="max-h-[60vh] pr-4">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Full Name*</Label>
            <Input
              id="name"
              placeholder="Your full name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email Address*</Label>
            <Input
              id="email"
              type="email"
              placeholder="Your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">Phone Number</Label>
            <Input
              id="phone"
              placeholder="Your phone number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="experience">Experience Level</Label>
            <div className="flex items-center">
              <Award className="mr-2 h-4 w-4 text-muted-foreground" />
              <Select
                value={experience}
                onValueChange={(value) => setExperience(value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select your experience level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Beginner">Beginner</SelectItem>
                  <SelectItem value="Intermediate">Intermediate</SelectItem>
                  <SelectItem value="Advanced">Advanced</SelectItem>
                  <SelectItem value="Professional">Professional</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="position">Preferred Position</Label>
            <div className="flex items-center">
              <Briefcase className="mr-2 h-4 w-4 text-muted-foreground" />
              <Select
                value={position}
                onValueChange={(value) => setPosition(value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select your preferred position" />
                </SelectTrigger>
                <SelectContent>
                  {positions.map((pos) => (
                    <SelectItem key={pos} value={pos}>
                      {pos}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="motivation">Why do you want to join?</Label>
            <Textarea
              id="motivation"
              placeholder="Tell the team captain why you want to join and what skills you bring..."
              value={motivation}
              onChange={(e) => setMotivation(e.target.value)}
              className="min-h-[100px]"
            />
          </div>

          <div className="flex items-start gap-2 rounded-md bg-muted p-3 text-sm">
            <Info className="h-4 w-4 text-muted-foreground mt-0.5" />
            <p className="text-muted-foreground">
              Your request will be sent to the team captain, who will review your
              application. You'll be notified if your request is accepted.
            </p>
          </div>
        </div>
      </ScrollArea>

      <DialogFooter className="mt-6">
        <Button variant="outline" onClick={onClose}>
          Cancel
        </Button>
        <Button onClick={handleSubmit} disabled={isSubmitting}>
          {isSubmitting ? "Sending..." : "Send Request"}
        </Button>
      </DialogFooter>
    </>
  );
};

export default JoinTeamRequest;
