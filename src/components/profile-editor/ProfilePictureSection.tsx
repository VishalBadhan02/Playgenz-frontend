import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { User } from "lucide-react";

interface ProfilePictureSectionProps {
  profilePicture: string;
  onEditClick: () => void;
  onRemoveClick: () => void;
}

export const ProfilePictureSection = ({ 
  profilePicture, 
  onEditClick, 
  onRemoveClick 
}: ProfilePictureSectionProps) => {
  return (
    <Card className="sticky top-4">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <User className="h-5 w-5" />
          Profile Picture
        </CardTitle>
      </CardHeader>
      <CardContent className="text-center space-y-4">
        <div className="relative">
          <div className="w-48 h-48 mx-auto rounded-full border-4 border-border overflow-hidden bg-muted">
            {profilePicture ? (
              <img
                src={profilePicture}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <User className="h-20 w-20 text-muted-foreground" />
              </div>
            )}
          </div>
        </div>
        <Button
          onClick={onEditClick}
          className="w-full"
        >
          {profilePicture ? "Change Picture" : "Upload Picture"}
        </Button>
        {profilePicture && (
          <Button
            variant="outline"
            onClick={onRemoveClick}
            className="w-full"
          >
            Remove Picture
          </Button>
        )}
      </CardContent>
    </Card>
  );
};