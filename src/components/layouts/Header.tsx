import { useAuthStore } from "@/stores/auth.store";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@radix-ui/react-navigation-menu";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { navigationMenuTriggerStyle } from "../ui/navigation-menu";
import { cn } from "@/lib/utils";
import { ModeToggle } from "../mode-toggle";

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const token = useAuthStore((state) => state.accessToken);
  const clearTokens = useAuthStore((state) => state.clearTokens);

  const handleLogout = () => {
    clearTokens();
    navigate("/login", { replace: true });
  };

  return (
    <header className="border-b bg-background sticky top-0 z-50">
      <div className="max-w-4xl mx-auto flex h-16 items-center justify-between px-4">
        <Link to="/" className="text-xl font-bold tracking-tight">
          ShopApp
        </Link>

        <NavigationMenu>
          <NavigationMenuList className="flex items-center gap-2">
            {/* Home */}
            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Link
                  to="/"
                  className={cn(
                    navigationMenuTriggerStyle(),
                    location.pathname === "/" &&
                      "bg-primary/10 text-primary font-bold underline",
                  )}
                >
                  Home
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>

            {/* Login / Logout */}
            {!token ? (
              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <Link
                    to="/login"
                    className={cn(
                      navigationMenuTriggerStyle(),
                      location.pathname === "/login" &&
                        "bg-primary/10 text-primary font-bold underline",
                    )}
                  >
                    Login
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
            ) : (
              <NavigationMenuItem>
                <NavigationMenuLink
                  className={cn(
                    navigationMenuTriggerStyle(),
                    "cursor-pointer text-destructive",
                  )}
                  onClick={handleLogout}
                >
                  Logout
                </NavigationMenuLink>
              </NavigationMenuItem>
            )}
            <ModeToggle />
          </NavigationMenuList>
        </NavigationMenu>
      </div>
    </header>
  );
};

export default Header;
