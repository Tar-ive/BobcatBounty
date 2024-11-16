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
import type { Product, Recipe } from "../../db/schema";

export default function Product() {
  const { id } = useParams();
  const { data: product } = useSWR<Product>(`/api/products/${id}`);
  const { data: recipes } = useSWR<Recipe[]>(`/api/products/${id}/recipes`);

  if (!product) return <div>Loading...</div>;

  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>{product.name}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <img
              src={product.imageUrl}
              alt={product.name}
              className="w-full h-64 object-cover rounded-lg"
            />
            <p className="text-lg">{product.description}</p>
            <div className="flex gap-2">
              {(product.dietary as string[]).map((tag) => (
                <Badge key={tag} variant="secondary">{tag}</Badge>
              ))}
            </div>
            <div className="flex items-center gap-2">
              <span className="font-semibold">Available:</span>
              <Badge variant={product.quantity > 0 ? "success" : "destructive"}>
                {product.quantity > 0 ? "In Stock" : "Out of Stock"}
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Recipe Suggestions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {recipes?.map((recipe) => (
            <RecipeCard key={recipe.id} recipe={recipe} />
          ))}
        </div>
      </section>
    </div>
  );
}
