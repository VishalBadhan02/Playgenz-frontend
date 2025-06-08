import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { AvatarEditor } from "@/components/profile-editor/AvatarEditor";
import { ProfilePictureSection } from "@/components/profile-editor/ProfilePictureSection";
import { PersonalInformationForm } from "@/components/profile-editor/PersonalInformationForm";

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
  const { toast } = useToast();
  const [profile, setProfile] = useState<UserProfile>({
    firstName: "John",
    lastName: "Doe",
    userName: "johndoe",
    email: "john.doe@example.com",
    phoneNumber: "+1 (555) 123-4567",
    address: "123 Main St, City, State 12345",
    profilePicture: "",
  });

  const [isAvatarEditorOpen, setIsAvatarEditorOpen] = useState(false);

  const handleInputChange = (field: keyof UserProfile, value: string) => {
    setProfile(prev => ({ ...prev, [field]: value }));
  };

  const handleAvatarSave = (editedImageBlob: Blob) => {
    const imageUrl = URL.createObjectURL(editedImageBlob);
    setProfile(prev => ({ ...prev, profilePicture: imageUrl }));
    setIsAvatarEditorOpen(false);
    toast({
      title: "Avatar updated",
      description: "Your profile picture has been successfully updated.",
    });
  };

  const handleSaveProfile = () => {
    // Here you would typically save to your backend
    toast({
      title: "Profile updated",
      description: "Your profile information has been successfully saved.",
    });
  };

  const handleRemovePicture = () => {
    setProfile(prev => ({ ...prev, profilePicture: "" }));
  };

  const handleCancel = () => {
    window.history.back();
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
              profilePicture={profile.profilePicture}
              onEditClick={() => setIsAvatarEditorOpen(true)}
              onRemoveClick={handleRemovePicture}
            />
          </div>

          <div className="lg:col-span-2">
            <PersonalInformationForm
              profile={profile}
              onInputChange={handleInputChange}
              onSave={handleSaveProfile}
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