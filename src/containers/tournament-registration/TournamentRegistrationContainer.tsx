
// File: containers/tournament-registration/TournamentRegistrationContainer.tsx
import React from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { tournamentSchema } from "@/validationSchemas/tournamentSchema";
import { toast } from "@/hooks/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { useIsMobile } from "@/hooks/use-mobile";
import type { TournamentFormValues } from "@/types/tournament";
import BasicInfoForm from "@/components/tournament-registration/BasicInfoForm";
import TournamentDetailsForm from "@/components/tournament-registration/TournamentDetailsForm";
import LocationScheduleForm from "@/components/tournament-registration/LocationScheduleForm";
import RulesEligibilityForm from "@/components/tournament-registration/RulesEligibilityForm";
import FacilitiesEquipmentForm from "@/components/tournament-registration/FacilitiesEquipmentForm";

const TournamentRegistrationContainer = () => {
    const navigate = useNavigate();
    const isMobile = useIsMobile();

    const defaultValues: Partial<TournamentFormValues> = {
        tournamentMode: "offline",
        tournamentEnvironment: "public",
        gameType: "outdoor",
        fixtureType: "single_elimination",
        teamId: false,
        facilities: {
            waterTank: false,
            lightning: false,
            commentators: false,
            duck: false,
            jursey: false,
            resourses: {
                avalability: false,
                types_of_equpements: [],
            },
        },
        terms_and_conditions: {
            general_rules: [],
            violations: [],
            eligibility: {
                age_limit: "",
                gender: "",
                proof_required: [],
            },
            equipment_rules: {
                standard_equipment: false,
                custom_equipment_allowed: false,
                equipment_list: [],
            },
            match_rules: {
                duration: "",
                timeouts: 0,
                substitutions: 0,
                special_conditions: [],
            },
            fair_play: {
                code_of_conduct: [],
                penalties: [],
                disqualification_criteria: [],
            },
            appeal_process: {
                allowed: false,
                appeal_duration: "",
                appeal_fee: 0,
            },
        },
        gameDescription: {
            specialPlay: 0,
            playUnit: "",
            penaltyCode: [],
        },
    };

    const form = useForm<TournamentFormValues>({
        resolver: zodResolver(tournamentSchema),
        defaultValues,
    });

    const onSubmit = (data: TournamentFormValues) => {
        console.log(data);
        toast({
            title: "Tournament Created Successfully",
            description: "Your tournament has been created and is pending approval",
        });
        navigate("/tournaments");
    };

    return (
        <div className="mx-auto max-w-5xl py-6 px-4">
            <div className="mb-8">
                <h1 className="text-2xl md:text-3xl font-bold tracking-tight">
                    Create Tournament
                </h1>
                <p className="text-muted-foreground">
                    Fill in the details to register a new tournament
                </p>
            </div>

            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    <Tabs defaultValue="basic">
                        <TabsList className={`w-full ${isMobile ? "flex flex-wrap gap-1" : "grid grid-cols-5"}`}>
                            <TabsTrigger value="basic">Basic Info</TabsTrigger>
                            <TabsTrigger value="details">Tournament Details</TabsTrigger>
                            <TabsTrigger value="location">Location & Schedule</TabsTrigger>
                            <TabsTrigger value="rules">Rules & Eligibility</TabsTrigger>
                            <TabsTrigger value="facilities">Facilities</TabsTrigger>
                        </TabsList>

                        <TabsContent value="basic">
                            <BasicInfoForm form={form} />
                        </TabsContent>

                        <TabsContent value="details">
                            <TournamentDetailsForm form={form} />
                        </TabsContent>

                        <TabsContent value="location">
                            <LocationScheduleForm form={form} />
                        </TabsContent>

                        <TabsContent value="rules">
                            <RulesEligibilityForm form={form} />
                        </TabsContent>

                        <TabsContent value="facilities">
                            <FacilitiesEquipmentForm form={form} />
                        </TabsContent>
                    </Tabs>

                    <div className="flex flex-col-reverse sm:flex-row justify-end gap-3 sm:space-x-4">
                        <Button type="button" variant="outline" onClick={() => navigate("/tournaments")}>Cancel</Button>
                        <Button type="submit" className="w-full sm:w-auto">Submit Tournament</Button>
                    </div>
                </form>
            </Form>
        </div>
    );
};

export default TournamentRegistrationContainer;

// ---

// File: types/tournament.ts
import { z } from 'zod';
import { tournamentSchema } from '@/validationSchemas/tournamentSchema';

export type TournamentFormValues = z.infer<typeof tournamentSchema>;

// ---

// File: components/form-fields/ArrayInputField.tsx
// (Use the same code you have, or I can regenerate it if needed)

// ---

// File stubs to create next:
// components/tournament-registration/BasicInfoForm.tsx
// components/tournament-registration/TournamentDetailsForm.tsx
// components/tournament-registration/LocationScheduleForm.tsx
// components/tournament-registration/RulesEligibilityForm.tsx
// components/tournament-registration/FacilitiesEquipmentForm.tsx

// These files will each render the form sections as per the original TSX
// I can continue with those next if you want me to generate all contents.
