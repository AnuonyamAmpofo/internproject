import { Card, CardContent } from "@/src/components/ui/card";
import { AlertCircle } from "lucide-react";
import { useLocation } from "wouter";

export default function NotFound() {
  const [, navigate] = useLocation();

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-background">
      <Card className="w-full max-w-md mx-4 bg-[#121212] border-none">
        <CardContent className="pt-6">
          <div className="flex mb-4 gap-2">
            <AlertCircle className="h-8 w-8 text-[#FF3B30]" />
            <h1 className="text-2xl font-bold text-white">404 Page Not Found</h1>
          </div>

          <p className="mt-4 text-sm text-[#8E8E93]">
            The requested alarm page cannot be found.
          </p>
          
          <button 
            className="mt-6 w-full py-3 bg-primary text-white rounded-lg font-medium"
            onClick={() => navigate('/')}
          >
            Back to Alarms
          </button>
        </CardContent>
      </Card>
    </div>
  );
}