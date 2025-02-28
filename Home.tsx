import { Link } from "wouter";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MessageSquare, Building2 } from "lucide-react";

export default function Home() {
  return (
    <div className="space-y-8">
      <section className="text-center space-y-4">
        <h1 className="font-arabic text-4xl font-bold">مرحباً بكم في Sheikh AI</h1>
        <p className="text-xl text-muted-foreground">الحل الذكي لاستشاراتكم القانونية</p>
      </section>

      <div className="grid md:grid-cols-2 gap-8">
        <Card>
          <CardContent className="p-6 text-center space-y-4">
            <MessageSquare className="mx-auto h-12 w-12 text-primary" />
            <h2 className="text-2xl font-bold">استشارة عاجلة للأفراد</h2>
            <ul className="text-right space-y-2">
              <li>• استشارة فورية</li>
              <li>• دفع مريح</li>
              <li>• خبرة قانونية</li>
            </ul>
            <Button asChild className="w-full">
              <Link href="/chat">ابدأ الاستشارة</Link>
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6 text-center space-y-4">
            <Building2 className="mx-auto h-12 w-12 text-primary" />
            <h2 className="text-2xl font-bold">اشتراكات للشركات والمحترفين</h2>
            <ul className="text-right space-y-2">
              <li>• باقات متنوعة</li>
              <li>• دعم متواصل</li>
              <li>• تقارير مفصلة</li>
            </ul>
            <Button asChild className="w-full">
              <Link href="/subscriptions">اختر خطتك</Link>
            </Button>
          </CardContent>
        </Card>
      </div>

      <footer className="mt-16 text-center space-y-4">
        <img src="/logo.svg" alt="Sheikh AI" className="h-12 w-12 mx-auto" />
        <h3 className="text-xl font-bold">Sheikh AI للاستشارات القانونية والخدمات</h3>
        <div className="flex justify-center gap-4">
          <img src="/mada-logo.svg" alt="Mada" className="h-8" />
          <img src="/apple-pay-logo.svg" alt="Apple Pay" className="h-8" />
          <img src="/tabby-logo.svg" alt="Tabby" className="h-8" />
          <img src="/tamara-logo.svg" alt="Tamara" className="h-8" />
        </div>
      </footer>
    </div>
  );
}
