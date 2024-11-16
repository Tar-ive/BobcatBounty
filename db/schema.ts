import { pgTable, text, integer, timestamp, json, boolean, varchar } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

// Enum types for brand and category
const brandEnum = z.enum(['nike', 'adidas', 'puma', 'reebok']); // Update with your actual brand values
const categoryEnum = z.enum(['shoes', 'clothes', 'accessories']); // Update with your actual category values

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
  brand: text("brand").notNull(), // Assuming brand_type is implemented as text
  category: text("category").notNull(), // Assuming category_type is implemented as text
  calories: integer("calories"),
  quantity: integer("quantity").notNull(),
  expiryDays: integer("expiry_days").notNull(),
  vegan: boolean("vegan").notNull(),
  glutenFree: boolean("gluten_free").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
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

// Existing schemas
export const insertProductSchema = createInsertSchema(products);
export const selectProductSchema = createSelectSchema(products);
export type InsertProduct = z.infer<typeof insertProductSchema>;
export type Product = z.infer<typeof selectProductSchema>;

// New products1 schemas
export const insertProducts1Schema = createInsertSchema(products1);
export const selectProducts1Schema = createSelectSchema(products1);
export type InsertProducts1 = z.infer<typeof insertProducts1Schema>;
export type Products1 = z.infer<typeof selectProducts1Schema>;

// Existing schemas
export const insertRecipeSchema = createInsertSchema(recipes);
export const selectRecipeSchema = createSelectSchema(recipes);
export type InsertRecipe = z.infer<typeof insertRecipeSchema>;
export type Recipe = z.infer<typeof selectRecipeSchema>;

export const insertLocationSchema = createInsertSchema(locationInfo);
export const selectLocationSchema = createSelectSchema(locationInfo);
export type InsertLocation = z.infer<typeof insertLocationSchema>;
export type Location = z.infer<typeof selectLocationSchema>;
