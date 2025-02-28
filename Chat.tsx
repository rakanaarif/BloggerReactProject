import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import ChatInterface from "@/components/ChatInterface";
import PaymentDialog from "@/components/PaymentDialog";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export default function Chat() {
  const [credits, setCredits] = useState(0);
  const [showPayment, setShowPayment] = useState(false);
  const { toast } = useToast();

  const handleSendMessage = (message: string) => {
    const charCount = message.length;
    if (charCount <= credits) {
      setCredits(prev => prev - charCount);
      toast({
        title: "تم إرسال الاستشارة",
        description: "سيتم الرد عليك قريباً"
      });
    }
  };

  const handlePaymentComplete = () => {
    setCredits(prev => prev + 1000);
    toast({
      title: "تم الدفع بنجاح",
      description: "تم إضافة 1000 حرف إلى رصيدك"
    });
  };

  return (
    <div className="max-w-3xl mx-auto">
      <Card className="mb-4">
        <CardHeader>
          <CardTitle>استشارة قانونية عاجلة</CardTitle>
        </CardHeader>
        <CardContent>
          <p>استشر خبراءنا القانونيين وأحصل على إجابات دقيقة وسريعة</p>
        </CardContent>
      </Card>

      <ChatInterface
        isLocked={credits === 0}
        remainingCredits={credits}
        onSendMessage={handleSendMessage}
        onOpenPayment={() => setShowPayment(true)}
      />

      <PaymentDialog
        open={showPayment}
        onClose={() => setShowPayment(false)}
        onPaymentComplete={handlePaymentComplete}
      />
    </div>
  );
}
