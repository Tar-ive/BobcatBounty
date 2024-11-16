import { db } from "../db";
import { recipes, recipeProducts1, products } from "../db/schema";
import { sql, eq, inArray } from "drizzle-orm";

async function insertRecipesAndRelationships() {
  try {
    // First, ensure we have the necessary products
    const productData = [
      { name: "H-E-B Organics Bananas (per lb)", brand: "H-E-B", category: "Fresh Produce", calories: 105, quantity: 50, expiryDays: 7, vegan: true, glutenFree: true },
      { name: "H-E-B Natural Creamy Peanut Butter (16 oz)", brand: "H-E-B", category: "Pantry Staples", calories: 190, quantity: 30, expiryDays: 365, vegan: true, glutenFree: true },
      { name: "H-E-B Natural Plain Greek Yogurt (32 oz)", brand: "H-E-B", category: "Dairy & Refrigerated", calories: 120, quantity: 25, expiryDays: 14, vegan: false, glutenFree: true },
      { name: "Hill Country Fare Long Grain Rice (5 lb)", brand: "Hill Country Fare", category: "Pantry Staples", calories: 160, quantity: 40, expiryDays: 730, vegan: true, glutenFree: true },
      { name: "H-E-B Black Beans (15 oz)", brand: "H-E-B", category: "Pantry Staples", calories: 120, quantity: 45, expiryDays: 730, vegan: true, glutenFree: true },
      { name: "H-E-B Premium Traditional Pasta (16 oz)", brand: "H-E-B", category: "Pantry Staples", calories: 200, quantity: 35, expiryDays: 730, vegan: true, glutenFree: false },
      { name: "H-E-B Texas Sweet Onions (per lb)", brand: "H-E-B", category: "Fresh Produce", calories: 40, quantity: 60, expiryDays: 14, vegan: true, glutenFree: true },
      { name: "Hill Country Fare Chunk Light Tuna in Water (5 oz)", brand: "Hill Country Fare", category: "Proteins", calories: 80, quantity: 50, expiryDays: 730, vegan: false, glutenFree: true },
      { name: "H-E-B 100% Whole Wheat Bread", brand: "H-E-B", category: "Bread & Bakery", calories: 110, quantity: 30, expiryDays: 7, vegan: true, glutenFree: false },
      { name: "Hill Country Fare Large Eggs (dozen)", brand: "Hill Country Fare", category: "Dairy & Refrigerated", calories: 70, quantity: 40, expiryDays: 21, vegan: false, glutenFree: true },
      { name: "Hill Country Fare Russet Potatoes (5 lb)", brand: "Hill Country Fare", category: "Fresh Produce", calories: 110, quantity: 35, expiryDays: 14, vegan: true, glutenFree: true }
    ];

    // Clear existing products and insert new ones
    await db.delete(products);
    await db.insert(products).values(productData);

    // Insert recipes
    await db.delete(recipes);
    await db.insert(recipes).values([
      {
        name: "Classic Peanut Butter Banana Sandwich",
        description: "A quick and healthy sandwich using peanut butter and bananas.",
        prepTime: 5,
        cookingTime: 0
      },
      {
        name: "Greek Yogurt and Banana Smoothie",
        description: "A refreshing smoothie with Greek yogurt, bananas, and honey.",
        prepTime: 10,
        cookingTime: 0
      },
      {
        name: "Rice and Beans Bowl",
        description: "A simple yet nutritious bowl with rice and black beans.",
        prepTime: 15,
        cookingTime: 20
      },
      {
        name: "Whole Wheat Pasta with Onion Sauce",
        description: "Pasta served with a light onion sauce.",
        prepTime: 20,
        cookingTime: 15
      },
      {
        name: "Tuna Salad Sandwich",
        description: "A protein-rich tuna salad served with whole wheat bread.",
        prepTime: 15,
        cookingTime: 0
      },
      {
        name: "Egg and Potato Breakfast Skillet",
        description: "A hearty breakfast with eggs and russet potatoes.",
        prepTime: 10,
        cookingTime: 15
      }
    ]);

    // Get all recipes
    const allRecipes = await db.select().from(recipes);

    // Recipe to product mappings
    const recipeRelations = [
      { 
        recipeName: "Classic Peanut Butter Banana Sandwich", 
        productNames: ["H-E-B Natural Creamy Peanut Butter (16 oz)", "H-E-B Organics Bananas (per lb)", "H-E-B 100% Whole Wheat Bread"]
      },
      { 
        recipeName: "Greek Yogurt and Banana Smoothie", 
        productNames: ["H-E-B Natural Plain Greek Yogurt (32 oz)", "H-E-B Organics Bananas (per lb)"]
      },
      { 
        recipeName: "Rice and Beans Bowl", 
        productNames: ["Hill Country Fare Long Grain Rice (5 lb)", "H-E-B Black Beans (15 oz)", "H-E-B Texas Sweet Onions (per lb)"]
      },
      { 
        recipeName: "Whole Wheat Pasta with Onion Sauce", 
        productNames: ["H-E-B Premium Traditional Pasta (16 oz)", "H-E-B Texas Sweet Onions (per lb)"]
      },
      { 
        recipeName: "Tuna Salad Sandwich", 
        productNames: ["Hill Country Fare Chunk Light Tuna in Water (5 oz)", "H-E-B 100% Whole Wheat Bread"]
      },
      { 
        recipeName: "Egg and Potato Breakfast Skillet", 
        productNames: ["Hill Country Fare Large Eggs (dozen)", "Hill Country Fare Russet Potatoes (5 lb)", "H-E-B Texas Sweet Onions (per lb)"]
      }
    ];

    // Clear existing relationships
    await db.delete(recipeProducts1);

    // Create the relationships
    for (const relation of recipeRelations) {
      const recipe = allRecipes.find(r => r.name === relation.recipeName);
      if (!recipe) continue;

      // Get products for this recipe
      const products = await db
        .select()
        .from(products)
        .where(inArray(products.name, relation.productNames));

      // Create relationships
      for (const product of products) {
        await db.insert(recipeProducts1).values({
          recipeId: recipe.recipeId,
          productId: product.productId
        });
      }
    }

    console.log("Successfully inserted recipes and relationships!");
  } catch (error) {
    console.error("Error:", error);
  }
}

insertRecipesAndRelationships();
