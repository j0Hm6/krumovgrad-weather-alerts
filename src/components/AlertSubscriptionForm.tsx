
import { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Bell, Check, Loader2 } from "lucide-react";
import { subscribeToAlerts } from "@/lib/api";
import { useToast } from "@/components/ui/toast";

export function AlertSubscriptionForm() {
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [frequency, setFrequency] = useState<"daily" | "weekly">("daily");
  const [conditions, setConditions] = useState<string[]>(["extreme"]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const { toast } = useToast();

  const handleConditionToggle = (condition: string) => {
    if (conditions.includes(condition)) {
      setConditions(conditions.filter((c) => c !== condition));
    } else {
      setConditions([...conditions, condition]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) {
      toast({
        title: "Email required",
        description: "Please enter your email address",
        variant: "destructive",
      });
      return;
    }
    
    if (conditions.length === 0) {
      toast({
        title: "Select conditions",
        description: "Please select at least one weather condition",
        variant: "destructive",
      });
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      await subscribeToAlerts(email, frequency, conditions, phoneNumber || undefined);
      
      setIsSuccess(true);
      toast({
        title: "Subscription successful!",
        description: "You'll start receiving weather alerts soon",
      });
      
      // Reset form after 3 seconds
      setTimeout(() => {
        setIsSuccess(false);
        setEmail("");
        setPhoneNumber("");
        setFrequency("daily");
        setConditions(["extreme"]);
      }, 3000);
      
    } catch (error) {
      toast({
        title: "Subscription failed",
        description: "Please try again later",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="w-full">
      <CardHeader className="space-y-1">
        <div className="flex items-center justify-between">
          <CardTitle className="text-2xl">Weather Alerts</CardTitle>
          <Bell className="h-5 w-5 text-primary" />
        </div>
        <CardDescription>
          Get weather alerts for Krumovgrad delivered to your inbox
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              placeholder="your.email@example.com"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="phone" className="flex justify-between">
              <span>Phone (optional)</span>
              <span className="text-xs text-muted-foreground">For SMS alerts</span>
            </Label>
            <Input
              id="phone"
              placeholder="+359 ..."
              type="tel"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
          </div>
          
          <div className="space-y-3">
            <Label>Alert frequency</Label>
            <RadioGroup 
              defaultValue={frequency} 
              value={frequency} 
              onValueChange={(value) => setFrequency(value as "daily" | "weekly")}
              className="flex space-x-4"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="daily" id="daily" />
                <Label htmlFor="daily">Daily</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="weekly" id="weekly" />
                <Label htmlFor="weekly">Weekly</Label>
              </div>
            </RadioGroup>
          </div>
          
          <div className="space-y-3">
            <Label>Alert me about</Label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="extreme" 
                  checked={conditions.includes("extreme")} 
                  onCheckedChange={() => handleConditionToggle("extreme")}
                />
                <label
                  htmlFor="extreme"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Extreme weather
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="rain" 
                  checked={conditions.includes("rain")} 
                  onCheckedChange={() => handleConditionToggle("rain")}
                />
                <label
                  htmlFor="rain"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Rain forecast
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="temperature" 
                  checked={conditions.includes("temperature")} 
                  onCheckedChange={() => handleConditionToggle("temperature")}
                />
                <label
                  htmlFor="temperature"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Temperature changes
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="daily-summary" 
                  checked={conditions.includes("daily-summary")} 
                  onCheckedChange={() => handleConditionToggle("daily-summary")}
                />
                <label
                  htmlFor="daily-summary"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Daily summary
                </label>
              </div>
            </div>
          </div>
          
          <Button type="submit" className="w-full" disabled={isSubmitting || isSuccess}>
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Subscribing...
              </>
            ) : isSuccess ? (
              <>
                <Check className="mr-2 h-4 w-4" /> Subscribed!
              </>
            ) : (
              "Subscribe to alerts"
            )}
          </Button>
        </form>
      </CardContent>
      <CardFooter className="border-t px-6 py-4 flex justify-center">
        <p className="text-xs text-muted-foreground text-center">
          By subscribing, you agree to receive weather alerts for Krumovgrad, Bulgaria.
          You can unsubscribe at any time.
        </p>
      </CardFooter>
    </Card>
  );
}
