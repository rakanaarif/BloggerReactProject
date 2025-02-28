import { Link } from "wouter";
import { Button } from "@/components/ui/button";

export default function MainNavigation() {
  return (
    <nav className="bg-primary text-primary-foreground py-4">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <img src="/logo.svg" alt="Sheikh AI" className="h-8 w-8" />
          <span className="font-arabic font-bold text-xl">Sheikh AI للاستشارات القانونية</span>
        </div>
        
        <div className="flex gap-4">
          <Button variant="ghost" asChild>
            <Link href="/">الرئيسية</Link>
          </Button>
          <Button variant="ghost" asChild>
            <Link href="/chat">استشارة عاجلة</Link>
          </Button>
          <Button variant="ghost" asChild>
            <Link href="/subscriptions">الاشتراكات</Link>
          </Button>
          <Button variant="ghost" asChild>
            <Link href="/admin">لوحة التحكم</Link>
          </Button>
        </div>
      </div>
    </nav>
  );
}
