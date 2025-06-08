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
            setPreviewModal(true);
            if (data?.data.regenerate) {
                console.log("Regenerate fixtures");
                setRegenerate(false)
                setPreviewModal(false);
                setActiveTab("generator");
            }
            if (!save) {
                setFixturesData(data.data.fixtures);
            } else {
                setActiveTab("schedule");
            }
            toast({
                title: "Fixtures generated",
                description: "Tournament fixtures have been successfully generated",
            });
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
