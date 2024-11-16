import { pgTable, text, integer, timestamp, json, boolean, varchar } from "drizzle-orm/pg-core";
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

export const recipes = pgTable("recipes1", {
  recipeId: integer("recipe_id").primaryKey().generatedAlwaysAsIdentity(),
  name: varchar("name", { length: 100 }).notNull(),
  description: text("description").notNull(),
  prepTime: integer("prep_time"),
  cookingTime: integer("cooking_time"),
  ingredients: json("ingredients").notNull().default(['{}']).$type<string[]>(),
  instructions: json("instructions").notNull().default(['{}']).$type<string[]>(),
  imageUrl: text("image_url"),
  dietaryTags: json("dietary_tags").default(['{}']).$type<string[]>()
});

export const recipeProducts = pgTable("recipe_products1", {
  recipeId: integer("recipe_id").notNull().references(() => recipes.recipeId),
  productId: integer("product_id").notNull().references(() => products.id),
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

// Product schemas
export const insertProductSchema = createInsertSchema(products);
export const selectProductSchema = createSelectSchema(products);
export type InsertProduct = z.infer<typeof insertProductSchema>;
export type Product = z.infer<typeof selectProductSchema>;

// Recipe schemas
export const insertRecipeSchema = createInsertSchema(recipes);
export const selectRecipeSchema = createSelectSchema(recipes);
export type InsertRecipe = z.infer<typeof insertRecipeSchema>;
export type Recipe = z.infer<typeof selectRecipeSchema>;

// RecipeProducts schemas
export const insertRecipeProductSchema = createInsertSchema(recipeProducts);
export const selectRecipeProductSchema = createSelectSchema(recipeProducts);
export type InsertRecipeProduct = z.infer<typeof insertRecipeProductSchema>;
export type RecipeProduct = z.infer<typeof selectRecipeProductSchema>;

// Location schemas
export const insertLocationSchema = createInsertSchema(locationInfo);
export const selectLocationSchema = createSelectSchema(locationInfo);
export type InsertLocation = z.infer<typeof insertLocationSchema>;
export type Location = z.infer<typeof selectLocationSchema>;
