import React from 'react';
import { User, Edit, Settings, Share, X, Plus, MessageCircle, UserX, Undo2, Check, UserPlus } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useAsync } from '@/hooks/use-async';
import useUserService from '@/services/userService';
import { UserActions } from './UserAction';

const ProfileHeader = ({ userData, id, refresh }) => {
    const { loading, execute, ServerErrorModal } = useAsync();
    const { getUserFriends } = useUserService();

    const handleMessage = async () => {
        execute(
            // This is a mock promise that would typically be an API call
            getUserFriends("n", id)
                .then((response) => {
                    const { status, data, message } = response;
                    if (!status) {
                        throw new Error(message || 'Login failed due to invalid credentials.');
                    }
                    window.location.href = `/messages/user/n/${data?.userData?._id}`
                }),
            {
                errorMessage: "Failed fetching profile",
                showErrorModal: true,
            }
        );
    }
    return (
        <div className="relative overflow-hidden rounded-xl bg-gradient-to-r from-primary to-accent p-8 text-white">
            <div className="absolute inset-0 bg-black/20" />

            <div className="relative z-10 flex flex-col items-center gap-4 md:flex-row md:items-start md:justify-between">
                <div className="flex flex-col items-center gap-4 md:flex-row">
                    <Avatar className="h-24 w-24 border-4 border-white">
                        <AvatarImage src={userData?.profilePicture || "/placeholder.svg"} alt={userData?.userName || "jhdfbi"} />
                        <AvatarFallback>
                            <User className="h-12 w-12 text-muted-foreground" />
                        </AvatarFallback>
                    </Avatar>
                    <div className="text-center md:text-left">
                        <h1 className="text-3xl font-bold">{userData?.userName || "dskjn"}</h1>
                        <p className="text-white/80">{userData?.profession || "jhsdgb"}</p>
                        <div className="mt-2 flex justify-center gap-4 md:justify-start">
                            <div className="flex flex-col items-center md:items-start">
                                <span className="text-xs text-white/70">Teams</span>
                                <span className="font-semibold">{userData?.userTeams?.length || "12"}</span>
                            </div>
                            <div className="flex flex-col items-center md:items-start">
                                <span className="text-xs text-white/70">Matches</span>
                                <span className="font-semibold">{userData?.matches || "1"}</span>
                            </div>
                            <div className="flex flex-col items-center md:items-start">
                                <span className="text-xs text-white/70">Tournaments</span>
                                <span className="font-semibold">{userData?.tournaments || "1"}</span>
                            </div>
                        </div>
                    </div>
                </div>
                {id == " " ? <div className="flex gap-2">
                    <button className="rounded-full bg-white px-4 py-2 text-sm font-medium text-primary hover:bg-white/90 transition-colors" onClick={() => window.location.href = "/edit-profile"}>
                        <Edit className="mr-2 inline-block h-4 w-4" />
                        Edit Profile
                    </button>
                    <button className="rounded-full bg-white/20 px-2 py-2 hover:bg-white/30 transition-colors">
                        <Settings className="h-4 w-4" />
                    </button>
                    <button className="rounded-full bg-white/20 px-2 py-2 hover:bg-white/30 transition-colors">
                        <Share className="h-4 w-4" />
                    </button>
                </div> :

                    <UserActions userData={userData} handleMessage={handleMessage} loading={loading} refresh={refresh} />
                }
            </div>
        </div>
    );
};

export default ProfileHeader;