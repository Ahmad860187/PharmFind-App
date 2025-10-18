import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { ArrowLeft, Settings, Save, RotateCcw } from "lucide-react";
import { Link } from "react-router-dom";
import { toast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormDescription } from "@/components/ui/form";
import { Switch } from "@/components/ui/switch";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Logo from "@/components/Logo";

const STORAGE_KEY = "pharmfind_user_settings";

const settingsSchema = z.object({
  // Medication Preferences
  allowGenericSubstitutions: z.boolean().default(true),
  notifyPriceChanges: z.boolean().default(true),
  preferredPharmacyChain: z.string().default("Any"),
  
  // Notifications
  orderStatusUpdates: z.boolean().default(true),
  promotionalOffers: z.boolean().default(false),
  medicationReminders: z.boolean().default(true),
  notificationMethod: z.string().default("All"),
  
  // Accessibility
  largeTextMode: z.boolean().default(false),
  highContrastMode: z.boolean().default(false),
  preferredLanguage: z.string().default("English"),
  
  // Privacy & Security
  sharePrescriptionHistory: z.boolean().default(false),
  enableTwoFactorAuth: z.boolean().default(false),
  keepLoggedIn: z.boolean().default(false),
  
  // Delivery Preferences
  defaultHomeDelivery: z.boolean().default(false),
  deliveryInstructions: z.string().default(""),
  preferredDeliveryTime: z.string().default("No preference"),
});

type SettingsFormValues = z.infer<typeof settingsSchema>;

const defaultValues: SettingsFormValues = {
  allowGenericSubstitutions: true,
  notifyPriceChanges: true,
  preferredPharmacyChain: "Any",
  orderStatusUpdates: true,
  promotionalOffers: false,
  medicationReminders: true,
  notificationMethod: "All",
  largeTextMode: false,
  highContrastMode: false,
  preferredLanguage: "English",
  sharePrescriptionHistory: false,
  enableTwoFactorAuth: false,
  keepLoggedIn: false,
  defaultHomeDelivery: false,
  deliveryInstructions: "",
  preferredDeliveryTime: "No preference",
};

const UserSettings = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  const form = useForm<SettingsFormValues>({
    resolver: zodResolver(settingsSchema),
    defaultValues,
  });

  // Load settings from localStorage on mount
  useEffect(() => {
    const savedSettings = localStorage.getItem(STORAGE_KEY);
    if (savedSettings) {
      try {
        const parsed = JSON.parse(savedSettings);
        form.reset(parsed);
      } catch (error) {
        console.error("Failed to load settings:", error);
      }
    }
  }, [form]);

  // Track unsaved changes
  useEffect(() => {
    const subscription = form.watch(() => {
      setHasUnsavedChanges(true);
    });
    return () => subscription.unsubscribe();
  }, [form]);

  const onSubmit = async (data: SettingsFormValues) => {
    setIsLoading(true);
    try {
      // Simulate save delay
      await new Promise(resolve => setTimeout(resolve, 500));
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
      setHasUnsavedChanges(false);
      toast({
        title: "Settings saved successfully",
        description: "Your preferences have been updated.",
      });
    } catch (error) {
      toast({
        title: "Failed to save settings",
        description: "Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    form.reset(defaultValues);
    localStorage.removeItem(STORAGE_KEY);
    setHasUnsavedChanges(false);
    toast({
      title: "Settings reset",
      description: "All preferences have been restored to defaults.",
    });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link to="/dashboard">
            <Logo size="small" />
          </Link>
          <Link to="/dashboard">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Dashboard
            </Button>
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="flex items-center gap-3 mb-6">
          <Settings className="h-8 w-8 text-primary" />
          <div>
            <h1 className="text-3xl font-bold">User Settings</h1>
            <p className="text-muted-foreground">Manage your preferences and account settings</p>
          </div>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <Tabs defaultValue="medication" className="w-full">
              <TabsList className="grid w-full grid-cols-5">
                <TabsTrigger value="medication">Medication</TabsTrigger>
                <TabsTrigger value="notifications">Notifications</TabsTrigger>
                <TabsTrigger value="accessibility">Accessibility</TabsTrigger>
                <TabsTrigger value="privacy">Privacy</TabsTrigger>
                <TabsTrigger value="delivery">Delivery</TabsTrigger>
              </TabsList>

              {/* Medication Preferences Tab */}
              <TabsContent value="medication">
                <Card>
                  <CardHeader>
                    <CardTitle>Medication Preferences</CardTitle>
                    <CardDescription>Configure your medication and pharmacy preferences</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <FormField
                      control={form.control}
                      name="allowGenericSubstitutions"
                      render={({ field }) => (
                        <FormItem className="flex items-center justify-between rounded-lg border p-4">
                          <div className="space-y-0.5">
                            <FormLabel className="text-base">Allow generic medication substitutions</FormLabel>
                            <FormDescription>
                              Pharmacies can substitute with generic alternatives to save costs
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
                      name="notifyPriceChanges"
                      render={({ field }) => (
                        <FormItem className="flex items-center justify-between rounded-lg border p-4">
                          <div className="space-y-0.5">
                            <FormLabel className="text-base">Notify me of price changes</FormLabel>
                            <FormDescription>
                              Get alerts when medication prices change significantly
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
                      name="preferredPharmacyChain"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Preferred pharmacy chain</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select a pharmacy chain" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="CVS">CVS</SelectItem>
                              <SelectItem value="Walgreens">Walgreens</SelectItem>
                              <SelectItem value="Rite Aid">Rite Aid</SelectItem>
                              <SelectItem value="Any">Any</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormDescription>
                            We'll prioritize showing results from your preferred chain
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
                      name="medicationReminders"
                      render={({ field }) => (
                        <FormItem className="flex items-center justify-between rounded-lg border p-4">
                          <div className="space-y-0.5">
                            <FormLabel className="text-base">Medication reminders</FormLabel>
                            <FormDescription>
                              Reminders to take your medication and refill prescriptions
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
                              <SelectItem value="SMS">SMS</SelectItem>
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

                    <FormField
                      control={form.control}
                      name="preferredLanguage"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Preferred language</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select a language" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="English">English</SelectItem>
                              <SelectItem value="Spanish">Spanish</SelectItem>
                              <SelectItem value="French">French</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormDescription>
                            Choose your preferred language for the interface
                          </FormDescription>
                        </FormItem>
                      )}
                    />
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Privacy & Security Tab */}
              <TabsContent value="privacy">
                <Card>
                  <CardHeader>
                    <CardTitle>Privacy & Security</CardTitle>
                    <CardDescription>Manage your privacy and security preferences</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <FormField
                      control={form.control}
                      name="sharePrescriptionHistory"
                      render={({ field }) => (
                        <FormItem className="flex items-center justify-between rounded-lg border p-4">
                          <div className="space-y-0.5">
                            <FormLabel className="text-base">Share prescription history with healthcare providers</FormLabel>
                            <FormDescription>
                              Allow your doctors to access your prescription history
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
                      name="enableTwoFactorAuth"
                      render={({ field }) => (
                        <FormItem className="flex items-center justify-between rounded-lg border p-4">
                          <div className="space-y-0.5">
                            <FormLabel className="text-base">Enable two-factor authentication</FormLabel>
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

                    <FormField
                      control={form.control}
                      name="keepLoggedIn"
                      render={({ field }) => (
                        <FormItem className="flex items-start space-x-3 space-y-0 rounded-lg border p-4">
                          <FormControl>
                            <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                          </FormControl>
                          <div className="space-y-1 leading-none">
                            <FormLabel>Keep me logged in on this device</FormLabel>
                            <FormDescription>
                              Stay signed in for faster access (not recommended on shared devices)
                            </FormDescription>
                          </div>
                        </FormItem>
                      )}
                    />
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
            </Tabs>

            {/* Action Buttons */}
            <Card>
              <CardContent className="pt-6">
                <div className="flex flex-col sm:flex-row gap-4 justify-between items-center">
                  <div className="text-sm text-muted-foreground">
                    {hasUnsavedChanges && (
                      <span className="text-amber-500">• You have unsaved changes</span>
                    )}
                  </div>
                  <div className="flex gap-3 w-full sm:w-auto">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={handleReset}
                      disabled={isLoading}
                      className="flex-1 sm:flex-none"
                    >
                      <RotateCcw className="mr-2 h-4 w-4" />
                      Reset to Defaults
                    </Button>
                    <Button type="submit" disabled={isLoading} className="flex-1 sm:flex-none">
                      <Save className="mr-2 h-4 w-4" />
                      {isLoading ? "Saving..." : "Save Changes"}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </form>
        </Form>
      </main>
    </div>
  );
};

export default UserSettings;
