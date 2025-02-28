import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Crown, Star } from "lucide-react";
import { SUBSCRIPTION_PLANS } from "@shared/schema";

interface PlanCardProps {
  title: string;
  plan: typeof SUBSCRIPTION_PLANS.LAW_FIRMS.PREMIUM;
  isPremium?: boolean;
  onSubscribe: (planId: string) => void;
}

function PlanCard({ title, plan, isPremium, onSubscribe }: PlanCardProps) {
  const Icon = isPremium ? Crown : Star;

  return (
    <Card className={isPremium ? 'border-primary' : ''}>
      <CardHeader>
        <div className="flex items-center gap-2">
          <Icon className={`h-6 w-6 ${isPremium ? 'text-primary' : 'text-muted-foreground'}`} />
          <CardTitle>{title}</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <div className="text-2xl font-bold">${plan.monthlyPrice / 100}</div>
          <div className="text-sm text-muted-foreground">شهرياً</div>
          <div className="text-lg font-semibold mt-2">${plan.yearlyPrice / 100}</div>
          <div className="text-sm text-muted-foreground">سنوياً</div>
        </div>

        <div className="space-y-2">
          <div className="font-semibold">المميزات الخاصة:</div>
          <div className="text-primary">{(plan.credits / 1000000).toFixed(1)}M حرف شهرياً</div>
        </div>

        <div className="space-y-2">
          <div className="font-semibold">المميزات العامة:</div>
          <ul className="space-y-1">
            {plan.features.map((feature) => (
              <li key={feature}>• {feature}</li>
            ))}
          </ul>
        </div>

        <Button
          className="w-full"
          variant={isPremium ? "default" : "outline"}
          onClick={() => onSubscribe(plan.id)}
        >
          ابدأ التجربة المجانية
        </Button>
      </CardContent>
    </Card>
  );
}

export default function Subscriptions() {
  const { toast } = useToast();

  const handleSubscribe = (planId: string) => {
    toast({
      title: "تجربة مجانية",
      description: `تم تفعيل التجربة المجانية لمدة 3 أيام للخطة ${planId}`
    });
  };

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-4">اختر خطة الاشتراك المناسبة لك</h1>
        <p className="text-muted-foreground">جميع الخطط تشمل تجربة مجانية لمدة 3 أيام</p>
      </div>

      {/* Law Firms Subscriptions */}
      <div>
        <h2 className="text-2xl font-bold mb-4">اشتراك مكاتب المحاماة</h2>
        <div className="grid md:grid-cols-2 gap-8">
          <PlanCard
            title="الباقة المميزة"
            plan={SUBSCRIPTION_PLANS.LAW_FIRMS.PREMIUM}
            isPremium
            onSubscribe={handleSubscribe}
          />
          <PlanCard
            title="الباقة الاحترافية"
            plan={SUBSCRIPTION_PLANS.LAW_FIRMS.PROFESSIONAL}
            onSubscribe={handleSubscribe}
          />
        </div>
      </div>

      {/* Judges Subscriptions */}
      <div>
        <h2 className="text-2xl font-bold mb-4">اشتراك القضاة والأكاديميين</h2>
        <div className="grid md:grid-cols-2 gap-8">
          <PlanCard
            title="الباقة المميزة"
            plan={SUBSCRIPTION_PLANS.JUDGES.PREMIUM}
            isPremium
            onSubscribe={handleSubscribe}
          />
          <PlanCard
            title="الباقة الاحترافية"
            plan={SUBSCRIPTION_PLANS.JUDGES.PROFESSIONAL}
            onSubscribe={handleSubscribe}
          />
        </div>
      </div>

      {/* Students Subscriptions */}
      <div>
        <h2 className="text-2xl font-bold mb-4">اشتراك الطلاب والهواة</h2>
        <div className="grid md:grid-cols-2 gap-8">
          <PlanCard
            title="الباقة المميزة"
            plan={SUBSCRIPTION_PLANS.STUDENTS.PREMIUM}
            isPremium
            onSubscribe={handleSubscribe}
          />
          <PlanCard
            title="الباقة الاحترافية"
            plan={SUBSCRIPTION_PLANS.STUDENTS.PROFESSIONAL}
            onSubscribe={handleSubscribe}
          />
        </div>
      </div>
    </div>
  );
}