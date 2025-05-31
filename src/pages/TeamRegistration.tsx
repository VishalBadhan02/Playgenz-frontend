
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { GameSelection } from '@/components/team-registration/GameSelection';
import { TeamDetailsForm } from '@/components/team-registration/TeamDetailsForm';
import { TeamRegistrationSuccess } from '@/components/team-registration/TeamRegistrationSuccess';
import { useToast } from "@/components/ui/use-toast";
import useTeamService from '@/services/teamService';
import { useMutation } from '@tanstack/react-query';

type GameType = "cricket" | "football" | "badminton" | "volleyball" | "tennis" | "basketball" | "online";

export type TeamFormData = {
  teamName: string;
  email: string;
  phoneNumber: string;
  noOfPlayers: string;
  substitute: string;
  homeGround: string;
  addressOfGround: string;
  pinCode: string;
  logo?: File | null;
  games: GameType;
  description: string;
  joinTeam: boolean;
}

const TeamRegistration = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [step, setStep] = useState<number>(1);
  const [selectedGame, setSelectedGame] = useState<GameType | null>(null);
  const [formData, setFormData] = useState<TeamFormData>({
    teamName: '',
    email: '',
    phoneNumber: '',
    noOfPlayers: '',
    substitute: '',
    homeGround: '',
    addressOfGround: '',
    pinCode: '',
    logo: null,
    games: 'cricket',
    description: '',
    joinTeam: false,
  });
  const { registerTeam } = useTeamService();
  const mutation = useMutation({
    mutationFn: registerTeam,
    onSuccess: (data) => {
      // Handle successful response
      console.log('Data created:', data);
    },
    onError: (error) => {
      // Handle error response
      console.error('Error creating data:', error);
    },
  });

  const handleGameSelect = (game: GameType) => {
    setSelectedGame(game);
    setFormData(prev => ({ ...prev, games: game }));
    setStep(2);
  };

  const handleFormSubmit = async (data: TeamFormData) => {
    try {
      const form = { ...formData, ...data }

      // api call for team registration 
      mutation.mutate(form);
      // Mock successful registration
      toast({
        title: "Team registered successfully!",
        description: "You can now add team members.",
      });

      setStep(3);
    } catch (error) {
      console.error("Error registering team:", error);
      toast({
        variant: "destructive",
        title: "Registration failed",
        description: "There was an error registering your team. Please try again.",
      });
    }
  };

  const handleAddMembers = () => {
    // Navigate to add team members page
    navigate(`/teams`); // This would ideally go to a team members management page
  };

  return (
    <div className="container max-w-5xl mx-auto px-4 py-8">
      <div className="flex flex-col space-y-8">
        {step === 1 && (
          <GameSelection onSelectGame={handleGameSelect} />
        )}

        {step === 2 && selectedGame && (
          <TeamDetailsForm
            initialData={formData}
            onSubmit={handleFormSubmit}
            selectedGame={selectedGame}
          />
        )}

        {step === 3 && (
          <TeamRegistrationSuccess
            teamName={formData.teamName}
            onAddMembers={handleAddMembers}
          />
        )}
      </div>
    </div>
  );
};

export default TeamRegistration;
