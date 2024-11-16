import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { Recipe } from "../../db/schema";

interface RecipeCardProps {
  recipe: Recipe;
}

export default function RecipeCard({ recipe }: RecipeCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex justify-between items-center">
          <span>{recipe.name}</span>
          <div className="flex gap-2">
            {(recipe.dietaryTags as string[]).map((tag) => (
              <Badge key={tag} variant="outline">{tag}</Badge>
            ))}
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <h4 className="font-semibold mb-2">Ingredients:</h4>
            <ul className="list-disc list-inside">
              {(recipe.ingredients as string[]).map((ingredient, index) => (
                <li key={index}>{ingredient}</li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-2">Instructions:</h4>
            <ol className="list-decimal list-inside">
              {(recipe.instructions as string[]).map((step, index) => (
                <li key={index}>{step}</li>
              ))}
            </ol>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
