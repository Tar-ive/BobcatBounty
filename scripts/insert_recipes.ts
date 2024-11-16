import { db } from "../db";
import { recipes1, recipeProducts1, products1 } from "../db/schema";
import { sql, eq, inArray } from "drizzle-orm";

async function insertRecipesAndRelationships() {
  try {
    // First, let's check if recipes already exist
    const existingRecipes = await db.select().from(recipes1);
    if (existingRecipes.length === 0) {
      // Insert recipes only if they don't exist
      await db.insert(recipes1).values([
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
    }

    // Get all recipes
    const allRecipes = await db.select().from(recipes1);

    // Recipe to product mappings with exact names from database
    const recipeRelations = [
      { 
        recipeName: "Classic Peanut Butter Banana Sandwich", 
        productNames: ["H-E-B Natural Creamy Peanut Butter (16 oz)", "H-E-B Organics Bananas (per lb)"]
      },
      { 
        recipeName: "Greek Yogurt and Banana Smoothie", 
        productNames: ["H-E-B Natural Plain Greek Yogurt (32 oz)", "H-E-B Organics Bananas (per lb)"]
      },
      { 
        recipeName: "Rice and Beans Bowl", 
        productNames: ["Hill Country Fare Long Grain Rice (5 lb)", "H-E-B Black Beans (15 oz)"]
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
        productNames: ["Hill Country Fare Large Eggs (dozen)", "Hill Country Fare Russet Potatoes (5 lb)"]
      }
    ];

    // Clear existing relationships to avoid duplicates
    await db.delete(recipeProducts1);

    // Create the relationships
    for (const relation of recipeRelations) {
      const recipe = allRecipes.find(r => r.name === relation.recipeName);
      if (!recipe) continue;

      // Get products for this recipe
      const products = await db
        .select()
        .from(products1)
        .where(inArray(products1.name, relation.productNames));

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
