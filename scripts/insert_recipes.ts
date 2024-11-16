import { db } from "../db";
import { recipes, recipeProducts, products } from "../db/schema";
import { sql, eq, inArray } from "drizzle-orm";

async function insertRecipesAndRelationships() {
  try {
    // First, let's check if recipes exist
    const existingRecipes = await db.select().from(recipes);
    if (existingRecipes.length === 0) {
      // Insert recipes only if they don't exist
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
        },
        // New recipes
        {
          name: "Tex-Mex Breakfast Tacos",
          description: "Tacos filled with scrambled eggs, cheese, and salsa.",
          prepTime: 10,
          cookingTime: 10
        },
        {
          name: "H-E-B Classic Peanut Butter Banana Sandwich",
          description: "Classic sandwich with peanut butter and banana slices.",
          prepTime: 5,
          cookingTime: 0
        },
        {
          name: "Creamy Greek Yogurt Parfait",
          description: "Layered parfait with yogurt, granola, and fresh fruits.",
          prepTime: 5,
          cookingTime: 0
        },
        {
          name: "Spicy Tuna Salad",
          description: "A light and spicy salad with tuna, mayo, and vegetables.",
          prepTime: 10,
          cookingTime: 0
        },
        {
          name: "Banana Oat Pancakes",
          description: "Healthy pancakes made with bananas and oats.",
          prepTime: 15,
          cookingTime: 10
        },
        {
          name: "Veggie Stir Fry",
          description: "Stir-fried vegetables served over rice.",
          prepTime: 15,
          cookingTime: 10
        },
        {
          name: "Rustic Tomato Soup",
          description: "Homemade tomato soup with fresh herbs.",
          prepTime: 15,
          cookingTime: 25
        },
        {
          name: "Texan BBQ Black Bean Burger",
          description: "Black bean burger topped with BBQ sauce.",
          prepTime: 20,
          cookingTime: 15
        }
      ]);
    }

    // Get all recipes
    const allRecipes = await db.select().from(recipes);

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
      },
      // New recipe relationships
      {
        recipeName: "Tex-Mex Breakfast Tacos",
        productNames: ["Hill Country Fare Large Eggs (dozen)", "H-E-B Flour Tortillas (20 ct)"]
      },
      {
        recipeName: "H-E-B Classic Peanut Butter Banana Sandwich",
        productNames: ["H-E-B Natural Creamy Peanut Butter (16 oz)", "H-E-B Organics Bananas (per lb)", "H-E-B 100% Whole Wheat Bread"]
      },
      {
        recipeName: "Creamy Greek Yogurt Parfait",
        productNames: ["H-E-B Natural Plain Greek Yogurt (32 oz)", "Hill Country Fare Corn Flakes Cereal (18 oz)"]
      },
      {
        recipeName: "Spicy Tuna Salad",
        productNames: ["Hill Country Fare Chunk Light Tuna in Water (5 oz)", "H-E-B Texas Sweet Onions (per lb)"]
      },
      {
        recipeName: "Banana Oat Pancakes",
        productNames: ["H-E-B Organics Bananas (per lb)", "Hill Country Fare Large Eggs (dozen)"]
      },
      {
        recipeName: "Veggie Stir Fry",
        productNames: ["Hill Country Fare Long Grain Rice (5 lb)", "H-E-B Texas Sweet Onions (per lb)"]
      },
      {
        recipeName: "Rustic Tomato Soup",
        productNames: ["H-E-B Premium Traditional Pasta (16 oz)", "H-E-B Texas Sweet Onions (per lb)"]
      },
      {
        recipeName: "Texan BBQ Black Bean Burger",
        productNames: ["H-E-B Black Beans (15 oz)", "H-E-B 100% Whole Wheat Bread"]
      }
    ];

    // Clear existing relationships to avoid duplicates
    await db.delete(recipeProducts);

    // Create the relationships
    for (const relation of recipeRelations) {
      const recipe = allRecipes.find(r => r.name === relation.recipeName);
      if (!recipe) continue;

      // Get products for this recipe
      const productsList = await db
        .select()
        .from(products)
        .where(inArray(products.name, relation.productNames));

      // Create relationships
      for (const product of productsList) {
        await db.insert(recipeProducts).values({
          recipeId: recipe.recipeId,
          productId: product.id
        });
      }
    }

    console.log("Successfully inserted recipes and relationships!");
  } catch (error) {
    console.error("Error:", error);
  }
}

insertRecipesAndRelationships();
