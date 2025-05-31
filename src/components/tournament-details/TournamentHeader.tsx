import React, { useEffect, useState } from "react";
import { Badge } from "../ui/badge";
import { Calendar, MapPin, Trophy, Users, ArrowRight } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Link, useParams } from "react-router-dom";
import { Button } from "../ui/button";
import { AspectRatio } from "../ui/aspect-ratio";
import { useIsMobile } from "@/hooks/use-mobile";
import { useMutation } from "@tanstack/react-query";
import { toast } from "@/hooks/use-toast";
import useTournamentService from "@/services/tournamentService";
import { Modal, ModalContent, ModalHeader, ModalFooter } from "@/components/ui/modal"; // Assuming you have a modal component
import { useFriends } from "@/hooks/userFriends";
import { Spinner } from "../Spinner";

export const TournamentHeader = ({ tournamentData, refresh }) => {
    const isMobile = useIsMobile();
    const { id } = useParams();
    const { setEntry } = useTournamentService();
    const { data, refetch } = useFriends();


    const team = Array.isArray(data?.userTeams?.teams)
        ? data?.userTeams?.teams?.map((value: any) => ({
            id: value?.id,
            name: value?.name,
        }))
        : [];

    useEffect(() => {
        console.log(tournamentData)
        if (!team) { refetch(); }
    }, [team])

    // State for modal and selected team
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedTeam, setSelectedTeam] = useState(null);

    const {
        mutate: handleEntry,
        isPending: isRegistering,
    } = useMutation({
        mutationFn: (entryData: object) => setEntry(entryData),
        onSuccess: () => {
            toast({
                title: "Team Registered Successfully",
                description: "Your team has been registered for the tournament.",
            });
            setIsModalOpen(false); // Close the modal on success
            refresh(); // Refresh the tournament data
        },
        onError: (error) => {
            console.error(error);
            toast({
                title: "Registration Failed",
                description: "An error occurred while registering your team.",
            });
        },
    });

    const handleTeamRegistration = () => {
        if (!selectedTeam) {
            toast({
                title: "No Team Selected",
                description: "Please select a team to register.",
            });
            return;
        }
        const data = {
            id,
            teamId: selectedTeam,
        };
        handleEntry(data);
        setIsModalOpen(false);
    };


    return (
        <>
            <div className="relative rounded-lg overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-primary/90 to-accent/90" />
                <div className="relative p-4 md:p-6 lg:p-8 text-white">
                    <div className="mb-4">
                        <Badge variant="outline" className="border-white text-white mb-2">
                            {tournamentData?.sport} - {tournamentData?.format}
                        </Badge>
                        <h1 className="text-2xl md:text-3xl font-bold tracking-tight mb-2">
                            {tournamentData?.name}
                        </h1>
                        <p className="text-white/90 max-w-3xl text-sm md:text-base">
                            {tournamentData?.description}
                        </p>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6 mt-4 md:mt-6">
                        <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4 md:h-5 md:w-5 text-white/80" />
                            <div>
                                <p className="text-xs md:text-sm text-white/80">Date</p>
                                <p className="text-xs md:text-sm font-medium">
                                    {tournamentData?.startDate} - {tournamentData?.endDate}
                                </p>
                            </div>
                        </div>

                        <div className="flex items-center gap-2">
                            <MapPin className="h-4 w-4 md:h-5 md:w-5 text-white/80" />
                            <div>
                                <p className="text-xs md:text-sm text-white/80">Location</p>
                                <p className="text-xs md:text-sm font-medium">
                                    {tournamentData?.location}
                                </p>
                            </div>
                        </div>

                        <div className="flex items-center gap-2">
                            <Trophy className="h-4 w-4 md:h-5 md:w-5 text-white/80" />
                            <div>
                                <p className="text-xs md:text-sm text-white/80">Prize Pool</p>
                                <p className="text-xs md:text-sm font-medium">
                                    {tournamentData?.prize}
                                </p>
                            </div>
                        </div>

                        <div className="flex items-center gap-2">
                            <Users className="h-4 w-4 md:h-5 md:w-5 text-white/80" />
                            <div>
                                <p className="text-xs md:text-sm text-white/80">Teams</p>
                                <p className="text-xs md:text-sm font-medium">
                                    {tournamentData?.registeredTeams}/{tournamentData?.maxTeams}
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="mt-6 md:mt-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                        <div>
                            <div className="text-xs md:text-sm text-white/80 mb-1">
                                Registration status
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="text-xs md:text-sm font-medium">
                                    {tournamentData?.registeredTeams}/{tournamentData?.maxTeams} Teams
                                    Registered
                                </span>
                                <Progress
                                    value={
                                        (tournamentData?.registeredTeams / tournamentData?.maxTeams) *
                                        100
                                    }
                                    className="w-20 md:w-32 h-2 bg-white/20"
                                />
                            </div>
                        </div>

                        {!tournamentData?.hasRegistered && <div className="flex flex-col sm:flex-row gap-2">
                            {isRegistering ? <Spinner /> : <Button
                                size={isMobile ? "default" : "lg"}
                                className="bg-white text-primary hover:bg-white/90 w-full md:w-auto"
                                onClick={() => setIsModalOpen(true)}
                                disabled={isRegistering}
                            >
                                Register Your Team <ArrowRight className="ml-2 h-4 w-4" />
                            </Button>}
                        </div>}

                        {tournamentData?.hasRegistered && <div className="flex flex-col sm:flex-row gap-2">
                            {isRegistering ? <Spinner /> : <Button
                                size={isMobile ? "default" : "lg"}
                                className="bg-white text-primary hover:bg-white/90 w-full md:w-auto"
                                disabled={isRegistering}
                            >
                                Thanks for registration
                            </Button>}
                        </div>}
                    </div>
                </div>
            </div>

            {tournamentData?.posterImage && (
                <div className="rounded-lg overflow-hidden border">
                    <div className="p-4 bg-muted flex justify-between items-center">
                        <h3 className="font-medium">Tournament Poster</h3>
                    </div>
                    <div className="p-4">
                        <AspectRatio ratio={16 / 9} className="overflow-hidden rounded-md">
                            <img
                                src={tournamentData?.posterImage}
                                alt={`${tournamentData?.name} poster`}
                                className="object-cover w-full h-full"
                            />
                        </AspectRatio>
                    </div>
                </div>
            )}

            {/* Modal for Team Selection */}
            {isModalOpen && (
                <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
                    <ModalContent>
                        <ModalHeader>
                            Select Your Team
                        </ModalHeader>
                        <div className="space-y-4">
                            {team?.map((value: any) => (
                                <div
                                    key={value.id}
                                    className={`p-3 border rounded-md cursor-pointer ${selectedTeam === value.id ? "bg-accent text-white" : ""
                                        }`}
                                    onClick={() => setSelectedTeam(value.id)}
                                >
                                    {value.name}
                                </div>
                            ))}
                        </div>
                        <ModalFooter>
                            <Button
                                variant="outline"
                                onClick={() => setIsModalOpen(false)}
                                className="mr-2"
                            >
                                Cancel
                            </Button>
                            <Button onClick={handleTeamRegistration} disabled={!selectedTeam}>
                                Confirm
                            </Button>
                        </ModalFooter>
                    </ModalContent>
                </Modal>
            )}
        </>
    );
};