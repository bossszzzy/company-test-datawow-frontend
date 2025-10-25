import z from "zod";

export const CreateConcertSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters.")
    .max(100, "Name is too long."),
  totalSeats: z
    .number("Total seats must be a number." )
    .int("Must be an integer.")
    .min(1, "Minimum 1 seat.")
    .max(100000, "Too many seats."),
  description: z
    .string()
    .max(1000, "Description too long.")
    .optional()
    .or(z.literal("")),
});

export type CreateConcertInput = z.infer<typeof CreateConcertSchema>;
