import type { Express } from "express";
import { eq, asc } from "drizzle-orm";
import { db } from "../db";
import { products1, recipes1, locationInfo, recipeProducts1 } from "../db/schema";

export function registerRoutes(app: Express) {
  // Products
  app.get("/api/products", async (req, res) => {
    try {
      const allProducts = await db.select().from(products1);
      console.log('Products:', allProducts);
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
      const productId = parseInt(req.params.id);
      console.log('Product ID:', productId);
      
      // Get product recipes
      const recipeRelations = await db
        .select({
          recipeId: recipeProducts1.recipeId,
        })
        .from(recipeProducts1)
        .where(eq(recipeProducts1.productId, productId));

      console.log('Recipe relations:', recipeRelations);

      if (recipeRelations.length === 0) {
        console.log('No recipe relations found for product');
        res.json([]);
        return;
      }

      // Fetch the actual recipes
      const recipeIds = recipeRelations.map(relation => relation.recipeId);
      console.log('Recipe IDs:', recipeIds);

      const productRecipesList = await Promise.all(
        recipeIds.map(id => 
          db
            .select()
            .from(recipes1)
            .where(eq(recipes1.recipeId, id))
            .limit(1)
            .then(results => results[0])
        )
      );

      console.log('Product recipes:', productRecipesList);
      res.json(productRecipesList);
    } catch (error) {
      console.error("Error fetching recipes:", error);
      res.status(500).json({ error: "Failed to fetch recipes" });
    }
  });

  // Add recipe relationship to product
  app.post("/api/products/:productId/recipes/:recipeId", async (req, res) => {
    try {
      const productId = parseInt(req.params.productId);
      const recipeId = parseInt(req.params.recipeId);

      // Check if relationship already exists
      const existing = await db
        .select()
        .from(recipeProducts1)
        .where(eq(recipeProducts1.productId, productId))
        .where(eq(recipeProducts1.recipeId, recipeId));

      if (existing.length === 0) {
        // Create new relationship
        await db.insert(recipeProducts1).values({
          productId,
          recipeId,
        });
      }

      res.json({ success: true });
    } catch (error) {
      console.error("Error adding recipe relationship:", error);
      res.status(500).json({ error: "Failed to add recipe relationship" });
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
