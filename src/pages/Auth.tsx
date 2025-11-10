import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Checkbox } from "@/components/ui/checkbox";
import { Pill, Heart, ShieldCheck } from "lucide-react";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import Logo from "@/components/Logo";
import { AuthService } from "@/services/auth.service";
import { useRole, UserRole } from "@/contexts/RoleContext";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

const Auth = () => {
  const { setRole } = useRole();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [loginMethod, setLoginMethod] = useState<'email' | 'phone'>('email');
  const [error, setError] = useState<string | null>(null);
  const [selectedRole, setSelectedRole] = useState<UserRole>('patient');

  const handleSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    const form = e.currentTarget;
    const formData = new FormData(form);
    
    const firstName = formData.get('signup-firstname') as string;
    const lastName = formData.get('signup-lastname') as string;
    const email = formData.get('signup-email') as string;
    const phone = formData.get('signup-phone') as string;
    const password = formData.get('signup-password') as string;

    try {
      const response = await AuthService.register({
        email,
        password,
        fullName: `${firstName} ${lastName}`,
        phone,
      });
      
      if ((response as any).message) {
        toast.success((response as any).message);
      } else {
        toast.success("Account created successfully! Please check your email to verify your account.");
      }
      
      setRole(selectedRole);
      const redirectPath = selectedRole === 'pharmacist' ? '/pharmacist/dashboard' : '/dashboard';
      navigate(redirectPath);
    } catch (error: any) {
      const errorMessage = error?.error?.message || error?.message || "Failed to create account";
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    const form = e.currentTarget;
    const formData = new FormData(form);
    
    const email = loginMethod === 'email' ? formData.get('login-email') as string : undefined;
    const phone = loginMethod === 'phone' ? formData.get('login-phone') as string : undefined;
    const password = formData.get('login-password') as string;

    try {
      await AuthService.login({
        email,
        phone,
        password,
      });
      
      setRole(selectedRole);
      toast.success("Logged in successfully!");
      const redirectPath = selectedRole === 'pharmacist' ? '/pharmacist/dashboard' : '/dashboard';
      navigate(redirectPath);
    } catch (error: any) {
      const errorMessage = error?.error?.message || error?.message || "Invalid credentials";
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-accent/30 to-background p-4 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-secondary/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      
      <div className="w-full max-w-6xl grid lg:grid-cols-2 gap-8 items-center relative z-10">
        {/* Left side - Branding */}
        <div className="hidden lg:flex flex-col justify-center space-y-8 px-8">
          <div className="space-y-4">
            <Logo />
            <p className="text-xl text-muted-foreground">
              Your trusted medicine finder & delivery service in Lebanon
            </p>
          </div>

          <div className="space-y-6">
            <div className="flex items-start gap-4 p-4 rounded-xl bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/20 hover:border-primary/40 transition-colors">
              <div className="p-2 bg-primary/20 rounded-lg mt-1 shadow-sm">
                <ShieldCheck className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-1">Real-time Availability</h3>
                <p className="text-muted-foreground">
                  Check medicine stock across pharmacies instantly
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 rounded-xl bg-gradient-to-br from-secondary/10 to-secondary/5 border border-secondary/20 hover:border-secondary/40 transition-colors">
              <div className="p-2 bg-secondary/20 rounded-lg mt-1 shadow-sm">
                <Heart className="w-6 h-6 text-secondary" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-1">Convenient Delivery</h3>
                <p className="text-muted-foreground">
                  Get your medicines delivered right to your doorstep
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 rounded-xl bg-gradient-to-br from-accent/20 to-accent/10 border border-accent/30 hover:border-accent/50 transition-colors">
              <div className="p-2 bg-accent/30 rounded-lg mt-1 shadow-sm">
                <Pill className="w-6 h-6 text-accent-foreground" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-1">Save Time & Effort</h3>
                <p className="text-muted-foreground">
                  No more calling multiple pharmacies or wasting time
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right side - Auth Forms */}
        <div className="w-full max-w-md mx-auto">
          <Tabs defaultValue="login" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-8">
              <TabsTrigger value="login">Login</TabsTrigger>
              <TabsTrigger value="signup">Sign Up</TabsTrigger>
            </TabsList>

            {/* Login Form */}
            <TabsContent value="login">
              <Card className="border-2 shadow-xl">
                <CardHeader>
                  <CardTitle className="text-2xl">Welcome back!</CardTitle>
                  <CardDescription>
                    Enter your credentials to access your account
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleLogin} className="space-y-4">
                    {error && (
                      <div className="p-3 text-sm text-red-600 bg-red-50 border border-red-200 rounded">
                        {error}
                      </div>
                    )}
                    <div className="space-y-2">
                      <Label>I am a</Label>
                      <RadioGroup value={selectedRole} onValueChange={(value) => setSelectedRole(value as UserRole)}>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="patient" id="login-patient" />
                          <Label htmlFor="login-patient" className="font-normal cursor-pointer">Patient</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="pharmacist" id="login-pharmacist" />
                          <Label htmlFor="login-pharmacist" className="font-normal cursor-pointer">Pharmacist</Label>
                        </div>
                      </RadioGroup>
                    </div>
                    <div className="space-y-2">
                      <Label>Login with</Label>
                      <div className="flex gap-2">
                        <Button
                          type="button"
                          variant={loginMethod === 'email' ? 'default' : 'outline'}
                          size="sm"
                          className="flex-1"
                          onClick={() => setLoginMethod('email')}
                        >
                          Email
                        </Button>
                        <Button
                          type="button"
                          variant={loginMethod === 'phone' ? 'default' : 'outline'}
                          size="sm"
                          className="flex-1"
                          onClick={() => setLoginMethod('phone')}
                        >
                          Phone
                        </Button>
                      </div>
                    </div>
                    {loginMethod === 'email' ? (
                      <div className="space-y-2">
                        <Label htmlFor="login-email">Email</Label>
                        <Input
                          id="login-email"
                          name="login-email"
                          type="email"
                          placeholder="you@example.com"
                          required
                        />
                      </div>
                    ) : (
                      <div className="space-y-2">
                        <Label htmlFor="login-phone">Phone Number</Label>
                        <Input
                          id="login-phone"
                          name="login-phone"
                          type="tel"
                          placeholder="+961 70 123 456"
                          required
                        />
                      </div>
                    )}
                    <div className="space-y-2">
                      <Label htmlFor="login-password">Password</Label>
                      <Input
                        id="login-password"
                        name="login-password"
                        type="password"
                        placeholder="••••••••"
                        required
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <Link to="/forgot-password">
                        <Button variant="link" className="px-0 text-sm">
                          Forgot password?
                        </Button>
                      </Link>
                    </div>
                    <Button
                      type="submit"
                      className="w-full shadow-lg hover:shadow-xl transition-shadow"
                      disabled={isLoading}
                    >
                      {isLoading ? "Logging in..." : "Login"}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Sign Up Form */}
            <TabsContent value="signup">
              <Card className="border-2 shadow-xl">
                <CardHeader>
                  <CardTitle className="text-2xl">Create an account</CardTitle>
                  <CardDescription>
                    Join the PharmFind community!
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSignUp} className="space-y-4">
                    {error && (
                      <div className="p-3 text-sm text-red-600 bg-red-50 border border-red-200 rounded">
                        {error}
                      </div>
                    )}
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="signup-firstname">First Name</Label>
                        <Input
                          id="signup-firstname"
                          name="signup-firstname"
                          type="text"
                          placeholder="John"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="signup-lastname">Last Name</Label>
                        <Input
                          id="signup-lastname"
                          name="signup-lastname"
                          type="text"
                          placeholder="Doe"
                          required
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="signup-email">Email</Label>
                      <Input
                        id="signup-email"
                        name="signup-email"
                        type="email"
                        placeholder="you@example.com"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="signup-phone">Phone Number</Label>
                      <Input
                        id="signup-phone"
                        name="signup-phone"
                        type="tel"
                        placeholder="+961 70 123 456"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>I am a</Label>
                      <RadioGroup value={selectedRole} onValueChange={(value) => setSelectedRole(value as UserRole)}>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="patient" id="signup-patient" />
                          <Label htmlFor="signup-patient" className="font-normal cursor-pointer">Patient</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="pharmacist" id="signup-pharmacist" />
                          <Label htmlFor="signup-pharmacist" className="font-normal cursor-pointer">Pharmacist</Label>
                        </div>
                      </RadioGroup>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="signup-password">Password</Label>
                      <Input
                        id="signup-password"
                        name="signup-password"
                        type="password"
                        placeholder="••••••••"
                        required
                      />
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="terms" required />
                      <label
                        htmlFor="terms"
                        className="text-sm text-muted-foreground leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        I agree to the terms and conditions
                      </label>
                    </div>
                    <Button
                      type="submit"
                      className="w-full shadow-lg hover:shadow-xl transition-shadow"
                      disabled={isLoading}
                    >
                      {isLoading ? "Creating account..." : "Sign Up"}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          {/* Mobile branding */}
          <div className="lg:hidden mt-8 flex justify-center">
            <Logo size="small" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
