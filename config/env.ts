import dotenv from "dotenv";
import { z } from "zod";

dotenv.config();

const envSchema = z.object({
  BASE_URL: z.url(),
});

export const env = envSchema.parse(process.env);
