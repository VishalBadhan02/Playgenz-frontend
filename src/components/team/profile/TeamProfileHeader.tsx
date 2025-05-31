
import React from 'react';
import { Button } from "@/components/ui/button";
import { Pencil, X, Save } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { TeamData } from '../types/teamTypes';

interface TeamProfileHeaderProps {
  team: TeamData;
  isEditing: boolean;
  formData: TeamData;
  handleCancel: () => void;
  handleSubmit: (e: React.FormEvent) => void;
  openImageUpload: (type: 'logo' | 'cover') => void;
  handleEditToggle: () => void; //
}

const TeamProfileHeader: React.FC<TeamProfileHeaderProps> = ({
  team,
  isEditing,
  formData,
  handleCancel,
  handleSubmit,
  openImageUpload,
  handleEditToggle

}) => {
  return (
    <>
      <div className="flex justify-end">
        {!isEditing ? (
          <Button
            variant="outline"
            size="sm"
            onClick={handleEditToggle}
            className="flex gap-2"
          >
            <Pencil className="h-4 w-4" />
            Edit Profile
          </Button>
        ) : (
          <div className="flex justify-end gap-2">
            <Button
              variant="outline"
              type="button"
              onClick={handleCancel}
              className="flex gap-2"
            >
              <X className="h-4 w-4" />
              Cancel
            </Button>

            <Button
              type="submit"
              className="flex gap-2"
            >
              <Save className="h-4 w-4" />
              Save Changes
            </Button>
          </div>
        )}
      </div>

      <div className="relative mb-8 h-40 overflow-hidden rounded-lg bg-gray-100">
        {(isEditing ? formData?.coverImage : team?.coverImage) ? (
          <img
            src={isEditing ? formData?.coverImage : team?.coverImage}
            alt={`${isEditing ? formData?.name : team?.name} cover`}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="flex h-full items-center justify-center bg-gradient-to-r from-primary/20 to-accent/20">
            <span className="text-muted-foreground">No cover image</span>
          </div>
        )}

        {isEditing && (
          <Button
            variant="secondary"
            className="absolute bottom-2 right-2"
            onClick={() => openImageUpload('cover')}
          >
            Change Cover
          </Button>
        )}

        <div className="absolute -bottom-10 left-4 h-24 w-24 overflow-hidden rounded-full border-4 border-background">
          <Avatar className="h-full w-full">
            <AvatarImage src={isEditing ? formData?.logo : team.logo} />
            <AvatarFallback className="text-3xl bg-primary text-white">
              {(isEditing ? formData?.name : team.name).charAt(0)}
            </AvatarFallback>
          </Avatar>

          {isEditing && (
            <Button
              size="sm"
              className="absolute bottom-0 left-0 right-0 rounded-none bg-black/50 text-xs text-white hover:bg-black/70"
              onClick={() => openImageUpload('logo')}
            >
              Change
            </Button>
          )}
        </div>
      </div>
    </>
  );
};

export default TeamProfileHeader;
