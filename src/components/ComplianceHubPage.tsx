import React, { useState } from 'react';
import { 
  ShieldCheck, 
  FileText, 
  Trash2, 
  Copy, 
  Check, 
  ExternalLink, 
  Layers, 
  CheckCircle2, 
  Globe2, 
  Sparkles,
  Lock,
  ArrowRight,
  ArrowLeft,
  Share2,
  Terminal
} from 'lucide-react';
import { POLICIES, APP_INFO } from '../data/content';

interface HubProps {
  lang: 'ar' | 'en';
  onNavigate: (path: string) => void;
  onOpenMetaModal: () => void;
  onOpenFirebaseModal: () => void;
}

export const ComplianceHubPage: React.FC<HubProps> = ({
  lang,
  onNavigate,
  onOpenMetaModal,
  onOpenFirebaseModal,
}) => {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const getFullUrl = (route: string) => {
    if (typeof window === 'undefined') return `https://your-domain.com${route}`;
    return `${window.location.origin}${route}`;
  };

  const copyUrl = (id: string, route: string) => {
    const url = getFullUrl(route);
    navigator.clipboard.writeText(url);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const sites = [
    {
      num: 1,
      id: 'privacy' as const,
      policy: POLICIES.privacy,
      icon: ShieldCheck,
      color: 'indigo',
      badgeAr: 'الموقع الأول',
      badgeEn: 'Site 1',
    },
    {
      num: 2,
      id: 'terms' as const,
      policy: POLICIES.terms,
      icon: FileText,
      color: 'blue',
      badgeAr: 'الموقع الثاني',
      badgeEn: 'Site 2',
    },
    {
      num: 3,
      id: 'data-deletion' as const,
      policy: POLICIES['data-deletion'],
      icon: Trash2,
      color: 'rose',
      badgeAr: 'الموقع الثالث',
      badgeEn: 'Site 3',
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-12">
      
      {/* Hero Section */}
      <section className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200/80 dark:border-indigo-800/60 text-indigo-700 dark:text-indigo-300 text-xs font-semibold">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>{lang === 'ar' ? 'بوابة المواقع الثلاثة المستقلة' : '3 Dedicated Compliance Sites'}</span>
          <span aria-hidden="true">·</span>
          <span>{APP_INFO.appName}</span>
        </div>

        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 dark:text-white tracking-tight" style={{ textWrap: 'balance' }}>
          {lang === 'ar'
            ? 'المواقع الرسمية لسياسات وشروط تطبيق OTAY'
            : 'Official Legal & Compliance Sites for OTAY'}
        </h1>

        <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed" style={{ textWrap: 'balance' }}>
          {lang === 'ar'
            ? 'لكل سياسة اسم ورابط مستقل خاص بها، مصممة بدقة عالية للاعتماد الفوري في مراجعة تطبيقات Meta وتوثيق خدمة الرد التلقائي على إنستغرام مع جاهزية النشر على Firebase.'
            : 'Each policy features its own dedicated URL and page, crafted specifically for Meta / Instagram app verification and ready for Firebase Hosting.'}
        </p>

        {/* Quick Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          <button
            onClick={onOpenMetaModal}
            className="px-4 py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg shadow-sm transition-colors flex items-center gap-2"
          >
            <ShieldCheck className="w-4 h-4" />
            <span>{lang === 'ar' ? 'نسخ روابط لوحة Meta بنقرة واحدة' : 'Copy All Meta URLs'}</span>
          </button>

          <button
            onClick={onOpenFirebaseModal}
            className="px-4 py-2 text-xs font-semibold text-slate-800 dark:text-slate-200 bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 rounded-lg shadow-xs transition-colors flex items-center gap-2"
          >
            <Layers className="w-4 h-4 text-amber-500" />
            <span>{lang === 'ar' ? 'طريقة النشر على Firebase' : 'Firebase Deploy Guide'}</span>
          </button>
        </div>
      </section>

      {/* 3 Dedicated Sites Cards Grid */}
      <section className="space-y-4">
        <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <span>{lang === 'ar' ? 'المواقع الثلاثة وروابطها المخصصة' : 'The 3 Sites & Their Dedicated URLs'}</span>
          </h2>
          <span className="text-xs text-slate-500 dark:text-slate-400">
            {lang === 'ar' ? 'روابط مستقلة ومباشرة' : 'Independent & Direct URLs'}
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {sites.map(({ num, id, policy, icon: Icon, badgeAr, badgeEn }) => {
            const isCopied = copiedId === id;
            const fullUrl = getFullUrl(policy.route);

            return (
              <div
                key={id}
                className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 flex flex-col justify-between shadow-xs hover:border-indigo-400/80 transition-all group"
              >
                <div className="space-y-4">
                  
                  {/* Top Bar inside card */}
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold px-2.5 py-1 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                      {lang === 'ar' ? badgeAr : badgeEn}
                    </span>
                    <span className="text-xs text-slate-400 font-mono">
                      {policy.route}
                    </span>
                  </div>

                  {/* Title & Icon */}
                  <div className="flex items-start gap-3">
                    <div className="p-2.5 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 shrink-0">
                      <Icon className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                        {lang === 'ar' ? policy.nameAr : policy.nameEn}
                      </h3>
                      <div className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                        {lang === 'ar' ? `آخر تحديث: ${policy.lastUpdatedAr}` : `Updated: ${policy.lastUpdatedEn}`}
                      </div>
                    </div>
                  </div>

                  {/* Summary */}
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed min-h-[4rem]">
                    {lang === 'ar' ? policy.summaryAr : policy.summaryEn}
                  </p>

                  {/* URL Box */}
                  <div className="space-y-1.5 pt-2">
                    <div className="text-xs font-semibold text-slate-700 dark:text-slate-300 flex items-center justify-between">
                      <span>{lang === 'ar' ? 'الرابط المباشر:' : 'Direct URL:'}</span>
                      <span className="text-[11px] text-indigo-600 dark:text-indigo-400">
                        {lang === 'ar' ? 'انقر للنسخ' : 'Click to copy'}
                      </span>
                    </div>
                    <div
                      onClick={() => copyUrl(id, policy.route)}
                      className="cursor-pointer p-2.5 bg-slate-50 dark:bg-slate-800/80 rounded-lg border border-slate-200 dark:border-slate-700 font-mono text-xs text-slate-800 dark:text-slate-200 hover:border-indigo-400 transition-colors flex items-center justify-between gap-2"
                      title={lang === 'ar' ? 'انقر لنسخ الرابط' : 'Click to copy URL'}
                    >
                      <span className="truncate" dir="ltr">{fullUrl}</span>
                      {isCopied ? (
                        <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                      ) : (
                        <Copy className="w-4 h-4 text-slate-400 group-hover:text-slate-600 shrink-0" />
                      )}
                    </div>
                  </div>

                  {/* Meta Requirement hint */}
                  <div className="text-[11px] text-slate-500 dark:text-slate-400 bg-slate-50 dark:bg-slate-800/40 p-2 rounded-md border border-slate-100 dark:border-slate-800">
                    {lang === 'ar' ? policy.metaRequirementNoteAr : policy.metaRequirementNoteEn}
                  </div>
                </div>

                {/* Actions */}
                <div className="pt-6 mt-6 border-t border-slate-100 dark:border-slate-800 flex items-center gap-2">
                  <button
                    onClick={() => onNavigate(policy.route)}
                    className="flex-1 px-3 py-2 text-xs font-semibold text-white bg-slate-900 hover:bg-indigo-600 dark:bg-slate-800 dark:hover:bg-indigo-600 rounded-lg transition-colors flex items-center justify-center gap-1.5"
                  >
                    <span>{lang === 'ar' ? `فتح ${policy.nameAr}` : `View ${policy.nameEn}`}</span>
                    {lang === 'ar' ? <ArrowLeft className="w-3.5 h-3.5" /> : <ArrowRight className="w-3.5 h-3.5" />}
                  </button>

                  <button
                    onClick={() => copyUrl(id, policy.route)}
                    className="p-2 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 rounded-lg transition-colors"
                    title={lang === 'ar' ? 'نسخ الرابط' : 'Copy URL'}
                  >
                    {isCopied ? (
                      <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Meta Developer Integration Guide Section */}
      <section className="bg-gradient-to-br from-indigo-50/50 via-white to-slate-50 dark:from-slate-900 dark:via-slate-900 dark:to-indigo-950/20 rounded-2xl border border-indigo-100 dark:border-indigo-900/50 p-6 sm:p-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-indigo-600 dark:text-indigo-400 mb-1">
              <ShieldCheck className="w-4 h-4" />
              <span>{lang === 'ar' ? 'متطلبات توثيق تطبيق Meta & Instagram' : 'Meta & Instagram App Review Ready'}</span>
            </div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white">
              {lang === 'ar' ? 'الروابط الجاهزة للنسخ إلى لوحة مطوري فيسبوك' : 'Ready-to-Paste Meta Review Fields'}
            </h3>
          </div>
          <button
            onClick={onOpenMetaModal}
            className="px-3.5 py-1.5 text-xs font-semibold text-indigo-700 dark:text-indigo-300 bg-indigo-100/70 hover:bg-indigo-200/80 dark:bg-indigo-950 dark:hover:bg-indigo-900 rounded-lg transition-colors whitespace-nowrap shrink-0 self-start sm:self-auto"
          >
            {lang === 'ar' ? 'فتح لوحة النسخ الشاملة' : 'Open Full Copy Panel'}
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {sites.map(({ id, policy, badgeAr, badgeEn }) => {
            const fullUrl = getFullUrl(policy.route);
            const isCopied = copiedId === `meta-${id}`;
            return (
              <div key={id} className="p-4 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-slate-800 dark:text-slate-200">{lang === 'ar' ? badgeAr : badgeEn}</span>
                  <span className="text-[11px] text-slate-400 font-mono">{policy.route}</span>
                </div>
                <div className="text-xs text-slate-600 dark:text-slate-300 font-medium">
                  {lang === 'ar' ? policy.nameAr : policy.nameEn}
                </div>
                <div className="flex items-center justify-between gap-2 pt-1">
                  <code className="text-[11px] font-mono text-indigo-700 dark:text-indigo-400 bg-slate-100 dark:bg-slate-900 px-2 py-1 rounded truncate flex-1" dir="ltr">
                    {fullUrl}
                  </code>
                  <button
                    onClick={() => copyUrl(`meta-${id}`, policy.route)}
                    className="p-1.5 text-xs bg-indigo-50 hover:bg-indigo-100 dark:bg-indigo-950 dark:hover:bg-indigo-900 text-indigo-700 dark:text-indigo-300 rounded-md transition-colors shrink-0"
                    title={lang === 'ar' ? 'نسخ' : 'Copy'}
                  >
                    {isCopied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Firebase Hosting Publishing Guide Section */}
      <section className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 space-y-6">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400">
            <Layers className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white">
              {lang === 'ar' ? 'كيف تنشر المواقع الثلاثة على Firebase Hosting؟' : 'How to Publish the 3 Sites on Firebase Hosting'}
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              {lang === 'ar'
                ? 'ملف firebase.json مُجهّز مسبقاً مع خاصية الـ Rewrites لضمان عمل كل رابط وموقع بشكل مستقل دون أخطاء 404.'
                : 'firebase.json is pre-configured with SPA rewrites so each route loads flawlessly without 404 errors.'}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/80 space-y-2">
            <div className="font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-amber-500 text-white flex items-center justify-center text-[10px]">١</span>
              <span>{lang === 'ar' ? 'بناء التطبيق' : 'Build Application'}</span>
            </div>
            <p className="text-slate-600 dark:text-slate-300">
              {lang === 'ar' ? 'إنشاء ملفات الإنتاج الجاهزة في مجلد dist:' : 'Generate optimized production bundle:'}
            </p>
            <pre className="p-2 bg-slate-900 text-slate-100 rounded-lg font-mono text-[11px] overflow-x-auto" dir="ltr">
              npm run build
            </pre>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/80 space-y-2">
            <div className="font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-amber-500 text-white flex items-center justify-center text-[10px]">٢</span>
              <span>{lang === 'ar' ? 'تهيئة فايربيس' : 'Firebase Init'}</span>
            </div>
            <p className="text-slate-600 dark:text-slate-300">
              {lang === 'ar' ? 'تسجيل الدخول وربط مشروعك (إذا لم تكن مسجلاً):' : 'Log in and select your Firebase project:'}
            </p>
            <pre className="p-2 bg-slate-900 text-slate-100 rounded-lg font-mono text-[11px] overflow-x-auto" dir="ltr">
              firebase init hosting
            </pre>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/80 space-y-2">
            <div className="font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-amber-500 text-white flex items-center justify-center text-[10px]">٣</span>
              <span>{lang === 'ar' ? 'النشر المباشر' : 'Deploy to Firebase'}</span>
            </div>
            <p className="text-slate-600 dark:text-slate-300">
              {lang === 'ar' ? 'نشر الموقع والحصول على رابط مباشر مجاني:' : 'Publish and receive your public live URL:'}
            </p>
            <pre className="p-2 bg-slate-900 text-slate-100 rounded-lg font-mono text-[11px] overflow-x-auto" dir="ltr">
              firebase deploy --only hosting
            </pre>
          </div>

        </div>
      </section>

      {/* Compliance Guarantee Badges */}
      <section className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
        <div className="p-4 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 space-y-1">
          <div className="text-emerald-600 dark:text-emerald-400 font-bold text-sm">Meta Approved</div>
          <div className="text-xs text-slate-500 dark:text-slate-400">{lang === 'ar' ? 'متوافق مع شروط فيسبوك' : 'Facebook API Ready'}</div>
        </div>
        <div className="p-4 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 space-y-1">
          <div className="text-indigo-600 dark:text-indigo-400 font-bold text-sm">Zero Storage</div>
          <div className="text-xs text-slate-500 dark:text-slate-400">{lang === 'ar' ? 'لا تخزين دائم للبيانات' : 'No Permanent Storage'}</div>
        </div>
        <div className="p-4 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 space-y-1">
          <div className="text-rose-600 dark:text-rose-400 font-bold text-sm">72h SLA</div>
          <div className="text-xs text-slate-500 dark:text-slate-400">{lang === 'ar' ? 'حذف فوري خلال 72 ساعة' : '72h Deletion Guarantee'}</div>
        </div>
        <div className="p-4 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 space-y-1">
          <div className="text-amber-600 dark:text-amber-400 font-bold text-sm">November 2026</div>
          <div className="text-xs text-slate-500 dark:text-slate-400">{lang === 'ar' ? 'تحديث قانوني حديث' : 'Current Legal Version'}</div>
        </div>
      </section>

    </div>
  );
};
