
import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle2, UserPlus } from "lucide-react";

interface TeamRegistrationSuccessProps {
  teamName: string;
  onAddMembers: () => void;
}

export const TeamRegistrationSuccess: React.FC<TeamRegistrationSuccessProps> = ({
  teamName,
  onAddMembers
}) => {
  return (
    <Card className="max-w-md mx-auto w-full">
      <CardHeader>
        <div className="flex flex-col items-center space-y-2">
          <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center">
            <CheckCircle2 className="h-8 w-8 text-primary" />
          </div>
          <CardTitle className="text-2xl font-bold text-center">Team Registered Successfully!</CardTitle>
          <CardDescription className="text-center">
            <span className="font-semibold">{teamName}</span> has been registered successfully. 
            You can now add members to your team.
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent className="flex flex-col items-center space-y-4">
        <p className="text-center text-muted-foreground">
          As the team captain, you can invite friends to join your team, or 
          let them request to join by sharing your team profile.
        </p>
      </CardContent>
      <CardFooter className="flex flex-col space-y-3">
        <Button className="w-full" onClick={onAddMembers}>
          <UserPlus className="mr-2 h-4 w-4" /> Add Team Members
        </Button>
        <Button variant="outline" className="w-full" onClick={() => window.location.href = "/teams"}>
          Go to My Teams
        </Button>
      </CardFooter>
    </Card>
  );
};
