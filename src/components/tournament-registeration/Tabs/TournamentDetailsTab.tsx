import React from "react";
import { FormField, FormItem, FormLabel, FormControl, FormMessage, FormDescription } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const TournamentDetailsTab = ({ form, isMobile }: { form: any; isMobile: boolean }) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            <FormField
                control={form.control}
                name="totalTeams"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Total Teams</FormLabel>
                        <FormControl>
                            <Input type="number" min="2" placeholder="Enter number of teams" {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />

            <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Tournament Password</FormLabel>
                        <FormControl>
                            <Input type="password" placeholder="Enter password for private tournaments" {...field} />
                        </FormControl>
                        <FormDescription>
                            Required for private tournaments
                        </FormDescription>
                        <FormMessage />
                    </FormItem>
                )}
            />

            <FormField
                control={form.control}
                name="entryFee"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Entry Fee</FormLabel>
                        <FormControl>
                            <Input type="number" min="0" placeholder="Enter entry fee amount" {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />

            <FormField
                control={form.control}
                name="playingPeriod"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Playing Period</FormLabel>
                        <FormControl>
                            <Input placeholder="e.g., over, mint, set" {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
            <FormField
                control={form.control}
                name="specialPlay"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Special play</FormLabel>
                        <FormControl>
                            <Input placeholder="e.g., 2 over, 5 mint" {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />

            <FormField
                control={form.control}
                name="timings"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Tournament Timings</FormLabel>
                        <FormControl>
                            <Input placeholder="e.g., 9 AM - 6 PM daily" {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />



            <div className="col-span-1 md:col-span-2">
                <h3 className="text-lg font-medium">Prize Distribution</h3>
                <Separator className="my-2" />
            </div>

            <FormField
                control={form.control}
                name="prizes.firstPrice"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>First Prize</FormLabel>
                        <FormControl>
                            <Input type="number" min="0" placeholder="Enter amount for first prize" {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />

            <FormField
                control={form.control}
                name="prizes.secondPrice"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Second Prize</FormLabel>
                        <FormControl>
                            <Input type="number" min="0" placeholder="Enter amount for second prize" {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />

            <FormField
                control={form.control}
                name="prizes.thirdPrice"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Third Prize</FormLabel>
                        <FormControl>
                            <Input type="number" min="0" placeholder="Enter amount for third prize" {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />

            <div className="col-span-1 md:col-span-2">
                <h3 className="text-lg font-medium">Tournament Description</h3>
                <Separator className="my-2" />
            </div>

            <FormField
                control={form.control}
                name="tournamentDescription.ageLimit"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Age Limit</FormLabel>
                        <FormControl>
                            <Input placeholder="e.g., 18+, Under 21" {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />

            <FormField
                control={form.control}
                name="tournamentDescription.gender"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Gender Restrictions</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select gender restriction" />
                                </SelectTrigger>
                            </FormControl>
                            <SelectContent position={isMobile ? "popper" : "item-aligned"}>
                                <SelectItem value="male">Male Only</SelectItem>
                                <SelectItem value="female">Female Only</SelectItem>
                                <SelectItem value="mixed">Mixed/Any</SelectItem>
                            </SelectContent>
                        </Select>
                        <FormMessage />
                    </FormItem>
                )}
            />

            <FormField
                control={form.control}
                name="tournamentDescription.proof"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Required Proof</FormLabel>
                        <FormControl>
                            <Input placeholder="e.g., ID, Age Proof, Medical Certificate" {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />

            <FormField
                control={form.control}
                name="tournamentDescription.players.playing"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Number of Players per team</FormLabel>
                        <FormControl>
                            <Input type="number" min="1" placeholder="Enter number of players" {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />

            <FormField
                control={form.control}
                name="tournamentDescription.players.extra"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Number of Extra Players</FormLabel>
                        <FormControl>
                            <Input type="number" min="0" placeholder="Enter number of substitute players" {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
        </div>
    );
};

export default TournamentDetailsTab;








// <FormField
// control={form.control}
// name="teamId"
// render={({ field }) => (
//     <FormItem className="flex flex-row items-start space-x-3 space-y-0 p-4 rounded-md border">
//             {/* <FormControl>
//                 <Checkbox
//                     checked={field.value}
//                     onCheckedChange={field.onChange}
//                 />
//             </FormControl> */}
//         <div className="space-y-1 leading-none">
//             <FormLabel>Require Team ID</FormLabel>
//             <FormDescription>
//                 Teams must have a valid team ID to participate
//             </FormDescription>
//         </div>
//     </FormItem>
// )}
// />