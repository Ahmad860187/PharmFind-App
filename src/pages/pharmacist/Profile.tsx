import { useState } from 'react';
import PharmacistLayout from '@/components/pharmacist/PharmacistLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Building2, Phone, Mail, MapPin, Clock, FileCheck, Save } from 'lucide-react';
import { toast } from 'sonner';

const Profile = () => {
  const [profile, setProfile] = useState<{
    name: string;
    licenseNumber: string;
    phone: string;
    email: string;
    address: string;
    operatingHours: string;
    status: 'pending' | 'approved' | 'rejected';
    registeredAt: string;
  }>({
    name: 'PharmaCare Pharmacy',
    licenseNumber: 'PH-2024-12345',
    phone: '+961 1 234 567',
    email: 'contact@pharmacare.lb',
    address: 'Hamra Street, Beirut, Lebanon',
    operatingHours: 'Mon-Sat: 8:00 AM - 8:00 PM',
    status: 'approved',
    registeredAt: '2024-01-15',
  });

  const [isEditing, setIsEditing] = useState(false);

  const handleSave = () => {
    toast.success('Profile updated successfully');
    setIsEditing(false);
  };

  const getStatusBadge = () => {
    const variants = {
      pending: { label: 'Pending Review', variant: 'outline' as const },
      approved: { label: 'Approved', variant: 'default' as const },
      rejected: { label: 'Rejected', variant: 'destructive' as const },
    };
    return variants[profile.status];
  };

  const statusBadge = getStatusBadge();

  return (
    <PharmacistLayout>
      <div className="container py-8 px-4 max-w-4xl space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold tracking-tight">Pharmacy Profile</h1>
          <Badge variant={statusBadge.variant} className="text-base px-4 py-2">
            {statusBadge.label}
          </Badge>
        </div>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Basic Information</CardTitle>
              {!isEditing ? (
                <Button onClick={() => setIsEditing(true)}>
                  Edit Profile
                </Button>
              ) : (
                <div className="flex gap-2">
                  <Button variant="outline" onClick={() => setIsEditing(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleSave}>
                    <Save className="mr-2 h-4 w-4" />
                    Save Changes
                  </Button>
                </div>
              )}
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="name" className="flex items-center gap-2">
                  <Building2 className="h-4 w-4 text-muted-foreground" />
                  Pharmacy Name
                </Label>
                <Input
                  id="name"
                  value={profile.name}
                  onChange={(e) => setProfile(prev => ({ ...prev, name: e.target.value }))}
                  disabled={!isEditing}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="license" className="flex items-center gap-2">
                  <FileCheck className="h-4 w-4 text-muted-foreground" />
                  License Number
                </Label>
                <Input
                  id="license"
                  value={profile.licenseNumber}
                  disabled
                  className="bg-muted"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone" className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  Phone Number
                </Label>
                <Input
                  id="phone"
                  value={profile.phone}
                  onChange={(e) => setProfile(prev => ({ ...prev, phone: e.target.value }))}
                  disabled={!isEditing}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  Email Address
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={profile.email}
                  onChange={(e) => setProfile(prev => ({ ...prev, email: e.target.value }))}
                  disabled={!isEditing}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="address" className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-muted-foreground" />
                Address
              </Label>
              <Textarea
                id="address"
                value={profile.address}
                onChange={(e) => setProfile(prev => ({ ...prev, address: e.target.value }))}
                disabled={!isEditing}
                rows={2}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="hours" className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-muted-foreground" />
                Operating Hours
              </Label>
              <Input
                id="hours"
                value={profile.operatingHours}
                onChange={(e) => setProfile(prev => ({ ...prev, operatingHours: e.target.value }))}
                disabled={!isEditing}
              />
            </div>

            <div className="pt-4 border-t">
              <p className="text-sm text-muted-foreground">
                Registered since: {new Date(profile.registeredAt).toLocaleDateString()}
              </p>
            </div>
          </CardContent>
        </Card>

        {profile.status === 'pending' && (
          <Card className="border-orange-200 bg-orange-50/50">
            <CardContent className="pt-6">
              <div className="flex gap-3">
                <FileCheck className="h-5 w-5 text-orange-600 flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-semibold text-orange-900 mb-1">
                    Account Pending Verification
                  </h3>
                  <p className="text-sm text-orange-800">
                    Your pharmacy registration is currently under review. You'll be notified once your account is approved.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {profile.status === 'rejected' && (
          <Card className="border-destructive bg-destructive/10">
            <CardContent className="pt-6">
              <div className="flex gap-3">
                <FileCheck className="h-5 w-5 text-destructive flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-semibold text-destructive mb-1">
                    Account Rejected
                  </h3>
                  <p className="text-sm text-destructive/90">
                    Your pharmacy registration was not approved. Please contact support for more information.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </PharmacistLayout>
  );
};

export default Profile;
