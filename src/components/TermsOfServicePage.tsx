import React, { useState } from 'react';
import { FileText, Copy, Check, Printer, Mail, ArrowRight, ArrowLeft } from 'lucide-react';
import { POLICIES, APP_INFO } from '../data/content';

interface PolicyPageProps {
  lang: 'ar' | 'en';
  onNavigate: (path: string) => void;
}

export const TermsOfServicePage: React.FC<PolicyPageProps> = ({ lang, onNavigate }) => {
  const [copied, setCopied] = useState(false);
  const policy = POLICIES.terms;

  const currentUrl = typeof window !== 'undefined'
    ? `${window.location.origin}${policy.route}`
    : `https://your-domain.com${policy.route}`;

  const copyUrl = () => {
    navigator.clipboard.writeText(currentUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      {/* Top Breadcrumb & URL Bar */}
      <div className="no-print mb-8 p-4 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 mb-1">
            <button onClick={() => onNavigate('/')} className="hover:text-indigo-600 dark:hover:text-indigo-400">
              {lang === 'ar' ? 'البوابة الرئيسية' : 'Compliance Hub'}
            </button>
            <span>/</span>
            <span className="text-slate-800 dark:text-slate-200 font-medium">
              {lang === 'ar' ? 'الموقع الثاني: شروط الخدمة' : 'Site 2: Terms of Service'}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <code className="text-xs bg-slate-100 dark:bg-slate-800 text-indigo-700 dark:text-indigo-400 px-2 py-0.5 rounded font-mono select-all">
              {currentUrl}
            </code>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={copyUrl}
            className="px-3 py-1.5 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg transition-colors flex items-center gap-1.5 shadow-xs whitespace-nowrap shrink-0"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-300" />
                <span>{lang === 'ar' ? 'تم نسخ الرابط!' : 'Copied!'}</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>{lang === 'ar' ? 'نسخ رابط الشروط لـ Meta' : 'Copy Meta Terms Link'}</span>
              </>
            )}
          </button>
          <button
            onClick={handlePrint}
            className="px-3 py-1.5 text-xs font-medium text-slate-700 dark:text-slate-200 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 rounded-lg transition-colors flex items-center gap-1.5 whitespace-nowrap shrink-0"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>{lang === 'ar' ? 'طباعة / PDF' : 'Print / PDF'}</span>
          </button>
        </div>
      </div>

      {/* Official Legal Document Container */}
      <article className="print-clean bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm p-6 sm:p-10 lg:p-12 transition-colors">
        
        {/* Document Header */}
        <header className="border-b border-slate-100 dark:border-slate-800 pb-8 mb-8 text-start">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
            <div className="flex items-center gap-2 text-xs font-semibold text-indigo-600 dark:text-indigo-400">
              <FileText className="w-4 h-4" />
              <span>{lang === 'ar' ? 'الموقع الثاني — الوثيقة الرسمية للامتثال' : 'Site 2 — Official Compliance Document'}</span>
            </div>
            <div className="text-xs text-slate-500 dark:text-slate-400">
              <span>{lang === 'ar' ? 'آخر تحديث: نوفمبر 2026' : 'Last Updated: November 2026'}</span>
            </div>
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-2">
            {lang === 'ar' ? 'شروط الخدمة' : 'Terms of Service'}
          </h1>
          <p className="text-base font-semibold text-slate-700 dark:text-slate-300">
            {lang === 'ar' ? 'تطبيق OTAY — خدمة الرد التلقائي' : 'OTAY App — Auto-Reply Service'}
          </p>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-2">
            {lang === 'ar'
              ? 'وثيقة قانونية تنظم شروط وأحكام استخدام تطبيق الرد التلقائي على رسائل إنستغرام بما يضمن الشفافية والامتثال لسياسات Meta.'
              : 'Official terms and conditions governing the use of OTAY Instagram auto-reply app.'}
          </p>
        </header>

        {/* Document Body */}
        {lang === 'ar' ? (
          <div className="space-y-8 text-slate-800 dark:text-slate-200 leading-relaxed text-sm sm:text-base">
            
            {/* القسم الأول */}
            <section className="space-y-3">
              <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <span className="w-6 h-6 rounded-md bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 inline-flex items-center justify-center text-xs font-bold">١</span>
                <span>قبول الشروط</span>
              </h2>
              <p className="text-slate-700 dark:text-slate-300">
                باستخدامك لتطبيق OTAY، فإنك توافق على هذه الشروط كاملةً. إذا كنت لا توافق على أي بند، يُرجى التوقف عن استخدام الخدمة.
              </p>
            </section>

            {/* القسم الثاني */}
            <section className="space-y-3">
              <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <span className="w-6 h-6 rounded-md bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 inline-flex items-center justify-center text-xs font-bold">٢</span>
                <span>وصف الخدمة</span>
              </h2>
              <p className="text-slate-700 dark:text-slate-300">
                يتيح تطبيق OTAY للمستخدمين إعداد ردود تلقائية على رسائل إنستغرام المباشرة عند تفعيل وضع الغياب.
              </p>
            </section>

            {/* القسم الثالث */}
            <section className="space-y-3">
              <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <span className="w-6 h-6 rounded-md bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 inline-flex items-center justify-center text-xs font-bold">٣</span>
                <span>التزامات المستخدم</span>
              </h2>
              <ul className="space-y-2 ps-4 list-disc marker:text-indigo-500">
                <li>استخدام الخدمة وفق سياسات Meta وإنستغرام</li>
                <li>عدم استخدام الخدمة لإرسال محتوى مسيء أو مزعج</li>
                <li>المسؤولية الكاملة عن محتوى الردود التلقائية المُعدّة</li>
              </ul>
            </section>

            {/* القسم الرابع */}
            <section className="space-y-3">
              <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <span className="w-6 h-6 rounded-md bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 inline-flex items-center justify-center text-xs font-bold">٤</span>
                <span>إخلاء المسؤولية</span>
              </h2>
              <div className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200/60 dark:border-slate-700/60 text-slate-700 dark:text-slate-300">
                يُقدَّم التطبيق &quot;كما هو&quot; دون أي ضمانات. لا نتحمل مسؤولية أي أضرار ناتجة عن استخدام أو عدم توفر الخدمة.
              </div>
            </section>

            {/* القسم الخامس */}
            <section className="space-y-3">
              <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <span className="w-6 h-6 rounded-md bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 inline-flex items-center justify-center text-xs font-bold">٥</span>
                <span>إنهاء الخدمة</span>
              </h2>
              <p className="text-slate-700 dark:text-slate-300">
                يحق للمستخدم إيقاف الخدمة في أي وقت عبر إلغاء ربط التطبيق بحساب إنستغرام من إعدادات الحساب.
              </p>
            </section>

            {/* القسم السادس */}
            <section className="space-y-3">
              <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <span className="w-6 h-6 rounded-md bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 inline-flex items-center justify-center text-xs font-bold">٦</span>
                <span>التواصل</span>
              </h2>
              <p className="text-slate-600 dark:text-slate-300">
                لأي استفسار حول شروط الخدمة:
              </p>
              <a
                href={`mailto:${APP_INFO.developerEmail}?subject=استفسار عن شروط الخدمة — OTAY`}
                className="inline-flex items-center gap-2 text-indigo-600 dark:text-indigo-400 font-semibold hover:underline bg-indigo-50 dark:bg-indigo-950/40 px-3 py-2 rounded-lg"
              >
                <Mail className="w-4 h-4" />
                <span dir="ltr">{APP_INFO.developerEmail}</span>
              </a>
            </section>

          </div>
        ) : (
          /* English Translation for Meta Global Reviewers */
          <div className="space-y-8 text-slate-800 dark:text-slate-200 leading-relaxed text-sm sm:text-base" dir="ltr">
            
            <section className="space-y-3">
              <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <span className="w-6 h-6 rounded-md bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 inline-flex items-center justify-center text-xs font-bold">1</span>
                <span>Acceptance of Terms</span>
              </h2>
              <p className="text-slate-700 dark:text-slate-300">
                By using the OTAY application, you agree to these Terms in full. If you do not agree with any part, please cease using the service immediately.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <span className="w-6 h-6 rounded-md bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 inline-flex items-center justify-center text-xs font-bold">2</span>
                <span>Service Description</span>
              </h2>
              <p className="text-slate-700 dark:text-slate-300">
                The OTAY application enables users to set up automated replies to Instagram Direct messages when away mode is enabled.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <span className="w-6 h-6 rounded-md bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 inline-flex items-center justify-center text-xs font-bold">3</span>
                <span>User Obligations</span>
              </h2>
              <ul className="space-y-2 ps-4 list-disc marker:text-indigo-500">
                <li>Use the service in full compliance with Meta and Instagram policies</li>
                <li>Refrain from using the service to send offensive, abusive, or spam messages</li>
                <li>Assume full responsibility for the content configured in automated replies</li>
              </ul>
            </section>

            <section className="space-y-3">
              <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <span className="w-6 h-6 rounded-md bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 inline-flex items-center justify-center text-xs font-bold">4</span>
                <span>Disclaimer</span>
              </h2>
              <div className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200/60 dark:border-slate-700/60 text-slate-700 dark:text-slate-300">
                The application is provided &quot;as is&quot; without warranties of any kind. We disclaim all liability for any damages resulting from the use or unavailability of the service.
              </div>
            </section>

            <section className="space-y-3">
              <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <span className="w-6 h-6 rounded-md bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 inline-flex items-center justify-center text-xs font-bold">5</span>
                <span>Service Termination</span>
              </h2>
              <p className="text-slate-700 dark:text-slate-300">
                Users retain the right to terminate the service at any time by revoking the application&apos;s permissions from their Instagram account settings.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <span className="w-6 h-6 rounded-md bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 inline-flex items-center justify-center text-xs font-bold">6</span>
                <span>Contact</span>
              </h2>
              <p className="text-slate-600 dark:text-slate-300">
                For inquiries regarding these Terms of Service:
              </p>
              <a
                href={`mailto:${APP_INFO.developerEmail}?subject=Terms of Service Inquiry — OTAY`}
                className="inline-flex items-center gap-2 text-indigo-600 dark:text-indigo-400 font-semibold hover:underline bg-indigo-50 dark:bg-indigo-950/40 px-3 py-2 rounded-lg"
              >
                <Mail className="w-4 h-4" />
                <span>{APP_INFO.developerEmail}</span>
              </a>
            </section>

          </div>
        )}

        {/* Document Footer */}
        <footer className="mt-12 pt-8 border-t border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 dark:text-slate-400">
          <div>{APP_INFO.copyrightAr}</div>
          <div className="flex items-center gap-4">
            <button onClick={() => onNavigate('/data-deletion')} className="hover:text-indigo-600 dark:hover:text-indigo-400 font-medium">
              {lang === 'ar' ? 'الموقع ٣: تعليمات حذف البيانات ←' : 'Site 3: Data Deletion →'}
            </button>
          </div>
        </footer>
      </article>

      {/* Bottom Nav Cards */}
      <div className="no-print mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
        <button
          onClick={() => onNavigate('/privacy')}
          className="p-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl hover:border-indigo-400 transition-colors text-start shadow-xs flex items-center justify-between group"
        >
          <div>
            <div className="text-xs text-slate-500 dark:text-slate-400 mb-1">
              {lang === 'ar' ? 'الموقع الأول' : 'Site 1'}
            </div>
            <div className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400">
              {lang === 'ar' ? 'سياسة الخصوصية (Privacy Policy)' : 'Privacy Policy'}
            </div>
          </div>
          <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-indigo-600 transition-transform group-hover:translate-x-1" />
        </button>

        <button
          onClick={() => onNavigate('/data-deletion')}
          className="p-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl hover:border-indigo-400 transition-colors text-start shadow-xs flex items-center justify-between group"
        >
          <div>
            <div className="text-xs text-slate-500 dark:text-slate-400 mb-1">
              {lang === 'ar' ? 'الموقع الثالث' : 'Site 3'}
            </div>
            <div className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400">
              {lang === 'ar' ? 'تعليمات حذف البيانات (Data Deletion)' : 'Data Deletion'}
            </div>
          </div>
          <ArrowLeft className="w-4 h-4 text-slate-400 group-hover:text-indigo-600 transition-transform group-hover:-translate-x-1" />
        </button>
      </div>
    </div>
  );
};
