import React, { useState } from 'react';
import { Shield, Copy, Check, Printer, Mail, ExternalLink, ArrowRight, ArrowLeft } from 'lucide-react';
import { POLICIES, APP_INFO } from '../data/content';

interface PolicyPageProps {
  lang: 'ar' | 'en';
  onNavigate: (path: string) => void;
}

export const PrivacyPolicyPage: React.FC<PolicyPageProps> = ({ lang, onNavigate }) => {
  const [copied, setCopied] = useState(false);
  const policy = POLICIES.privacy;

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
              {lang === 'ar' ? 'الموقع الأول: سياسة الخصوصية' : 'Site 1: Privacy Policy'}
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
                <span>{lang === 'ar' ? 'نسخ رابط الخصوصية لـ Meta' : 'Copy Meta Review Link'}</span>
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
              <Shield className="w-4 h-4" />
              <span>{lang === 'ar' ? 'الموقع الأول — الوثيقة الرسمية للامتثال' : 'Site 1 — Official Compliance Document'}</span>
            </div>
            <div className="text-xs text-slate-500 dark:text-slate-400">
              <span>{lang === 'ar' ? 'آخر تحديث: نوفمبر 2026' : 'Last Updated: November 2026'}</span>
            </div>
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-2">
            {lang === 'ar' ? 'سياسة الخصوصية' : 'Privacy Policy'}
          </h1>
          <p className="text-base font-semibold text-slate-700 dark:text-slate-300">
            {lang === 'ar' ? 'تطبيق OTAY — خدمة الرد التلقائي' : 'OTAY App — Auto-Reply Service'}
          </p>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-2">
            {lang === 'ar'
              ? 'وثيقة قانونية رسمية ومباشرة معدة خصيصاً لمراجعة وتوثيق التطبيق لدى Meta و Instagram Messaging API.'
              : 'Official legal document prepared for Meta and Instagram Messaging API compliance review.'}
          </p>
        </header>

        {/* Document Body */}
        {lang === 'ar' ? (
          <div className="space-y-8 text-slate-800 dark:text-slate-200 leading-relaxed text-sm sm:text-base">
            
            {/* القسم الأول */}
            <section className="space-y-3">
              <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <span className="w-6 h-6 rounded-md bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 inline-flex items-center justify-center text-xs font-bold">١</span>
                <span>المعلومات التي نجمعها</span>
              </h2>
              <p className="text-slate-600 dark:text-slate-300">
                يقوم التطبيق بجمع المعلومات التالية فقط لأغراض تشغيل خدمة الرد التلقائي:
              </p>
              <ul className="space-y-2 ps-4 list-disc marker:text-indigo-500">
                <li>معرّف المستخدم على إنستغرام (User ID)</li>
                <li>محتوى الرسائل المُرسلة إلى حسابك</li>
                <li>وقت إرسال الرسائل</li>
              </ul>
            </section>

            {/* القسم الثاني */}
            <section className="space-y-3">
              <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <span className="w-6 h-6 rounded-md bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 inline-flex items-center justify-center text-xs font-bold">٢</span>
                <span>كيف نستخدم المعلومات</span>
              </h2>
              <p className="text-slate-600 dark:text-slate-300">
                تُستخدم المعلومات المجموعة حصراً من أجل:
              </p>
              <ul className="space-y-2 ps-4 list-disc marker:text-indigo-500">
                <li>إرسال ردود تلقائية على رسائل إنستغرام عند تفعيل الخدمة</li>
                <li>تسجيل سجل الرسائل الواردة لصاحب الحساب</li>
              </ul>
              <div className="p-3 bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-900/50 rounded-lg text-emerald-800 dark:text-emerald-300 font-medium text-xs sm:text-sm">
                لا نقوم ببيع أو مشاركة أي بيانات مع أطراف ثالثة.
              </div>
            </section>

            {/* القسم الثالث */}
            <section className="space-y-3">
              <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <span className="w-6 h-6 rounded-md bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 inline-flex items-center justify-center text-xs font-bold">٣</span>
                <span>تخزين البيانات</span>
              </h2>
              <div className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200/60 dark:border-slate-700/60 text-slate-700 dark:text-slate-300">
                لا يتم تخزين أي بيانات على خوادمنا بشكل دائم. تُعالج الرسائل لحظياً ولا يُحتفظ بها بعد إرسال الرد التلقائي.
              </div>
            </section>

            {/* القسم الرابع */}
            <section className="space-y-3">
              <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <span className="w-6 h-6 rounded-md bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 inline-flex items-center justify-center text-xs font-bold">٤</span>
                <span>حقوق المستخدم</span>
              </h2>
              <p className="text-slate-600 dark:text-slate-300">
                يحق لك في أي وقت:
              </p>
              <ul className="space-y-2 ps-4 list-disc marker:text-indigo-500">
                <li>إيقاف الخدمة وإلغاء ربط حسابك</li>
                <li>طلب حذف أي بيانات مرتبطة بحسابك</li>
                <li>التواصل معنا لأي استفسار يتعلق ببياناتك</li>
              </ul>
            </section>

            {/* القسم الخامس */}
            <section className="space-y-3">
              <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <span className="w-6 h-6 rounded-md bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 inline-flex items-center justify-center text-xs font-bold">٥</span>
                <span>التواصل</span>
              </h2>
              <p className="text-slate-600 dark:text-slate-300">
                للاستفسار عن سياسة الخصوصية، تواصل عبر البريد الإلكتروني:
              </p>
              <a
                href={`mailto:${APP_INFO.developerEmail}?subject=استفسار عن سياسة الخصوصية — OTAY`}
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
                <span>Information We Collect</span>
              </h2>
              <p className="text-slate-600 dark:text-slate-300">
                The application collects the following information solely to operate the automated reply service:
              </p>
              <ul className="space-y-2 ps-4 list-disc marker:text-indigo-500">
                <li>Instagram User ID</li>
                <li>Content of incoming direct messages sent to your account</li>
                <li>Timestamps of sent messages</li>
              </ul>
            </section>

            <section className="space-y-3">
              <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <span className="w-6 h-6 rounded-md bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 inline-flex items-center justify-center text-xs font-bold">2</span>
                <span>How We Use Information</span>
              </h2>
              <p className="text-slate-600 dark:text-slate-300">
                Collected information is strictly used for:
              </p>
              <ul className="space-y-2 ps-4 list-disc marker:text-indigo-500">
                <li>Sending automated replies to Instagram messages when the service is active</li>
                <li>Logging incoming message history for the account owner</li>
              </ul>
              <div className="p-3 bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-900/50 rounded-lg text-emerald-800 dark:text-emerald-300 font-medium text-xs sm:text-sm">
                We do not sell or share any user data with third parties.
              </div>
            </section>

            <section className="space-y-3">
              <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <span className="w-6 h-6 rounded-md bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 inline-flex items-center justify-center text-xs font-bold">3</span>
                <span>Data Storage</span>
              </h2>
              <div className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200/60 dark:border-slate-700/60 text-slate-700 dark:text-slate-300">
                No data is permanently stored on our servers. Messages are processed in real time and are not retained once the automated response is dispatched.
              </div>
            </section>

            <section className="space-y-3">
              <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <span className="w-6 h-6 rounded-md bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 inline-flex items-center justify-center text-xs font-bold">4</span>
                <span>User Rights</span>
              </h2>
              <p className="text-slate-600 dark:text-slate-300">
                At any time, you have the right to:
              </p>
              <ul className="space-y-2 ps-4 list-disc marker:text-indigo-500">
                <li>Stop the service and unlink your account</li>
                <li>Request permanent deletion of all data associated with your account</li>
                <li>Contact us regarding any inquiries about your data</li>
              </ul>
            </section>

            <section className="space-y-3">
              <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <span className="w-6 h-6 rounded-md bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 inline-flex items-center justify-center text-xs font-bold">5</span>
                <span>Contact</span>
              </h2>
              <p className="text-slate-600 dark:text-slate-300">
                For inquiries regarding this Privacy Policy, please contact us at:
              </p>
              <a
                href={`mailto:${APP_INFO.developerEmail}?subject=Privacy Policy Inquiry — OTAY`}
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
            <button onClick={() => onNavigate('/terms')} className="hover:text-indigo-600 dark:hover:text-indigo-400 font-medium">
              {lang === 'ar' ? 'الموقع ٢: شروط الخدمة ←' : 'Site 2: Terms of Service →'}
            </button>
          </div>
        </footer>
      </article>

      {/* Bottom Nav Cards for Easy Review */}
      <div className="no-print mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
        <button
          onClick={() => onNavigate('/terms')}
          className="p-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl hover:border-indigo-400 transition-colors text-start shadow-xs flex items-center justify-between group"
        >
          <div>
            <div className="text-xs text-slate-500 dark:text-slate-400 mb-1">
              {lang === 'ar' ? 'الموقع الثاني' : 'Site 2'}
            </div>
            <div className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400">
              {lang === 'ar' ? 'شروط الخدمة (Terms of Service)' : 'Terms of Service'}
            </div>
          </div>
          <ArrowLeft className="w-4 h-4 text-slate-400 group-hover:text-indigo-600 transition-transform group-hover:-translate-x-1" />
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
