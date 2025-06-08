// src/schemas/registration.schema.ts
import { z } from 'zod';

export const registrationSchema = z.object({
    firstName: z.string().min(2, { message: 'First name must be at least 2 characters' }),
    lastName: z.string().min(2, { message: 'Last name must be at least 2 characters' }),
    userName: z.string()
        .min(3, { message: 'Username must be at least 3 characters' })
        .refine((val) => !/\s/.test(val), {
            message: 'Username must not contain spaces',
        }),
    email: z.string().email({ message: 'Please enter a valid email address' }),
    phoneNumber: z
        .string()
        .min(1, { message: 'Phone number is required' }) // optional: to catch empty string
        .refine((val) => /^[6-9]\d{9}$/.test(val), {
            message: 'Enter a valid 10-digit phone number starting with 6-9',
        }),
    address: z.string().min(5, { message: 'Address must be at least 5 characters' }),
    password: z.string().min(8, { message: 'Password must be at least 8 characters' }),
    confirmPassword: z.string().min(8, { message: 'Password must be at least 8 characters' }),
    token: z.string().optional(),
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
});

export type RegistrationFormValues = z.infer<typeof registrationSchema>;
