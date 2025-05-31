
import React from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { TeamData } from '../types/teamTypes';

interface TeamProfileFormProps {
  formData: TeamData;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  setFormData: React.Dispatch<React.SetStateAction<TeamData>>;
}

const TeamProfileForm: React.FC<TeamProfileFormProps> = ({
  formData,
  handleChange,
  setFormData
}) => {
  return (
    <div className="mt-12 grid gap-8 md:grid-cols-2">
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="name">Team Name</Label>
          <Input
            id="name"
            name="name"
            value={formData?.name}
            onChange={handleChange}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="sport">Sport</Label>
          <Input
            id="sport"
            name="sport"
            value={formData?.sport}
            onChange={handleChange}
            disabled={true}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="location">Location</Label>
          <Input
            id="location"
            name="location"
            value={formData?.location}
            onChange={handleChange}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="foundedDate">Founded Date</Label>
          <Input
            id="foundedDate"
            name="foundedDate"
            value={formData?.foundedDate}
            onChange={handleChange}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="contactEmail">Contact Email</Label>
          <Input
            id="contactEmail"
            name="contactEmail"
            type="email"
            value={formData?.contactEmail}
            onChange={handleChange}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="openPositions">Open Positions</Label>
          <Input
            id="openPositions"
            name="openPositions"
            type="number"
            value={formData?.openPositions?.toString() || "0"}
            onChange={(e) => setFormData(prev => ({
              ...prev,
              openPositions: parseInt(e.target.value) || 0
            }))}
          />
        </div>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="description">Team Description</Label>
          <Textarea
            id="description"
            name="description"
            value={formData?.description}
            onChange={handleChange}
            rows={8}
            className="resize-none"
          />
        </div>
      </div>
    </div>
  );
};

export default TeamProfileForm;
