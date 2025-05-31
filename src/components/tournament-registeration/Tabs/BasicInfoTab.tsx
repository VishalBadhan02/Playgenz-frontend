import React from "react";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";

const BasicInfoTab = ({ form, isMobile }: { form: any; isMobile: boolean }) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Tournament Name</FormLabel>
                        <FormControl>
                            <Input placeholder="Enter tournament name" {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />

            <FormField
                control={form.control}
                name="sport"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Sport</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select sport" />
                                </SelectTrigger>
                            </FormControl>
                            <SelectContent position={isMobile ? "popper" : "item-aligned"}>
                                <SelectItem value="basketball">Basketball</SelectItem>
                                <SelectItem value="football">Football</SelectItem>
                                <SelectItem value="cricket">Cricket</SelectItem>
                                <SelectItem value="volleyball">Volleyball</SelectItem>
                                <SelectItem value="tennis">Tennis</SelectItem>
                                <SelectItem value="badminton">Badminton</SelectItem>
                                <SelectItem value="tabletennis">Table Tennis</SelectItem>
                                <SelectItem value="hockey">Hockey</SelectItem>
                                <SelectItem value="kabaddi">Kabaddi</SelectItem>
                                <SelectItem value="other">Other</SelectItem>
                            </SelectContent>
                        </Select>
                        <FormMessage />
                    </FormItem>
                )}
            />

            <FormField
                control={form.control}
                name="tournamentMode"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Tournament Mode</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select mode" />
                                </SelectTrigger>
                            </FormControl>
                            <SelectContent position={isMobile ? "popper" : "item-aligned"}>
                                <SelectItem value="online">Online</SelectItem>
                                <SelectItem value="offline">Offline</SelectItem>
                            </SelectContent>
                        </Select>
                        <FormMessage />
                    </FormItem>
                )}
            />

            <FormField
                control={form.control}
                name="tournamentEnvironment"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Tournament Environment</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select environment" />
                                </SelectTrigger>
                            </FormControl>
                            <SelectContent position={isMobile ? "popper" : "item-aligned"}>
                                <SelectItem value="private">Private</SelectItem>
                                <SelectItem value="public">Public</SelectItem>
                            </SelectContent>
                        </Select>
                        <FormMessage />
                    </FormItem>
                )}
            />

            <FormField
                control={form.control}
                name="gameType"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Game Type</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select game type" />
                                </SelectTrigger>
                            </FormControl>
                            <SelectContent position={isMobile ? "popper" : "item-aligned"}>
                                <SelectItem value="online">Online</SelectItem>
                                <SelectItem value="outdoor">Outdoor</SelectItem>
                            </SelectContent>
                        </Select>
                        <FormMessage />
                    </FormItem>
                )}
            />

            <FormField
                control={form.control}
                name="fixtureType"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Fixture Type</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select fixture type" />
                                </SelectTrigger>
                            </FormControl>
                            <SelectContent position={isMobile ? "popper" : "item-aligned"} className="max-h-[200px] overflow-y-auto">
                                <SelectItem value="single_elimination">Single Elimination</SelectItem>
                                <SelectItem value="double_elimination">Double Elimination</SelectItem>
                                <SelectItem value="round_robin">Round Robin</SelectItem>
                                <SelectItem value="swiss_system">Swiss System</SelectItem>
                                <SelectItem value="group_stage">Group Stage</SelectItem>
                                <SelectItem value="leagueFixtures">League</SelectItem>
                                <SelectItem value="soloFixtures">Solo</SelectItem>
                                <SelectItem value="duoFixtures">Duo</SelectItem>
                                <SelectItem value="squadFixtures">Squad</SelectItem>
                            </SelectContent>
                        </Select>
                        <FormMessage />
                    </FormItem>
                )}
            />

            <div className="col-span-1 md:col-span-2">
                <h3 className="text-lg font-medium">Contact Information</h3>
                <Separator className="my-2" />
            </div>

            <FormField
                control={form.control}
                name="contact"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Primary Contact</FormLabel>
                        <FormControl>
                            <Input placeholder="Enter primary contact number" type="tel" {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />

            <FormField
                control={form.control}
                name="alternativeContact"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Alternative Contact</FormLabel>
                        <FormControl>
                            <Input placeholder="Enter alternative contact number" type="tel" {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
        </div>
    );
};

export default BasicInfoTab;