import type { Express } from "express";
import { eq } from "drizzle-orm";
import { db } from "../db";
import { products1, recipes, locationInfo } from "../db/schema";

export function registerRoutes(app: Express) {
  // Products
  app.get("/api/products", async (req, res) => {
    try {
      const allProducts = await db.select().from(products1);
      res.json(allProducts);
    } catch (error) {
      console.error("Error fetching products:", error);
      res.status(500).json({ error: "Failed to fetch products" });
    }
  });

  app.get("/api/products/:id", async (req, res) => {
    try {
      const product = await db
        .select()
        .from(products1)
        .where(eq(products1.productId, parseInt(req.params.id)))
        .limit(1);
      
      if (product.length === 0) {
        res.status(404).json({ error: "Product not found" });
        return;
      }
      
      res.json(product[0]);
    } catch (error) {
      console.error("Error fetching product:", error);
      res.status(500).json({ error: "Failed to fetch product" });
    }
  });

  app.post("/api/products/:id/quantity", async (req, res) => {
    try {
      const { change } = req.body;
      const product = await db
        .select()
        .from(products1)
        .where(eq(products1.productId, parseInt(req.params.id)))
        .limit(1);
      
      if (product.length === 0) {
        res.status(404).json({ error: "Product not found" });
        return;
      }

      const newQuantity = Math.max(0, product[0].quantity + change);
      
      await db
        .update(products1)
        .set({ quantity: newQuantity })
        .where(eq(products1.productId, parseInt(req.params.id)));
      
      res.json({ success: true });
    } catch (error) {
      console.error("Error updating quantity:", error);
      res.status(500).json({ error: "Failed to update quantity" });
    }
  });

  // Recipes
  app.get("/api/products/:id/recipes", async (req, res) => {
    try {
      const productRecipes = await db.select().from(recipes);
      res.json(productRecipes);
    } catch (error) {
      console.error("Error fetching recipes:", error);
      res.status(500).json({ error: "Failed to fetch recipes" });
    }
  });

  // Location
  app.get("/api/location", async (req, res) => {
    try {
      const location = await db.select().from(locationInfo).limit(1);
      res.json(location[0]);
    } catch (error) {
      console.error("Error fetching location:", error);
      res.status(500).json({ error: "Failed to fetch location" });
    }
  });
}
