
import React, { useState } from 'react';
import { TeamData } from '../types/teamTypes';
import TeamProfileHeader from './TeamProfileHeader';
import TeamProfileView from './TeamProfileView';
import TeamProfileForm from './TeamProfileForm';
import ImageUploadDialog from './ImageUploadDialog';
import { useToast } from '@/hooks/use-toast';

interface TeamProfileProps {
  team: TeamData;
  onUpdate: (team: Partial<TeamData>) => void;
}

const TeamProfile: React.FC<TeamProfileProps> = ({ team, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(team);
  const [imageUploadOpen, setImageUploadOpen] = useState(false);
  const [uploadType, setUploadType] = useState<'logo' | 'cover'>('logo');
  const { toast } = useToast();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdate(formData);
    setIsEditing(false);
    // toast({
    //   title: "Profile updated",
    //   description: "Team profile has been successfully updated"
    // });
  };

  const handleCancel = () => {
    setFormData(team);
    setIsEditing(false);
  };

  const openImageUpload = (type: 'logo' | 'cover') => {
    setUploadType(type);
    setImageUploadOpen(true);
  };

  const handleEditToggle = () => {
    setIsEditing(true);
  };
  // Mock implementation - in a real app would upload to a server
  const handleImageUpload = () => {
    // setImageUploadOpen(false);
    // Update with dummy image URL
    // const imageUrl = 'https://via.placeholder.com/150';
    // if (uploadType === 'logo') {
    //   onUpdate({ logo: imageUrl });
    // } else {
    //   onUpdate({ coverImage: imageUrl });
    // }
    // toast({
    //   title: "Image uploaded",
    //   description: `Team ${uploadType} has been updated successfully`
    // });
  };

  return (
    <div className="space-y-6">
      <form onSubmit={handleSubmit}>
        <TeamProfileHeader
          team={team}
          isEditing={isEditing}
          formData={formData}
          handleCancel={handleCancel}
          handleSubmit={handleSubmit}
          openImageUpload={openImageUpload}
          handleEditToggle={handleEditToggle}
        />

        {!isEditing ? (
          <TeamProfileView team={team} />
        ) : (
          <TeamProfileForm
            formData={formData}
            handleChange={handleChange}
            setFormData={setFormData}
          />
        )}
      </form>

      <ImageUploadDialog
        open={imageUploadOpen}
        onOpenChange={setImageUploadOpen}
        uploadType={uploadType}
        onUpload={handleImageUpload}
      />
    </div>
  );
};

export default TeamProfile;
