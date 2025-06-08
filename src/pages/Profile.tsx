
import React, { useState } from 'react';
import { MapPin, Calendar, LogOut, Users, Trophy, Award, Image } from 'lucide-react';
import useUserService from '@/services/userService';
import { useParams } from 'react-router-dom';
import ProfileHeader from '@/components/Profile/ProfileHeader';
import ProfileTabs from '@/components/Profile/ProfileTabs';
import { useQuery } from '@tanstack/react-query';
import { ErrorModal } from '@/components/ErrorModal';
import { Spinner } from '@/components/Spinner';

const Profile = () => {
  const [activeTab, setActiveTab] = useState<'overview' | 'teams' | 'achievements'>('overview');
  const { getProfile } = useUserService();
  const id = useParams().id || " ";

  // Mock data for user photos
  const userPhotos = [
    '/placeholder.svg',
    '/placeholder.svg',
    '/placeholder.svg',
    '/placeholder.svg',
  ];

  const {
    data: profileData,
    isLoading,
    isError,
    error,
    refetch
  } = useQuery({
    queryKey: ['user-profile', id],
    queryFn: () => getProfile(id),
    enabled: !!id,
  });

  if (isLoading) return <Spinner />;
  if (isError) return <ErrorModal
    open={isError}
    onClose={() => refetch()}
    error={error}
    header="Server Error"
    description="We're experiencing some issues with our server. Please try again later."
  />;

  return (
    <div className="space-y-8">
      <ProfileHeader userData={profileData?.data} id={id} refresh={refetch} />
      <ProfileTabs activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* {activeTab === 'overview' && <OverviewTab userData={profileData.data} />} */}
      {activeTab === 'overview' && (
        <div className="grid gap-6 md:grid-cols-3">
          <div className="md:col-span-2 space-y-6">
            <div className="rounded-lg border p-6">
              <h2 className="mb-4 text-xl font-semibold">About</h2>
              <p className="text-muted-foreground">
                Passionate basketball player with 5+ years of experience. Skilled in team coordination, strategy development, and competitive play. Looking to connect with other enthusiasts and join challenging tournaments.
              </p>

              <div className="mt-6 grid gap-4 md:grid-cols-2">
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <span>{profileData?.address}</span>
                </div>

                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span>Joined {new Date(profileData?.createdAt).toLocaleDateString()}</span>
                </div>
              </div>
            </div>

            <div className="rounded-lg border p-6">
              <h2 className="mb-4 text-xl font-semibold">Photos</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                {userPhotos.map((photo, index) => (
                  <div key={index} className="aspect-square rounded-md overflow-hidden border bg-muted relative group">
                    <img
                      src={photo}
                      alt={`User photo ${index + 1}`}
                      className="object-cover w-full h-full"
                    />
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                      <button className="p-1 bg-white/10 rounded-full">
                        <Image className="h-5 w-5 text-white" />
                      </button>
                    </div>
                  </div>
                ))}
                <div className="aspect-square rounded-md overflow-hidden border border-dashed flex items-center justify-center bg-muted/50 cursor-pointer hover:bg-muted transition-colors">
                  <div className="flex flex-col items-center text-muted-foreground">
                    <Image className="h-6 w-6 mb-1" />
                    <span className="text-xs">Add Photo</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-lg border p-6">
              <h2 className="mb-4 text-xl font-semibold">Stats</h2>

              <div className="grid gap-4 md:grid-cols-3">
                <div className="space-y-2">
                  <div className="text-sm text-muted-foreground">Total Points</div>
                  <div className="text-3xl font-semibold">324</div>
                  <div className="text-xs text-green-600">+18 this month</div>
                </div>

                <div className="space-y-2">
                  <div className="text-sm text-muted-foreground">Win Rate</div>
                  <div className="text-3xl font-semibold">68%</div>
                  <div className="text-xs text-green-600">+5% this month</div>
                </div>

                <div className="space-y-2">
                  <div className="text-sm text-muted-foreground">MVPs</div>
                  <div className="text-3xl font-semibold">4</div>
                  <div className="text-xs text-muted-foreground">Last: Aug 2023</div>
                </div>
              </div>
            </div>

          </div>

          <div className="space-y-6">
            <div className="rounded-lg border p-6">
              <h2 className="mb-4 text-xl font-semibold">Teams</h2>

              <div className="space-y-3">
                <div className="flex items-center justify-between rounded-lg p-2 hover:bg-muted/50 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                      <Users className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <div className="font-medium">Thunder Strikers</div>
                      <div className="text-xs text-muted-foreground">Captain</div>
                    </div>
                  </div>
                  <button className="rounded-md bg-primary/10 px-2 py-1 text-xs font-medium text-primary hover:bg-primary/20 transition-colors">
                    View
                  </button>
                </div>

                <div className="flex items-center justify-between rounded-lg p-2 hover:bg-muted/50 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                      <Users className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <div className="font-medium">City Wolves</div>
                      <div className="text-xs text-muted-foreground">Player</div>
                    </div>
                  </div>
                  <button className="rounded-md bg-primary/10 px-2 py-1 text-xs font-medium text-primary hover:bg-primary/20 transition-colors">
                    View
                  </button>
                </div>
              </div>

              <button className="mt-4 w-full rounded-md border px-4 py-2 text-sm font-medium hover:bg-secondary transition-colors">
                Create New Team
              </button>
            </div>

            <div className="rounded-lg border p-6">
              <h2 className="mb-4 text-xl font-semibold">Top Achievements</h2>

              <div className="space-y-3">
                <div className="flex gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-yellow-500/20">
                    <Trophy className="h-5 w-5 text-yellow-500" />
                  </div>
                  <div>
                    <div className="font-medium">Tournament Champion</div>
                    <div className="text-xs text-muted-foreground">Summer Basketball Championship 2023</div>
                  </div>
                </div>

                <div className="flex gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-500/20">
                    <Award className="h-5 w-5 text-blue-500" />
                  </div>
                  <div>
                    <div className="font-medium">MVP</div>
                    <div className="text-xs text-muted-foreground">City League Finals</div>
                  </div>
                </div>
              </div>

              <button className="mt-4 w-full rounded-md border px-4 py-2 text-sm font-medium hover:bg-secondary transition-colors">
                View All Achievements
              </button>
            </div>

            <div className="rounded-lg bg-muted p-6 text-center">
              <LogOut className="mx-auto h-6 w-6 text-muted-foreground" />
              <h3 className="mt-2 font-medium">Sign Out</h3>
              <p className="mt-1 text-xs text-muted-foreground">Sign out from all devices</p>
              <button className="mt-4 w-full rounded-md border border-destructive/30 bg-destructive/10 px-4 py-2 text-sm font-medium text-destructive hover:bg-destructive/20 transition-colors">
                Sign Out
              </button>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'teams' && (
        <div className="text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-muted">
            <Users className="h-8 w-8 text-muted-foreground" />
          </div>
          <h2 className="mt-4 text-xl font-semibold">Team Management</h2>
          <p className="mt-1 text-muted-foreground">This section is under development</p>
        </div>
      )}

      {activeTab === 'achievements' && (
        <div className="text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-muted">
            <Trophy className="h-8 w-8 text-muted-foreground" />
          </div>
          <h2 className="mt-4 text-xl font-semibold">Achievements</h2>
          <p className="mt-1 text-muted-foreground">This section is under development</p>
        </div>
      )}
    </div>
  );
};

export default Profile;
