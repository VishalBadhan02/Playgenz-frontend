
import React from 'react';
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { TeamData } from '../types/teamTypes';

interface TeamProfileViewProps {
  team: TeamData;
}

const TeamProfileView: React.FC<TeamProfileViewProps> = ({ team }) => {
  return (
    <div className="mt-12 grid gap-8 md:grid-cols-2">
      <Card>
        <CardContent className="pt-6">
          <h3 className="mb-4 text-lg font-semibold">Team Information</h3>

          <div className="space-y-4">
            <div>
              <Label className="text-muted-foreground">Team Name</Label>
              <div className="mt-1">{team?.name}</div>
            </div>

            <div>
              <Label className="text-muted-foreground">Sport</Label>
              <div className="mt-1">{team?.sport}</div>
            </div>

            <div>
              <Label className="text-muted-foreground">Location</Label>
              <div className="mt-1">{team?.location}</div>
            </div>

            <div>
              <Label className="text-muted-foreground">Founded</Label>
              <div className="mt-1">{team?.foundedDate}</div>
            </div>

            <div>
              <Label className="text-muted-foreground">Contact Email</Label>
              <div className="mt-1">{team?.contactEmail}</div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="pt-6">
          <h3 className="mb-4 text-lg font-semibold">Team Description</h3>
          <p className="text-muted-foreground">{team?.description}</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default TeamProfileView;
