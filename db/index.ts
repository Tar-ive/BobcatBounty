import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from './schema';

if (!process.env.NEON_DATABASE_URL) {
  throw new Error('NEON_DATABASE_URL must be set in the environment variables');
}

// Create the connection
const client = postgres(process.env.NEON_DATABASE_URL);

// Create the drizzle database instance
export const db = drizzle(client, { schema });

// Export the client for use in migrations
export const queryClient = client;
