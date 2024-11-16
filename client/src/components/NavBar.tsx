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
              <Link href="/">
                <NavigationMenuLink
                  className={cn(
                    "text-lg font-semibold hover:text-primary transition-colors",
                    location === "/" && "text-primary"
                  )}
                >
                  Home
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link href="/inventory">
                <NavigationMenuLink
                  className={cn(
                    "text-lg font-semibold hover:text-primary transition-colors",
                    location === "/inventory" && "text-primary"
                  )}
                >
                  Inventory
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>
    </header>
  );
}
