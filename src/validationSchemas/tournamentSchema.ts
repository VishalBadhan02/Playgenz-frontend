import { z } from "zod";

export const tournamentSchema = z.object({
    // Basic Information
    name: z.string().min(3, { message: "Tournament name is required" }),
    sport: z.string().min(1, { message: "Sport is required" }),
    tournamentMode: z.enum(["online", "offline"]),
    tournamentEnvironment: z.enum(["private", "public"]),
    gameType: z.enum(["online", "outdoor"]).default("outdoor"),
    fixtureType: z.enum([
        "single_elimination",
        "double_elimination",
        "round_robin",
        "swiss_system",
        "group_stage",
        "soloFixtures",
        "duoFixtures",
        "squadFixtures",
        "customModeFixtures",
        "killRaceFixtures",
        "timeLimitedFixtures",
        "leagueFixtures",
        "charityFixtures",
        "streamerInvitationalFixtures",
        "mixedModeFixtures",
    ]),

    // Contact Information
    contact: z.string().min(10, { message: "Contact number is required" }),
    alternativeContact: z.string().min(10, { message: "Alternative contact is required" }),

    // // Date and Location
    start_date: z.date({ required_error: "Start date is required" }),
    end_date: z.date({ required_error: "End date is required" }),
    country: z.string().min(1, { message: "Country is required" }),
    state: z.string().min(1, { message: "State is required" }),
    city: z.string().min(1, { message: "City is required" }),
    address: z.string().min(5, { message: "Address is required" }),

    // Tournament Details
    totalTeams: z.coerce.number().min(2, { message: "At least 2 teams are required" }),
    password: z.string().min(6, { message: "Password must be at least 6 characters" }),
    entryFee: z.coerce.number().min(0, { message: "Entry fee is required" }),
    playingPeriod: z.string().min(1, { message: "Playing period is required" }),
    // teamId: z.boolean().default(false),

    // Prizes
    prizes: z.object({
        firstPrice: z.coerce.number().min(0, { message: "First prize is required" }),
        secondPrice: z.coerce.number().min(0, { message: "Second prize is required" }),
        thirdPrice: z.coerce.number().min(0, { message: "Third prize is required" }),
    }),

    // Timings
    timings: z.string().min(1, { message: "Timings are required" }),

    // Tournament Description
    tournamentDescription: z.object({
        ageLimit: z.string().min(1, { message: "Age limit is required" }),
        gender: z.string().min(1, { message: "Gender is required" }),
        proof: z.string().min(1, { message: "Proof is required" }),
        players: z.object({
            playing: z.coerce.number().min(1, { message: "Number of playing players is required" }),
            extra: z.coerce.number().min(0, { message: "Number of extra players is required" }),
        }),
    }),

    // Facilities
    facilities: z.object({
        waterTank: z.boolean().default(false),
        lightning: z.boolean().default(false),
        commentators: z.boolean().default(false),
        duck: z.boolean().default(false),
        jursey: z.boolean().default(false),
        resourses: z.object({
            avalability: z.boolean().default(false),
            types_of_equpements: z.array(z.string()).default([]),
        }),
    }),

    // // Game Description
    // gameDescription: z.object({
    specialPlay: z.coerce.number().default(0),
    //     playUnit: z.string().min(1, { message: "Play unit is required" }),
    //     penaltyCode: z.array(z.string()).default([]),
    // }),

    // Terms and Conditions
    // terms_and_conditions: z.object({
    //     general_rules: z.array(z.string()).min(1, { message: "At least one general rule is required" }),
    //     violations: z.array(z.string()).default([]),
    //     eligibility: z.object({
    //         age_limit: z.string().min(1, { message: "Age limit is required" }),
    //         gender: z.string().min(1, { message: "Gender is required" }),
    //         proof_required: z.array(z.string()).default([]),
    //     }),
    //     equipment_rules: z.object({
    //         standard_equipment: z.boolean().default(false),
    //         custom_equipment_allowed: z.boolean().default(false),
    //         equipment_list: z.array(z.string()).default([]),
    //     }),
    //     match_rules: z.object({
    //         duration: z.string().min(1, { message: "Match duration is required" }),
    //         timeouts: z.coerce.number().min(0, { message: "Number of timeouts is required" }),
    //         substitutions: z.coerce.number().min(0, { message: "Number of substitutions is required" }),
    //         special_conditions: z.array(z.string()).default([]),
    //     }),
    //     fair_play: z.object({
    //         code_of_conduct: z.array(z.string()).min(1, { message: "At least one code of conduct is required" }),
    //         penalties: z.array(z.string()).default([]),
    //         disqualification_criteria: z.array(z.string()).default([]),
    //     }),
    //     appeal_process: z.object({
    //         allowed: z.boolean().default(false),
    //         appeal_duration: z.string().default(""),
    //         appeal_fee: z.coerce.number().default(0),
    //     }),
    // }),
}).refine((data) => data.end_date >= data.start_date, {
    message: "End date must be after start date",
    path: ["end_date"],
});

export type TournamentFormValues = z.infer<typeof tournamentSchema>;