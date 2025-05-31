
import React from 'react';
import {
  Mail, Calendar, MapPin, Users
} from 'lucide-react';
import {
  Card, CardContent, CardHeader, CardTitle, CardFooter
} from '@/components/ui/card';

const TeamOverview = ({ overview }) => {
  return (
    <div className="grid gap-4 md:gap-6 md:grid-cols-3">
      <div className="md:col-span-2 space-y-4 md:space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>About</CardTitle>
          </CardHeader>
          <CardContent>
            {overview?.description && <p className="text-sm md:text-base text-muted-foreground">
              {overview?.description}
              {/* { Elite basketball team with 5+ years of competitive play. We focus on teamwork, skill development, and strategic gameplay. Looking for enthusiastic players and challenging tournaments.} */}
            </p>}

            <div className="mt-4 md:mt-6 grid gap-3 md:gap-4 md:grid-cols-2">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm md:text-base">
                  {overview?.foundedDate}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm md:text-base">{overview?.location}</span>
              </div>

              <div className="flex items-center gap-2">
                <Users className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm md:text-base">
                  {overview?.members?.lenght || "1"} Members (
                  {overview?.openPositions || overview?.openPositions === 0
                    ? `${overview.openPositions} open position${overview.openPositions === 1 ? '' : 's'}`
                    : "No openings"}
                  )
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Team Stats</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 grid-cols-2 md:grid-cols-3">
              <div className="space-y-1 md:space-y-2">
                <div className="text-xs md:text-sm text-muted-foreground">Games Played</div>
                <div className="text-xl md:text-3xl font-semibold">48</div>
                <div className="text-xs text-green-600">+5 this month</div>
              </div>

              <div className="space-y-1 md:space-y-2">
                <div className="text-xs md:text-sm text-muted-foreground">Win Rate</div>
                <div className="text-xl md:text-3xl font-semibold">72%</div>
                <div className="text-xs text-green-600">+4% this month</div>
              </div>

              <div className="space-y-1 md:space-y-2 col-span-2 md:col-span-1">
                <div className="text-xs md:text-sm text-muted-foreground">Championships</div>
                <div className="text-xl md:text-3xl font-semibold">3</div>
                <div className="text-xs text-muted-foreground">Last: June 2023</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Upcoming Matches</CardTitle>
            <button className="text-xs md:text-sm font-medium text-primary hover:text-primary/80 transition-colors">
              View All
            </button>
          </CardHeader>
          <CardContent className="space-y-3 md:space-y-4">
            <div className="rounded-lg border p-3 md:p-4">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                <div className="text-xs md:text-sm text-muted-foreground mb-1 md:mb-0">Sep 25, 2023 • 3:00 PM</div>
                <div className="rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary w-fit">
                  Upcoming
                </div>
              </div>

              <div className="mt-2 flex flex-col md:flex-row md:items-center md:justify-between">
                <div>
                  <div className="font-medium">Thunder Strikers</div>
                  <div className="text-xs md:text-sm text-muted-foreground">vs Phoenix Rising</div>
                </div>

                <div className="flex items-center gap-2 mt-2 md:mt-0">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <span className="text-xs md:text-sm">Central Sports Arena</span>
                </div>
              </div>
            </div>

            <div className="rounded-lg border p-3 md:p-4">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                <div className="text-xs md:text-sm text-muted-foreground mb-1 md:mb-0">Oct 2, 2023 • 5:30 PM</div>
                <div className="rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary w-fit">
                  Upcoming
                </div>
              </div>

              <div className="mt-2 flex flex-col md:flex-row md:items-center md:justify-between">
                <div>
                  <div className="font-medium">Thunder Strikers</div>
                  <div className="text-xs md:text-sm text-muted-foreground">vs City Wolves</div>
                </div>

                <div className="flex items-center gap-2 mt-2 md:mt-0">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <span className="text-xs md:text-sm">Downtown Stadium</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-4 md:space-y-6">
        <KeyMembers members={overview?.members} />
        <RecentAchievements />
      </div>
    </div>
  );
};

export default TeamOverview;

// Sub-components for the third column of the overview
const KeyMembers = ({ members }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Key Members</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3 md:space-y-4">
        {members && members?.map((value: any) =>
          <MemberItem name={value?.name} role={value?.role} id={value?.id} />
        )}
        {/* <MemberItem name="Sarah Williams" role="Coach" /> */}
        {/* <MemberItem name="Mike Brown" role="Assistant Coach" /> */}
      </CardContent>
      <CardFooter>
        <button className="w-full rounded-md border px-4 py-2 text-xs md:text-sm font-medium hover:bg-secondary transition-colors">
          View All Members
        </button>
      </CardFooter>
    </Card>
  );
};

const MemberItem = ({ name, role, id }: { name: string; role: string, id: string }) => {
  const initials = name.split(' ').map(n => n[0]).join('');

  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2 md:gap-3">
        <div className="h-8 w-8 md:h-10 md:w-10 rounded-full bg-primary/10 flex items-center justify-center">
          <span className="text-xs md:text-sm font-medium">{initials}</span>
        </div>
        <div>
          <div className="font-medium text-sm md:text-base">{name}</div>
          <div className="text-xs text-muted-foreground">{role}</div>
        </div>
      </div>
      <Link to={"/profile/" + id}>
        <button className="rounded-md bg-primary/10 px-2 py-1 text-xs font-medium text-primary hover:bg-primary/20 transition-colors">
          View
        </button>
      </Link>

    </div>
  );
};

const RecentAchievements = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Achievements</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex gap-2 md:gap-3">
          <div className="flex h-8 w-8 md:h-10 md:w-10 items-center justify-center rounded-full bg-yellow-500/20">
            <Trophy className="h-4 w-4 md:h-5 md:w-5 text-yellow-500" />
          </div>
          <div>
            <div className="font-medium text-sm md:text-base">Tournament Champion</div>
            <div className="text-xs text-muted-foreground">Summer Basketball Championship 2023</div>
          </div>
        </div>

        <div className="flex gap-2 md:gap-3">
          <div className="flex h-8 w-8 md:h-10 md:w-10 items-center justify-center rounded-full bg-blue-500/20">
            <Award className="h-4 w-4 md:h-5 md:w-5 text-blue-500" />
          </div>
          <div>
            <div className="font-medium text-sm md:text-base">Best Team Spirit</div>
            <div className="text-xs text-muted-foreground">City League Finals</div>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <button className="w-full rounded-md border px-4 py-2 text-xs md:text-sm font-medium hover:bg-secondary transition-colors">
          View All Achievements
        </button>
      </CardFooter>
    </Card>
  );
};


// Missing imports for icons
import { Trophy, Award } from 'lucide-react'; import { Link } from 'react-router-dom';

