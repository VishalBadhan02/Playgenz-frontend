
import React, { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { X, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Venue } from './types';

interface VenueFormProps {
  initialData?: Venue;
  onSubmit: (data: Omit<Venue, 'id' | 'rating'>) => void;
  onCancel: () => void;
  isEditing?: boolean;
}

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Venue name must be at least 2 characters.",
  }),
  address: z.string().min(5, {
    message: "Address must be at least 5 characters.",
  }),
  description: z.string().min(10, {
    message: "Description must be at least 10 characters.",
  }),
  pricePerHour: z.coerce.number().positive({
    message: "Price must be a positive number.",
  }),
  imageUrl: z.string().url({
    message: "Please enter a valid image URL.",
  }),
  available: z.boolean().default(true),
});

type FormValues = z.infer<typeof formSchema>;

const VenueForm: React.FC<VenueFormProps> = ({ 
  initialData, 
  onSubmit, 
  onCancel,
  isEditing = false
}) => {
  const [sports, setSports] = useState<string[]>(initialData?.sports || []);
  const [facilities, setFacilities] = useState<string[]>(initialData?.facilities || []);
  const [newSport, setNewSport] = useState('');
  const [newFacility, setNewFacility] = useState('');

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: initialData?.name || '',
      address: initialData?.address || '',
      description: initialData?.description || '',
      pricePerHour: initialData?.pricePerHour || 0,
      imageUrl: initialData?.imageUrl || '',
      available: initialData?.available ?? true,
    },
  });

  const handleSubmit = (values: FormValues) => {
    // Create a properly typed venue data object with all required properties
    const venueData: Omit<Venue, 'id' | 'rating'> = {
      name: values.name,
      address: values.address,
      description: values.description,
      pricePerHour: values.pricePerHour,
      imageUrl: values.imageUrl,
      available: values.available,
      sports,
      facilities,
    };
    
    onSubmit(venueData);
    
    if (!isEditing) {
      form.reset();
      setSports([]);
      setFacilities([]);
    }
  };

  const addSport = () => {
    if (newSport && !sports.includes(newSport)) {
      setSports([...sports, newSport]);
      setNewSport('');
    }
  };

  const removeSport = (sport: string) => {
    setSports(sports.filter(s => s !== sport));
  };

  const addFacility = () => {
    if (newFacility && !facilities.includes(newFacility)) {
      setFacilities([...facilities, newFacility]);
      setNewFacility('');
    }
  };

  const removeFacility = (facility: string) => {
    setFacilities(facilities.filter(f => f !== facility));
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{isEditing ? 'Edit Venue' : 'Add New Venue'}</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Venue Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter venue name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="address"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Address</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter venue address" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Enter venue description" 
                      rows={3}
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="pricePerHour"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Price per Hour ($)</FormLabel>
                    <FormControl>
                      <Input 
                        type="number" 
                        min="0" 
                        step="0.01" 
                        placeholder="Enter price per hour" 
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="imageUrl"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Image URL</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="Enter image URL" 
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="available"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base">Availability</FormLabel>
                    <p className="text-sm text-muted-foreground">
                      Set the venue as available for booking
                    </p>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <div>
              <FormLabel>Sports</FormLabel>
              <div className="flex flex-wrap gap-2 mb-2">
                {sports.map((sport) => (
                  <Badge key={sport} variant="secondary" className="flex items-center gap-1">
                    {sport}
                    <button 
                      type="button" 
                      onClick={() => removeSport(sport)}
                      className="ml-1 rounded-full hover:bg-muted p-0.5"
                    >
                      <X className="h-3 w-3" />
                      <span className="sr-only">Remove</span>
                    </button>
                  </Badge>
                ))}
              </div>
              <div className="flex gap-2">
                <Input
                  value={newSport}
                  onChange={(e) => setNewSport(e.target.value)}
                  placeholder="Add a sport"
                  className="flex-grow"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      addSport();
                    }
                  }}
                />
                <Button 
                  type="button" 
                  variant="outline" 
                  size="icon"
                  onClick={addSport}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div>
              <FormLabel>Facilities</FormLabel>
              <div className="flex flex-wrap gap-2 mb-2">
                {facilities.map((facility) => (
                  <Badge key={facility} variant="secondary" className="flex items-center gap-1">
                    {facility}
                    <button 
                      type="button" 
                      onClick={() => removeFacility(facility)}
                      className="ml-1 rounded-full hover:bg-muted p-0.5"
                    >
                      <X className="h-3 w-3" />
                      <span className="sr-only">Remove</span>
                    </button>
                  </Badge>
                ))}
              </div>
              <div className="flex gap-2">
                <Input
                  value={newFacility}
                  onChange={(e) => setNewFacility(e.target.value)}
                  placeholder="Add a facility"
                  className="flex-grow"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      addFacility();
                    }
                  }}
                />
                <Button 
                  type="button" 
                  variant="outline" 
                  size="icon"
                  onClick={addFacility}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="flex justify-end gap-2">
              {isEditing && (
                <Button type="button" variant="outline" onClick={onCancel}>
                  Cancel
                </Button>
              )}
              <Button type="submit">
                {isEditing ? 'Update Venue' : 'Add Venue'}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default VenueForm;
