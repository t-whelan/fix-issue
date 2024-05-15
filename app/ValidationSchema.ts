import { z } from 'zod';

// http://localhost:3000/api/issues/new
export const IssueFormSchema = z.object({
    title: z.string().min(1, { message: "Title is required" }).max(50),
    description: z.string().min(6, { message: "Description is required" }).max(2000)
});


export const patchIssueSchema = z.object({
    title: z.string().min(1, 'title is required').max(255).optional(),
    description: z
      .string()
      .min(1, 'description is required')
      .max(65535)
      .optional(),
    assignedToUserId: z
      .string()
      .min(1, 'AssignedToUserId is required.')
      .max(255)
      .optional()
      .nullable()
  })