import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Settings, Search, MapPin, Phone, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Logo from "@/components/Logo";

// Mock data for featured pharmacies (Real Beirut pharmacies)
const mockPharmacies = [
  {
    id: 1,
    name: "Habib Pharmacy",
    address: "Hamra Street, Hamra, Beirut",
    distance: "1.8 km",
    phone: "+961 1 340 555",
    hours: "Open until 10:00 PM",
    isOpen: true,
  },
  {
    id: 2,
    name: "Wardieh Pharmacy",
    address: "Achrafieh Main Road, Achrafieh, Beirut",
    distance: "2.4 km",
    phone: "+961 1 200 800",
    hours: "Open 24 hours",
    isOpen: true,
  },
  {
    id: 3,
    name: "Verdun Pharmacy",
    address: "Verdun Street, Verdun, Beirut",
    distance: "3.2 km",
    phone: "+961 1 803 900",
    hours: "Open until 11:00 PM",
    isOpen: true,
  },
  {
    id: 4,
    name: "Pharmacie Hamra",
    address: "Bliss Street, Hamra, Beirut",
    distance: "1.5 km",
    phone: "+961 1 350 200",
    hours: "Open until 9:00 PM",
    isOpen: true,
  },
  {
    id: 5,
    name: "Gefinor Pharmacy",
    address: "Clemenceau Street, Hamra, Beirut",
    distance: "2.1 km",
    phone: "+961 1 369 400",
    hours: "Opens at 8:00 AM",
    isOpen: false,
  },
  {
    id: 6,
    name: "ABC Achrafieh Pharmacy",
    address: "ABC Mall, Achrafieh, Beirut",
    distance: "3.8 km",
    phone: "+961 1 209 100",
    hours: "Open until 10:00 PM",
    isOpen: true,
  },
];

// Mock data for popular medicines
const mockPopularMedicines = [
  { id: 1, name: "Panadol Extra", category: "Pain Relief", avgPrice: "$12.99" },
  { id: 2, name: "Advil 200mg", category: "Pain Relief", avgPrice: "$9.50" },
  { id: 3, name: "Vitamin C 1000mg", category: "Vitamins", avgPrice: "$6.00" },
  { id: 4, name: "Aspirin 100mg", category: "Heart Health", avgPrice: "$5.99" },
];

const Index = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Logo size="small" />
            <Link to="/user-settings">
              <Button variant="outline" size="sm">
                <Settings className="mr-2 h-4 w-4" />
                Settings
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section with Search */}
      <section className="bg-gradient-to-b from-accent/30 to-background py-12 md:py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-3xl md:text-5xl font-bold mb-4 text-foreground">
              Find Your Medications Nearby
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-8">
              Search for medicines or pharmacies in your area
            </p>
            
            {/* Search Bar */}
            <form onSubmit={handleSearch} className="relative max-w-2xl mx-auto">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search for medications, pharmacies..."
                className="pl-12 pr-4 h-14 text-lg"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Button 
                type="submit" 
                className="absolute right-2 top-1/2 -translate-y-1/2"
                size="lg"
              >
                Search
              </Button>
            </form>
          </div>
        </div>
      </section>

      {/* Featured Pharmacies Section */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="mb-8">
            <h2 className="text-2xl md:text-3xl font-bold mb-2">Featured Pharmacies</h2>
            <p className="text-muted-foreground">Popular pharmacies in your area</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mockPharmacies.map((pharmacy) => (
              <Card 
                key={pharmacy.id} 
                className="hover:shadow-lg transition-shadow cursor-pointer"
                onClick={() => navigate(`/pharmacy/${pharmacy.id}`)}
              >
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <CardTitle className="text-xl">{pharmacy.name}</CardTitle>
                    <Badge variant={pharmacy.isOpen ? "secondary" : "outline"}>
                      {pharmacy.isOpen ? "Open" : "Closed"}
                    </Badge>
                  </div>
                  <CardDescription>{pharmacy.address}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="flex items-center text-sm text-muted-foreground">
                    <MapPin className="mr-2 h-4 w-4" />
                    {pharmacy.distance} away
                  </div>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Phone className="mr-2 h-4 w-4" />
                    {pharmacy.phone}
                  </div>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Clock className="mr-2 h-4 w-4" />
                    {pharmacy.hours}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Medicines Section */}
      <section className="py-12 md:py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="mb-8">
            <h2 className="text-2xl md:text-3xl font-bold mb-2">Popular Medicines</h2>
            <p className="text-muted-foreground">Commonly searched medications</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {mockPopularMedicines.map((medicine) => (
              <Card 
                key={medicine.id}
                className="hover:shadow-md transition-shadow cursor-pointer"
                onClick={() => navigate(`/search?q=${encodeURIComponent(medicine.name)}`)}
              >
                <CardHeader>
                  <CardTitle className="text-lg">{medicine.name}</CardTitle>
                  <CardDescription>{medicine.category}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-bold text-primary">
                    {medicine.avgPrice}
                  </p>
                  <p className="text-sm text-muted-foreground">Average price</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
