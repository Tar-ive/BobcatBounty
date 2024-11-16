import type { Express } from "express";
import { eq } from "drizzle-orm";
import { db } from "../db";
import { products, recipes, locationInfo } from "../db/schema";

export function registerRoutes(app: Express) {
  // Products
  app.get("/api/products", async (req, res) => {
    const allProducts = await db.select().from(products);
    res.json(allProducts);
  });

  app.get("/api/products/:id", async (req, res) => {
    const product = await db
      .select()
      .from(products)
      .where(eq(products.id, parseInt(req.params.id)))
      .limit(1);
    
    if (product.length === 0) {
      res.status(404).json({ error: "Product not found" });
      return;
    }
    
    res.json(product[0]);
  });

  app.post("/api/products/:id/quantity", async (req, res) => {
    const { change } = req.body;
    const product = await db
      .select()
      .from(products)
      .where(eq(products.id, parseInt(req.params.id)))
      .limit(1);
    
    if (product.length === 0) {
      res.status(404).json({ error: "Product not found" });
      return;
    }

    const newQuantity = Math.max(0, product[0].quantity + change);
    
    await db
      .update(products)
      .set({ quantity: newQuantity })
      .where(eq(products.id, parseInt(req.params.id)));
    
    res.json({ success: true });
  });

  // Recipes
  app.get("/api/products/:id/recipes", async (req, res) => {
    const productRecipes = await db.select().from(recipes);
    res.json(productRecipes);
  });

  // Location
  app.get("/api/location", async (req, res) => {
    const location = await db.select().from(locationInfo).limit(1);
    res.json(location[0]);
  });
}
