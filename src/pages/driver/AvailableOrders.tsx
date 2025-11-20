import { useState } from "react";
import { useNavigate } from "react-router-dom";
import DriverLayout from "@/components/driver/DriverLayout";
import DeliveryOrderCard from "@/components/driver/DeliveryOrderCard";
import { DriverService } from "@/services/driver.service";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search } from "lucide-react";
import { toast } from "sonner";

const AvailableOrders = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [filterArea, setFilterArea] = useState<string>("all");
  
  const availableOrders = DriverService.getAvailableOrders();

  const filteredOrders = availableOrders.filter(order => {
    const matchesSearch = 
      order.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.deliveryAddress.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesArea = filterArea === "all" || 
      order.deliveryAddress.toLowerCase().includes(filterArea.toLowerCase());

    return matchesSearch && matchesArea;
  });

  const handleAcceptOrder = (orderId: string) => {
    DriverService.acceptDelivery(orderId);
    toast.success("Order accepted! Starting delivery...");
    navigate("/driver/active");
  };

  return (
    <DriverLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Available Deliveries</h1>
          <p className="text-muted-foreground">Accept an order to start delivering</p>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by customer or address..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={filterArea} onValueChange={setFilterArea}>
            <SelectTrigger className="w-full sm:w-[200px]">
              <SelectValue placeholder="Filter by area" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Areas</SelectItem>
              <SelectItem value="beirut">Beirut</SelectItem>
              <SelectItem value="hamra">Hamra</SelectItem>
              <SelectItem value="achrafieh">Achrafieh</SelectItem>
              <SelectItem value="jounieh">Jounieh</SelectItem>
              <SelectItem value="verdun">Verdun</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Orders Grid */}
        {filteredOrders.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-lg text-muted-foreground">
              {availableOrders.length === 0 
                ? "No available orders at the moment. Check back soon!"
                : "No orders match your search criteria."
              }
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredOrders.map((order) => (
              <DeliveryOrderCard
                key={order.id}
                order={order}
                showAcceptButton
                onAccept={handleAcceptOrder}
              />
            ))}
          </div>
        )}
      </div>
    </DriverLayout>
  );
};

export default AvailableOrders;
