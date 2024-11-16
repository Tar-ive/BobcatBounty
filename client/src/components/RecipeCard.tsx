import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { Recipe } from "../../../db/schema";

interface RecipeCardProps {
  recipe: Recipe;
}

export default function RecipeCard({ recipe }: RecipeCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex justify-between items-center">
          <span>{recipe.name}</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <p className="text-gray-600">{recipe.description}</p>
          
          <div className="flex gap-4 text-sm text-gray-600">
            {recipe.prepTime && (
              <div>
                <span className="font-semibold">Prep Time:</span> {recipe.prepTime} mins
              </div>
            )}
            {recipe.cookingTime && (
              <div>
                <span className="font-semibold">Cooking Time:</span> {recipe.cookingTime} mins
              </div>
            )}
          </div>

          {recipe.ingredients && recipe.ingredients.length > 0 && (
            <div>
              <h4 className="font-semibold mb-2">Ingredients:</h4>
              <ul className="list-disc pl-5">
                {recipe.ingredients.map((ingredient, idx) => (
                  <li key={idx}>{ingredient}</li>
                ))}
              </ul>
            </div>
          )}

          {recipe.dietaryTags && recipe.dietaryTags.length > 0 && (
            <div className="flex gap-2 flex-wrap">
              {recipe.dietaryTags.map((tag, idx) => (
                <Badge key={idx} variant="secondary">{tag}</Badge>
              ))}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
