
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { useIsMobile } from "@/hooks/use-mobile";
import { MobileFixtureCard } from './Fixtures/MobileFixtureCard';
import { FixtureCard } from './Fixtures/FixturesCard';
import { FixtureGeneratorCard } from './Fixtures/FixtureGenerateCard';
import { useMutation, useQuery } from '@tanstack/react-query';
import useTournamentService from '@/services/tournamentService';
import { MobileResultInputs } from './Fixtures/MobileResultsInput';
import { ResultInputs } from './Fixtures/ResultsInput';
import { PreviewFixtureCard } from './Fixtures/PreviewModal';
import { Button } from '../ui/button';
import { ErrorModal } from '../ErrorModal';
import { Spinner } from '../Spinner';
import useScoreService from '@/services/scoreService';
import { useFixtureMutations } from '@/mutations/useFixtureMutations';


interface FixtureGeneratorProps {
  tournamentId: any;
}

interface MatchFixture {
  roundNumber?: number;
  id: string;
  team1: {
    id: string;
    name: string;
    avatar?: string;
    score?: string;
  };
  team2: {
    id: string;
    name: string;
    avatar?: string;
    score?: string;
  };
  dateTime: string;
  venue: string;
  status: 'upcoming' | 'live' | 'completed';
  result?: string;
}

const FixtureGenerator: React.FC<FixtureGeneratorProps> = ({ tournamentId }) => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('schedule');
  const [previewModal, setPreviewModal] = useState(false);
  const [save, setSave] = useState(false);
  const [regenerate, setRegenerate] = useState(false);
  const [fixturesData, setFixturesData] = useState<MatchFixture[]>([]);
  const isMobile = useIsMobile();
  const { setFixtures, getFixtureData } = useTournamentService();
  const { setScoring } = useScoreService();
  const [selectedRound, setSelectedRound] = useState(1);



  const { fixture, fixturePending } = useFixtureMutations({
    setFixtures,
    setPreviewModal,
    setFixturesData,
    setActiveTab,
    save,
    setRegenerate,
  });


  const {
    mutate: startMatch,
    isPending: matchPending,
  } = useMutation({
    mutationFn: (cardData: object) =>
      setScoring(cardData),
    onSuccess: (data) => {
      window.location.href = `/scorecard/${tournamentId?.sport}/${data?.data}`;
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to send the invitation"
      });
    }
  });

  const {
    data: roundData,
    isLoading,
    isError,
    error,
    refetch
  } = useQuery({
    queryKey: ['generated-round', tournamentId?._id],
    queryFn: () => getFixtureData(tournamentId?._id, selectedRound),
    enabled: !!tournamentId,
  });


  if (isError) return <ErrorModal
    open={isError}
    onClose={() => refetch()}
    error={error}
    header="Server Error"
    description="We're experiencing some issues with our server. Please try again later."
  />;

  // Mock data for fixtures
  const fixtures: MatchFixture[] = roundData?.data?.matches || fixturesData || [];

  // const fixtures: MatchFixture[] = [
  //   {
  //     id: 'm1',
  //     team1: { id: 't1', name: 'Royal Strikers', avatar: '/placeholder.svg' },
  //     team2: { id: 't2', name: 'Thunder Kings', avatar: '/placeholder.svg' },
  //     dateTime: 'June 15, 2025 - 2:00 PM',
  //     venue: 'Main Stadium',
  //     status: 'upcoming',
  //   },
  //   {
  //     id: 'm2',
  //     team1: { id: 't3', name: 'Golden Eagles', avatar: '/placeholder.svg' },
  //     team2: { id: 't4', name: 'Metro Warriors', avatar: '/placeholder.svg' },
  //     dateTime: 'June 15, 2025 - 5:00 PM',
  //     venue: 'Main Stadium',
  //     status: 'upcoming',
  //   },
  // ];

  const handleGenerateFixtures = (fixtureData?: object) => {
    fixture({
      regenerate,
      save,
      tournamentId: tournamentId?._id,
      fixtures: fixtureData,
    });
    console.log('Fixture Data:', regenerate);
  };

  const handleRegeneration = () => {
    fixture({
      regenerate: true,
      save: false,
      tournamentId: tournamentId?._id,
    });
    console.log('Fixture Data:', regenerate);
  };

  const handleSaveFixtures = () => {
    setSave(true)
    fixture({
      regenerate: false,
      save: true,
      tournamentId: tournamentId?._id,
    });
    console.log('Fixture Data:', regenerate);
  };

  const handleStartMatch = (matchId: string, teamA: string, teamB: String) => {
    console.log('Match ID:', matchId);
    startMatch({
      teamA,
      teamB,
      matchId,
      tournamentId: tournamentId?._id,
    });
  };

  const handleUpdateScore = (matchId: string) => {
    toast({
      title: "Score updated",
      description: "Match score has been updated",
    });
  };



  return (
    <div className="space-y-6">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">

        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="schedule">Schedule</TabsTrigger>
          <TabsTrigger value="generator">Generator</TabsTrigger>
          <TabsTrigger value="results">Results</TabsTrigger>
        </TabsList>



        <TabsContent value="schedule" className="space-y-4 mt-4">
          <select
            onChange={(e) => { setSelectedRound(Number(e.target.value)); refetch(); }}
            value={selectedRound}
            className="p-2 border rounded"
          >
            {[...Array(roundData?.data?.roundNumber)].map((_, index) => (
              <option key={index + 1} value={index + 1}>
                Round {index + 1}
              </option>
            ))}
          </select>
          <Card>
            {isLoading ? (
              <Spinner />
            ) : (
              <>
                <CardHeader>
                  <CardTitle>Match Schedule</CardTitle>
                  <CardDescription>View and edit upcoming matches</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {isMobile
                    ? fixtures.map((value) => (
                      <MobileFixtureCard key={value.id} match={value} tournament={tournamentId} handleStartMatch={handleStartMatch} />
                    ))
                    : fixtures.map((match) => (
                      <FixtureCard key={match.id} match={match} tournament={tournamentId} handleStartMatch={handleStartMatch} />
                    ))}
                </CardContent>
              </>
            )}
          </Card>
        </TabsContent>


        <TabsContent value="generator" className="space-y-4 mt-4">
          {previewModal ? (
            <>
              {/* Save and Regenerate Buttons - for whole table */}
              <div className="flex gap-2 mt-6">
                <Button
                  size="sm"
                  className="w-full"
                  onClick={() => handleSaveFixtures()}
                >
                  Save Fixtures
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  className="w-full"
                  onClick={() => handleRegeneration()}
                >
                  Regenerate Fixtures
                </Button>
              </div>

              {/* Fixture Cards Preview */}
              {fixtures?.map((match, index) => (
                <PreviewFixtureCard
                  key={index}
                  match={match}
                />
              ))}


            </>
          ) : (
            <FixtureGeneratorCard
              handleGenerateFixtures={handleGenerateFixtures}
              sport={tournamentId?.tournamentMode}
              fixtureMode={tournamentId?.fixtureType}
              isPending={fixturePending}
            />
          )}
        </TabsContent>



        <TabsContent value="results" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Update Results</CardTitle>
              <CardDescription>Record scores and results for completed matches</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {isMobile ? (
                fixtures.map((value) => <MobileResultInputs key={value.id} match={value} handleUpdateScore={handleUpdateScore} />)
              ) : (
                fixtures.map((value) => (
                  <ResultInputs key={value.id} match={value} handleUpdateScore={handleUpdateScore} />
                ))
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div >
  );
};

export default FixtureGenerator;
