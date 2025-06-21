import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import TeamFilter from "@/components/team-finder/TeamFilter";
import NoTeamsFound from "@/components/team-finder/NoTeamFound";
import TeamList from "@/components/team-finder/TeamList";
import { useQuery } from "@tanstack/react-query";
import useTeamService from "@/services/teamService";
import { ErrorModal } from "@/components/ErrorModal";
import { Spinner } from "@/components/Spinner";
import { Search } from "lucide-react";




const FindTeam = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSport, setSelectedSport] = useState("All Sports");
  const [selectedLevel, setSelectedLevel] = useState("All Levels");
  const [showFilters, setShowFilters] = useState(false);
  const { fetchTeams } = useTeamService();

  const {
    data: teamData,
    isLoading,
    isError,
    error,
    refetch
  } = useQuery({
    queryKey: ['team-fetching', selectedSport],
    queryFn: () => fetchTeams(selectedSport),
  });

  useEffect(() => {
    if (isLoading) { <Spinner />; }
  }, [selectedSport])

  if (isError) return <ErrorModal
    open={isError}
    onClose={() => refetch()}
    error={error}
    header="Server Error"
    description="We're experiencing some issues with our server. Please try again later."
  />;

  const filteredTeams = teamData?.data?.filter((team: any) => {
    const matchesSearch = team?.name
      .toLowerCase()
      .includes(searchTerm?.toLowerCase());
    const matchesSport =
      selectedSport === "All Sports" || team?.sport === selectedSport;
    const matchesLevel =
      selectedLevel === "All Levels" || team?.level === selectedLevel;
    return matchesSearch && matchesSport && matchesLevel;
  });

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className="container mx-auto p-4 space-y-6">
      <div className="flex flex-col space-y-2">
        <h1 className="text-3xl font-bold">Team Finder</h1>
        <p className="text-muted-foreground">
          Find teams to play against or join as a member
        </p>
      </div>

      <Tabs defaultValue="find" className="w-full" >
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="find">Find Match</TabsTrigger>
          <TabsTrigger value="join">Join Team</TabsTrigger>
        </TabsList>

        <div className="flex flex-col sm:flex-row gap-3 mt-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search teams..."
              value={searchTerm}
              onChange={handleSearchChange}
              className="pl-9"
            />
          </div>

          <TeamFilter
            showFilters={showFilters}
            setShowFilters={setShowFilters}
            selectedSport={selectedSport}
            setSelectedSport={setSelectedSport}
            selectedLevel={selectedLevel}
            setSelectedLevel={setSelectedLevel}
          />
        </div>

        <TabsContent value="find" className="mt-0">
          {filteredTeams?.length === 0 ? (
            <NoTeamsFound />
          ) : (
            <TeamList teams={filteredTeams} actionLabel="Challenge" />

          )}
        </TabsContent>

        <TabsContent value="join" className="mt-0">
          {filteredTeams?.length === 0 ? (
            <NoTeamsFound />
          ) : (
            <TeamList teams={filteredTeams} actionLabel="Join Team" />
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default FindTeam;



// <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//   {filteredTeams?.map((team: any) => (
//     <Card
//       key={team?.id}
//       className="overflow-hidden hover:shadow-md transition-shadow hover-scale"
//     >
//       <CardHeader className="bg-gradient-to-r from-primary to-primary/70 text-white p-4">
//         <div className="flex items-center justify-between">
//           <div className="flex items-center gap-3">
//             <Avatar>
//               <AvatarImage src={team?.logo} alt={team?.name} />
//               <AvatarFallback>
//                 {team?.name.substring(0, 2).toUpperCase()}
//               </AvatarFallback>
//             </Avatar>
//             <div>
//               <CardTitle className="text-lg">{team?.name}</CardTitle>
//               <CardDescription className="text-white/80">
//                 {team?.sport}
//               </CardDescription>
//             </div>
//           </div>
//           <Badge
//             variant="secondary"
//             className="bg-white/20 text-white hover:bg-white/30"
//           >
//             {team?.level}
//           </Badge>
//         </div>
//       </CardHeader>
//       <CardContent className="p-4">
//         <div className="space-y-2">
//           <div className="flex items-center gap-2">
//             <MapPin className="h-4 w-4 text-muted-foreground" />
//             <span className="text-sm">{team?.location}</span>
//           </div>
//           <div className="flex items-center gap-2">
//             <Users className="h-4 w-4 text-muted-foreground" />
//             <span className="text-sm">{team?.members} Members</span>
//           </div>
//           <div className="flex items-center gap-2">
//             <Trophy className="h-4 w-4 text-muted-foreground" />
//             <span className="text-sm">
//               {team?.wins}W - {team?.losses}L - {team?.draws}D
//             </span>
//           </div>
//         </div>
//       </CardContent>
//       <CardFooter className="p-4 pt-0 flex gap-2">
//         <Dialog>
//           <DialogTrigger asChild>
//             <Button
//               className="flex-1"
//               onClick={() => setSelectedTeam(team)}
//             >
//               Challenge
//               <ArrowRight className="ml-2 h-4 w-4" />
//             </Button>
//           </DialogTrigger>
//           <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-auto">
//             {selectedTeam && (
//               <TeamMatchRequest
//                 team={selectedTeam}
//                 onClose={() => setSelectedTeam(null)}
//               />
//             )}
//           </DialogContent>
//         </Dialog>
//       </CardFooter>
//     </Card>
//   ))}
// </div>


// <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//   {filteredTeams.map((team) => (
//     <Card
//       key={team?.id}
//       className="overflow-hidden hover:shadow-md transition-shadow hover-scale"
//     >
//       <CardHeader className="bg-gradient-to-r from-primary to-primary/70 text-white p-4">
//         <div className="flex items-center justify-between">
//           <div className="flex items-center gap-3">
//             <Avatar>
//               <AvatarImage src={team?.logo} alt={team?.name} />
//               <AvatarFallback>
//                 {team?.name.substring(0, 2).toUpperCase()}
//               </AvatarFallback>
//             </Avatar>
//             <div>
//               <CardTitle className="text-lg">{team?.name}</CardTitle>
//               <CardDescription className="text-white/80">
//                 {team?.sport}
//               </CardDescription>
//             </div>
//           </div>
//           <Badge
//             variant="secondary"
//             className="bg-white/20 text-white hover:bg-white/30"
//           >
//             {team?.level}
//           </Badge>
//         </div>
//       </CardHeader>
//       <CardContent className="p-4">
//         <div className="space-y-2">
//           <div className="flex items-center gap-2">
//             <MapPin className="h-4 w-4 text-muted-foreground" />
//             <span className="text-sm">{team?.location}</span>
//           </div>
//           <div className="flex items-center gap-2">
//             <Users className="h-4 w-4 text-muted-foreground" />
//             <span className="text-sm">{team?.members} Members</span>
//           </div>
//           <div className="flex items-center gap-2">
//             <Trophy className="h-4 w-4 text-muted-foreground" />
//             <span className="text-sm">
//               {team?.wins}W - {team?.losses}L - {team?.draws}D
//             </span>
//           </div>
//         </div>
//       </CardContent>
//       <CardFooter className="p-4 pt-0 flex gap-2">
//         <Dialog>
//           <DialogTrigger asChild>
//             <Button
//               className="flex-1"
//               onClick={() => setSelectedTeam(team)}
//             >
//               Join Team
//               <Users className="ml-2 h-4 w-4" />
//             </Button>
//           </DialogTrigger>
//           <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-auto">
//             {selectedTeam && (
//               <JoinTeamRequest
//                 team={selectedTeam}
//                 onClose={() => setSelectedTeam(null)}
//               />
//             )}
//           </DialogContent>
//         </Dialog>
//       </CardFooter>
//     </Card>
//   ))}
// </div>
// <div className="text-center py-12">
//   <FolderClosed className="mx-auto h-12 w-12 text-muted-foreground" />
//   <h3 className="mt-4 text-lg font-medium">No teams found</h3>
//   <p className="mt-2 text-muted-foreground">
//     Try adjusting your search or filters
//   </p>
// </div>