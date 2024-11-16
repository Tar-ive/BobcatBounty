import { pgTable, text, integer, timestamp, json, boolean, varchar } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

// Enum types for brand and category
const brandEnum = z.enum(['H-E-B', 'Hill Country Fare']); // Update with actual brands
const categoryEnum = z.enum(['Produce', 'Dairy', 'Spreads', 'Grains', 'Canned Goods', 'Bread']); // Update with actual categories

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

export const products1 = pgTable("products1", {
  productId: integer("product_id").primaryKey().generatedAlwaysAsIdentity(),
  name: varchar("name", { length: 100 }).notNull(),
  brand: text("brand").notNull(),
  category: text("category").notNull(),
  calories: integer("calories"),
  quantity: integer("quantity").notNull(),
  expiryDays: integer("expiry_days").notNull(),
  vegan: boolean("vegan").notNull(),
  glutenFree: boolean("gluten_free").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const recipes1 = pgTable("recipes1", {
  recipeId: integer("recipe_id").primaryKey().generatedAlwaysAsIdentity(),
  name: varchar("name", { length: 100 }).notNull(),
  description: text("description").notNull(),
  prepTime: integer("prep_time"),
  cookingTime: integer("cooking_time"),
});

export const recipeProducts1 = pgTable("recipe_products1", {
  recipeId: integer("recipe_id").notNull().references(() => recipes1.recipeId),
  productId: integer("product_id").notNull().references(() => products1.productId),
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

// Products1 schemas
export const insertProducts1Schema = createInsertSchema(products1);
export const selectProducts1Schema = createSelectSchema(products1);
export type InsertProducts1 = z.infer<typeof insertProducts1Schema>;
export type Products1 = z.infer<typeof selectProducts1Schema>;

// Recipe1 schemas
export const insertRecipe1Schema = createInsertSchema(recipes1);
export const selectRecipe1Schema = createSelectSchema(recipes1);
export type InsertRecipe1 = z.infer<typeof insertRecipe1Schema>;
export type Recipe1 = z.infer<typeof selectRecipe1Schema>;

// RecipeProducts1 schemas
export const insertRecipeProducts1Schema = createInsertSchema(recipeProducts1);
export const selectRecipeProducts1Schema = createSelectSchema(recipeProducts1);
export type InsertRecipeProducts1 = z.infer<typeof insertRecipeProducts1Schema>;
export type RecipeProducts1 = z.infer<typeof selectRecipeProducts1Schema>;

export const insertLocationSchema = createInsertSchema(locationInfo);
export const selectLocationSchema = createSelectSchema(locationInfo);
export type InsertLocation = z.infer<typeof insertLocationSchema>;
export type Location = z.infer<typeof selectLocationSchema>;