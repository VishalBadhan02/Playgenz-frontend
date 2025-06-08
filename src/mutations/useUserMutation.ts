import { useToast } from "@/hooks/use-toast";
import { useMutation } from "@tanstack/react-query";

interface EditUserMutationProps {
    editUser: (values: object) => Promise<any>;
    form?: any;
    onSuccessCallback?: () => void;
}

export const useEditUserMutation = ({
    editUser,
    form,
    onSuccessCallback,
}: EditUserMutationProps) => {
    const { toast } = useToast();

    const {
        mutate: editUserData,
        isPending: isEditing,
    } = useMutation({
        mutationFn: (values: object) => editUser(values),
        onSuccess: (res: any) => {
            const { status, message } = res;
            console.log("djgfhfbcihsjfgvfxbhgvbsiudbf uhb", res)

            if (!status) {
                if (res?.message?.type === "email") {
                    form?.setError?.("email", {
                        type: "manual",
                        message: message.message,
                    });
                } else if (res?.message?.type === "phone") {
                    form?.setError?.("phoneNumber", {
                        type: "manual",
                        message: message.message,
                    });
                } else if (res?.message?.type === "userName") {
                    form?.setError?.("userName", {
                        type: "manual",
                        message: message.message,
                    });
                } else {
                    toast({
                        variant: "destructive",
                        title: "Update failed",
                        description: "Please try again.",
                    });
                }
                return;
            }

            toast({
                title: "Profile Updated",
                description: "Your profile has been updated successfully.",
            });

            onSuccessCallback?.();
        },
        onError: () => {
            toast({
                variant: "destructive",
                title: "Something went wrong.",
                description: "Could not update profile. Please try again.",
            });
        },
    });

    return {
        editUserData,
        isEditing,
    };
};
