
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { useIsMobile } from "@/hooks/use-mobile";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { tournamentSchema } from '@/validationSchemas/tournamentSchema';
import BasicInfoTab from '@/components/tournament-registeration/Tabs/BasicInfoTab';
import TournamentDetailsTab from '@/components/tournament-registeration/Tabs/TournamentDetailsTab';
import LocationTab from '@/components/tournament-registeration/Tabs/LocationTab';
import FacilitiesEquipmentForm from '@/components/tournament-registeration/Tabs/FacilitiesEquipmentForm';
import RulesEligibilityForm from '@/components/tournament-registeration/Tabs/RulesEligibilityForm';
import { ErrorModal } from "@/components/ErrorModal";
import { useMutation } from "@tanstack/react-query";
import useTournamentService from "@/services/tournamentService";
import { Spinner } from "@/components/Spinner";

type TournamentFormValues = z.infer<typeof tournamentSchema>;

const TournamentRegistration = () => {
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const { registerTournament } = useTournamentService();
  const defaultValues: TournamentFormValues = {
    name: "", // ✅ add all required string/number fields like this
    sport: "",
    tournamentMode: "offline",
    tournamentEnvironment: "public",
    gameType: "outdoor",
    fixtureType: "single_elimination",
    contact: "",
    alternativeContact: "",
    start_date: new Date(),
    end_date: new Date(),
    country: "",
    state: "",
    city: "",
    address: "",
    // totalTeams: 2,
    // password: "",
    // entryFee: 0,
    // playingPeriod: "",
    // timings: "",
    // teamId: false,
    // prizes: {
    //   firstPrice: 0,
    //   secondPrice: 0,
    //   thirdPrice: 0,
    // },
    // tournamentDescription: {
    //   ageLimit: "",
    //   gender: "",
    //   proof: "",
    //   players: {
    //     playing: 1,
    //     extra: 0,
    //   },
    // },
    // facilities: {
    //   waterTank: false,
    //   lightning: false,
    //   commentators: false,
    //   duck: false,
    //   jursey: false,
    //   resourses: {
    //     avalability: false,
    //     types_of_equpements: [],
    //   },
    // },
    // gameDescription: {
    //   specialPlay: 0,
    //   playUnit: "",
    //   penaltyCode: [],
    // },
    // terms_and_conditions: {
    //   general_rules: [],
    //   violations: [],
    //   eligibility: {
    //     age_limit: "",
    //     gender: "",
    //     proof_required: [],
    //   },
    //   equipment_rules: {
    //     standard_equipment: false,
    //     custom_equipment_allowed: false,
    //     equipment_list: [],
    //   },
    //   match_rules: {
    //     duration: "",
    //     timeouts: 0,
    //     substitutions: 0,
    //     special_conditions: [],
    //   },
    //   fair_play: {
    //     code_of_conduct: [],
    //     penalties: [],
    //     disqualification_criteria: [],
    //   },
    //   appeal_process: {
    //     allowed: false,
    //     appeal_duration: "",
    //     appeal_fee: 0,
    //   },
    // },
  };


  const form = useForm<TournamentFormValues>({
    resolver: zodResolver(tournamentSchema),
    defaultValues,
  });

  const {
    mutate: makeChallenge,
    isPending: isRegistering,
  } = useMutation({
    mutationFn: (matchData: object) =>
      registerTournament(matchData),
    onSuccess: (data) => {
      toast({
        title: "Tournament Created Successfully",
        description: "Your tournament has been created and is pending approval",
      });

      // Navigate back to tournaments page
      navigate("/tournaments");
    },
    onError: (error) => {
      console.log(error);
    }
  });

  function onSubmit(data: TournamentFormValues) {
    // console.log("Form errors", form.formState.errors);

    // In a real application, you would submit this data to your backend
    console.log(data);
    makeChallenge(data)

  }

  return (
    <div className="mx-auto max-w-5xl py-6 px-4">
      <div className="mb-8">
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Create Tournament</h1>
        <p className="text-muted-foreground">Fill in the details to register a new tournament</p>
      </div>
      <pre className="text-red-500 text-xs">
        {JSON.stringify(form.formState.errors, null, 2)}
      </pre>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <Tabs defaultValue="basic" className="w-full">
            <TabsList className={`w-full ${isMobile ? 'flex flex-wrap gap-1 h-auto p-1' : 'grid grid-cols-5'}`}>
              <TabsTrigger value="basic" className={isMobile ? 'text-xs flex-1 h-9 px-2' : ''}>Basic Info</TabsTrigger>
              <TabsTrigger value="details" className={isMobile ? 'text-xs flex-1 h-9 px-2' : ''}>Tournament Details</TabsTrigger>
              <TabsTrigger value="location" className={isMobile ? 'text-xs flex-1 h-9 px-2' : ''}>Location & Schedule</TabsTrigger>
              {/* <TabsTrigger value="rules" className={isMobile ? 'text-xs flex-1 h-9 px-2' : ''}>Rules & Eligibility</TabsTrigger> */}
              <TabsTrigger value="facilities" className={isMobile ? 'text-xs flex-1 h-9 px-2' : ''}>Facilities</TabsTrigger>
            </TabsList>

            {/* BASIC INFO TAB */}
            <TabsContent value="basic" className="space-y-6">
              <BasicInfoTab form={form} isMobile={isMobile} />
            </TabsContent>

            {/* TOURNAMENT DETAILS TAB */}
            <TabsContent value="details" className="space-y-6">
              <TournamentDetailsTab form={form} isMobile={isMobile} />
            </TabsContent>

            {/* LOCATION & SCHEDULE TAB */}
            <TabsContent value="location" className="space-y-6">
              <LocationTab form={form} isMobile={isMobile} />
            </TabsContent>

            {/* RULES & ELIGIBILITY TAB */}
            {/* <TabsContent value="rules" className="space-y-6">
              <RulesEligibilityForm form={form} isMobile={isMobile} />
            </TabsContent> */}

            {/* FACILITIES & EQUIPMENT TAB */}
            <TabsContent value="facilities" className="space-y-6">
              <FacilitiesEquipmentForm form={form} isMobile={isMobile} />
            </TabsContent>
          </Tabs>

          <div className="flex flex-col-reverse sm:flex-row justify-end gap-3 sm:space-x-4">
            <Button type="button" variant="outline" onClick={() => navigate("/tournaments")}>
              Cancel
            </Button>
            {isRegistering ? <Spinner /> :
              <Button type="submit" className="w-full sm:w-auto" >Submit Tournament</Button>
            }
          </div>
        </form>
      </Form>

    </div>
  );
};

export default TournamentRegistration;
