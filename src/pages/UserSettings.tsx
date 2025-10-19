import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { ArrowLeft, Settings, LogOut } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormDescription } from "@/components/ui/form";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Logo from "@/components/Logo";

const settingsSchema = z.object({
  // Account Info
  fullName: z.string().default(""),
  email: z.string().email().default(""),
  phoneNumber: z.string().default(""),
  currentPassword: z.string().default(""),
  newPassword: z.string().default(""),
  confirmPassword: z.string().default(""),
  twoFactorAuth: z.boolean().default(false),
  
  // Notifications
  orderStatusUpdates: z.boolean().default(true),
  promotionalOffers: z.boolean().default(true),
  notificationMethod: z.string().default("All"),
  
  // Accessibility
  largeTextMode: z.boolean().default(false),
  highContrastMode: z.boolean().default(false),
  
  // Delivery Preferences
  defaultHomeDelivery: z.boolean().default(false),
  deliveryInstructions: z.string().default(""),
  preferredDeliveryTime: z.string().default("No preference"),
});

type SettingsFormValues = z.infer<typeof settingsSchema>;

const defaultValues: SettingsFormValues = {
  fullName: "",
  email: "",
  phoneNumber: "",
  currentPassword: "",
  newPassword: "",
  confirmPassword: "",
  twoFactorAuth: false,
  orderStatusUpdates: true,
  promotionalOffers: true,
  notificationMethod: "All",
  largeTextMode: false,
  highContrastMode: false,
  defaultHomeDelivery: false,
  deliveryInstructions: "",
  preferredDeliveryTime: "No preference",
};

const UserSettings = () => {
  const form = useForm<SettingsFormValues>({
    resolver: zodResolver(settingsSchema),
    defaultValues,
  });

  // Watch accessibility settings and apply visual changes
  const largeTextMode = form.watch("largeTextMode");
  const highContrastMode = form.watch("highContrastMode");

  useEffect(() => {
    if (largeTextMode) {
      document.documentElement.classList.add("large-text-mode");
    } else {
      document.documentElement.classList.remove("large-text-mode");
    }
  }, [largeTextMode]);

  useEffect(() => {
    if (highContrastMode) {
      document.documentElement.classList.add("high-contrast-mode");
    } else {
      document.documentElement.classList.remove("high-contrast-mode");
    }
  }, [highContrastMode]);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link to="/dashboard">
            <Logo size="small" />
          </Link>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </Button>
            <Link to="/dashboard">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Dashboard
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="flex items-center gap-3 mb-6">
          <Settings className="h-8 w-8 text-primary" />
          <div>
            <h1 className="text-3xl font-bold">Settings</h1>
            <p className="text-muted-foreground">Manage your account and preferences</p>
          </div>
        </div>

        <Form {...form}>
          <div className="space-y-6">
            <Tabs defaultValue="account" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="account">Account Info</TabsTrigger>
                <TabsTrigger value="delivery">Delivery</TabsTrigger>
                <TabsTrigger value="notifications">Notifications</TabsTrigger>
                <TabsTrigger value="accessibility">Accessibility</TabsTrigger>
              </TabsList>

              {/* Account Info Tab */}
              <TabsContent value="account">
                <Card>
                  <CardHeader>
                    <CardTitle>Account Information</CardTitle>
                    <CardDescription>Manage your personal details and security settings</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <FormField
                      control={form.control}
                      name="fullName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Full name</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email address</FormLabel>
                          <FormControl>
                            <Input type="email" {...field} />
                          </FormControl>
                          <FormDescription>
                            This email is used for login and notifications
                          </FormDescription>
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="phoneNumber"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Phone number</FormLabel>
                          <FormControl>
                            <Input type="tel" {...field} />
                          </FormControl>
                          <FormDescription>
                            For order updates and delivery notifications
                          </FormDescription>
                        </FormItem>
                      )}
                    />

                    <div className="space-y-4">
                      <FormLabel>Change Password</FormLabel>
                      <FormField
                        control={form.control}
                        name="currentPassword"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <Input type="password" placeholder="Enter current password" {...field} />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="newPassword"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <Input type="password" placeholder="Enter new password" {...field} />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="confirmPassword"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <Input type="password" placeholder="Confirm new password" {...field} />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={form.control}
                      name="twoFactorAuth"
                      render={({ field }) => (
                        <FormItem className="flex items-center justify-between rounded-lg border p-4">
                          <div className="space-y-0.5">
                            <FormLabel className="text-base">Enable Two-Factor Authentication (2FA)</FormLabel>
                            <FormDescription>
                              Add an extra layer of security to your account
                            </FormDescription>
                          </div>
                          <FormControl>
                            <Switch checked={field.value} onCheckedChange={field.onChange} />
                          </FormControl>
                        </FormItem>
                      )}
                    />

                    <div className="pt-4">
                      <Button variant="destructive">Delete Account</Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Delivery Preferences Tab */}
              <TabsContent value="delivery">
                <Card>
                  <CardHeader>
                    <CardTitle>Delivery Preferences</CardTitle>
                    <CardDescription>Set your delivery options and instructions</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <FormField
                      control={form.control}
                      name="defaultHomeDelivery"
                      render={({ field }) => (
                        <FormItem className="flex items-center justify-between rounded-lg border p-4">
                          <div className="space-y-0.5">
                            <FormLabel className="text-base">Default to home delivery</FormLabel>
                            <FormDescription>
                              Automatically select home delivery for all orders
                            </FormDescription>
                          </div>
                          <FormControl>
                            <Switch checked={field.value} onCheckedChange={field.onChange} />
                          </FormControl>
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="deliveryInstructions"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Delivery instructions</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="E.g., Leave at front door, ring doorbell twice..."
                              className="resize-none"
                              {...field}
                            />
                          </FormControl>
                          <FormDescription>
                            Special instructions for delivery personnel
                          </FormDescription>
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="preferredDeliveryTime"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Preferred delivery time</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select preferred time" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="Morning">Morning (8AM - 12PM)</SelectItem>
                              <SelectItem value="Afternoon">Afternoon (12PM - 5PM)</SelectItem>
                              <SelectItem value="Evening">Evening (5PM - 9PM)</SelectItem>
                              <SelectItem value="No preference">No preference</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormDescription>
                            We'll try to deliver during your preferred time window
                          </FormDescription>
                        </FormItem>
                      )}
                    />
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Notifications Tab */}
              <TabsContent value="notifications">
                <Card>
                  <CardHeader>
                    <CardTitle>Notification Settings</CardTitle>
                    <CardDescription>Choose what notifications you want to receive</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <FormField
                      control={form.control}
                      name="orderStatusUpdates"
                      render={({ field }) => (
                        <FormItem className="flex items-center justify-between rounded-lg border p-4">
                          <div className="space-y-0.5">
                            <FormLabel className="text-base">Order status updates</FormLabel>
                            <FormDescription>
                              Receive notifications about your order status
                            </FormDescription>
                          </div>
                          <FormControl>
                            <Switch checked={field.value} onCheckedChange={field.onChange} />
                          </FormControl>
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="promotionalOffers"
                      render={({ field }) => (
                        <FormItem className="flex items-center justify-between rounded-lg border p-4">
                          <div className="space-y-0.5">
                            <FormLabel className="text-base">Promotional offers</FormLabel>
                            <FormDescription>
                              Get notified about special deals and discounts
                            </FormDescription>
                          </div>
                          <FormControl>
                            <Switch checked={field.value} onCheckedChange={field.onChange} />
                          </FormControl>
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="notificationMethod"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Notification method</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select notification method" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="Email">Email</SelectItem>
                              <SelectItem value="Push">Push</SelectItem>
                              <SelectItem value="All">All</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormDescription>
                            Choose how you'd like to receive notifications
                          </FormDescription>
                        </FormItem>
                      )}
                    />
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Accessibility Tab */}
              <TabsContent value="accessibility">
                <Card>
                  <CardHeader>
                    <CardTitle>Accessibility Settings</CardTitle>
                    <CardDescription>Customize the interface to your needs</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <FormField
                      control={form.control}
                      name="largeTextMode"
                      render={({ field }) => (
                        <FormItem className="flex items-center justify-between rounded-lg border p-4">
                          <div className="space-y-0.5">
                            <FormLabel className="text-base">Large text mode</FormLabel>
                            <FormDescription>
                              Increase font size for better readability
                            </FormDescription>
                          </div>
                          <FormControl>
                            <Switch checked={field.value} onCheckedChange={field.onChange} />
                          </FormControl>
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="highContrastMode"
                      render={({ field }) => (
                        <FormItem className="flex items-center justify-between rounded-lg border p-4">
                          <div className="space-y-0.5">
                            <FormLabel className="text-base">High contrast mode</FormLabel>
                            <FormDescription>
                              Enhance color contrast for better visibility
                            </FormDescription>
                          </div>
                          <FormControl>
                            <Switch checked={field.value} onCheckedChange={field.onChange} />
                          </FormControl>
                        </FormItem>
                      )}
                    />

                  </CardContent>
                </Card>
              </TabsContent>

            </Tabs>
          </div>
        </Form>
      </main>
    </div>
  );
};

export default UserSettings;
