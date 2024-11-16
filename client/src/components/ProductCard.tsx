import { Link } from "wouter";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { Product1 } from "../../db/schema";

interface ProductCardProps {
  product: Product1;
}

export default function ProductCard({ product }: ProductCardProps) {
  if (!product) return null;

  return (
    <Card className="overflow-hidden">
      <CardContent className="p-4">
        <CardTitle className="mb-2">{product.name}</CardTitle>
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Badge variant={product.quantity > 0 ? "success" : "destructive"}>
              {product.quantity > 0 ? "In Stock" : "Out of Stock"}
            </Badge>
            <Badge variant="secondary">{product.brand}</Badge>
          </div>
          <div className="flex gap-2">
            {product.vegan && <Badge variant="outline">Vegan</Badge>}
            {product.glutenFree && <Badge variant="outline">Gluten Free</Badge>}
          </div>
          {product.calories && (
            <p className="text-sm text-muted-foreground">
              Calories: {product.calories}
            </p>
          )}
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Link href={`/product/${product.productId}`}>
          <Button className="w-full">View Details</Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
