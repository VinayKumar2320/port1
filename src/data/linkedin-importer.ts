import { z } from 'zod';

export const LinkedInExportSchema = z.object({
  profile: z.object({
    firstName: z.string(),
    lastName: z.string(),
    headline: z.string(),
    summary: z.string().optional(),
    location: z.string().optional(),
  }),
  positions: z.array(
    z.object({
      companyName: z.string(),
      title: z.string(),
      description: z.string().optional(),
      location: z.string().optional(),
      startedOn: z.string().optional(),
      finishedOn: z.string().optional(),
    })
  ).optional(),
  education: z.array(
    z.object({
      schoolName: z.string(),
      degreeName: z.string().optional(),
      notes: z.string().optional(),
      startDate: z.string().optional(),
      endDate: z.string().optional(),
    })
  ).optional(),
  certifications: z.array(
    z.object({
      name: z.string(),
      authority: z.string().optional(),
      url: z.string().optional(),
    })
  ).optional(),
});

export type LinkedInExportData = z.infer<typeof LinkedInExportSchema>;

export class LinkedInImportService {
  /**
   * Safely parses and validates a user-provided LinkedIn Data Export JSON.
   * LinkedIn allows users to download their data archive via Settings -> Data Privacy -> Get a copy of your data.
   */
  static parseUserDataArchive(rawJsonString: string): {
    success: boolean;
    data?: LinkedInExportData;
    error?: string;
  } {
    try {
      const parsed = JSON.parse(rawJsonString);
      const validated = LinkedInExportSchema.safeParse(parsed);
      if (validated.success) {
        return { success: true, data: validated.data };
      }
      return {
        success: false,
        error: `Schema validation failed: ${validated.error.issues.map((i) => i.message).join(', ')}`,
      };
    } catch (err: unknown) {
      return {
        success: false,
        error: `JSON parse error: ${err instanceof Error ? err.message : String(err)}`,
      };
    }
  }
}
