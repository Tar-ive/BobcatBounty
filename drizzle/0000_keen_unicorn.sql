CREATE TABLE IF NOT EXISTS "location_info" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"address" text NOT NULL,
	"latitude" text NOT NULL,
	"longitude" text NOT NULL,
	"is_open" boolean DEFAULT false NOT NULL,
	"hours" jsonb NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "products" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"description" text NOT NULL,
	"quantity" integer DEFAULT 0 NOT NULL,
	"category" text NOT NULL,
	"dietary" jsonb DEFAULT '["[]"]'::jsonb NOT NULL,
	"image_url" text,
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "recipes" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"description" text NOT NULL,
	"ingredients" jsonb NOT NULL,
	"instructions" jsonb NOT NULL,
	"image_url" text,
	"dietary_tags" jsonb DEFAULT '["[]"]'::jsonb NOT NULL
);
