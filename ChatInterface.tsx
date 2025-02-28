import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Lock } from "lucide-react";

interface ChatInterfaceProps {
  isLocked: boolean;
  remainingCredits: number;
  onSendMessage: (message: string) => void;
  onOpenPayment: () => void;
}

export default function ChatInterface({ 
  isLocked, 
  remainingCredits, 
  onSendMessage,
  onOpenPayment 
}: ChatInterfaceProps) {
  const [message, setMessage] = useState("");

  const handleSend = () => {
    if (!isLocked && message.trim()) {
      onSendMessage(message);
      setMessage("");
    }
  };

  return (
    <Card className="mt-4">
      <CardContent className="p-4 space-y-4">
        <div className="relative">
          <Textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder={
              isLocked 
                ? "ادفع الآن واستشر المصدر الأذكى للقضايا القانونية"
                : "اكتب استشارتك هنا..."
            }
            disabled={isLocked}
            className="min-h-[150px] resize-none"
          />
          
          {isLocked && (
            <div 
              className="absolute inset-0 bg-background/80 flex items-center justify-center cursor-pointer"
              onClick={onOpenPayment}
            >
              <Lock className="h-8 w-8 text-muted-foreground" />
            </div>
          )}
        </div>

        <div className="flex justify-between items-center">
          <span className={`text-sm ${remainingCredits < 500 ? 'text-destructive' : 'text-muted-foreground'}`}>
            الأحرف المتبقية: {remainingCredits}
          </span>
          <Button onClick={handleSend} disabled={isLocked || !message.trim()}>
            إرسال
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
