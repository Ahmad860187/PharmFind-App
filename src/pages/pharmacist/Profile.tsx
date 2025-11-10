import PharmacistLayout from '@/components/pharmacist/PharmacistLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const Profile = () => {
  return (
    <PharmacistLayout>
      <div className="container py-8 px-4">
        <h1 className="text-3xl font-bold tracking-tight mb-6">Pharmacy Profile</h1>
        <Card>
          <CardHeader>
            <CardTitle>Coming Soon</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Profile management features will be implemented in Week 3
            </p>
          </CardContent>
        </Card>
      </div>
    </PharmacistLayout>
  );
};

export default Profile;
