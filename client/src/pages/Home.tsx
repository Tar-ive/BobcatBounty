import { useState } from "react";
import useSWR from "swr";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import ProductCard from "../components/ProductCard";
import LocationMap from "../components/LocationMap";
import type { Product } from "../../db/schema";

export default function Home() {
  const [search, setSearch] = useState("");
  const { data: products } = useSWR<Product[]>("/api/products");
  const { data: location } = useSWR("/api/location");

  const filteredProducts = products?.filter(product =>
    product.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-8">
      <section className="space-y-4">
        <h1 className="text-4xl font-bold text-primary">What's in the Bounty?</h1>
        <Card>
          <CardContent className="p-6">
            <div className="flex gap-4">
              <Input 
                placeholder="Search products..." 
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="flex-1"
              />
              <Button>
                <Search className="mr-2 h-4 w-4" />
                Search
              </Button>
            </div>
          </CardContent>
        </Card>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Our Location</h2>
        <LocationMap location={location} />
      </section>
    </div>
  );
}
