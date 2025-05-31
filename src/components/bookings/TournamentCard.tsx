import React, { useState } from "react";
import { Calendar, MapPin, Users } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import useTournamentService from "@/services/tournamentService";
import { useMutation } from "@tanstack/react-query";
import { Spinner } from "../Spinner";

export const TournamentCard: React.FC<any> = ({ tournament }) => {
    const [showPasswordModal, setShowPasswordModal] = useState(false);
    const [password, setPassword] = useState("");
    const { loginTournament } = useTournamentService();
    const navigate = useNavigate();

    const {
        mutate: loginData,
        isPending: isLogedin,
    } = useMutation({
        mutationFn: (payload: { _id: string; password: string }) =>
            loginTournament(payload),
        onSuccess: (data) => {
            toast({
                title: "Tournament Created Successfully",
                description: "Your tournament has been created and is pending approval",
            });

            // Navigate back to tournaments page
            navigate(`/tournament/${data?.data?.id}/dashboard`);
        },
        onError: (error) => {
            console.log(error);
        }
    });

    const handleDashboardAccess = () => {
        loginData({ _id: tournament._id, password });
    };

    return (
        <>
            <div className="overflow-hidden rounded-lg border shadow-sm hover:border-accent/40 transition-colors hover-scale">
                <div className="relative h-40 overflow-hidden">
                    <img
                        src={tournament?.imageUrl || 'https://via.placeholder.com/400x200'}
                        alt={tournament?.name}
                        className="h-full w-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                    <div className="absolute bottom-0 left-0 p-4">
                        <h3 className="text-lg font-semibold text-white">{tournament?.name}</h3>
                    </div>
                </div>

                <div className="space-y-4 p-4">
                    <div className="flex flex-wrap gap-4 text-sm">
                        <div className="flex items-center gap-1">
                            <Calendar className="h-4 w-4 text-muted-foreground" />
                            <span>{tournament?.startDate}</span>
                            <span className="mx-1">-</span>
                            <span>{tournament?.endDate}</span>
                        </div>

                        <div className="flex items-center gap-1">
                            <MapPin className="h-4 w-4 text-muted-foreground" />
                            <span>{tournament?.location}</span>
                        </div>
                    </div>

                    <div className="flex justify-between text-sm">
                        <div className="flex items-center gap-1">
                            <Users className="h-4 w-4 text-muted-foreground" />
                            <span>
                                {tournament?.teams}/{tournament?.maxTeams} Teams
                            </span>
                        </div>

                        <div>
                            {tournament?.registrationOpen ? (
                                <span className="rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium text-green-800">
                                    Registration Open
                                </span>
                            ) : (
                                <span className="rounded-full bg-orange-100 px-2 py-0.5 text-xs font-medium text-orange-800">
                                    Registration Closed
                                </span>
                            )}
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                        <Link to={`/tournament/${tournament?.id}`} className="inline-flex h-9 items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground">
                            View Details
                        </Link>

                        <button
                            onClick={() => setShowPasswordModal(true)}
                            className="inline-flex h-9 items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground transition-colors"
                        >
                            Manage
                        </button>
                    </div>
                </div>
            </div>

            {/* 🔐 Password Modal */}
            <Dialog open={showPasswordModal} onOpenChange={setShowPasswordModal}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Enter Dashboard Password</DialogTitle>
                    </DialogHeader>
                    <Input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Tournament Password"
                    />
                    <div className="flex justify-end gap-2 pt-4">
                        <Button variant="outline" onClick={() => setShowPasswordModal(false)} disabled={isLogedin}>Cancel</Button>
                        <Button onClick={handleDashboardAccess}>{!isLogedin ? "Enter" : <Spinner />}</Button>
                    </div>
                </DialogContent>
            </Dialog>
        </>
    );
};
