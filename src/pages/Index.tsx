import { Link } from "react-router-dom";
import { Settings, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Logo from "@/components/Logo";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-card/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4 relative">
          <div className="flex items-center justify-between">
            <Logo size="small" />
            <Link to="/user-settings">
              <Button variant="outline" size="sm">
                <Settings className="mr-2 h-4 w-4" />
                Settings
              </Button>
            </Link>
          </div>
          
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md px-4 hidden sm:block">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search medications, pharmacies..."
                className="pl-10"
              />
            </div>
          </div>
        </div>
      </header>
      
      <div className="flex min-h-[calc(100vh-80px)] items-center justify-center">
        <div className="text-center">
          <h1 className="mb-4 text-4xl font-bold">Welcome to PharmFind</h1>
          <p className="text-xl text-muted-foreground">Your User Dashboard</p>
        </div>
      </div>
    </div>
  );
};

export default Index;
