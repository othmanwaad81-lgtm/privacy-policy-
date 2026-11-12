import React, { useState } from 'react';
import { X, Copy, Check, Layers, Terminal, CheckCircle2 } from 'lucide-react';

interface FirebaseDeployModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: 'ar' | 'en';
}

export const FirebaseDeployModal: React.FC<FirebaseDeployModalProps> = ({
  isOpen,
  onClose,
  lang,
}) => {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  if (!isOpen) return null;

  const copyText = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const steps = [
    {
      titleAr: 'الخطوة الأولى: تجهيز حزمة الإنتاج',
      titleEn: 'Step 1: Build for Production',
      descAr: 'يقوم هذا الأمر بإنشاء مجلد dist المدمج والمحسن بالكامل:',
      descEn: 'Compiles the full production application inside the dist directory:',
      cmd: 'npm run build',
    },
    {
      titleAr: 'الخطوة الثانية: تهيئة Firebase Hosting (للمرة الأولى فقط)',
      titleEn: 'Step 2: Initialize Firebase (First time only)',
      descAr: 'سجل الدخول لحسابك واختر مشروعك في فايربيس (حدد المجلد العام dist وموافق على SPA rewrites):',
      descEn: 'Log in and link your Firebase project (set public folder as dist, select SPA rewrites):',
      cmd: 'firebase init hosting',
    },
    {
      titleAr: 'الخطوة الثالثة: النشر المباشر على Firebase',
      titleEn: 'Step 3: Deploy to Firebase',
      descAr: 'نشر المواقع الثلاثة فوراً والحصول على الرابط العام المباشر:',
      descEn: 'Deploy all 3 sites and get your instant live HTTPS URL:',
      cmd: 'firebase deploy --only hosting',
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xl max-w-2xl w-full p-6 space-y-5 animate-in fade-in zoom-in-95 duration-150 max-h-[90vh] overflow-y-auto">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-4">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400">
              <Layers className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                {lang === 'ar' ? 'دليل نشر المواقع الثلاثة على Firebase' : 'Deploy to Firebase Hosting Guide'}
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {lang === 'ar' ? 'ملف firebase.json مُجهّز بالفعل في المشروع لضمان عمل الروابط الثلاثة بشكل مستقل' : 'firebase.json is pre-configured with SPA rewrites for all 3 routes'}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Note on firebase.json */}
        <div className="p-3.5 bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-900/50 rounded-xl text-emerald-900 dark:text-emerald-300 text-xs flex items-start gap-2.5">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <div className="font-bold">
              {lang === 'ar' ? 'تم تفعيل وربط Firebase بنجاح في التطبيق:' : 'Firebase is fully provisioned and active:'}
            </div>
            <div className="text-[11px] opacity-90 font-mono">
              Project ID: gen-lang-client-0296930658
            </div>
            <div className="text-[11px] opacity-90">
              {lang === 'ar'
                ? 'تم إنشاء ملف firebase.json بميزة Rewrites، وقاعدة بيانات Firestore مهيأة ومؤمنة بقواعد حماية مخصصة لطلبات حذف البيانات.'
                : 'firebase.json is ready with SPA rewrites, and Firestore database is configured with hardened rules.'}
            </div>
          </div>
        </div>

        {/* Steps */}
        <div className="space-y-4">
          {steps.map((s, idx) => {
            const isCopied = copiedIndex === idx;
            return (
              <div
                key={idx}
                className="p-3.5 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200/80 dark:border-slate-700/80 space-y-2"
              >
                <div className="text-xs font-bold text-slate-900 dark:text-white">
                  {lang === 'ar' ? s.titleAr : s.titleEn}
                </div>
                <div className="text-xs text-slate-600 dark:text-slate-300">
                  {lang === 'ar' ? s.descAr : s.descEn}
                </div>
                <div className="flex items-center gap-2">
                  <pre
                    className="flex-1 px-3 py-2 text-xs font-mono bg-slate-900 text-emerald-400 rounded-lg overflow-x-auto select-all"
                    dir="ltr"
                  >
                    {s.cmd}
                  </pre>
                  <button
                    onClick={() => copyText(s.cmd, idx)}
                    className="px-3 py-2 text-xs font-semibold text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors flex items-center gap-1.5 shrink-0"
                  >
                    {isCopied ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                        <span>{lang === 'ar' ? 'تم النسخ' : 'Copied'}</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>{lang === 'ar' ? 'نسخ الأمر' : 'Copy'}</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="pt-2 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-medium text-slate-700 dark:text-slate-200 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 rounded-lg transition-colors"
          >
            {lang === 'ar' ? 'إغلاق' : 'Close'}
          </button>
        </div>

      </div>
    </div>
  );
};
