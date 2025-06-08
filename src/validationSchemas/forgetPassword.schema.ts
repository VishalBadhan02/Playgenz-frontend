import { z } from 'zod';

export const formSchema = z.object({
    email: z
        .string()
        .min(1, { message: "Username, email, or phone number is required" })
        .refine((val) => {
            const isEmail = /^\S+@\S+\.\S+$/.test(val);
            const isPhone = /^[6-9]\d{9}$/.test(val);
            const isUsername = /^[a-zA-Z0-9_]{3,20}$/.test(val); // Letters, numbers, underscores; 3–20 chars
            return isEmail || isPhone || isUsername;
        }, {
            message: "Enter a valid username, email, or 10-digit phone number",
        }),
});