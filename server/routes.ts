import type { Express } from "express";
import { eq, asc } from "drizzle-orm";
import { db } from "../db";
import { products, recipes, locationInfo, recipeProducts } from "../db/schema";

export function registerRoutes(app: Express) {
  // Products
  app.get("/api/products", async (req, res) => {
    try {
      const allProducts = await db.select().from(products);
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
        .from(products)
        .where(eq(products.id, parseInt(req.params.id)))
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
    } catch (error) {
      console.error("Error updating quantity:", error);
      res.status(500).json({ error: "Failed to update quantity" });
    }
  });

  // Recipes
  app.get("/api/products/:id/recipes", async (req, res) => {
    try {
      const productId = parseInt(req.params.id);
      
      // Get product recipes with prep time ordering
      const recipeRelations = await db
        .select({
          recipe: recipes,
        })
        .from(recipeProducts)
        .where(eq(recipeProducts.productId, productId))
        .innerJoin(recipes, eq(recipes.recipeId, recipeProducts.recipeId))
        .orderBy(asc(recipes.prepTime))  // Order by prep time to show quick recipes first
        .limit(4);  // Limit to 4 recipes per ingredient

      if (recipeRelations.length === 0) {
        res.json([]);
        return;
      }

      // Transform the data to match the expected format
      const recipesList = recipeRelations.map(relation => relation.recipe);
      res.json(recipesList);
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
        .from(recipeProducts)
        .where(eq(recipeProducts.productId, productId))
        .where(eq(recipeProducts.recipeId, recipeId));

      if (existing.length === 0) {
        // Create new relationship
        await db.insert(recipeProducts).values({
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
