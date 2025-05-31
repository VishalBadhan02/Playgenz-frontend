
import React from 'react';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Upload } from "lucide-react";
import { TeamFormData } from '@/pages/TeamRegistration';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

interface TeamDetailsFormProps {
  initialData: TeamFormData;
  onSubmit: (data: TeamFormData) => void;
  selectedGame: string;
}

export const TeamDetailsForm: React.FC<TeamDetailsFormProps> = ({
  initialData,
  onSubmit,
  selectedGame
}) => {
  const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
  const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];

  const formSchema = z.object({
    teamName: z.string().min(3, { message: "Team name must be at least 3 characters" }),
    email: z.string().email({ message: "Please enter a valid email address" }),
    phoneNumber: z.string().min(10, { message: "Please enter a valid phone number" }),
    noOfPlayers: z.string().min(1, { message: "Number of players is required" }),
    substitute: z.string().optional(),
    homeGround: z.string().min(3, { message: "Home ground is required" }),
    addressOfGround: z.string().min(5, { message: "Address is required" }),
    pinCode: z.string().min(5, { message: "Pin code is required" }),
    logo: z.instanceof(File)
      .optional()
      .nullable()
      .refine((file) => !file || file.size <= MAX_FILE_SIZE, {
        message: "Max file size is 5MB."
      })
      .refine((file) => !file || ACCEPTED_IMAGE_TYPES.includes(file.type), {
        message: "Only .jpg, .jpeg, .png and .webp formats are supported."
      }),
    description: z.string().min(10, { message: "Please provide a brief description of your team" }),
    joinTeam: z.boolean().default(false),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData,
  });

  const handleSubmit = (values: z.infer<typeof formSchema>) => {
    onSubmit(values as TeamFormData);
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">Team Registration</CardTitle>
        <CardDescription>
          Enter the details of your {selectedGame} team
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="teamName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Team Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter team name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Contact Email</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter contact email" type="email" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="phoneNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone Number</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter phone number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="noOfPlayers"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Number of Players</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter number of players" type="number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="substitute"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Substitutes (optional)</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter number of substitutes" type="number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="homeGround"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Home Ground</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter home ground" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="addressOfGround"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Address of Ground</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter ground address" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="pinCode"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Pin Code</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter pin code" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="logo"
              render={({ field: { value, onChange, ...fieldProps } }) => (
                <FormItem>
                  <FormLabel>Team Logo</FormLabel>
                  <FormControl>
                    <div className="flex items-center gap-4">
                      <div className="flex-1">
                        <Input
                          type="file"
                          accept=".jpg,.jpeg,.png,.webp"
                          onChange={(e) => {
                            const file = e.target.files?.[0] || null;
                            onChange(file);
                          }}
                          {...fieldProps}
                        />
                      </div>
                      {value && (
                        <div className="w-16 h-16 bg-muted rounded-md overflow-hidden">
                          <img
                            src={URL.createObjectURL(value as File)}
                            alt="Team logo preview"
                            className="w-full h-full object-cover"
                          />
                        </div>
                      )}
                    </div>
                  </FormControl>
                  <FormDescription>
                    Upload your team logo (5MB max, JPEG, PNG, or WebP)
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Team Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Tell us about your team..."
                      rows={4}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="joinTeam"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>Open for Joining</FormLabel>
                    <FormDescription>
                      Allow other players to request to join your team
                    </FormDescription>
                  </div>
                </FormItem>
              )}
            />

            <div className="flex justify-end space-x-4">
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => window.history.back()}
              >
                <ArrowLeft className="mr-2 h-4 w-4" /> Back
              </Button>
              <Button type="submit">Register Team</Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};
