import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { AvatarEditor } from "@/components/profile-editor/AvatarEditor";
import { ProfilePictureSection } from "@/components/profile-editor/ProfilePictureSection";
import { PersonalInformationForm } from "@/components/profile-editor/PersonalInformationForm";
import { useQuery } from "@tanstack/react-query";
import useUserService from "@/services/userService";
import { Spinner } from "@/components/Spinner";
import { ErrorModal } from "@/components/ErrorModal";
import { useEditUserMutation } from "@/mutations/useUserMutation";
import { profileSchema } from "@/validationSchemas/profile.schema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

interface UserProfile {
  firstName: string;
  lastName: string;
  userName: string;
  email: string;
  phoneNumber: string;
  address: string;
  profilePicture: string;
}

const EditProfile = () => {
  const { getProfile, updateProfile } = useUserService();
  const { toast } = useToast();

  const {
    data: profileData,
    isLoading: profileLoading,
    isError,
    error,
    refetch
  } = useQuery({
    queryKey: ['user-profile'],
    queryFn: () => getProfile(" "),
  });

  const form = useForm<UserProfile>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      userName: "",
      email: "",
      phoneNumber: "",
      address: "",
      profilePicture: "https://via.placeholder.com/150",
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    reset,
  } = form;

  const [isAvatarEditorOpen, setIsAvatarEditorOpen] = useState(false);

  const { editUserData, isEditing } = useEditUserMutation({
    editUser: updateProfile,
    form,
    onSuccessCallback: () => {
      toast({
        title: "Profile updated",
        description: "Your profile information has been successfully saved.",
      });
    },
  });

  // ✅ Update form values once profileData is loaded
  useEffect(() => {
    if (profileData?.data) {
      reset({
        firstName: profileData.data.firstName || "",
        lastName: profileData.data.lastName || "",
        userName: profileData.data.userName || "",
        email: profileData.data.email || "",
        phoneNumber: profileData.data.phoneNumber || "",
        address: profileData.data.address || "",
        profilePicture: profileData.data.profilePicture || "https://via.placeholder.com/150",
      });
    }
  }, [profileData, reset]);

  const handleAvatarSave = (editedImageBlob: Blob) => {
    const imageUrl = URL.createObjectURL(editedImageBlob);
    setValue("profilePicture", imageUrl);
    setIsAvatarEditorOpen(false);
    toast({
      title: "Avatar updated",
      description: "Your profile picture has been successfully updated.",
    });
  };

  const handleRemovePicture = () => {
    setValue("profilePicture", "");
  };

  const handleCancel = () => {
    window.history.back();
  };

  if (profileLoading) return <Spinner />;

  if (isError) {
    return (
      <ErrorModal
        open={isError}
        onClose={() => refetch()}
        error={error}
        header="Server Error"
        description="We're experiencing some issues with our server. Please try again later."
      />
    );
  }

  const onSubmit = (data: UserProfile) => {
    editUserData(data);
  };

  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Edit Profile</h1>
          <p className="text-muted-foreground">
            Update your personal information and profile picture
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            <ProfilePictureSection
              profilePicture={watch("profilePicture")}
              onEditClick={() => setIsAvatarEditorOpen(true)}
              onRemoveClick={handleRemovePicture}
            />
          </div>

          <div className="lg:col-span-2">
            <PersonalInformationForm
              register={register}
              errors={errors}
              onSave={handleSubmit(onSubmit)}
              onCancel={handleCancel}
            />
          </div>
        </div>

        <AvatarEditor
          isOpen={isAvatarEditorOpen}
          onClose={() => setIsAvatarEditorOpen(false)}
          onSave={handleAvatarSave}
        />
      </div>
    </div>
  );
};

export default EditProfile;
