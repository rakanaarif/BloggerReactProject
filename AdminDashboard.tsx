import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import { SUBSCRIPTION_PLANS } from "@shared/schema";

export default function AdminDashboard() {
  const { toast } = useToast();
  const [apiKeys, setApiKeys] = useState({
    // Main API Keys
    openai: "",
    mada: "",
    applePay: "",
    tabby: "",
    tamara: "",
    // Law Firms API Keys
    lawFirmsPremium: "",
    lawFirmsProfessional: "",
    // Judges API Keys
    judgesPremium: "",
    judgesProfessional: "",
    // Students API Keys
    studentsPremium: "",
    studentsProfessional: "",
    // Urgent Consultation API Key
    urgentConsult: "",
  });

  const [themeSettings, setThemeSettings] = useState({
    primary: {
      color: "#1a365d",
      hover: "#2a4365",
      text: "#ffffff",
    },
    secondary: {
      color: "#f7fafc",
      hover: "#edf2f7",
      text: "#1a365d",
    },
    header: {
      background: "#1a365d",
      text: "#ffffff",
      height: "64px",
      fontSize: "16px",
      fontFamily: "Cairo",
    },
    footer: {
      background: "#1a365d",
      text: "#ffffff",
      height: "200px",
      fontSize: "14px",
      fontFamily: "Cairo",
    },
    icons: {
      size: "24px",
      color: "#1a365d",
      hoverColor: "#2a4365",
      buttonBackground: "#ffffff",
      buttonText: "#1a365d",
    },
    borderRadius: "0.5rem",
    fontFamily: "Cairo",
    fontSize: {
      base: "16px",
      h1: "32px",
      h2: "24px",
      h3: "20px",
    },
    spacing: {
      container: "1200px",
      gap: "2rem",
      padding: "1rem",
    },
  });

  const [contentSettings, setContentSettings] = useState({
    header: {
      logo: "/logo.svg",
      title: "Sheikh AI للاستشارات القانونية",
      menuItems: [
        "الرئيسية",
        "استشارة عاجلة",
        "الاشتراكات",
      ],
    },
    footer: {
      logo: "/logo.svg",
      title: "Sheikh AI للاستشارات القانونية والخدمات",
      paymentLogos: {
        mada: "/mada-logo.svg",
        applePay: "/apple-pay-logo.svg",
        tabby: "/tabby-logo.svg",
        tamara: "/tamara-logo.svg",
      },
    },
    home: {
      hero: {
        title: "مرحباً بكم في Sheikh AI",
        subtitle: "الحل الذكي لاستشاراتكم القانونية",
      },
      services: {
        urgent: {
          title: "استشارة عاجلة للأفراد",
          features: [
            "استشارة فورية",
            "دفع مريح",
            "خبرة قانونية",
          ],
        },
        subscriptions: {
          title: "اشتراكات للشركات والمحترفين",
          features: [
            "باقات متنوعة",
            "دعم متواصل",
            "تقارير مفصلة",
          ],
        },
      },
    },
  });

  const [layoutSettings, setLayoutSettings] = useState({
    container: {
      maxWidth: "1200px",
      padding: "1rem",
    },
    grid: {
      columns: {
        desktop: "3",
        tablet: "2",
        mobile: "1",
      },
      gap: "2rem",
    },
    spacing: {
      section: "4rem",
      component: "2rem",
    },
  });

  const handleSave = () => {
    toast({
      title: "تم الحفظ",
      description: "تم حفظ التغييرات بنجاح"
    });
  };

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">لوحة التحكم</h1>

      <Tabs defaultValue="api">
        <TabsList className="w-full">
          <TabsTrigger value="api">مفاتيح API</TabsTrigger>
          <TabsTrigger value="theme">المظهر العام</TabsTrigger>
          <TabsTrigger value="layout">تخطيط الصفحات</TabsTrigger>
          <TabsTrigger value="content">المحتوى</TabsTrigger>
          <TabsTrigger value="subscriptions">الاشتراكات</TabsTrigger>
        </TabsList>

        {/* API Keys Tab */}
        <TabsContent value="api">
          <Card>
            <CardHeader>
              <CardTitle>مفاتيح API</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Main API Keys */}
              <div className="border-b pb-4">
                <h3 className="text-lg font-semibold mb-4">المفاتيح الرئيسية</h3>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label>مفتاح OpenAI الرئيسي</label>
                    <Input
                      value={apiKeys.openai}
                      onChange={(e) => setApiKeys(prev => ({ ...prev, openai: e.target.value }))}
                      type="password"
                    />
                  </div>
                  <div className="space-y-2">
                    <label>الاستشارة العاجلة</label>
                    <Input
                      value={apiKeys.urgentConsult}
                      onChange={(e) => setApiKeys(prev => ({ ...prev, urgentConsult: e.target.value }))}
                      type="password"
                    />
                  </div>
                </div>
              </div>

              {/* Law Firms API Keys */}
              <div className="border-b pb-4">
                <h3 className="text-lg font-semibold mb-4">مفاتيح مكاتب المحاماة</h3>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label>الباقة المميزة</label>
                    <Input
                      value={apiKeys.lawFirmsPremium}
                      onChange={(e) => setApiKeys(prev => ({ ...prev, lawFirmsPremium: e.target.value }))}
                      type="password"
                    />
                  </div>
                  <div className="space-y-2">
                    <label>الباقة الاحترافية</label>
                    <Input
                      value={apiKeys.lawFirmsProfessional}
                      onChange={(e) => setApiKeys(prev => ({ ...prev, lawFirmsProfessional: e.target.value }))}
                      type="password"
                    />
                  </div>
                </div>
              </div>

              {/* Judges API Keys */}
              <div className="border-b pb-4">
                <h3 className="text-lg font-semibold mb-4">مفاتيح القضاة والأكاديميين</h3>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label>الباقة المميزة</label>
                    <Input
                      value={apiKeys.judgesPremium}
                      onChange={(e) => setApiKeys(prev => ({ ...prev, judgesPremium: e.target.value }))}
                      type="password"
                    />
                  </div>
                  <div className="space-y-2">
                    <label>الباقة الاحترافية</label>
                    <Input
                      value={apiKeys.judgesProfessional}
                      onChange={(e) => setApiKeys(prev => ({ ...prev, judgesProfessional: e.target.value }))}
                      type="password"
                    />
                  </div>
                </div>
              </div>

              {/* Students API Keys */}
              <div className="border-b pb-4">
                <h3 className="text-lg font-semibold mb-4">مفاتيح الطلاب والهواة</h3>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label>الباقة المميزة</label>
                    <Input
                      value={apiKeys.studentsPremium}
                      onChange={(e) => setApiKeys(prev => ({ ...prev, studentsPremium: e.target.value }))}
                      type="password"
                    />
                  </div>
                  <div className="space-y-2">
                    <label>الباقة الاحترافية</label>
                    <Input
                      value={apiKeys.studentsProfessional}
                      onChange={(e) => setApiKeys(prev => ({ ...prev, studentsProfessional: e.target.value }))}
                      type="password"
                    />
                  </div>
                </div>
              </div>

              {/* Payment Methods */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold mb-4">وسائل الدفع</h3>
                <div className="space-y-2">
                  <label>مفتاح مدى</label>
                  <Input
                    value={apiKeys.mada}
                    onChange={(e) => setApiKeys(prev => ({ ...prev, mada: e.target.value }))}
                    type="password"
                  />
                </div>
                <div className="space-y-2">
                  <label>مفتاح Apple Pay</label>
                  <Input
                    value={apiKeys.applePay}
                    onChange={(e) => setApiKeys(prev => ({ ...prev, applePay: e.target.value }))}
                    type="password"
                  />
                </div>
                <div className="space-y-2">
                  <label>مفتاح Tabby</label>
                  <Input
                    value={apiKeys.tabby}
                    onChange={(e) => setApiKeys(prev => ({ ...prev, tabby: e.target.value }))}
                    type="password"
                  />
                </div>
                <div className="space-y-2">
                  <label>مفتاح Tamara</label>
                  <Input
                    value={apiKeys.tamara}
                    onChange={(e) => setApiKeys(prev => ({ ...prev, tamara: e.target.value }))}
                    type="password"
                  />
                </div>
              </div>

              <Button onClick={handleSave}>حفظ التغييرات</Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Theme Tab */}
        <TabsContent value="theme">
          <Card>
            <CardHeader>
              <CardTitle>المظهر العام</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Primary Colors */}
              <div className="border-b pb-4">
                <h3 className="text-lg font-semibold mb-4">الألوان الرئيسية</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label>اللون الأساسي</label>
                    <Input
                      type="color"
                      value={themeSettings.primary.color}
                      onChange={(e) => setThemeSettings(prev => ({
                        ...prev,
                        primary: { ...prev.primary, color: e.target.value }
                      }))}
                    />
                  </div>
                  <div className="space-y-2">
                    <label>لون النص</label>
                    <Input
                      type="color"
                      value={themeSettings.primary.text}
                      onChange={(e) => setThemeSettings(prev => ({
                        ...prev,
                        primary: { ...prev.primary, text: e.target.value }
                      }))}
                    />
                  </div>
                </div>
              </div>

              {/* Header Settings */}
              <div className="border-b pb-4">
                <h3 className="text-lg font-semibold mb-4">الشريط العلوي</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label>لون الخلفية</label>
                    <Input
                      type="color"
                      value={themeSettings.header.background}
                      onChange={(e) => setThemeSettings(prev => ({
                        ...prev,
                        header: { ...prev.header, background: e.target.value }
                      }))}
                    />
                  </div>
                  <div className="space-y-2">
                    <label>الارتفاع</label>
                    <Input
                      type="text"
                      value={themeSettings.header.height}
                      onChange={(e) => setThemeSettings(prev => ({
                        ...prev,
                        header: { ...prev.header, height: e.target.value }
                      }))}
                    />
                  </div>
                </div>
              </div>

              {/* Footer Settings */}
              <div className="border-b pb-4">
                <h3 className="text-lg font-semibold mb-4">الشريط السفلي</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label>لون الخلفية</label>
                    <Input
                      type="color"
                      value={themeSettings.footer.background}
                      onChange={(e) => setThemeSettings(prev => ({
                        ...prev,
                        footer: { ...prev.footer, background: e.target.value }
                      }))}
                    />
                  </div>
                  <div className="space-y-2">
                    <label>الارتفاع</label>
                    <Input
                      type="text"
                      value={themeSettings.footer.height}
                      onChange={(e) => setThemeSettings(prev => ({
                        ...prev,
                        footer: { ...prev.footer, height: e.target.value }
                      }))}
                    />
                  </div>
                </div>
              </div>

              {/* Header Typography */}
              <div className="border-b pb-4">
                <h3 className="text-lg font-semibold mb-4">خط الشريط العلوي</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label>نوع الخط</label>
                    <Select
                      value={themeSettings.header.fontFamily}
                      onValueChange={(value) => setThemeSettings(prev => ({
                        ...prev,
                        header: { ...prev.header, fontFamily: value }
                      }))}>
                      <SelectTrigger>
                        <SelectValue placeholder="اختر نوع الخط" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Cairo">Cairo</SelectItem>
                        <SelectItem value="Tajawal">Tajawal</SelectItem>
                        <SelectItem value="Almarai">Almarai</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <label>حجم الخط</label>
                    <Input
                      type="text"
                      value={themeSettings.header.fontSize}
                      onChange={(e) => setThemeSettings(prev => ({
                        ...prev,
                        header: { ...prev.header, fontSize: e.target.value }
                      }))}
                    />
                  </div>
                </div>
              </div>

              {/* Footer Typography */}
              <div className="border-b pb-4">
                <h3 className="text-lg font-semibold mb-4">خط الشريط السفلي</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label>نوع الخط</label>
                    <Select
                      value={themeSettings.footer.fontFamily}
                      onValueChange={(value) => setThemeSettings(prev => ({
                        ...prev,
                        footer: { ...prev.footer, fontFamily: value }
                      }))}>
                      <SelectTrigger>
                        <SelectValue placeholder="اختر نوع الخط" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Cairo">Cairo</SelectItem>
                        <SelectItem value="Tajawal">Tajawal</SelectItem>
                        <SelectItem value="Almarai">Almarai</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <label>حجم الخط</label>
                    <Input
                      type="text"
                      value={themeSettings.footer.fontSize}
                      onChange={(e) => setThemeSettings(prev => ({
                        ...prev,
                        footer: { ...prev.footer, fontSize: e.target.value }
                      }))}
                    />
                  </div>
                </div>
              </div>

              {/* Icons and Buttons */}
              <div className="border-b pb-4">
                <h3 className="text-lg font-semibold mb-4">الأيقونات والأزرار</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label>حجم الأيقونات</label>
                    <Input
                      type="text"
                      value={themeSettings.icons.size}
                      onChange={(e) => setThemeSettings(prev => ({
                        ...prev,
                        icons: { ...prev.icons, size: e.target.value }
                      }))}
                    />
                  </div>
                  <div className="space-y-2">
                    <label>لون الأيقونات</label>
                    <Input
                      type="color"
                      value={themeSettings.icons.color}
                      onChange={(e) => setThemeSettings(prev => ({
                        ...prev,
                        icons: { ...prev.icons, color: e.target.value }
                      }))}
                    />
                  </div>
                  <div className="space-y-2">
                    <label>لون خلفية الأزرار</label>
                    <Input
                      type="color"
                      value={themeSettings.icons.buttonBackground}
                      onChange={(e) => setThemeSettings(prev => ({
                        ...prev,
                        icons: { ...prev.icons, buttonBackground: e.target.value }
                      }))}
                    />
                  </div>
                  <div className="space-y-2">
                    <label>لون نص الأزرار</label>
                    <Input
                      type="color"
                      value={themeSettings.icons.buttonText}
                      onChange={(e) => setThemeSettings(prev => ({
                        ...prev,
                        icons: { ...prev.icons, buttonText: e.target.value }
                      }))}
                    />
                  </div>
                </div>
              </div>

              {/* Typography Settings */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold mb-4">الخطوط</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label>نوع الخط</label>
                    <Select
                      value={themeSettings.fontFamily}
                      onValueChange={(value) => setThemeSettings(prev => ({ ...prev, fontFamily: value }))}>
                      <SelectTrigger>
                        <SelectValue placeholder="اختر نوع الخط" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Cairo">Cairo</SelectItem>
                        <SelectItem value="Tajawal">Tajawal</SelectItem>
                        <SelectItem value="Almarai">Almarai</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <label>حجم الخط الأساسي</label>
                    <Input
                      type="text"
                      value={themeSettings.fontSize.base}
                      onChange={(e) => setThemeSettings(prev => ({
                        ...prev,
                        fontSize: { ...prev.fontSize, base: e.target.value }
                      }))}
                    />
                  </div>
                </div>
              </div>

              <Button onClick={handleSave}>حفظ التغييرات</Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Layout Tab */}
        <TabsContent value="layout">
          <Card>
            <CardHeader>
              <CardTitle>تخطيط الصفحات</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Container Settings */}
              <div className="border-b pb-4">
                <h3 className="text-lg font-semibold mb-4">إعدادات الحاوية</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label>العرض الأقصى</label>
                    <Input
                      type="text"
                      value={layoutSettings.container.maxWidth}
                      onChange={(e) => setLayoutSettings(prev => ({
                        ...prev,
                        container: { ...prev.container, maxWidth: e.target.value }
                      }))}
                    />
                  </div>
                  <div className="space-y-2">
                    <label>الهوامش</label>
                    <Input
                      type="text"
                      value={layoutSettings.container.padding}
                      onChange={(e) => setLayoutSettings(prev => ({
                        ...prev,
                        container: { ...prev.container, padding: e.target.value }
                      }))}
                    />
                  </div>
                </div>
              </div>

              {/* Grid Settings */}
              <div className="border-b pb-4">
                <h3 className="text-lg font-semibold mb-4">إعدادات الشبكة</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label>المسافة بين العناصر</label>
                    <Input
                      type="text"
                      value={layoutSettings.grid.gap}
                      onChange={(e) => setLayoutSettings(prev => ({
                        ...prev,
                        grid: { ...prev.grid, gap: e.target.value }
                      }))}
                    />
                  </div>
                  <div className="space-y-2">
                    <label>عدد الأعمدة (الحاسوب)</label>
                    <Input
                      type="number"
                      value={layoutSettings.grid.columns.desktop}
                      onChange={(e) => setLayoutSettings(prev => ({
                        ...prev,
                        grid: {
                          ...prev.grid,
                          columns: { ...prev.grid.columns, desktop: e.target.value }
                        }
                      }))}
                    />
                  </div>
                </div>
              </div>

              <Button onClick={handleSave}>حفظ التغييرات</Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Content Tab */}
        <TabsContent value="content">
          <Card>
            <CardHeader>
              <CardTitle>المحتوى</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Header Content */}
              <div className="border-b pb-4">
                <h3 className="text-lg font-semibold mb-4">محتوى الشريط العلوي</h3>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label>عنوان الموقع</label>
                    <Input
                      value={contentSettings.header.title}
                      onChange={(e) => setContentSettings(prev => ({
                        ...prev,
                        header: { ...prev.header, title: e.target.value }
                      }))}
                    />
                  </div>
                  <div className="space-y-2">
                    <label>شعار الموقع</label>
                    <Input
                      value={contentSettings.header.logo}
                      onChange={(e) => setContentSettings(prev => ({
                        ...prev,
                        header: { ...prev.header, logo: e.target.value }
                      }))}
                    />
                  </div>
                </div>
              </div>

              {/* Footer Content */}
              <div className="border-b pb-4">
                <h3 className="text-lg font-semibold mb-4">محتوى الشريط السفلي</h3>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label>العنوان</label>
                    <Input
                      value={contentSettings.footer.title}
                      onChange={(e) => setContentSettings(prev => ({
                        ...prev,
                        footer: { ...prev.footer, title: e.target.value }
                      }))}
                    />
                  </div>
                  <div className="space-y-2">
                    <label>الشعار</label>
                    <Input
                      value={contentSettings.footer.logo}
                      onChange={(e) => setContentSettings(prev => ({
                        ...prev,
                        footer: { ...prev.footer, logo: e.target.value }
                      }))}
                    />
                  </div>
                </div>
              </div>

              {/* Home Page Content */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold mb-4">محتوى الصفحة الرئيسية</h3>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label>العنوان الرئيسي</label>
                    <Input
                      value={contentSettings.home.hero.title}
                      onChange={(e) => setContentSettings(prev => ({
                        ...prev,
                        home: {
                          ...prev.home,
                          hero: { ...prev.home.hero, title: e.target.value }
                        }
                      }))}
                    />
                  </div>
                  <div className="space-y-2">
                    <label>العنوان الفرعي</label>
                    <Input
                      value={contentSettings.home.hero.subtitle}
                      onChange={(e) => setContentSettings(prev => ({
                        ...prev,
                        home: {
                          ...prev.home,
                          hero: { ...prev.home.hero, subtitle: e.target.value }
                        }
                      }))}
                    />
                  </div>
                </div>
              </div>

              <Button onClick={handleSave}>حفظ التغييرات</Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Subscriptions Tab */}
        <TabsContent value="subscriptions">
          <Card>
            <CardHeader>
              <CardTitle>إعدادات الاشتراكات</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="border-b pb-4">
                <h3 className="text-lg font-semibold mb-4">اشتراك مكاتب المحاماة</h3>
                <div className="space-y-4">
                  {/* Premium Plan */}
                  <div className="border p-4 rounded">
                    <h4 className="font-semibold mb-2">الباقة المميزة</h4>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label>السعر الشهري</label>
                        <Input type="number" placeholder="299" />
                      </div>
                      <div>
                        <label>السعر السنوي</label>
                        <Input type="number" placeholder="2999" />
                      </div>
                      <div>
                        <label>عدد الأحرف الشهرية</label>
                        <Input type="number" placeholder="2000000" />
                      </div>
                      <div>
                        <label>عدد الأحرف للفترة التجريبية (يومياً)</label>
                        <Input type="number" placeholder="10000" />
                      </div>
                    </div>
                  </div>

                  {/* Professional Plan */}
                  <div className="border p-4 rounded">
                    <h4 className="font-semibold mb-2">الباقة الاحترافية</h4>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label>السعر الشهري</label>
                        <Input type="number" placeholder="799" />
                      </div>
                      <div>
                        <label>السعر السنوي</label>
                        <Input type="number" placeholder="7999" />
                      </div>
                      <div>
                        <label>عدد الأحرف الشهرية</label>
                        <Input type="number" placeholder="10000000" />
                      </div>
                      <div>
                        <label>عدد الأحرف للفترة التجريبية (يومياً)</label>
                        <Input type="number" placeholder="20000" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Judges Subscription Settings */}
              <div className="border-b pb-4">
                <h3 className="text-lg font-semibold mb-4">اشتراك القضاة والأكاديميين</h3>
                <div className="space-y-4">
                  {/* Premium Plan */}
                  <div className="border p-4 rounded">
                    <h4 className="font-semibold mb-2">الباقة المميزة</h4>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label>السعر الشهري</label>
                        <Input type="number" placeholder="99" />
                      </div>
                      <div>
                        <label>السعر السنوي</label>
                        <Input type="number" placeholder="999" />
                      </div>
                      <div>
                        <label>عدد الأحرف الشهرية</label>
                        <Input type="number" placeholder="500000" />
                      </div>
                      <div>
                        <label>عدد الأحرف للفترة التجريبية (يومياً)</label>
                        <Input type="number" placeholder="5000" />
                      </div>
                    </div>
                  </div>

                  {/* Professional Plan */}
                  <div className="border p-4 rounded">
                    <h4 className="font-semibold mb-2">الباقة الاحترافية</h4>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label>السعر الشهري</label>
                        <Input type="number" placeholder="299" />
                      </div>
                      <div>
                        <label>السعر السنوي</label>
                        <Input type="number" placeholder="2999" />
                      </div>
                      <div>
                        <label>عدد الأحرف الشهرية</label>
                        <Input type="number" placeholder="2000000" />
                      </div>
                      <div>
                        <label>عدد الأحرف للفترة التجريبية (يومياً)</label>
                        <Input type="number" placeholder="10000" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Students Subscription Settings */}
              <div className="border-b pb-4">
                <h3 className="text-lg font-semibold mb-4">اشتراك الطلاب والهواة</h3>
                <div className="space-y-4">
                  {/* Premium Plan */}
                  <div className="border p-4 rounded">
                    <h4 className="font-semibold mb-2">الباقة المميزة</h4>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label>السعر الشهري</label>
                        <Input type="number" placeholder="19" />
                      </div>
                      <div>
                        <label>السعر السنوي</label>
                        <Input type="number" placeholder="49" />
                      </div>
                      <div>
                        <label>عدد الأحرف الشهرية</label>
                        <Input type="number" placeholder="100000" />
                      </div>
                      <div>
                        <label>عدد الأحرف للفترة التجريبية (يومياً)</label>
                        <Input type="number" placeholder="2000" />
                      </div>
                    </div>
                  </div>

                  {/* Professional Plan */}
                  <div className="border p-4 rounded">
                    <h4 className="font-semibold mb-2">الباقة الاحترافية</h4>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label>السعر الشهري</label>
                        <Input type="number" placeholder="199" />
                      </div>
                      <div>
                        <label>السعر السنوي</label>
                        <Input type="number" placeholder="499" />
                      </div>
                      <div>
                        <label>عدد الأحرف الشهرية</label>
                        <Input type="number" placeholder="500000" />
                      </div>
                      <div>
                        <label>عدد الأحرف للفترة التجريبية (يومياً)</label>
                        <Input type="number" placeholder="5000" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Global Trial Settings */}
              <div className="border-b pb-4">
                <h3 className="text-lg font-semibold mb-4">إعدادات الفترة التجريبية</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label>مدة الفترة التجريبية (بالأيام)</label>
                    <Input type="number" defaultValue="3" />
                  </div>
                </div>
              </div>

              <Button onClick={handleSave}>حفظ التغييرات</Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}