
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { CalendarIcon, Trophy, MapPin } from 'lucide-react';
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { AspectRatio } from "@/components/ui/aspect-ratio";

interface TournamentDetailsManagerProps {
  tournament: any;
}

const TournamentDetailsManager: React.FC<TournamentDetailsManagerProps> = ({ tournament }) => {
  const { toast } = useToast();
  const [startDate, setStartDate] = useState<Date>(tournament?.start_date);
  const [endDate, setEndDate] = useState<Date>(tournament?.end_date);
  const [posterImage, setPosterImage] = useState<string>("https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?q=80&w=1605&auto=format&fit=crop");

  // console.log(tournament)

  const handleSave = () => {
    toast({
      title: "Changes saved",
      description: "Tournament details have been updated",
    });
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // In a real app, you'd upload the file to a server
      // For now, create a temporary URL for preview
      const imageUrl = URL.createObjectURL(file);
      setPosterImage(imageUrl);

      toast({
        title: "Image uploaded",
        description: "Tournament poster has been updated",
      });
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Tournament Details</CardTitle>
          <CardDescription>Update your tournament information</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="tournament-name">Tournament Name</Label>
            <Input
              id="tournament-name"
              defaultValue={tournament?.name}
              placeholder="Enter tournament name"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Start Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !startDate && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {startDate ? format(startDate, "PPP") : <span>Pick a date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={startDate}
                    onSelect={setStartDate}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div className="space-y-2">
              <Label>End Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !endDate && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {endDate ? format(endDate, "PPP") : <span>Pick a date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={endDate}
                    onSelect={setEndDate}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="location">Location</Label>
            <Input
              id="location"
              defaultValue={tournament?.address}
              placeholder="Tournament location"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="max-teams">Maximum Teams</Label>
              <Input
                id="max-teams"
                type="number"
                defaultValue={tournament?.totalTeams}
                min="2"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="entry-fee">Entry Fee</Label>
              <Input
                id="entry-fee"
                defaultValue={tournament?.entryFee}
                placeholder="Enter entry fee"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="prize">Prize Details</Label>
            <Input
              id="prize"
              defaultValue="$5,000 for winner, $2,000 for runner-up"
              placeholder="Enter prize details"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              rows={4}
              defaultValue="The biggest cricket tournament of the summer. Join us for exciting T20 matches featuring teams from all over the region. Great prizes and opportunities await the winners!"
              placeholder="Enter tournament description"
            />
          </div>
        </CardContent>
        <CardFooter>
          <Button onClick={handleSave}>Save Changes</Button>
        </CardFooter>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Tournament Poster</CardTitle>
          <CardDescription>Upload a promotional image for your tournament</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <AspectRatio ratio={16 / 9} className="overflow-hidden rounded-md border">
            {posterImage ? (
              <img
                src={posterImage}
                alt="Tournament poster"
                className="object-cover w-full h-full"
              />
            ) : (
              <div className="flex items-center justify-center h-full bg-muted">
                <Trophy className="h-12 w-12 text-muted-foreground" />
              </div>
            )}
          </AspectRatio>

          <div className="flex items-center justify-center w-full">
            <Label
              htmlFor="poster-upload"
              className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer bg-muted/50 hover:bg-muted"
            >
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <Trophy className="w-8 h-8 mb-2 text-muted-foreground" />
                <p className="mb-2 text-sm text-foreground font-medium">Click to upload poster image</p>
                <p className="text-xs text-muted-foreground">SVG, PNG, JPG or GIF</p>
              </div>
              <Input
                id="poster-upload"
                type="file"
                className="hidden"
                accept="image/*"
                onChange={handleImageUpload}
              />
            </Label>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TournamentDetailsManager;
