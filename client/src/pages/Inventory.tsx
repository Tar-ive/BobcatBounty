import useSWR from "swr";
import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import type { Product } from "../../db/schema";

export default function Inventory() {
  const { data: products, mutate } = useSWR<Product[]>("/api/products");
  const [filter, setFilter] = useState("");

  const filteredProducts = products?.filter(product =>
    product.name.toLowerCase().includes(filter.toLowerCase())
  );

  const updateQuantity = async (id: number, change: number) => {
    await fetch(`/api/products/${id}/quantity`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ change }),
    });
    mutate();
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Inventory Management</h1>
        <Input
          placeholder="Filter products..."
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="max-w-sm"
        />
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Product</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Quantity</TableHead>
            <TableHead>Dietary Info</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredProducts?.map((product) => (
            <TableRow key={product.id}>
              <TableCell>{product.name}</TableCell>
              <TableCell>{product.category}</TableCell>
              <TableCell>{product.quantity}</TableCell>
              <TableCell>
                <div className="flex gap-2">
                  {(product.dietary as string[]).map((tag) => (
                    <Badge key={tag} variant="outline">{tag}</Badge>
                  ))}
                </div>
              </TableCell>
              <TableCell>
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => updateQuantity(product.id, -1)}
                    disabled={product.quantity <= 0}
                  >
                    -
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => updateQuantity(product.id, 1)}
                  >
                    +
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
