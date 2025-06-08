// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Textarea } from "@/components/ui/textarea";
// import { Separator } from "@/components/ui/separator";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Mail, Phone, MapPin, AtSign } from "lucide-react";

// interface UserProfile {
//   firstName: string;
//   lastName: string;
//   userName: string;
//   email: string;
//   phoneNumber: string;
//   address: string;
//   profilePicture: string;
// }

// interface PersonalInformationFormProps {
//   profile: UserProfile;
//   onInputChange: (field: keyof UserProfile, value: string) => void;
//   onSave: () => void;
//   onCancel: () => void;
// }

// export const PersonalInformationForm = ({ 
//   profile, 
//   onInputChange, 
//   onSave, 
//   onCancel 
// }: PersonalInformationFormProps) => {
//   return (
//     <Card>
//       <CardHeader>
//         <CardTitle>Personal Information</CardTitle>
//       </CardHeader>
//       <CardContent className="space-y-6">
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//           <div className="space-y-2">
//             <Label htmlFor="firstName">First Name</Label>
//             <Input
//               id="firstName"
//               value={profile.firstName}
//               onChange={(e) => onInputChange("firstName", e.target.value)}
//               placeholder="Enter your first name"
//             />
//           </div>
//           <div className="space-y-2">
//             <Label htmlFor="lastName">Last Name</Label>
//             <Input
//               id="lastName"
//               value={profile.lastName}
//               onChange={(e) => onInputChange("lastName", e.target.value)}
//               placeholder="Enter your last name"
//             />
//           </div>
//         </div>

//         <div className="space-y-2">
//           <Label htmlFor="userName" className="flex items-center gap-2">
//             <AtSign className="h-4 w-4" />
//             Username
//           </Label>
//           <Input
//             id="userName"
//             value={profile.userName}
//             onChange={(e) => onInputChange("userName", e.target.value)}
//             placeholder="Enter your username"
//           />
//         </div>

//         <div className="space-y-2">
//           <Label htmlFor="email" className="flex items-center gap-2">
//             <Mail className="h-4 w-4" />
//             Email
//           </Label>
//           <Input
//             id="email"
//             type="email"
//             value={profile.email}
//             onChange={(e) => onInputChange("email", e.target.value)}
//             placeholder="Enter your email"
//           />
//         </div>

//         <div className="space-y-2">
//           <Label htmlFor="phoneNumber" className="flex items-center gap-2">
//             <Phone className="h-4 w-4" />
//             Phone Number
//           </Label>
//           <Input
//             id="phoneNumber"
//             value={profile.phoneNumber}
//             onChange={(e) => onInputChange("phoneNumber", e.target.value)}
//             placeholder="Enter your phone number"
//           />
//         </div>

//         <div className="space-y-2">
//           <Label htmlFor="address" className="flex items-center gap-2">
//             <MapPin className="h-4 w-4" />
//             Address
//           </Label>
//           <Textarea
//             id="address"
//             value={profile.address}
//             onChange={(e) => onInputChange("address", e.target.value)}
//             placeholder="Enter your address"
//             rows={3}
//           />
//         </div>

//         <Separator />

//         <div className="flex justify-end space-x-4">
//           <Button variant="outline" onClick={onCancel}>
//             Cancel
//           </Button>
//           <Button onClick={onSave}>
//             Save Changes
//           </Button>
//         </div>
//       </CardContent>
//     </Card>
//   );
// };

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail, Phone, MapPin, AtSign } from "lucide-react";
import { UseFormRegister, FieldErrors } from "react-hook-form";


interface UserProfile {
  firstName: string;
  lastName: string;
  userName: string;
  email: string;
  phoneNumber: string;
  address: string;
  profilePicture: string;
}

interface PersonalInformationFormProps {
  register: UseFormRegister<UserProfile>;
  errors: FieldErrors<UserProfile>;
  onSave: () => void;
  onCancel: () => void;
}

export const PersonalInformationForm = ({
  register,
  errors,
  onSave,
  onCancel
}: PersonalInformationFormProps) => {
  // console.log(register("firstName"))
  return (
    <Card>
      <CardHeader>
        <CardTitle>Personal Information</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="firstName">First Name</Label>
            <Input
              id="firstName"
              {...register("firstName")}
              placeholder="Enter your first name"
            />
            {errors.firstName && <p className="text-red-500 text-sm">{errors.firstName.message}</p>}
          </div>
          <div className="space-y-2">
            <Label htmlFor="lastName">Last Name</Label>
            <Input
              id="lastName"
              {...register("lastName")}
              placeholder="Enter your last name"
            />
            {errors.lastName && <p className="text-red-500 text-sm">{errors.lastName.message}</p>}
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="userName">Username</Label>
          <Input
            id="userName"
            {...register("userName")}
            placeholder="Enter your username"
          />
          {errors.userName && <p className="text-red-500 text-sm">{errors.userName.message}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            {...register("email")}
            placeholder="Enter your email"
          />
          {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="phoneNumber">Phone Number</Label>
          <Input
            id="phoneNumber"
            {...register("phoneNumber")}
            placeholder="Enter your phone number"
          />
          {errors.phoneNumber && <p className="text-red-500 text-sm">{errors.phoneNumber.message}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="address">Address</Label>
          <Textarea
            id="address"
            {...register("address")}
            placeholder="Enter your address"
            rows={3}
          />
          {errors.address && <p className="text-red-500 text-sm">{errors.address.message}</p>}
        </div>

        <Separator />

        <div className="flex justify-end space-x-4">
          <Button variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button type="submit">
            Save Changes
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
