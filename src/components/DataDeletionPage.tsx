import React, { useState } from 'react';
import { 
  Trash2, 
  Copy, 
  Check, 
  Printer, 
  Mail, 
  Send, 
  Clock, 
  ShieldAlert, 
  ArrowRight, 
  ArrowLeft,
  CheckCircle2,
  Database
} from 'lucide-react';
import { doc, setDoc } from 'firebase/firestore';
import { db, handleFirestoreError, OperationType } from '../firebase';
import { POLICIES, APP_INFO } from '../data/content';

interface PolicyPageProps {
  lang: 'ar' | 'en';
  onNavigate: (path: string) => void;
}

export const DataDeletionPage: React.FC<PolicyPageProps> = ({ lang, onNavigate }) => {
  const [copied, setCopied] = useState(false);
  const [emailCopied, setEmailCopied] = useState(false);
  const [instagramHandle, setInstagramHandle] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionSuccess, setSubmissionSuccess] = useState<string | null>(null);
  const [submissionError, setSubmissionError] = useState<string | null>(null);

  const policy = POLICIES['data-deletion'];

  const currentUrl = typeof window !== 'undefined'
    ? `${window.location.origin}${policy.route}`
    : `https://your-domain.com${policy.route}`;

  const copyUrl = () => {
    navigator.clipboard.writeText(currentUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const copyEmail = () => {
    navigator.clipboard.writeText(APP_INFO.developerEmail);
    setEmailCopied(true);
    setTimeout(() => setEmailCopied(false), 2000);
  };

  const handlePrint = () => {
    window.print();
  };

  // Handle direct Firestore registration of deletion request
  const handleSubmitDeletionToFirebase = async (e: React.FormEvent) => {
    e.preventDefault();
    const handle = instagramHandle.trim().replace(/^@/, '');
    if (!handle) {
      setSubmissionError(lang === 'ar' ? 'يرجى إدخال اسم أو معرّف الحساب على إنستغرام.' : 'Please enter your Instagram handle.');
      return;
    }

    setIsSubmitting(true);
    setSubmissionError(null);

    const requestId = `req_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
    const path = `deletion_requests/${requestId}`;

    try {
      await setDoc(doc(db, 'deletion_requests', requestId), {
        instagramHandle: handle,
        status: 'pending',
        requestedAt: new Date().toISOString(),
        ...(contactEmail.trim() ? { contactEmail: contactEmail.trim() } : {}),
      });

      const trackingNumber = `OTAY-DEL-${requestId.slice(-6).toUpperCase()}`;
      setSubmissionSuccess(trackingNumber);
      setInstagramHandle('');
      setContactEmail('');
    } catch (err) {
      try {
        handleFirestoreError(err, OperationType.CREATE, path);
      } catch (loggingError) {
        console.error('Handled deletion submission error:', loggingError);
      }
      setSubmissionError(
        lang === 'ar'
          ? 'تعذر تسجيل الطلب في قاعدة البيانات حالياً، يرجى استخدام زر إرسال البريد أدناه مباشرة.'
          : 'Failed to record request. Please use the email button below directly.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const mailSubject = encodeURIComponent('طلب حذف البيانات — OTAY');
  const mailBody = encodeURIComponent(
    `مرحباً،\n\nأرجو التكرم بحذف جميع بياناتي المرتبطة بتطبيق OTAY.\n\nمعرّف/اسم حساب إنستغرام: ${instagramHandle.trim() || '[أدخل اسم حسابك هنا]'}\nتاريخ الطلب: ${new Date().toLocaleDateString('ar-EG')}\n\nشكراً لكم.`
  );
  const mailtoUrl = `mailto:${APP_INFO.developerEmail}?subject=${mailSubject}&body=${mailBody}`;

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
              {lang === 'ar' ? 'الموقع الثالث: تعليمات حذف البيانات' : 'Site 3: Data Deletion Instructions'}
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
                <span>{lang === 'ar' ? 'نسخ رابط الحذف لـ Meta' : 'Copy Meta Deletion Link'}</span>
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
            <div className="flex items-center gap-2 text-xs font-semibold text-rose-600 dark:text-rose-400">
              <Trash2 className="w-4 h-4" />
              <span>{lang === 'ar' ? 'الموقع الثالث — الوثيقة الرسمية للامتثال' : 'Site 3 — Official Compliance Document'}</span>
            </div>
            <div className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
              <span>{lang === 'ar' ? 'معالجة مؤكدة خلال 72 ساعة' : '72h Processing Guarantee'}</span>
            </div>
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-2">
            {lang === 'ar' ? 'تعليمات حذف البيانات' : 'User Data Deletion Instructions'}
          </h1>
          <p className="text-base font-semibold text-slate-700 dark:text-slate-300">
            {lang === 'ar' ? 'تطبيق OTAY — خدمة الرد التلقائي' : 'OTAY App — Auto-Reply Service'}
          </p>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-2">
            {lang === 'ar'
              ? 'وفقاً لسياسات منصة Meta وحماية خصوصية مستخدمي Instagram، توضح هذه الصفحة الآلية المباشرة لحذف وإلغاء ربط بيانات حسابك.'
              : 'In accordance with Meta Platform terms and Instagram user privacy requirements, this page outlines data deletion protocols.'}
          </p>
        </header>

        {/* Document Body */}
        {lang === 'ar' ? (
          <div className="space-y-8 text-slate-800 dark:text-slate-200 leading-relaxed text-sm sm:text-base">
            
            {/* كيف تحذف بياناتك؟ */}
            <section className="space-y-4">
              <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                كيف تحذف بياناتك؟
              </h2>
              <p className="text-slate-600 dark:text-slate-300">
                يمكنك طلب حذف جميع بياناتك المرتبطة بتطبيق OTAY باتباع الخطوات التالية:
              </p>

              {/* Steps Cards */}
              <div className="space-y-3">
                
                {/* Step 1 */}
                <div className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200/70 dark:border-slate-700/60 flex items-start gap-4">
                  <div className="w-8 h-8 rounded-lg bg-indigo-600 text-white flex items-center justify-center font-bold text-sm shrink-0">
                    ١
                  </div>
                  <div>
                    <div className="font-bold text-slate-900 dark:text-white">الخطوة الأولى: الانتقال إلى إعدادات إنستغرام</div>
                    <div className="text-sm text-slate-600 dark:text-slate-300 mt-1">
                      افتح إنستغرام ← الإعدادات ← الأمان ← التطبيقات والمواقع
                    </div>
                  </div>
                </div>

                {/* Step 2 */}
                <div className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200/70 dark:border-slate-700/60 flex items-start gap-4">
                  <div className="w-8 h-8 rounded-lg bg-indigo-600 text-white flex items-center justify-center font-bold text-sm shrink-0">
                    ٢
                  </div>
                  <div>
                    <div className="font-bold text-slate-900 dark:text-white">الخطوة الثانية: إلغاء صلاحيات التطبيق</div>
                    <div className="text-sm text-slate-600 dark:text-slate-300 mt-1">
                      ابحث عن تطبيق OTAY وقم بإزالة صلاحياته — هذا يوقف الوصول فوراً.
                    </div>
                  </div>
                </div>

                {/* Step 3 */}
                <div className="p-4 bg-indigo-50/60 dark:bg-indigo-950/30 rounded-xl border border-indigo-200 dark:border-indigo-900/60 flex items-start gap-4">
                  <div className="w-8 h-8 rounded-lg bg-indigo-600 text-white flex items-center justify-center font-bold text-sm shrink-0">
                    ٣
                  </div>
                  <div className="space-y-2 flex-1">
                    <div className="font-bold text-indigo-950 dark:text-indigo-200">الخطوة الثالثة: طلب الحذف النهائي عبر البريد</div>
                    <div className="text-sm text-slate-700 dark:text-slate-300">
                      لطلب حذف البيانات نهائياً، أرسل بريداً إلكترونياً إلى:
                    </div>
                    <div className="flex flex-wrap items-center gap-2 pt-1">
                      <div className="bg-white dark:bg-slate-900 px-3 py-1.5 rounded-lg border border-indigo-200 dark:border-indigo-800 font-mono text-xs text-indigo-700 dark:text-indigo-300 font-bold select-all flex items-center gap-1.5">
                        <Mail className="w-3.5 h-3.5" />
                        <span dir="ltr">{APP_INFO.developerEmail}</span>
                      </div>
                      <button
                        onClick={copyEmail}
                        className="px-2.5 py-1 text-xs font-medium text-indigo-700 dark:text-indigo-300 hover:bg-indigo-100 dark:hover:bg-indigo-900/50 rounded-md transition-colors"
                      >
                        {emailCopied ? 'تم النسخ!' : 'نسخ البريد'}
                      </button>
                    </div>
                    <div className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                      الموضوع: <strong className="text-slate-800 dark:text-slate-200">طلب حذف البيانات — OTAY</strong>
                    </div>
                  </div>
                </div>

              </div>
            </section>

            {/* ما الذي سيتم حذفه؟ */}
            <section className="space-y-3 pt-2">
              <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <span>ما الذي سيتم حذفه؟</span>
              </h2>
              <ul className="space-y-2 ps-4 list-disc marker:text-rose-500">
                <li>جميع بيانات الوصول المرتبطة بحسابك</li>
                <li>سجل الرسائل الواردة المحفوظ</li>
                <li>أي إعدادات مخزنة للردود التلقائية</li>
              </ul>
            </section>

            {/* مدة المعالجة */}
            <section className="space-y-2">
              <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Clock className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                <span>مدة المعالجة</span>
              </h2>
              <div className="p-4 bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-900/50 rounded-xl text-emerald-900 dark:text-emerald-200 font-medium text-sm">
                سيتم معالجة طلب الحذف خلال 72 ساعة من استلامه، وستتلقى تأكيداً على بريدك الإلكتروني.
              </div>
            </section>

            {/* نموذج التجهيز المباشر للطلب المرتبط بـ Firebase */}
            <section className="no-print p-6 bg-slate-50 dark:bg-slate-800/80 rounded-xl border border-slate-200 dark:border-slate-700 space-y-4">
              <div className="flex items-center justify-between">
                <div className="font-bold text-slate-900 dark:text-white text-sm flex items-center gap-2">
                  <Database className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                  <span>تسجيل طلب الحذف إلكترونياً (مباشر عبر Firebase)</span>
                </div>
                <span className="text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold bg-emerald-50 dark:bg-emerald-950/50 px-2 py-0.5 rounded">
                  قاعدة بيانات متصلة
                </span>
              </div>

              {submissionSuccess ? (
                <div className="p-4 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 rounded-lg text-emerald-900 dark:text-emerald-200 text-xs space-y-2">
                  <div className="flex items-center gap-2 font-bold text-sm">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>تم تسجيل طلب الحذف بنجاح في النظام!</span>
                  </div>
                  <div>
                    رقم تتبع الطلب الخاص بك: <strong className="font-mono bg-white dark:bg-slate-900 px-2 py-0.5 rounded border border-emerald-300 dark:border-emerald-700">{submissionSuccess}</strong>
                  </div>
                  <div className="text-slate-600 dark:text-slate-300">
                    تم إدراج حسابك في قائمة المعالجة وسيتم مسح السجلات بالكامل خلال 72 ساعة.
                  </div>
                  <button
                    onClick={() => setSubmissionSuccess(null)}
                    className="mt-2 text-indigo-600 dark:text-indigo-400 underline font-medium"
                  >
                    تقديم طلب آخر
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmitDeletionToFirebase} className="space-y-3">
                  <p className="text-xs text-slate-600 dark:text-slate-300">
                    أدخل اسم حسابك على إنستغرام ليتم إرسال الطلب فوراً إلى قاعدة البيانات، أو استخدم خيار البريد:
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    <input
                      type="text"
                      placeholder="اسم حساب إنستغرام (مثال: @username)"
                      value={instagramHandle}
                      onChange={(e) => setInstagramHandle(e.target.value)}
                      required
                      className="px-3 py-2 text-xs rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-indigo-500"
                      dir="ltr"
                    />
                    <input
                      type="email"
                      placeholder="بريدك الإلكتروني لاستلام التأكيد (اختياري)"
                      value={contactEmail}
                      onChange={(e) => setContactEmail(e.target.value)}
                      className="px-3 py-2 text-xs rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-indigo-500"
                      dir="ltr"
                    />
                  </div>

                  {submissionError && (
                    <div className="text-xs text-rose-600 dark:text-rose-400 font-medium">
                      {submissionError}
                    </div>
                  )}

                  <div className="flex flex-wrap items-center gap-2 pt-1">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs rounded-lg transition-colors flex items-center justify-center gap-2 shadow-xs whitespace-nowrap shrink-0 disabled:opacity-50"
                    >
                      {isSubmitting ? (
                        <span>جاري التسجيل...</span>
                      ) : (
                        <>
                          <Send className="w-3.5 h-3.5" />
                          <span>تسجيل طلب الحذف في النظام</span>
                        </>
                      )}
                    </button>

                    <a
                      href={mailtoUrl}
                      className="px-3 py-2 bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 text-slate-800 dark:text-slate-200 font-medium text-xs rounded-lg transition-colors flex items-center justify-center gap-1.5 whitespace-nowrap shrink-0"
                    >
                      <Mail className="w-3.5 h-3.5" />
                      <span>إرسال عبر البريد الإلكتروني</span>
                    </a>
                  </div>
                </form>
              )}
            </section>

          </div>
        ) : (
          /* English Translation for Meta Global Reviewers */
          <div className="space-y-8 text-slate-800 dark:text-slate-200 leading-relaxed text-sm sm:text-base" dir="ltr">
            
            <section className="space-y-4">
              <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                How to Delete Your Data
              </h2>
              <p className="text-slate-600 dark:text-slate-300">
                You can request deletion of all data associated with the OTAY app by following these steps:
              </p>

              <div className="space-y-3">
                
                <div className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200/70 dark:border-slate-700/60 flex items-start gap-4">
                  <div className="w-8 h-8 rounded-lg bg-indigo-600 text-white flex items-center justify-center font-bold text-sm shrink-0">
                    1
                  </div>
                  <div>
                    <div className="font-bold text-slate-900 dark:text-white">Step 1: Navigate to Instagram Settings</div>
                    <div className="text-sm text-slate-600 dark:text-slate-300 mt-1">
                      Open Instagram → Settings → Security → Apps and Websites
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200/70 dark:border-slate-700/60 flex items-start gap-4">
                  <div className="w-8 h-8 rounded-lg bg-indigo-600 text-white flex items-center justify-center font-bold text-sm shrink-0">
                    2
                  </div>
                  <div>
                    <div className="font-bold text-slate-900 dark:text-white">Step 2: Revoke App Permissions</div>
                    <div className="text-sm text-slate-600 dark:text-slate-300 mt-1">
                      Locate the OTAY application and revoke its permissions — this terminates access immediately.
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-indigo-50/60 dark:bg-indigo-950/30 rounded-xl border border-indigo-200 dark:border-indigo-900/60 flex items-start gap-4">
                  <div className="w-8 h-8 rounded-lg bg-indigo-600 text-white flex items-center justify-center font-bold text-sm shrink-0">
                    3
                  </div>
                  <div className="space-y-2 flex-1">
                    <div className="font-bold text-indigo-950 dark:text-indigo-200">Step 3: Permanent Deletion Request via Email</div>
                    <div className="text-sm text-slate-700 dark:text-slate-300">
                      To permanently delete all stored data, send an email to:
                    </div>
                    <div className="flex flex-wrap items-center gap-2 pt-1">
                      <div className="bg-white dark:bg-slate-900 px-3 py-1.5 rounded-lg border border-indigo-200 dark:border-indigo-800 font-mono text-xs text-indigo-700 dark:text-indigo-300 font-bold select-all flex items-center gap-1.5">
                        <Mail className="w-3.5 h-3.5" />
                        <span>{APP_INFO.developerEmail}</span>
                      </div>
                      <button
                        onClick={copyEmail}
                        className="px-2.5 py-1 text-xs font-medium text-indigo-700 dark:text-indigo-300 hover:bg-indigo-100 dark:hover:bg-indigo-900/50 rounded-md transition-colors"
                      >
                        {emailCopied ? 'Copied!' : 'Copy Email'}
                      </button>
                    </div>
                    <div className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                      Subject: <strong className="text-slate-800 dark:text-slate-200">طلب حذف البيانات — OTAY</strong>
                    </div>
                  </div>
                </div>

              </div>
            </section>

            <section className="space-y-3 pt-2">
              <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <span>What Will Be Deleted?</span>
              </h2>
              <ul className="space-y-2 ps-4 list-disc marker:text-rose-500">
                <li>All access tokens and credentials associated with your account</li>
                <li>Saved incoming message history and logs</li>
                <li>Any configured automated reply rules and settings</li>
              </ul>
            </section>

            <section className="space-y-2">
              <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Clock className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                <span>Processing Time</span>
              </h2>
              <div className="p-4 bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-900/50 rounded-xl text-emerald-900 dark:text-emerald-200 font-medium text-sm">
                Your deletion request will be processed within 72 hours of receipt, and you will receive a confirmation email.
              </div>
            </section>

          </div>
        )}

        {/* Document Footer */}
        <footer className="mt-12 pt-8 border-t border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 dark:text-slate-400">
          <div>{APP_INFO.copyrightAr}</div>
          <div className="flex items-center gap-4">
            <button onClick={() => onNavigate('/privacy')} className="hover:text-indigo-600 dark:hover:text-indigo-400 font-medium">
              {lang === 'ar' ? 'الموقع ١: سياسة الخصوصية' : 'Site 1: Privacy Policy'}
            </button>
            <span>·</span>
            <button onClick={() => onNavigate('/terms')} className="hover:text-indigo-600 dark:hover:text-indigo-400 font-medium">
              {lang === 'ar' ? 'الموقع ٢: شروط الخدمة' : 'Site 2: Terms of Service'}
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
          <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-indigo-600 transition-transform group-hover:translate-x-1" />
        </button>
      </div>
    </div>
  );
};
