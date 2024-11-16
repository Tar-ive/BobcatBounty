import { useParams } from "wouter";
import useSWR from "swr";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import RecipeCard from "../components/RecipeCard";
import type { Products1, Recipe1 } from "../../db/schema";

export default function Product() {
  const { id } = useParams();
  const { data: product } = useSWR<Products1>(`/api/products/${id}`);
  const { data: recipes } = useSWR<Recipe1[]>(`/api/products/${id}/recipes`);

  if (!product) return <div>Loading...</div>;

  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>{product.name}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Badge variant="secondary">{product.brand}</Badge>
              <Badge variant="secondary">{product.category}</Badge>
            </div>
            <div className="flex gap-2">
              {product.vegan && <Badge variant="outline">Vegan</Badge>}
              {product.glutenFree && <Badge variant="outline">Gluten Free</Badge>}
            </div>
            {product.calories && (
              <p className="text-lg">Calories: {product.calories}</p>
            )}
            <div className="flex items-center gap-2">
              <span className="font-semibold">Available:</span>
              <Badge variant="default" className={product.quantity > 0 ? "bg-green-500" : "bg-red-500"}>
                {product.quantity > 0 ? "In Stock" : "Out of Stock"}
              </Badge>
            </div>
            <div className="text-sm text-muted-foreground">
              Best used within {product.expiryDays} days
            </div>
          </div>
        </CardContent>
      </Card>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Recipe Suggestions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {recipes?.map((recipe) => (
            <RecipeCard key={recipe.recipeId} recipe={recipe} />
          ))}
        </div>
      </section>
    </div>
  );
}
