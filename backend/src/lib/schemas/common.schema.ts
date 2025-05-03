import { z, ZodType } from "zod";

export function responseSchema<T extends ZodType<any, any>>(dataSchema: T) {
    return z.object({
        message: z.string(),
        data: dataSchema.optional(),
    });
}
