import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { ArrowLeft, CheckCircle, XCircle, FileText, Phone, MapPin, Clock } from 'lucide-react';
import PharmacistLayout from '@/components/pharmacist/PharmacistLayout';
import { mockPharmacistOrders } from '@/data/mock/pharmacist.mock';
import { toast } from 'sonner';

const OrderReview = () => {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const [rejectionReason, setRejectionReason] = useState('');

  const order = mockPharmacistOrders.find(o => o.id === orderId);

  if (!order) {
    return (
      <PharmacistLayout>
        <div className="container py-8 px-4">
          <Card>
            <CardContent className="py-12 text-center">
              <p className="text-muted-foreground">Order not found</p>
              <Button className="mt-4" onClick={() => navigate('/pharmacist/orders')}>
                Back to Orders
              </Button>
            </CardContent>
          </Card>
        </div>
      </PharmacistLayout>
    );
  }

  const handleAccept = () => {
    toast.success('Order accepted successfully');
    navigate('/pharmacist/orders');
  };

  const handleReject = () => {
    if (!rejectionReason.trim()) {
      toast.error('Please provide a reason for rejection');
      return;
    }
    toast.success('Order rejected');
    navigate('/pharmacist/orders');
  };

  return (
    <PharmacistLayout>
      <div className="container py-8 px-4 max-w-4xl space-y-6">
        <Button
          variant="ghost"
          onClick={() => navigate('/pharmacist/orders')}
          className="mb-4"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Orders
        </Button>

        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">{order.orderNumber}</h1>
            <div className="flex items-center gap-2 text-sm text-muted-foreground mt-2">
              <Clock className="h-4 w-4" />
              {new Date(order.createdAt).toLocaleString()}
            </div>
          </div>
          <Badge className="text-base px-4 py-2">
            {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
          </Badge>
        </div>

        {/* Patient Information */}
        <Card>
          <CardHeader>
            <CardTitle>Patient Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center gap-3">
              <Phone className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="text-sm text-muted-foreground">Contact</p>
                <p className="font-medium">{order.patientName}</p>
                <p className="text-sm">{order.patientPhone}</p>
              </div>
            </div>
            <div className="flex items-start gap-3 pt-3 border-t">
              <MapPin className="h-5 w-5 text-muted-foreground mt-0.5" />
              <div>
                <p className="text-sm text-muted-foreground">Delivery Address</p>
                <p className="font-medium">{order.deliveryAddress}</p>
              </div>
            </div>
            {order.notes && (
              <div className="pt-3 border-t">
                <p className="text-sm text-muted-foreground mb-1">Special Notes</p>
                <p className="text-sm bg-muted p-3 rounded">{order.notes}</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Order Items */}
        <Card>
          <CardHeader>
            <CardTitle>Order Items</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {order.items.map((item, idx) => (
                <div key={idx} className="flex justify-between items-start p-4 border rounded-lg">
                  <div className="space-y-1 flex-1">
                    <div className="flex items-center gap-2">
                      <p className="font-medium">{item.medicineName}</p>
                      {item.requiresPrescription && (
                        <Badge variant="outline" className="text-primary border-primary">
                          <FileText className="h-3 w-3 mr-1" />
                          Rx Required
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground">Quantity: {item.quantity}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">{(item.price * item.quantity).toLocaleString()} LBP</p>
                    <p className="text-sm text-muted-foreground">{item.price.toLocaleString()} LBP each</p>
                  </div>
                </div>
              ))}
              <div className="flex justify-between text-lg font-semibold pt-4 border-t">
                <span>Total Amount</span>
                <span>{order.totalAmount.toLocaleString()} LBP</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Prescription */}
        {order.prescriptionRequired && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Prescription Review
              </CardTitle>
            </CardHeader>
            <CardContent>
              {order.prescriptionUrl ? (
                <div className="space-y-4">
                  <div className="border rounded-lg overflow-hidden">
                    <img
                      src={order.prescriptionUrl}
                      alt="Prescription"
                      className="w-full h-auto"
                      onError={(e) => {
                        e.currentTarget.src = '/placeholder.svg';
                      }}
                    />
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Please verify the prescription is valid and matches the ordered items
                  </p>
                </div>
              ) : (
                <p className="text-sm text-muted-foreground">No prescription uploaded</p>
              )}
            </CardContent>
          </Card>
        )}

        {/* Actions */}
        {order.status === 'pending' || order.status === 'reviewing' ? (
          <Card>
            <CardHeader>
              <CardTitle>Order Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <Button
                  size="lg"
                  className="w-full"
                  onClick={handleAccept}
                >
                  <CheckCircle className="mr-2 h-5 w-5" />
                  Accept Order
                </Button>
                <Button
                  size="lg"
                  variant="destructive"
                  className="w-full"
                  onClick={handleReject}
                >
                  <XCircle className="mr-2 h-5 w-5" />
                  Reject Order
                </Button>
              </div>

              <div className="space-y-2">
                <Label htmlFor="rejection-reason">Rejection Reason (if applicable)</Label>
                <Textarea
                  id="rejection-reason"
                  placeholder="Provide a reason for rejecting this order..."
                  value={rejectionReason}
                  onChange={(e) => setRejectionReason(e.target.value)}
                  rows={3}
                />
              </div>
            </CardContent>
          </Card>
        ) : (
          <Card>
            <CardContent className="py-8 text-center text-muted-foreground">
              This order has been {order.status}
            </CardContent>
          </Card>
        )}
      </div>
    </PharmacistLayout>
  );
};

export default OrderReview;
