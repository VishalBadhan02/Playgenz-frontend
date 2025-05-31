
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { TeamData } from './types/teamTypes';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useToast } from '@/hooks/use-toast';
import useTeamService from '@/services/teamService';
import { useParams } from 'react-router-dom';

interface TeamSettingsProps {
  team: any;
  onUpdate: () => void;
}

const TeamSettings: React.FC<TeamSettingsProps> = ({ team, onUpdate }) => {
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [teamVisibility, setTeamVisibility] = useState(team?.teamVisibility);
  const [allowJoinRequests, setAllowJoinRequests] = useState(team?.joinTeam);
  const [showMemberList, setShowMemberList] = useState(team?.memberVisibility);
  const { toast } = useToast();
  const { updateTeamDetails } = useTeamService();
  const { id } = useParams()

  const handleVisibilityChange = async (checked: boolean) => {
    const data = {
      _id: id,
      teamVisibility: checked
    }
    const res = await updateTeamDetails(data)
    if (res.status === true) {
      onUpdate()
      toast({
        title: "Settings updated",
        description: `Team visibility is now ${checked ? 'public' : 'private'}`
      });

    }
    setTeamVisibility(checked)
  };

  const handleJoinRequestsChange = async (checked: boolean) => {
    const data = {
      _id: id,
      joinTeam: checked
    }
    const res = await updateTeamDetails(data)

    if (res.status === true) {
      onUpdate()
      toast({
        title: "Settings updated",
        description: `Join requests are now ${checked ? 'allowed' : 'disabled'}`
      });
    }

    setAllowJoinRequests(checked);

  };

  const handleMemberListChange = async (checked: boolean) => {
    const data = {
      _id: id,
      memberVisibility: checked
    }
    const res = await updateTeamDetails(data)
    if (res.status === true) {
      onUpdate()
      toast({
        title: "Settings updated",
        description: `Member list visibility is now ${checked ? 'public' : 'private'}`
      });
    }
    setShowMemberList(checked);

  };

  const handleTeamDelete = () => {
    // In a real app, this would make an API call to delete the team
    toast({
      title: "Team deleted",
      description: "Your team has been deleted successfully"
    });
    setDeleteDialogOpen(false);
    // Redirect or update state as needed
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Team Privacy Settings</CardTitle>
          <CardDescription>Control who can see and join your team</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <Label htmlFor="team-visibility">Team Visibility</Label>
              <div className="text-sm text-muted-foreground">
                {teamVisibility
                  ? "Your team is visible in search results and team listings"
                  : "Your team is hidden from search results and team listings"}
              </div>
            </div>
            <Switch
              id="team-visibility"
              checked={teamVisibility}
              onCheckedChange={handleVisibilityChange}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <Label htmlFor="join-requests">Allow Join Requests</Label>
              <div className="text-sm text-muted-foreground">
                {allowJoinRequests
                  ? "Other users can request to join your team"
                  : "Other users cannot request to join your team"}
              </div>
            </div>
            <Switch
              id="join-requests"
              checked={allowJoinRequests}
              onCheckedChange={handleJoinRequestsChange}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <Label htmlFor="member-list">Public Member List</Label>
              <div className="text-sm text-muted-foreground">
                {showMemberList
                  ? "Team member list is visible to everyone"
                  : "Team member list is only visible to team members"}
              </div>
            </div>
            <Switch
              id="member-list"
              checked={showMemberList}
              onCheckedChange={handleMemberListChange}
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Danger Zone</CardTitle>
          <CardDescription>
            These actions are irreversible. Please proceed with caution.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border border-destructive/30 p-4">
            <h3 className="text-lg font-medium text-destructive">Delete Team</h3>
            <p className="mt-1 text-sm text-muted-foreground">
              This will permanently delete your team and all associated data.
            </p>
            <Button
              variant="destructive"
              className="mt-4"
              onClick={() => setDeleteDialogOpen(true)}
            >
              Delete Team
            </Button>
          </div>
        </CardContent>
      </Card>

      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your team
              and remove all team data from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleTeamDelete} className="bg-destructive text-destructive-foreground">
              Yes, delete team
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default TeamSettings;
