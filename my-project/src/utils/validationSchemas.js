import { z } from "zod";

const phonePattern = /^\+\d{1,3}-\d{3}-\d{3}-\d{4}$/;

export const step1Schema = z.object({
  fullName: z
    .string()
    .min(1, "Required")
    .refine((v) => v.trim().split(/\s+/).length >= 2, "At least 2 words"),
  email: z.string().email("Invalid email"),
  phone: z.string().regex(phonePattern, "Format: +1-123-456-7890"),
  dob: z.string().refine((val) => {
    const d = new Date(val);
    if (Number.isNaN(d.getTime())) return false;
    const now = new Date();
    let age = now.getFullYear() - d.getFullYear();
    const m = now.getMonth() - d.getMonth();
    if (m < 0 || (m === 0 && now.getDate() < d.getDate())) age--;
    return age >= 18;
  }, "Must be 18+"),
  profilePicture: z.any().optional(),
});

export const step2Schema = z.object({
  department: z.string().min(1, "Required"),
  position: z.string().min(3, "At least 3 characters"),
  startDate: z.string().refine((val) => {
    const now = new Date();
    const d = new Date(val);
    if (Number.isNaN(d.getTime())) return false;
    if (d < new Date(now.toDateString())) return false;
    const diff = (d - now) / (1000 * 60 * 60 * 24);
    return diff <= 90;
  }, "Start date invalid"),
  jobType: z.enum(["Full-time", "Part-time", "Contract"]),
  salary: z.union([z.string(), z.number()]).optional(),
  manager: z.string().optional(),
});

export const step3Schema = z.object({
  skills: z.array(z.string()).min(3, "Pick at least 3"),
  skillExperience: z.record(z.string(), z.number()).optional(),
  workingHoursStart: z.string().optional(),
  workingHoursEnd: z.string().optional(),
  remotePercent: z.coerce.number().min(0).max(100),
  managerApproved: z.boolean().optional(),
  notes: z.string().max(500).optional(),
});

export const step4Schema = z.object({
  emergencyName: z.string().min(1, "Required"),
  emergencyRelationship: z.string().min(1, "Required"),
  emergencyPhone: z.string().regex(phonePattern, "Format: +1-123-456-7890"),
  guardianName: z.string().optional(),
  guardianPhone: z.string().optional(),
});
