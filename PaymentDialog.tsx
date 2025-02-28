import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

interface PaymentDialogProps {
  open: boolean;
  onClose: () => void;
  onPaymentComplete: () => void;
  type: 'urgent' | 'subscription';
}

const urgentSchema = z.object({
  mobile: z.string().min(10, "رقم الجوال غير صحيح"),
});

const subscriptionSchema = z.object({
  name: z.string().min(3, "الاسم مطلوب"),
  mobile: z.string().min(10, "رقم الجوال غير صحيح"),
  email: z.string().email("البريد الإلكتروني غير صحيح"),
});

type UrgentFormData = z.infer<typeof urgentSchema>;
type SubscriptionFormData = z.infer<typeof subscriptionSchema>;

export default function PaymentDialog({
  open,
  onClose,
  onPaymentComplete,
  type
}: PaymentDialogProps) {
  const [processing, setProcessing] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState<string | null>(null);

  const urgentForm = useForm<UrgentFormData>({
    resolver: zodResolver(urgentSchema)
  });

  const subscriptionForm = useForm<SubscriptionFormData>({
    resolver: zodResolver(subscriptionSchema)
  });

  const handlePayment = async (data: UrgentFormData | SubscriptionFormData) => {
    if (!selectedPayment) return;

    setProcessing(true);
    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 1500));
    setProcessing(false);
    onPaymentComplete();
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-center">اختر طريقة الدفع</DialogTitle>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* User Data Form */}
          {type === 'subscription' ? (
            <Form {...subscriptionForm}>
              <form onSubmit={subscriptionForm.handleSubmit(handlePayment)} className="space-y-4">
                <FormField
                  control={subscriptionForm.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>الاسم</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={subscriptionForm.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>البريد الإلكتروني</FormLabel>
                      <FormControl>
                        <Input {...field} type="email" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={subscriptionForm.control}
                  name="mobile"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>رقم الجوال</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </form>
            </Form>
          ) : (
            <Form {...urgentForm}>
              <form onSubmit={urgentForm.handleSubmit(handlePayment)} className="space-y-4">
                <FormField
                  control={urgentForm.control}
                  name="mobile"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>رقم الجوال</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </form>
            </Form>
          )}

          {/* Payment Methods */}
          <div className="space-y-4">
            <Button
              className="w-full"
              variant={selectedPayment === 'mada' ? 'default' : 'outline'}
              onClick={() => setSelectedPayment('mada')}
              disabled={processing}
            >
              <img src="/mada-logo.svg" alt="Mada" className="h-6 ml-2" />
              الدفع عبر مدى
            </Button>

            <Button
              className="w-full"
              variant={selectedPayment === 'apple' ? 'default' : 'outline'}
              onClick={() => setSelectedPayment('apple')}
              disabled={processing}
            >
              <img src="/apple-pay-logo.svg" alt="Apple Pay" className="h-6 ml-2" />
              Apple Pay
            </Button>

            <Button
              className="w-full"
              variant={selectedPayment === 'tabby' ? 'default' : 'outline'}
              onClick={() => setSelectedPayment('tabby')}
              disabled={processing}
            >
              <img src="/tabby-logo.svg" alt="Tabby" className="h-6 ml-2" />
              Tabby
            </Button>

            <Button
              className="w-full"
              variant={selectedPayment === 'tamara' ? 'default' : 'outline'}
              onClick={() => setSelectedPayment('tamara')}
              disabled={processing}
            >
              <img src="/tamara-logo.svg" alt="Tamara" className="h-6 ml-2" />
              Tamara
            </Button>
          </div>

          <Button 
            className="w-full" 
            disabled={!selectedPayment || processing}
            onClick={() => {
              if (type === 'subscription') {
                subscriptionForm.handleSubmit(handlePayment)();
              } else {
                urgentForm.handleSubmit(handlePayment)();
              }
            }}
          >
            {processing ? 'جاري المعالجة...' : 'تأكيد الدفع'}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}