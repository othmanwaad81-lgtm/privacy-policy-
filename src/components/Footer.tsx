import React from 'react';
import { ShieldCheck, Mail } from 'lucide-react';
import { APP_INFO, POLICIES } from '../data/content';

interface FooterProps {
  lang: 'ar' | 'en';
  onNavigate: (path: string) => void;
  onOpenMetaModal: () => void;
  onOpenFirebaseModal: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  lang,
  onNavigate,
  onOpenMetaModal,
  onOpenFirebaseModal,
}) => {
  return (
    <footer className="no-print bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 transition-colors mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
        
        {/* Main Footer Row */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-slate-900 dark:text-white text-base">
                {APP_INFO.appName}
              </span>
              <span className="text-xs text-slate-400">·</span>
              <span className="text-xs text-slate-500 dark:text-slate-400">
                {lang === 'ar' ? 'بوابة السياسات الرسمية' : 'Official Compliance Portal'}
              </span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              {lang === 'ar' ? APP_INFO.fullAppNameAr : APP_INFO.fullAppNameEn}
            </p>
          </div>

          {/* Links to the 3 sites */}
          <div className="flex flex-wrap items-center gap-4 text-xs font-medium text-slate-600 dark:text-slate-300">
            <button
              onClick={() => onNavigate('/')}
              className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
            >
              {lang === 'ar' ? 'البوابة الرئيسية' : 'Hub'}
            </button>
            <span>·</span>
            <button
              onClick={() => onNavigate(POLICIES.privacy.route)}
              className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
            >
              {lang === 'ar' ? 'الموقع ١: الخصوصية' : 'Site 1: Privacy'}
            </button>
            <span>·</span>
            <button
              onClick={() => onNavigate(POLICIES.terms.route)}
              className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
            >
              {lang === 'ar' ? 'الموقع ٢: الشروط' : 'Site 2: Terms'}
            </button>
            <span>·</span>
            <button
              onClick={() => onNavigate(POLICIES['data-deletion'].route)}
              className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
            >
              {lang === 'ar' ? 'الموقع ٣: حذف البيانات' : 'Site 3: Deletion'}
            </button>
            <span>·</span>
            <button
              onClick={onOpenMetaModal}
              className="text-indigo-600 dark:text-indigo-400 hover:underline"
            >
              {lang === 'ar' ? 'روابط Meta' : 'Meta Links'}
            </button>
            <span>·</span>
            <button
              onClick={onOpenFirebaseModal}
              className="text-amber-600 dark:text-amber-400 hover:underline"
            >
              {lang === 'ar' ? 'نشر Firebase' : 'Deploy'}
            </button>
          </div>
        </div>

        {/* Bottom line */}
        <div className="pt-6 border-t border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 dark:text-slate-400">
          <div>{APP_INFO.copyrightAr}</div>
          <div className="flex items-center gap-1.5">
            <Mail className="w-3.5 h-3.5 text-slate-400" />
            <a
              href={`mailto:${APP_INFO.developerEmail}`}
              className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
              dir="ltr"
            >
              {APP_INFO.developerEmail}
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
};
