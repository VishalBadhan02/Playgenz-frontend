import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useState } from "react";
import { format } from 'date-fns';


interface BookingFormProps {
    // venue: typeof venues[0];
    selectedDate: Date;
    timeSlots: Array<{
        id: string;
        time: string;
        available: boolean;
    }>;
    onBookingComplete: () => void;
}

export const BookingForm: React.FC<BookingFormProps> = ({
    // venue,
    selectedDate,
    timeSlots,
    onBookingComplete
}) => {
    const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
    const [personCount, setPersonCount] = useState(1);
    const [contactName, setContactName] = useState('');
    const [contactEmail, setContactEmail] = useState('');
    const [contactPhone, setContactPhone] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // In a real app, you would submit the booking to an API
        console.log({
            // venueId: venue.id,
            date: format(selectedDate, 'yyyy-MM-dd'),
            timeSlot: selectedSlot,
            personCount,
            contactName,
            contactEmail,
            contactPhone
        });

        alert('Booking successful! You will receive a confirmation email shortly.');
        onBookingComplete();
        // Redirect to a confirmation page or booking list
        navigate('/bookings');
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <h3 className="text-lg font-medium mb-2">Select a time slot</h3>
                <div className="grid grid-cols-3 gap-2 md:grid-cols-4">
                    {timeSlots.map((slot) => (
                        <Button
                            key={slot.id}
                            type="button"
                            variant={selectedSlot === slot.id ? "default" : "outline"}
                            disabled={!slot.available}
                            onClick={() => setSelectedSlot(slot.id)}
                            className={`${!slot.available ? 'opacity-50' : ''}`}
                        >
                            {slot.time}
                        </Button>
                    ))}
                </div>
            </div>

            <div className="space-y-4 mt-4">
                <div>
                    <label htmlFor="personCount" className="block text-sm font-medium mb-1">
                        Number of People
                    </label>
                    <Input
                        id="personCount"
                        type="number"
                        min={1}
                        value={personCount}
                        onChange={(e) => setPersonCount(parseInt(e.target.value))}
                        required
                    />
                </div>

                <div>
                    <label htmlFor="contactName" className="block text-sm font-medium mb-1">
                        Name
                    </label>
                    <Input
                        id="contactName"
                        value={contactName}
                        onChange={(e) => setContactName(e.target.value)}
                        required
                    />
                </div>

                <div>
                    <label htmlFor="contactEmail" className="block text-sm font-medium mb-1">
                        Email
                    </label>
                    <Input
                        id="contactEmail"
                        type="email"
                        value={contactEmail}
                        onChange={(e) => setContactEmail(e.target.value)}
                        required
                    />
                </div>

                <div>
                    <label htmlFor="contactPhone" className="block text-sm font-medium mb-1">
                        Phone
                    </label>
                    <Input
                        id="contactPhone"
                        value={contactPhone}
                        onChange={(e) => setContactPhone(e.target.value)}
                        required
                    />
                </div>
            </div>

            <div className="pt-4">
                <Button
                    type="submit"
                    className="w-full"
                    disabled={!selectedSlot}
                >
                    Complete Booking
                </Button>
            </div>
        </form>
    );
};