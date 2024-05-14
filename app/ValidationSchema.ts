import { z } from 'zod';

// http://localhost:3000/api/issues/new
export const IssueFormSchema = z.object({
    title: z.string().min(1, { message: "Title is required" }).max(50),
    description: z.string().min(6, { message: "Description is required" }).max(2000)
});
