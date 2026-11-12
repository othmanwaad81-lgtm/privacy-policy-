import React, { useState } from 'react';
import { X, Copy, Check, ShieldCheck, ExternalLink } from 'lucide-react';
import { POLICIES, APP_INFO } from '../data/content';

interface MetaHelperModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: 'ar' | 'en';
}

export const MetaHelperModal: React.FC<MetaHelperModalProps> = ({ isOpen, onClose, lang }) => {
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  if (!isOpen) return null;

  const origin = typeof window !== 'undefined' ? window.location.origin : 'https://your-domain.com';

  const fields = [
    {
      key: 'privacy',
      labelAr: 'رابط سياسة الخصوصية (Privacy Policy URL)',
      labelEn: 'Privacy Policy URL',
      url: `${origin}${POLICIES.privacy.route}`,
      descAr: 'ضعه في خانة "Privacy Policy URL" في إعدادات التطبيق الأساسية (Basic Settings).',
      descEn: 'Paste into "Privacy Policy URL" in Meta App Basic Settings.',
    },
    {
      key: 'terms',
      labelAr: 'رابط شروط الخدمة (Terms of Service URL)',
      labelEn: 'Terms of Service URL',
      url: `${origin}${POLICIES.terms.route}`,
      descAr: 'ضعه في خانة "Terms of Service URL" في إعدادات التطبيق الأساسية.',
      descEn: 'Paste into "Terms of Service URL" in Meta App Basic Settings.',
    },
    {
      key: 'deletion',
      labelAr: 'رابط حذف بيانات المستخدم (User Data Deletion URL)',
      labelEn: 'User Data Deletion Instructions URL',
      url: `${origin}${POLICIES['data-deletion'].route}`,
      descAr: 'اختر "Data Deletion Instructions URL" في لوحة Meta وضعه هناك.',
      descEn: 'Select "Data Deletion Instructions URL" and paste this link.',
    },
    {
      key: 'email',
      labelAr: 'البريد الإلكتروني للاتصال بالدعم الفني',
      labelEn: 'Support / Contact Email',
      url: APP_INFO.developerEmail,
      descAr: 'البريد الرسمي المذكور في جميع السياسات لاستقبال استفسارات المستخدمين.',
      descEn: 'Official developer contact email specified across all policies.',
    },
  ];

  const copyValue = (key: string, val: string) => {
    navigator.clipboard.writeText(val);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xl max-w-2xl w-full p-6 space-y-5 animate-in fade-in zoom-in-95 duration-150">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-4">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                {lang === 'ar' ? 'روابط التوثيق للوحة مطوري Meta' : 'Meta Developer Dashboard URLs'}
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {lang === 'ar' ? 'انسخ كل رابط وضعه في الخانة المطابقة في developers.facebook.com' : 'Copy and paste into developers.facebook.com'}
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

        {/* Fields list */}
        <div className="space-y-3">
          {fields.map((f) => {
            const isCopied = copiedKey === f.key;
            return (
              <div
                key={f.key}
                className="p-3.5 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200/80 dark:border-slate-700/80 space-y-1.5"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-800 dark:text-slate-200">
                    {lang === 'ar' ? f.labelAr : f.labelEn}
                  </span>
                  <span className="text-[11px] text-slate-500 dark:text-slate-400">
                    {lang === 'ar' ? f.descAr : f.descEn}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    readOnly
                    value={f.url}
                    className="flex-1 px-3 py-1.5 text-xs font-mono bg-white dark:bg-slate-900 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-700 rounded-lg select-all"
                    dir="ltr"
                  />
                  <button
                    onClick={() => copyValue(f.key, f.url)}
                    className="px-3 py-1.5 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg transition-colors flex items-center gap-1.5 shrink-0"
                  >
                    {isCopied ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-300" />
                        <span>{lang === 'ar' ? 'تم النسخ!' : 'Copied!'}</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>{lang === 'ar' ? 'نسخ' : 'Copy'}</span>
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
