// hooks/useFixtureMutations.ts
import { useMutation } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";

export const useFixtureMutations = ({
    setFixtures,
    setPreviewModal,
    setFixturesData,
    setActiveTab,
    save,
    setRegenerate
}: {
    setFixtures: (data: any) => Promise<any>;
    setPreviewModal: (value: boolean) => void;
    setFixturesData: (data: any) => void;
    setActiveTab: (tab: string) => void;
    save: boolean;
    setRegenerate: (val: boolean) => void;
}) => {
    const { toast } = useToast();

    const {
        mutate,
        isPending: fixturePending,
    } = useMutation({
        mutationFn: (teamData: object) => setFixtures(teamData),
        onSuccess: (data) => {
            
        },
        onError: () => {
            toast({
                title: "Error",
                description: "Failed to send the invitation",
            });
        },
    });

    return {
        fixture: mutate,
        fixturePending,
    };
};
