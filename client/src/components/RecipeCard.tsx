import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { Recipe1 } from "../../db/schema";

interface RecipeCardProps {
  recipe: Recipe1;
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
        </div>
      </CardContent>
    </Card>
  );
}
