import { Link, useLocation } from "wouter";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuLink,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";

export default function NavBar() {
  const [location] = useLocation();

  return (
    <header className="border-b">
      <div className="container mx-auto px-4">
        <NavigationMenu>
          <NavigationMenuList className="h-16">
            <NavigationMenuItem>
              <NavigationMenuLink
                asChild
                className={cn(
                  "text-lg font-semibold hover:text-primary transition-colors",
                  location === "/" && "text-primary"
                )}
              >
                <Link href="/">Home</Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink
                asChild
                className={cn(
                  "text-lg font-semibold hover:text-primary transition-colors",
                  location === "/inventory" && "text-primary"
                )}
              >
                <Link href="/inventory">Inventory</Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>
    </header>
  );
}
