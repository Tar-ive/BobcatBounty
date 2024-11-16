import { pgTable, text, integer, timestamp, json, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

export const products = pgTable("products", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  name: text("name").notNull(),
  description: text("description").notNull(),
  quantity: integer("quantity").notNull().default(0),
  category: text("category").notNull(),
  dietary: json("dietary").notNull().default(['{}']).$type<string[]>(),
  imageUrl: text("image_url"),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const recipes = pgTable("recipes", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  name: text("name").notNull(),
  description: text("description").notNull(),
  ingredients: json("ingredients").notNull().$type<string[]>(),
  instructions: json("instructions").notNull().$type<string[]>(),
  imageUrl: text("image_url"),
  dietaryTags: json("dietary_tags").notNull().default(['{}']).$type<string[]>(),
});

export const locationInfo = pgTable("location_info", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  name: text("name").notNull(),
  address: text("address").notNull(),
  latitude: text("latitude").notNull(),
  longitude: text("longitude").notNull(),
  isOpen: boolean("is_open").notNull().default(false),
  hours: json("hours").notNull().$type<Record<string, string>>(),
});

export const insertProductSchema = createInsertSchema(products);
export const selectProductSchema = createSelectSchema(products);
export type InsertProduct = z.infer<typeof insertProductSchema>;
export type Product = z.infer<typeof selectProductSchema>;

export const insertRecipeSchema = createInsertSchema(recipes);
export const selectRecipeSchema = createSelectSchema(recipes);
export type InsertRecipe = z.infer<typeof insertRecipeSchema>;
export type Recipe = z.infer<typeof selectRecipeSchema>;

export const insertLocationSchema = createInsertSchema(locationInfo);
export const selectLocationSchema = createSelectSchema(locationInfo);
export type InsertLocation = z.infer<typeof insertLocationSchema>;
export type Location = z.infer<typeof selectLocationSchema>;
